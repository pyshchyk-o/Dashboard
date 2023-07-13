import React from 'react';
import { TouchableOpacity, Image, StyleSheet, ImageSourcePropType } from "react-native";

type ImageButtonProps = {
  icon: ImageSourcePropType;
  onPress: () => void;
  style?: object;
};

export const ImageButton: React.FC<ImageButtonProps> = ({ icon, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Image source={icon} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    width: 20,
    height: 20,
  },
});
