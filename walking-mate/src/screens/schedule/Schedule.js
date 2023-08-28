import React, { useContext, useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import Dialog from 'react-native-dialog';
import CalendarView from '../../components/schedule/CalendarView';
import CustomSwitch from '../../components/schedule/CustomSwitch';
import Task from '../../components/schedule/Task';
import { theme } from '../../themes/theme';
import { TaskService } from '../../services/TaskService';
import { ExerciseRecordService } from '../../services/ExerciseRecordService';
import { UserContext } from '../../contexts/index';

export default function ScheduleScreen({ navigation }) {
  const getTodayDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const today = getTodayDate();

  // 일정 관련 변수
  const [task, setTask] = useState({
    listId: null,
    date: today,
    checked: false,
    content: '',
  });
  const [taskItems, setTaskItems] = useState({});
  const [selectedOption, setSelectedOption] = useState(1);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  const { user } = useContext(UserContext);
  const jwt = user.jwt;

  const onSelectSwitch = (index) => {
    setSelectedOption(index);
  };

  // 운동 관련 변수
  const [exerciseRecords, setExerciseRecords] = useState([]);
  const [recordsForTheDay, setRecordsForTheDay] = useState([]);

  const averageExercise = exerciseRecords.reduce(
    (acc, record) => {
      acc.step += record.step;
      acc.distance += record.distance;
      acc.time += record.time;
      return acc;
    },
    { step: 0, distance: 0.0, time: 0 }
  );

  const avgStep = exerciseRecords.length
    ? averageExercise.step / exerciseRecords.length
    : 0;
  const avgDistance = exerciseRecords.length
    ? averageExercise.distance / exerciseRecords.length
    : 0;
  const avgTime = exerciseRecords.length
    ? averageExercise.time / exerciseRecords.length
    : 0;

  // (4) 일정 상태 수정 처리 함수
  const toggleTaskChecked = async (index) => {
    let updatedTasks = [...taskItems[selectedDate]];
    let updatedTask = updatedTasks[index];
    updatedTask.checked = !updatedTask.checked;

    try {
      // 백엔드에 변경 사항을 업데이트하고 응답을 받습니다.
      const response = await TaskService.updateTaskCheckStatus(
        jwt,
        updatedTask.listId
      ); // listId를 전달

      if (response.status === 'OK') {
        console.log('일정 수정에 성공하였습니다.');

        // 상태를 업데이트합니다.
        setTaskItems((prev) => ({
          ...prev,
          [selectedDate]: updatedTasks,
        }));
      } else {
        Alert.alert('오류', '일정 수정에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error while updating task:', error);
      Alert.alert('오류', '일정 수정 중 문제가 발생했습니다.');
    }
  };

  // (2) 일정 추가 처리 함수
  const handleAddTask = async () => {
    if (!task.content || task.content.trim() === '') {
      Alert.alert('오류', '일정을 입력해주세요.');
      return;
    }

    try {
      const response = await TaskService.addTask(jwt, selectedDate, task);

      if (response.status === 'OK') {
        Alert.alert('성공', '일정 추가에 성공했습니다.');
        setTaskItems({
          ...taskItems,
          [selectedDate]: [...(taskItems[selectedDate] || []), task],
        });
      } else {
        Alert.alert('오류', '일정 추가에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error while adding task:', error);
      Alert.alert('오류', '일정 추가 중 문제가 발생했습니다.');
    }
    setTask({ listId: null, checked: false, content: '' });
    setDialogVisible(false);
  };

  // 날짜 선택 처리 함수
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  // (1) 일정 조회 처리 (2023-07-27 이수)
  useEffect(() => {
    if (selectedDate) {
      TaskService.getTasks(jwt, selectedDate)
        .then((response) => {
          if (response.status === 'OK') {
            const tasksForTheDay = response.data.map((task) => ({
              listId: task.listId,
              content: task.content,
              checked: task.checked,
            }));

            setTaskItems((prevTaskItems) => ({
              ...prevTaskItems,
              [selectedDate]: tasksForTheDay,
            }));
          } else {
            console.error(response.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });

      // 운동 기록 조회
      const fetchExerciseRecords = async () => {
        const response = await ExerciseRecordService.getAllExerciseRecords(
          jwt,
          selectedDate
        );
        if (response.status === 'OK') {
          setExerciseRecords(response.data);
          const records = response.data.filter((record) => {
            return record.date === selectedDate;
          });
          setRecordsForTheDay(records);
        }
      };

      fetchExerciseRecords();
    }
  }, [selectedDate]);

  // 삭제 확인 다이얼로그 보이기
  const showDeleteDialog = (index) => {
    setSelectedTaskIndex(index);
    setDeleteDialogVisible(true);
  };

  // (3) 작업 삭제 처리 함수
  const handleDeleteTask = async () => {
    try {
      const response = await TaskService.deleteTask(
        jwt,
        taskItems[selectedDate][selectedTaskIndex].listId
      );
      if (response.status === 'OK') {
        Alert.alert('성공', '일정 삭제에 성공했습니다.');
        let itemsCopy = [...(taskItems[selectedDate] || [])];
        itemsCopy.splice(selectedTaskIndex, 1);
        setTaskItems({ ...taskItems, [selectedDate]: itemsCopy });
      } else {
        Alert.alert('오류', '일정 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error while deleting task:', error);
      Alert.alert('오류', '일정 삭제 중 문제가 발생했습니다.');
    }
    setDeleteDialogVisible(false);
  };

  // 운동 기록 자세히 보기
  const navigateToExerciseDetail = () => {
    console.log('운동 기록을 자세히 보기 전에 마지막 정보');
    console.log(exerciseRecords);
    navigation.navigate('ExerciseDetail', {
      exerciseRecords: exerciseRecords,
    });
  };

  return (
    <View style={styles.container}>
      <CalendarView onDateSelect={handleDateSelect} />
      <View style={styles.switchWrapper}>
        <CustomSwitch
          selectionMode={selectedOption}
          option1={'운동 일정'}
          option2={'운동 기록'}
          onSelectSwitch={onSelectSwitch}
          selectionColor={theme.btnBackground}
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        {selectedOption === 1 && selectedDate && (
          <View style={styles.tasksWrapper}>
            <View style={styles.items}>
              {(taskItems[selectedDate] || []).map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onLongPress={() => showDeleteDialog(index)}
                  onPress={() => toggleTaskChecked(index)}>
                  <Task task={item} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
        {selectedOption === 2 && (
          <View style={styles.recordWrapper}>
            <TouchableOpacity onPress={navigateToExerciseDetail}>
              <Text style={styles.detailText}>&lt; 자세히 보기</Text>
              <View style={styles.recordItem}>
                <View style={styles.horizontalContainer}>
                  <View style={styles.individualRecord}>
                    <Text>평균 걸음수</Text>
                    <Text style={styles.valueText}>{avgStep} Step</Text>
                  </View>
                  <View style={styles.individualRecord}>
                    <Text>평균 거리</Text>
                    <Text style={styles.valueText}>{avgDistance} km</Text>
                  </View>
                  <View style={styles.individualRecord}>
                    <Text>평균 시간</Text>
                    <Text style={styles.valueText}>{avgTime} 분</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            {recordsForTheDay.map((record) => (
              <View key={record.id} style={styles.recordAvgItem}>
                <Text>운동 걸음 수: {record.step} Step</Text>
                <Text>진행 거리: {record.distance} km</Text>
                <Text>소요 시간: {record.time} 분</Text>
                <Text>
                  운동 시간: {record.startTime} ~ {record.endTime}
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
      {selectedOption === 1 && (
        <TouchableOpacity
          onPress={() => setDialogVisible(true)}
          style={styles.floatingButton}>
          <Text style={styles.floatingButtonText}>+</Text>
        </TouchableOpacity>
      )}
      <Dialog.Container visible={dialogVisible}>
        <Dialog.Title>일정을 입력해주세요.</Dialog.Title>
        <Dialog.Input
          onChangeText={(text) => setTask({ ...task, content: text })}
          value={task.content}
        />
        <Dialog.Button label="일정 추가" onPress={handleAddTask} />
        <Dialog.Button label="취소" onPress={() => setDialogVisible(false)} />
      </Dialog.Container>
      <Dialog.Container visible={deleteDialogVisible}>
        <Dialog.Title>해당 일정을 삭제하시겠습니까?</Dialog.Title>
        <Dialog.Button label="네" onPress={handleDeleteTask} />
        <Dialog.Button
          label="아니요"
          onPress={() => setDeleteDialogVisible(false)}
        />
      </Dialog.Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  switchWrapper: {
    alignItems: 'center',
    margin: 20,
    marginTop: 10,
    marginBottom: 5,
    marginRight: 10,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  tasksWrapper: {
    paddingHorizontal: 20,
  },
  items: {},
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    margin: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: '#FFF',
    borderRadius: 5,
    borderColor: '#D1D1D1',
    borderWidth: 1,
    width: '90%',
    height: 40,
  },
  floatingButton: {
    backgroundColor: theme.btnBackground,
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButtonText: {
    color: 'white',
    fontSize: 30,
  },
  recordWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  recordTitle: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  recordAvgItem: {
    borderColor: '#ccc',
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },

  recordItem: {
    padding: 10,
    marginBottom: 15,
    marginVertical: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: '#ccc',
    borderColor: '#ccc',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  individualRecord: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  detailText: {
    color: 'gray',
    textAlign: 'right',
  },
});
