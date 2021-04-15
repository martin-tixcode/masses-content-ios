import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';

export default StyleSheet.create({
  button: {height: 50, width: '80%', alignSelf: 'center', marginBottom: 15},

  bottomModal: {
    margin: 0,
    marginTop: 80,
    justifyContent: 'flex-end',
  },
  contentBottomModal: {
    width: '100%',
    maxHeight: 500,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 20,
  },
  contentSwipeDown: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  lineSwipeDown: {
    width: 30,
    height: 2.5,
    backgroundColor: BaseColor.dividerColor,
  },
});
