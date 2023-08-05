import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';

export default function ExerciseDetailScreen({ route }) {
  const { exerciseRecords } = route.params;

  const currentMonth = new Date().getMonth() + 1;
  const currentWeek = Math.ceil(new Date().getDate() / 7);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedWeek, setSelectedWeek] = useState(currentWeek);

  const [weeklyCalories, setWeeklyCalories] = useState([]);
  const [weeklyDistances, setWeeklyDistances] = useState([]);
  const [weeklySteps, setWeeklySteps] = useState([]);
  const [weeklyTimes, setWeeklyTimes] = useState([]);

  useEffect(() => {
    const calculateCalorie = (record) =>
      record.distance * 50 + record.step * 0.05 + record.time * 2;

    let tempWeeklyCalories = Array(7).fill(0);
    let tempWeeklyDistances = Array(7).fill(0);
    let tempWeeklySteps = Array(7).fill(0);
    let tempWeeklyTimes = Array(7).fill(0);

    exerciseRecords.forEach((record) => {
      const recordDate = new Date(record.date);
      if (Math.ceil(recordDate.getDate() / 7) === selectedWeek) {
        const dayOfWeek = recordDate.getDay(); // Sunday is 0, Saturday is 6
        tempWeeklyCalories[dayOfWeek] += calculateCalorie(record);
        tempWeeklyDistances[dayOfWeek] += record.distance;
        tempWeeklySteps[dayOfWeek] += record.step;
        tempWeeklyTimes[dayOfWeek] += record.time;
      }
    });

    setWeeklyCalories(tempWeeklyCalories);
    setWeeklyDistances(tempWeeklyDistances);
    setWeeklySteps(tempWeeklySteps);
    setWeeklyTimes(tempWeeklyTimes);
  }, [selectedWeek, exerciseRecords]);

  const incrementWeek = () => {
    if (selectedWeek === 4) {
      setSelectedWeek(1);
      setSelectedMonth((prevMonth) => (prevMonth === 12 ? 1 : prevMonth + 1));
    } else {
      setSelectedWeek((prev) => prev + 1);
    }
  };

  const decrementWeek = () => {
    if (selectedWeek === 1) {
      setSelectedWeek(4);
      setSelectedMonth((prevMonth) => (prevMonth === 1 ? 12 : prevMonth - 1));
    } else {
      setSelectedWeek((prev) => prev - 1);
    }
  };

  const chartConfig = {
    backgroundGradientFrom: 'white',
    backgroundGradientTo: 'white',
    color: (opacity = 1) => `rgba(173, 216, 230, ${opacity})`,
    fillShadowGradient: '#B0E0E6',
    fillShadowGradientOpacity: 0.5,
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.monthSelector}>
        <TouchableOpacity onPress={decrementWeek}>
          <Text style={styles.monthText}>&lt;</Text>
        </TouchableOpacity>
        <Text style={styles.monthText}>
          {selectedMonth}월 {selectedWeek}주차
        </Text>
        <TouchableOpacity onPress={incrementWeek}>
          <Text style={styles.monthText}>&gt;</Text>
        </TouchableOpacity>
      </View>

      {/* 칼로리 막대 그래프*/}
      <View style={styles.graphContainer}>
        <Text style={styles.titleText}>주간 칼로리 소모량</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <BarChart
            data={{
              labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
              datasets: [
                {
                  data: weeklyCalories,
                },
              ],
            }}
            width={screenWidth}
            height={160}
            chartConfig={chartConfig}
          />
        </ScrollView>
      </View>

      {/* 거리 막대 그래프 */}
      <View style={styles.graphContainer}>
        <Text style={styles.titleText}>주간 걸은 거리</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <BarChart
            data={{
              labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
              datasets: [
                {
                  data: weeklyDistances,
                },
              ],
            }}
            width={screenWidth}
            height={160}
            chartConfig={chartConfig}
          />
        </ScrollView>
      </View>

      {/* 걸음수 막대 그래프 */}
      <View style={styles.graphContainer}>
        <Text style={styles.titleText}>주간 걸음 수</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <BarChart
            data={{
              labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
              datasets: [
                {
                  data: weeklySteps,
                },
              ],
            }}
            width={screenWidth}
            height={160}
            chartConfig={chartConfig}
          />
        </ScrollView>
      </View>

      {/* 걸은 시간 막대 그래프 */}
      <View style={styles.graphContainer}>
        <Text style={styles.titleText}>주간 걸은 시간</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <BarChart
            data={{
              labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
              datasets: [
                {
                  data: weeklyTimes,
                },
              ],
            }}
            width={screenWidth}
            height={160}
            chartConfig={chartConfig}
          />
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  monthSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  monthText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
  },
  graphContainer: {
    padding: 10,
    marginBottom: 15,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  titleText: {
    marginBottom: 5,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
