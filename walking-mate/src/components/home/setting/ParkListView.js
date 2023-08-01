import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../../themes/color';
import { KAKAO_AK } from '../../../config/Config';

const ParkListView = ({ location, onSelectedItem }) => {
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const fetchParks = async () => {
    if (!location || !location.coords) {
      console.log('아직 위치를 받지 못했습니다.');
      return;
    }

    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;

    const url = 'https://dapi.kakao.com/v2/local/search/category.json';
    const params = {
      category_group_code: 'AT4',
      page: '1',
      size: '15',
      sort: 'accuracy',
      x: longitude,
      y: latitude,
    };

    const headers = {
      Authorization: KAKAO_AK,
    };

    try {
      const response = await fetch(url + '?' + new URLSearchParams(params), {
        method: 'GET',
        headers: headers,
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        const places = jsonResponse.documents;
        const placeData = places.map((place) => ({
          id: place.id,
          name: place.place_name,
          frontLat: place.y,
          frontLon: place.x,
          fullAddressRoad: place.road_address_name || place.address_name,
        }));
        setData(placeData);
      } else {
        console.error('위치 검색에 실패하였습니다.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectItem = (item) => {
    if (selectedId === item.id) {
      setSelectedId(null);
      if (onSelectedItem) onSelectedItem(null);
      console.log('선택이 취소되었습니다.');
    } else {
      setSelectedId(item.id);
      if (onSelectedItem) onSelectedItem(item);
      console.log('선택된 항목:', item);
    }
  };

  useEffect(() => {
    fetchParks();
  }, [location]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        item.id === selectedId ? styles.selectedItem : null,
      ]}
      onPress={() => handleSelectItem(item)}>
      <Text style={styles.placeName}>{item.name}</Text>
      <Text>{item.fullAddressRoad}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        extraData={selectedId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedItem: {
    backgroundColor: Colors.primary200,
  },
  placeName: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default ParkListView;
