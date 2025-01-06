import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

export default function Loader() {
  return (
    <View style={styles.loaderContainer}>
      <LottieView
        source={require("./../../assets/images/ani.json")} // Replace with your Lottie file
        autoPlay
        loop
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
