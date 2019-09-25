import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Layout } from '../constants/Theme'
import Dash from 'react-native-dash';

const { width } = Layout.window;

export default ItemSeparator = () => (
  <View style={styles.container}>
    <Dash 
        style={styles.dash}
        dashColor={Colors.grey}
        dashThickness={1.5}
    />
  </View>
)

const styles = StyleSheet.create({
  container: {
    alignItems:'center'
  },
  dash: {
      width:width/1.2, 
      height:1,
      marginVertical: 20
  },
})