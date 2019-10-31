import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import CacheImage from "./cache-image.component";

export default PhotoContainer = ({ photoUrl, title }) => {
  return (
    <View style={styles.photoContainer}>
      <CacheImage style={styles.photo} uri={photoUrl} />
      <View style={styles.photoTextContainer}>
        <Text style={styles.photoText}>{title}</Text>
      </View>
    </View>
  );
};

const screenWidth = Math.round(Dimensions.get("window").width);

const styles = StyleSheet.create({
  photoContainer: {
    flex: 1,
    height: screenWidth,
    width: screenWidth,
    shadowOffset: { width: 7, height: 7 },
    shadowColor: "black",
    shadowOpacity: 1.0
  },
  photo: {
    flex: 1,
    borderWidth: 3,
    borderRadius: 20,
    borderColor: "black",
    margin: 10
  },
  photoTextContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: "-45deg" }]
  },
  photoText: {
    textAlign: "center",
    fontSize: 40
  }
});
