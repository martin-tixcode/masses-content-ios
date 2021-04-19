import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';


export default StyleSheet.create({
  foto: {
    backgroundColor: '#BFBFBF',
    width: 80,
    height: 80,
    margin: 5
  },
  boton: {
      backgroundColor: BaseColor.secondary,
      height: 40,
      width: 150,
      //alignItems:'center',
      borderRadius: 50,
      alignItems: 'baseline',
      color: BaseColor.tertiary
  }

});
