import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function CustomOverlay({ visible, onPress }) {
  if (!visible) return null;
  
  return (
    <TouchableOpacity style={styles.overlay} onPress={onPress}>
      <View style={styles.background} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
    opacity: 0.5,
  },
});
