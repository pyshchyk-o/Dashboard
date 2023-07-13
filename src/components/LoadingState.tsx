import React from "react";
import { View, StyleSheet, ActivityIndicator, useColorScheme } from "react-native";
import { mainColorGreen, mainColorLightGreen } from "../theme/Colors";

const LoadingState: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color={isDarkMode ? mainColorLightGreen : mainColorGreen }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingState;
