import { FlatList, StyleSheet } from 'react-native';
import Item from './Item';

function ItemList({ data }) {
  function renderHelperHandler(itemData) {
    return <Item {...itemData.item} />;
  }

  return (
    <FlatList
      data={data}
      renderItem={renderHelperHandler}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ItemList;

const styles = StyleSheet.create({});
