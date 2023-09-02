import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Keyboard,
  Linking,
  FlatList,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  makeRedirectUri,
  useAuthRequest,
  ResponseType,
} from 'expo-auth-session';

import Setting from '.././../../components/home/setting/Setting';
import Colors from '../../../themes/color';

import ParkList from '.././../../components/home/setting/ParkListView';
import IntervalSettingView from '.././../../components/home/setting/IntervalSettingView';
import MusicSettingView from '.././../../components/home/setting/MusicSettingView';
import GoalSettingView from '.././../../components/home/setting/GoalSettingView';
import BottomButton from '../../../components/common/BottomButton';

import * as Location from 'expo-location';
import { SPOTIFY_CLIENT_ID } from '../../../config/Config';

function SettingScreen({ navigation }) {
  const REDIRECT_URI = makeRedirectUri({ useProxy: true });
  const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  };

  const [spotifyAccessToken, setSpotifyAccessToken] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const [selectedPark, setSelectedPark] = useState(null);
  const [intervalSetting, setIntervalSetting] = useState('Off');
  const [musicSetting, setMusicSetting] = useState('Off');
  const [goalSetting, setGoalSetting] = useState({
    goalDistance: '',
    goalTime: '',
    goalCalories: '',
  });
  const [location, setLocation] = useState(null);

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('위치 정보에 접근할 권한이 거부되었습니다');
      return;
    }

    const options = {
      accuracy: Location.Accuracy.Lowest,
    };

    const location = await Location.getCurrentPositionAsync(options);
    setLocation(location);
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: SPOTIFY_CLIENT_ID,
      scopes: ['user-read-email', 'playlist-modify-public'],
      responseType: ResponseType.Token,
      redirectUri: REDIRECT_URI,
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params;
      setSpotifyAccessToken(access_token);
      proceedWithMusicSelection();
    } else if (response?.type === 'error') {
      console.error('Auth error: ', response.error);
    }
  }, [response]);

  // Spotify에서 플레이리스트 검색 함수
  const searchSpotifyPlaylists = async (keyword) => {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${keyword}&type=playlist&limit=1`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${spotifyAccessToken}`,
          },
        }
      );
      const data = await response.json();
      return data.playlists?.items?.[0];
    } catch (error) {
      console.error('Error fetching Spotify playlists:', error);
      return null;
    }
  };

  const proceedWithMusicSelection = async () => {
    console.log('스포티파이 로그인 완료 상태!');
    const playlist = await searchSpotifyPlaylists(musicSetting);
    if (playlist) {
      const playlistUrl = playlist.external_urls.spotify;
      Linking.openURL(playlistUrl).catch((err) =>
        console.error("Couldn't open Spotify", err)
      );

      // 음악 설정이 완료되면 러닝 화면으로 이동
      navigation.navigate('RunScreen', {
        selectedPark: selectedPark,
        intervalSetting: intervalSetting,
        musicSetting: musicSetting,
        goalSetting: goalSetting,
      });
    } else {
      console.log('No matching playlists found');
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const handleSelectedPark = (selectedPark) => {
    console.log('선택된 산책로:', selectedPark);
    setSelectedPark(selectedPark);
  };

  const IntervalChangeHandler = (intervalSetting) => {
    console.log('인터벌 설정이 변경되었습니다 :', intervalSetting);
    setIntervalSetting(intervalSetting);
  };

  const MusicSettingHandler = (musicSetting) => {
    console.log('음악 설정이 변경되었습니다:', musicSetting);
    if (musicSetting === '걷기') {
      setMusicSetting('Walking in');
    } else if (musicSetting === '달리기') {
      setMusicSetting('running');
    } else if (musicSetting === '계단') {
      setMusicSetting('party');
    }
  };

  const handleGoalChange = (goal) => {
    console.log('목표 설정이 변경되었습니다:', goal);
    setGoalSetting(goal);
  };

  const ButtonPressHandler = (buttonName) => {
    if (activeButton === buttonName) {
      setActiveButton(null);
      return;
    }
    setActiveButton(buttonName);
  };

  const handleStart = async () => {
    if (musicSetting !== 'Off' && !spotifyAccessToken) {
      console.log('현재 스포티파이 로그인 상태 X');
      await promptAsync();
      return;
    } else if (musicSetting !== 'Off' && spotifyAccessToken) {
      console.log('현재 스포티파이 로그인 상태 O');
      await proceedWithMusicSelection();
    }

    navigation.navigate('RunScreen', {
      selectedPark: selectedPark,
      intervalSetting: intervalSetting,
      musicSetting: musicSetting,
      goalSetting: goalSetting,
    });
  };

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    getCurrentLocation();
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const renderMainContent = ({ item }) => {
    if (item === 'around') {
      return (
        <ParkList location={location} onSelectedItem={handleSelectedPark} />
      );
    }
    if (item === 'interval') {
      return (
        <IntervalSettingView
          onIntervalChange={IntervalChangeHandler}
          intervalSetting={intervalSetting}
        />
      );
    }
    if (item === 'music') {
      return (
        <MusicSettingView
          onMusicSetting={MusicSettingHandler}
          musicSetting={musicSetting}
        />
      );
    }
    if (item === 'goal') {
      return (
        <GoalSettingView
          onGoalChange={handleGoalChange}
          initialGoalSetting={goalSetting}
        />
      );
    }
    return null;
  };

  return (
    <View style={{ flexGrow: 1, flex: 1 }}>
      <View style={styles.rootContainer}>
        <Text style={styles.settingText}>운동 상세 설정</Text>
        <Pressable
          style={({ pressed }) => [
            styles.aroundContainer,
            activeButton === 'around' ? styles.pressedButton : null,
          ]}
          onPress={() => ButtonPressHandler('around')}>
          <Text style={styles.aroundText}>주변 산책로 추천</Text>
        </Pressable>
        <View style={styles.settingContainer}>
          <Setting
            iconName="run-fast"
            info="인터벌 설정"
            onPress={() => ButtonPressHandler('interval')}
            isActive={activeButton === 'interval'}
          />
          <Setting
            iconName="headset"
            info="음악 설정"
            onPress={() => ButtonPressHandler('music')}
            isActive={activeButton === 'music'}
          />
          <Setting
            iconName="alarm-outline"
            info="목표 설정"
            onPress={() => ButtonPressHandler('goal')}
            isActive={activeButton === 'goal'}
          />
        </View>
      </View>
      <FlatList
        styles={{ marginBottom: 10 }}
        data={activeButton ? [activeButton] : []}
        keyExtractor={(item) => item}
        renderItem={renderMainContent}
      />
      {!keyboardVisible && (
        <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
          <BottomButton
            BottomText="운동 시작"
            onPress={handleStart}
            pressed={true}
          />
        </View>
      )}
    </View>
  );
}

export default SettingScreen;

const styles = StyleSheet.create({
  root: {
    paddingTop: 0,
    paddingBottom: 45,
  },
  rootContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
    paddingBottom: 15,
    borderRadius: 10,
    borderColor: Colors.primary200,
    backgroundColor: Colors.primary200,
  },
  settingText: {
    marginTop: 10,
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pressedButton: {
    backgroundColor: Colors.primary500,
    opacity: 0.75,
  },
  aroundContainer: {
    backgroundColor: Colors.primary100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 15,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 20,
    marginRight: 20,
    width: '80%',
  },
  aroundText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  settingContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
  },
});
