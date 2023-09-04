import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import Video from './Video';

function VideoList({ data, type }) {
  const flatListRef = React.useRef(null);
  const [scrollIndex, setScrollIndex] = React.useState(0);

  useFocusEffect(
    React.useCallback(() => {
      // 화면에 focus 되었을 때 호출되는 부분
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          animated: false,
          index: scrollIndex,
        });
      }

      return () => {
        // 화면에서 blur 되었을 때 호출되는 부분
        if (flatListRef.current) {
          const newIndex = flatListRef.current.scrollToIndex({
            animated: false,
            index: 0,
          });
          setScrollIndex(newIndex);
        }
      };
    }, [])
  );

  function renderHelperHandler({ item }) {
    return <Video thumbnail={item.thumbnail} title={item.title} />;
  }

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.typeText}>{type}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={renderHelperHandler}
        keyExtractor={(item) => item.id}
        ref={flatListRef}
      />
    </View>
  );
}

export default VideoList;

const styles = StyleSheet.create({
  rootContainer: {
    padding: 15,
  },
  typeText: {
    color: '#666666',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 5,
  },
});
