import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  BackHandler,
} from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import haversine from 'haversine';
import { Pedometer } from 'expo-sensors';
import * as Location from 'expo-location';
import axios from 'axios';
import sun from '../../../../assets/image/weather/sun.gif';
import rain from '../../../../assets/image/weather/rain.gif';
import cloudy from '../../../../assets/image/weather/cloudy.gif';
import clouds from '../../../../assets/image/weather/clouds.gif';
import { T_MAPS_API_KEY, WEATHER_API_KEY } from '../../../config/Config';
import { UserContext } from '../../../contexts/User';
import { ExerciseRecordService } from '../../../services/ExerciseRecordService';
import { MatchService } from '../../../services/MatchService';
import * as Permissions from 'expo-permissions';

const LATITUDE_DELTA = 0.003;
const LONGITUDE_DELTA = 0.003;
const [matchData, setMatchData] = useState([]);

class RunScreen extends React.Component {
  async checkStepPermissions() {
    const { status } = await Permissions.askAsync(
      Permissions.ACTIVITY_RECOGNITION
    );
    if (status !== 'granted') {
      console.log('Activity recognition permission denied!');
      return false;
    }
    return true;
  }
  static contextType = UserContext;
  constructor(props) {
    super(props);

    const { goalSetting } = this.props.route.params;

    this.goalDistance = goalSetting.goalDistance;
    this.goalTime = goalSetting.goalTime * 60;
    this.goalCalories = goalSetting.goalCalories;

    this.state = {
      latitude: 37.4480158,
      longitude: 126.6575041,
      routeCoordinates: [],
      distanceTravelled: 0,
      stepCount: 0,
      prevLatLng: {},
      coordinate: {
        latitude: 37.4480158,
        longitude: 126.6575041,
      },
      weather: null,
      temperature: null,
      weatherImage: null,
      timer: 0,
      isRunning: false,
      isStepsGoalAchieved: false,
      isTimeGoalAchieved: false,
      isCaloriesGoalAchieved: false,
      coords: [], // 경로 좌표를 저장할 배열
      startTime: null,
      endTime: null,
    };
  }

  async componentDidMount() {
    // 현재 위치 가져오기
    const location = await Location.getCurrentPositionAsync({});
    const LATITUDE = location.coords.latitude;
    const LONGITUDE = location.coords.longitude;

    this.setState({
      latitude: LATITUDE,
      longitude: LONGITUDE,
    });

    const { selectedPark, intervalSetting, musicSetting } =
      this.props.route.params;
    this.setState({ startTime: new Date() });
    console.log('전송된 목표 설정:', this.props.route.params.goalSetting);
    console.log('선택된 산책로:', selectedPark);
    console.log('인터벌 설정:', intervalSetting);
    console.log('음악 설정:', musicSetting);

    await this.checkPermissions();
    this.watchLocation();
    this.getWeather(LATITUDE, LONGITUDE);
    this.watchSteps();
    this.startTimer();

    // 선택된 산책로의 정보가 null이 아닌 경우에만 길 안내 기능 실행
    if (selectedPark) {
      // 목적지 위치 설정
      const destination = {
        latitude: selectedPark.frontLat,
        longitude: selectedPark.frontLon,
      };

      // 경로 계산
      this.getDirections(
        LATITUDE,
        LONGITUDE,
        selectedPark.frontLat,
        selectedPark.frontLon,
        selectedPark.name
      );
    } else {
      console.log('선택된 산책로의 정보가 없습니다.');
    }

    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress
    );

    // 화면 상단 헤더의 뒤로가기 버튼을 누를 경우.
    this.props.route.params = {
      ...this.props.route.params,
      handleBackPress: this.handleBackPress,
    };

    //  if (await this.checkStepPermissions()) {
    if (await Pedometer.isAvailableAsync()) {
      this.watchSteps();
    } else {
      console.log('Pedometer is not available on this device.');
    }

