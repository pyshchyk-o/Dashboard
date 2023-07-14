import React from 'react';
import { TouchableOpacity, Text, StyleSheet, useColorScheme } from 'react-native';

import colors from "../theme/colors";

interface SimpleButtonProps {
  onPress: () => void;
  title: string;
}

const SimpleButton: React.FC<SimpleButtonProps> = ({ onPress, title }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const colorScheme = isDarkMode ? colors.dark : colors.light;

  return (
    <TouchableOpacity style={[styles.button, colorScheme.button]} onPress={onPress}>
      <Text style={[styles.buttonText, colorScheme.buttonText]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default SimpleButton;
