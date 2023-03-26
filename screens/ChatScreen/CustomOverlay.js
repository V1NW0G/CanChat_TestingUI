import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function CustomOverlay({ visible, onPress }) {
  if (!visible) return null;
  
  return (
    <TouchableOpacity style={styles.overlay} onPress={onPress}>
    
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
      },
});
