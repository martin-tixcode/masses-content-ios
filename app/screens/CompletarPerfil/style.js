import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BaseColor.primary,
    width: '100%',
  },

  lista: {
    flexDirection: 'row',
    width: '90%',
    height: '12%',
    alignItems: 'center',
    borderBottomColor: '#b5b4b0',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  porcentaje: {
    width: 100,
    height: 100,
    marginLeft: '10%',
    alignItems: 'center',
  },
  key: {
    width: '35%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    textAlign: 'left',
    alignContent: 'flex-end',
  },
  scroll: {
    width: '100%',

    padding: 10,
  },
  titulo: {
    padding: 15,
    fontFamily: 'Ubuntu',
    fontSize: 25,
    fontWeight: 'bold',
  },
  subTitulo: {
    fontFamily: 'Ubuntu',
    fontSize: 15,

    marginLeft: '-5%',
    padding: 20,
    color: BaseColor.tertiary,
  },
  slideContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 0,
  },
  slide: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: 300,
    height: '80%',
    marginHorizontal: 15,
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,

    marginTop: 10,
  },
});
