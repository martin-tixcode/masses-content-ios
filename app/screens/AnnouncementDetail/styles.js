import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';

export default StyleSheet.create({
  contentBoxTop: {
    padding: 30,
    width: '100%',
    borderRadius: 20,
    marginBottom: 65,
    borderWidth: 0.5,
    shadowOffset: {width: 1.5, height: 1.5},
    shadowOpacity: 1.0,
    elevation: 5,
    
  },
  imgBanner: {
    width: '100%',
    height: 250,
    position: 'absolute',
  },
  marginVertical: {
    marginVertical: 15,
  },
  descriptionAndRange: {
    flexDirection: 'row',
  },
  rangeRow: {width: '35%', flexDirection: 'row', marginLeft: 12},
  requirement: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  button: {height: 50, width: '80%', alignSelf: 'center', marginBottom: 15},
});
