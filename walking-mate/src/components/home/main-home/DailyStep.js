import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Circle, Svg } from 'react-native-svg';

import Colors from '../../../themes/color';

function DailyStep({ steps = 0 }) {
  const maxSteps = 1000;
  const circumference = 2 * Math.PI * 130;

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: steps / maxSteps,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [steps]);

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  return (
    <View style={styles.rootContainer}>
      <Svg width="280" height="280" style={{ position: 'absolute' }}>
        <Circle
          cx="140"
          cy="140"
          r="130"
          stroke={Colors.primary400}
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </Svg>
      <Text style={styles.number}>{steps}</Text>
      <FontAwesome5 name="walking" size={50} color={Colors.primary400} />
      <Text style={styles.stepText}>steps</Text>
    </View>
  );
}

export default DailyStep;

const styles = StyleSheet.create({
  rootContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 280,
    width: 280,
    borderRadius: 140,
    backgroundColor: '#FFF',
    position: 'relative',
  },
  number: {
    color: '#FFB700',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  stepText: {
    marginTop: 5,
    color: '#FFB700',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
