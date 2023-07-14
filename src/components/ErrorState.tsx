import React from "react";
import { View, StyleSheet, Text } from "react-native";

import SimpleButton from "./SimpleButton";
import { mainColorBlack } from "../theme/colors";

type ErrorStateProps = {
  onPress: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <Text  style={styles.title}>Error occurred</Text>
      <SimpleButton onPress={onPress} title="Refresh" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: mainColorBlack,
  },
});

export default ErrorState;
