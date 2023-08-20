import React from "react";
import { FlatList, StyleSheet } from "react-native";
import Comment from "./Comment"; // Import the Comment component

function CommentList({ comments }) {
  return (
    <FlatList
      data={comments}
      keyExtractor={(item) => item.id.toString()} // Assuming each comment has a unique id
      renderItem={({ item }) => <Comment comment={item} />}
    />
  );
}

export default CommentList;

const styles = StyleSheet.create({
  
});
