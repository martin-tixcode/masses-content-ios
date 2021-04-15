import {StyleSheet} from 'react-native';
import * as Utils from '@utils';

export default StyleSheet.create({
  listImage: {
    height: Utils.scaleWithPixel(150),
    width: Utils.scaleWithPixel(110),
    borderRadius: 3,
  },
  listContent: {
    flexDirection: 'row',
    borderRadius: 10,
    borderColor: '#E9E9E9',
    borderWidth: 3,
    borderTopWidth: 0,
    padding: 10,
  },
  listContentRight: {
    paddingLeft: 10,
    flex: 1,
    justifyContent: 'center',
  },
  bottomElements: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginTop: 10,
    
  },
});