    // 이용자의 대결 정보를 가져옵니다.
    const { jwt } = this.context;
    try {
      const userMatchData = await MatchService.isUserInMatch(jwt);
      console.log('이용자의 대결 정보:', userMatchData);
      setMatchData(userMatchData);
    } catch (error) {
      console.log('이용자의 대결 정보를 가져오는 데 실패했습니다:', error);
    }
  }

  handleBackPress = async () => {
    this.setState({ endTime: new Date() }, async () => {
      const { jwt } = this.context;

      // 시간을 'HH:mm:ss' 형식의 문자열로 변환하는 함수
      const formatTime = (date) => {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
      };

      const formattedStartTime = formatTime(this.state.startTime);
      const formattedEndTime = formatTime(this.state.endTime);

      if (matchData.data.battleCheck === '대결 진행 중') {
        const { jwt } = this.context;
        //const matchId = this.state.matchData.data.id;
        const steps = this.state.stepCount;
        const response = MatchService.sendStepsToMatch(
          jwt,
          matchData.data.battleId,
          steps
        )
          .then(() => {
            if (response.message === '대결 라이벌 걸음수 수정 성공') {
              console.log('걸음 수가 성공적으로 전송되었습니다.');
            }
            console.log('뭔가 이상한데...?');
          })
          .catch((error) => {
            console.log('걸음 수 전송에 실패했습니다:', error);
          });
      }

      Alert.alert(
        '운동 결과',
        `거리: ${this.state.distanceTravelled.toFixed(2)} km\n걸음 수: ${
          this.state.stepCount
        } steps\n칼로리: ${this.calculateCalories()} cal`,
        [
          {
            text: '확인',
            onPress: async () => {
              const exerciseDate = new Date().toISOString().split('T')[0];
              const exerciseTime = `${Math.floor(this.state.timer / 60)}:${
                this.state.timer % 60
              }`;
              const success =
                await ExerciseRecordService.sendExerciseDataToServer(
                  jwt,
                  this.state.distanceTravelled,
                  this.state.stepCount,
                  this.calculateCalories(),
                  exerciseDate,
                  exerciseTime,
                  formattedStartTime,
                  formattedEndTime
                );
              if (success) {
                this.props.navigation.goBack();
              } else {
                Alert.alert(
                  '전송 실패',
                  '운동 정보 전송에 실패하였습니다. 다시 시도하시겠습니까?',
                  [
                    {
                      text: '네',
                      onPress: this.handleBackPress,
                    },
                    {
                      text: '아니오',
                      onPress: () => {
                        console.log(
                          '사용자가 나중에 다시 시도하기로 결정하였습니다.'
                        );
                        this.props.navigation.goBack();
                      },
                    },
                  ]
                );
              }
            },
          },
        ],
        { cancelable: false }
      );
    });
    return true;
  };

  // 경로 계산 메서드
  async getDirections(
    startLat,
    startLng,
    destinationLat,
    destinationLng,
    endName
  ) {
    const startName = '현재 위치';
    const reqCoordType = 'WGS84GEO';
    const resCoordType = 'WGS84GEO';
    const searchOption = '0';
    /* 경로 탐색 옵션입니다.
      - 0: 추천 (기본값)
      - 4: 추천+대로우선
      - 10: 최단
      - 30: 최단거리+계단제외 
    */
    const sort = 'index';
    const endPoint =
      'https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1';

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        appKey: T_MAPS_API_KEY,
      },
      data: {
        startX: startLng,
        startY: startLat,
        endX: destinationLng,
        endY: destinationLat,
        reqCoordType: reqCoordType,
        startName: startName,
        endName: endName,
        searchOption: searchOption,
        resCoordType: resCoordType,
        sort: sort,
      },
    };

    try {
      const response = await axios(endPoint, options);
      if (response && response.data.features) {
        const coords = response.data.features
          .filter((feature) => feature.geometry.type === 'LineString')
          .map((line) => line.geometry.coordinates)
          .flat()
          .map((coordinate) => ({
            latitude: coordinate[1],
            longitude: coordinate[0],
          }));

        const description = response.data.features[0].properties.description;
        this.setState({ coords, description });
      } else {
        console.error('Invalid API response');
      }
    } catch (error) {
      console.error('Error in getDirections:', error);
    }
  }

  // 상태가 업데이트될 때마다 실행되는 라이프사이클 메서드
  componentDidUpdate(prevProps, prevState) {
    if (
      this.goalDistance &&
      this.goalDistance > 0 &&
      this.state.distanceTravelled >= this.goalDistance &&
      !prevState.isStepsGoalAchieved
    ) {
      this.setState({ isStepsGoalAchieved: true });
      Alert.alert('목표 거리를 달성했습니다!');
      console.log('목표 거리를 달성했습니다!');
    }

    if (
      this.goalTime &&
      this.goalTime > 0 &&
      this.goalTime <= this.state.timer &&
      !prevState.isTimeGoalAchieved
    ) {
      this.setState({ isTimeGoalAchieved: true });
      Alert.alert('목표 시간을 달성했습니다!');
      console.log('목표 시간을 달성했습니다!');
    }

    if (
      this.goalCalories &&
      this.goalCalories > 0 &&
      this.goalCalories <= parseFloat(this.calculateCalories()) &&
      !prevState.isCaloriesGoalAchieved
    ) {
      this.setState({ isCaloriesGoalAchieved: true });
      Alert.alert('목표 칼로리를 달성했습니다!');
      console.log('목표 칼로리를 달성했습니다!');
    }
  }

  startTimer = () => {
    if (this.state.isRunning) return;

    this.setState({ isRunning: true });
    this.timer = setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer + 1 }));
    }, 1000);
  };

  pauseTimer = () => {
    this.setState({ isRunning: false });
    clearInterval(this.timer);
  };

  async checkPermissions() {
    // 위치 권한 확인
    const { status: locationStatus } =
      await Location.requestForegroundPermissionsAsync();
    if (locationStatus !== 'granted') {
      console.log('위치 접근 권한이 거부되었습니다');
      alert(
        '위치 접근 권한이 거부되었습니다. 앱의 정확한 기능을 사용하려면 권한을 허용해야 합니다.'
      );
    }
  }

  // 걸음 수 추적 메서드
  watchSteps = () => {
    this.stepSubscription = Pedometer.watchStepCount((result) => {
      this.setState({ stepCount: result.steps });
    });
  };

  watchLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('위치 접근 권한이 거부되었습니다');
      return;
    }

    this.watchID = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 500,
        distanceFilter: 10,
      },
      (position) => {
        const { latitude, longitude } = position.coords;
        const newCoordinate = { latitude, longitude };

        // Intersection check
        const intersectionIndex = this.findIntersection(newCoordinate);
        if (intersectionIndex > -1) {
          this.setState((prevState) => ({
            routeCoordinates: prevState.routeCoordinates.slice(
              0,
              intersectionIndex + 1
            ),
          }));
        } else {
          this.setState((prevState) => ({
            routeCoordinates: [...prevState.routeCoordinates, newCoordinate],
          }));
        }

        this.setState((state) => {
          const routeCoordinates = state.routeCoordinates.concat([
            newCoordinate,
          ]);
          const prevLatLng =
            routeCoordinates.length > 1 ? state.coordinate : newCoordinate;
          const distanceTravelled =
            state.distanceTravelled + this.calcDistance(newCoordinate);

          return {
            latitude,
            longitude,
            coordinate: newCoordinate,
            routeCoordinates,
            distanceTravelled,
            prevLatLng,
          };
        });
      }
    );
  };

  findIntersection = (currentLocation) => {
    const { coords } = this.state;
    for (let i = 0; i < coords.length; i++) {
      if (haversine(currentLocation, coords[i]) < 0.05) {
        // 50미터 내에 교차점이 있다고 가정
        return i;
      }
    }
    return -1;
  };

  getWeather = async (latitude, longitude) => {
    try {
      const weatherResult = await this.lookUpWeather(longitude, latitude);
      const weatherInfo = weatherResult.split(',');
      const weather = weatherInfo[0];
      const temperature = weatherInfo[1];

      let weatherImage;
      switch (weather) {
        case '현재 날씨는 맑은 상태입니다.':
          weatherImage = sun;
          break;
        case '현재 날씨는 비가 오는 상태입니다.':
          weatherImage = rain;
          break;
        case '현재 날씨는 구름이 많은 상태입니다.':
          weatherImage = cloudy;
          break;
        case '현재 날씨는 흐린 상태입니다.':
          weatherImage = clouds;
          break;
        default:
          weatherImage = null;
      }

      this.setState({
        weather,
        temperature,
        weatherImage,
      });
    } catch (error) {
      console.error(error);
    }
  };

  componentWillUnmount() {
    if (this.watchID && this.watchID.remove) {
      this.watchID.remove();
    }
    if (this.stepSubscription && this.stepSubscription.remove) {
      this.stepSubscription.remove();
    }
    this.pauseTimer();

    if (this.backHandler && this.backHandler.remove) {
      this.backHandler.remove();
    }
    if (this.backHandler) {
      this.backHandler.remove();
    }
  }

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  calcDistance = (newLatLng) => {
    const { prevLatLng } = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };

  // 칼로리 계산기
  calculateCalories = () => {
    return (this.state.distanceTravelled * 70).toFixed(2);
  };

  lookUpWeather = async (longitude, latitude) => {
    // 현재 날짜 구하기
    const date = new Date();
    let baseDate = date.toISOString().split('T')[0].replaceAll('-', '');
    // 날씨 API: 매 시각 45분 이후 호출 // 오전 12시인 경우 사용
    let correctionDate = parseInt(baseDate, 10) - 1;

    // 시간(30분 단위로 맞추기)
    let itime1 = date.getHours() * 100 + date.getMinutes();
    let itime2 = date.getHours() - 1;

    //  /*06시30분 발표(30분 단위)*/
    if (itime2 <= 7) {
      itime2 = 23;
      baseDate = String(correctionDate);
      baseTime = '2100';
    } else {
      // api가 30분 단위로 업데이트
      if (itime1 % 100 >= 30) baseTime = itime2 + '30';
      else baseTime = itime2 + '00';
    }
    // 오전에는 시간이 3자리로 나옴...
    if (baseTime.length === 3) {
      baseTime = '0' + baseTime;
    }

    // 경도와 위도를 정수로 변환
    const nx = Math.floor(latitude);
    let ny = Math.floor(longitude);

    // API 키가 유출되지 않도록 조심해주세요!
    const url = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=${WEATHER_API_KEY}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;
    const response = await axios.get(url);
    const items = response.data.response.body.items.item;

    let skyValue = null;
    let temperatureValue = null;

    for (const item of items) {
      if (item.category === 'SKY') {
        skyValue = item.fcstValue;
      }
      if (item.category === 'T1H') {
        temperatureValue = item.fcstValue;
      }
    }
    // SKY 값에 따른 날씨 상태를 설정합니다.
    let weather = '현재 날씨 정보를 불러올 수 없습니다.';
    switch (skyValue) {
      case '1':
        weather = '현재 날씨는 맑은 상태입니다.';
        break;
      case '2':
        weather = '현재 날씨는 비가 오는 상태입니다.';
        break;
      case '3':
        weather = '현재 날씨는 흐린 상태입니다.';
        break;
      case '4':
        weather = '현재 날씨는 구름이 많은 상태입니다.';
        break;
    }

    const temperature = temperatureValue + ' ℃';

    return weather + ',' + temperature;
  };

  render() {
    const minutes = Math.floor(this.state.timer / 60);
    const seconds = this.state.timer - minutes * 60;
    const { selectedPark } = this.props.route.params;

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          loadingEnabled
          region={this.getMapRegion()}>
          {/* 현재 이동한 라인 그리기 */}
          <Polyline
            coordinates={this.state.routeCoordinates}
            strokeWidth={5}
            strokeColor="blue"
          />

          {/* 길 안내 라인 그리기 */}
          <Polyline
            coordinates={[
              {
                latitude: this.state.latitude,
                longitude: this.state.longitude,
              },
              ...this.state.coords,
            ]}
            strokeWidth={5}
            strokeColor="red"
          />
          <Marker
            ref={(marker) => {
              this.marker = marker;
            }}
            coordinate={this.state.coordinate}>
            <View style={styles.circleMarker} />
          </Marker>
        </MapView>
        <View style={styles.weatherContainer}>
          {this.state.weatherImage && (
            <Image
              source={this.state.weatherImage}
              style={styles.weatherImage}
            />
          )}
          <Text
            style={{ ...styles.weatherText, marginLeft: 10, marginRight: 10 }}>
            {this.state.temperature}
          </Text>
          <Text style={styles.weatherText}>{this.state.weather}</Text>
        </View>
        {selectedPark && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>{this.state.description}</Text>
          </View>
        )}
        <View style={styles.RunInfoContainer}>
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>
              {`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}
            </Text>
          </View>
          <View style={styles.runContainer}>
            <View style={[styles.bubble, styles.info]}>
              <Text style={styles.bottomBarContent}>
                {parseFloat(this.state.distanceTravelled).toFixed(2)} km
              </Text>
            </View>
            <View style={[styles.bubble, styles.info]}>
              <Text style={styles.bottomBarContent}>
                {this.state.stepCount} steps
              </Text>
            </View>
            <View style={[styles.bubble, styles.info]}>
              <Text style={styles.bottomBarContent}>
                {this.calculateCalories()} cal
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  weatherContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  weatherText: {
    fontSize: 16,
  },
  weatherImage: {
    width: 50,
    height: 50,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
  },
  info: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  RunInfoContainer: {
    flexDirection: 'column',
    marginVertical: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 10,
  },
  circleMarker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'blue',
  },
  timerText: {
    fontSize: 20,
    marginHorizontal: 10,
    marginTop: 10,
  },
  runContainer: {
    flexDirection: 'row',
  },
  descriptionContainer: {
    position: 'absolute',
    bottom: 110,
    left: 10,
    right: 10,
    padding: 10,
    backgroundColor: 'white', //'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  descriptionText: {
    fontSize: 16,
    backgroundColor: 'transparent',
  },
});

export default RunScreen;
