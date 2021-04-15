import {StyleSheet} from 'react-native';
import * as Utils from '@utils';

export default StyleSheet.create({
  contain: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    height: '100%',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 17,
  },

  wrapper: {
    width: '100%',
    height: 350,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  textSlide: {
    marginTop: 30,
  },
});
