import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonComponentProps {
  title: string;
  onPress: () => void;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#008CBA',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ButtonComponent;
