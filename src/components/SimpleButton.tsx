import React from 'react';
import { Pressable, Text, StyleSheet, useColorScheme } from 'react-native';
import Colors from "../theme/Colors";

interface SimpleButtonProps {
  onPress: () => void;
  title: string;
}

const SimpleButton: React.FC<SimpleButtonProps> = ({ onPress, title }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const colorScheme = isDarkMode ? Colors.dark : Colors.light;

  return (
    <Pressable style={[styles.button, colorScheme.button]} onPress={onPress}>
      <Text style={[styles.buttonText, colorScheme.buttonText]}>{title}</Text>
    </Pressable>
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
