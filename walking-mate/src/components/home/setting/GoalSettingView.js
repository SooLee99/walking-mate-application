import {
  KeyboardAvoidingView,
  View,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';

import Colors from '../../../themes/color';

function GoalSettingView({ onGoalChange, initialGoalSetting }) {
  const handleDistanceChange = (value) => {
    setGoalSetting((prevSetting) => ({
      ...prevSetting,
      goalDistance: value,
    }));
  };

  const handleTimeChange = (value) => {
    setGoalSetting((prevSetting) => ({
      ...prevSetting,
      goalTime: value,
    }));
  };

  const handleCaloriesChange = (value) => {
    setGoalSetting((prevSetting) => ({
      ...prevSetting,
      goalCalories: value,
    }));
  };

  const [goalSetting, setGoalSetting] = useState({
    goalDistance: initialGoalSetting.goalDistance,
    goalTime: initialGoalSetting.goalTime,
    goalCalories: initialGoalSetting.goalCalories,
  });

  const timeInputRef = useRef(null);
  const caloriesInputRef = useRef(null);

  const handleGoalChange = () => {
    if (onGoalChange) {
      onGoalChange({
        goalDistance: goalSetting.goalDistance,
        goalTime: goalSetting.goalTime,
        goalCalories: goalSetting.goalCalories,
      });
    }
  };

  useEffect(() => {
    setGoalSetting(initialGoalSetting);
  }, [initialGoalSetting]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.infoText}>목표 설정</Text>
      <View style={styles.allInput}>
        <View style={styles.inputContainer}>
          <Text style={styles.detailText}>목표 거리: </Text>
          <TextInput
            style={styles.input}
            placeholder="목표 거리(km)를 입력해주세요."
            keyboardType="numeric"
            onChangeText={handleDistanceChange}
            onBlur={handleGoalChange}
            value={goalSetting.goalDistance}
            returnKeyType="next"
            onSubmitEditing={() => timeInputRef.current.focus()}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.detailText}>목표 시간: </Text>
          <TextInput
            style={styles.input}
            placeholder="목표 시간을 입력해주세요."
            keyboardType="numeric"
            onChangeText={handleTimeChange}
            onBlur={handleGoalChange}
            value={goalSetting.goalTime}
            ref={timeInputRef}
            returnKeyType="next"
            onSubmitEditing={() => caloriesInputRef.current.focus()}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.detailText}>목표 칼로리: </Text>
          <TextInput
            style={styles.input}
            placeholder="목표 칼로리를 입력해주세요."
            keyboardType="numeric"
            onChangeText={handleCaloriesChange}
            onBlur={handleGoalChange}
            value={goalSetting.goalCalories}
            ref={caloriesInputRef}
            returnKeyType="done"
          />
        </View>
      </View>
    </View>
  );
}

export default GoalSettingView;

const styles = StyleSheet.create({
  rootContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: Colors.primary200,
    backgroundColor: Colors.primary200,
  },
  infoText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  allInput: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'flex-start',
  },
  detailText: {
    color: '#ffffff',
    fontWeight: 'bold',
    justifyContent: 'flex-start',
  },
  input: {
    borderWidth: 4,
    borderColor: Colors.primary500,
    borderRadius: 20,
    paddingLeft: 10,
    width: '70%',
    flex: 1,
  },
});
