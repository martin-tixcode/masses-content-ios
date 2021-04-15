import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  product: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  productLeft: {
    flex: 3,
    marginRight: 5,
  },
  productRight: {
    flex: 1,
    marginLeft: 5,
    textAlign: 'right',
  },
  finalPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  switch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  contentButtonBottom: {
    borderTopWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
