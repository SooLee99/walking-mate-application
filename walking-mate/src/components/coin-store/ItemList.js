<<<<<<< HEAD
import { FlatList, StyleSheet } from 'react-native';
import Item from './Item';
=======
import { FlatList, StyleSheet } from "react-native";
import Item from "./Item";
>>>>>>> master

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

<<<<<<< HEAD
const styles = StyleSheet.create({});
=======
const styles = StyleSheet.create({
    
});
>>>>>>> master
