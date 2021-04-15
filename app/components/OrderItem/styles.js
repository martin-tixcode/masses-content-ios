import {StyleSheet} from 'react-native';
import * as Utils from '@utils';
export default StyleSheet.create({
  listImage: {
    height: Utils.scaleWithPixel(60),
    width: Utils.scaleWithPixel(80),
    borderRadius: 8,
  },
  listContentRight: {
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  underName: {
    marginTop: 6,
  },
  status: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 7,
  },
  topItem: {flexDirection: 'row', alignItems: 'center'},
  orderItem: {
    marginBottom: 25,
    borderBottomWidth: 1,
  },
});
