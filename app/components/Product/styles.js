import {StyleSheet} from 'react-native';
import * as Utils from '@utils';
export default StyleSheet.create({
  listImage: {
    height: Utils.scaleWithPixel(60),
    width: Utils.scaleWithPixel(80),
    borderRadius: 8,
  },
  listContent: {
    flexDirection: 'row',
  },
  listContentRight: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    flex: 1,
  },
  listContentRightBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 3,
  },
  buttonAdd: {
    fontSize: 34,
    padding: 6,
    height: 'auto',
  },
  description: {
    marginVertical: 6,
  },
  productAdded: {
    width: 28,
    height: 28,
    borderRadius: 28 / 2,
    backgroundColor: 'white',
  },
  productAddedText: {
    textAlign: 'center',
    color: 'black',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
