import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Image, Text, Button, Icon} from '@components';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import styles from './styles';

import {formatDate} from '@utils';
import {BaseColor, useTheme} from '@config';

export default function OrderItem(props) {
  const {t} = useTranslation();
  const {
    style,
    image,
    name,
    statusName,
    statusId,
    onPress,
    totalPrice,
    products,
    date,
  } = props;
  const {colors} = useTheme();
  OrderItem.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    image: PropTypes.node.isRequired,
    name: PropTypes.string,
    statusName: PropTypes.string,
    statusId: PropTypes.number,
    onPress: PropTypes.func,
    totalPrice: PropTypes.number,
    products: PropTypes.array,
    date: PropTypes.string,
  };

  OrderItem.defaultProps = {
    style: {},
    onPress: () => {},
  };

  const getStatusColor = statusId => {
    switch (statusId) {
      case 1:
        return BaseColor.navyBlue;
      case 2:
        return BaseColor.pinkColor;
      case 3:
        return BaseColor.greenColor;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={[style, styles.orderItem, {borderBottomColor: colors.border}]}>
      <View style={styles.topItem}>
        <Image source={image} style={styles.listImage} />
        <View style={styles.listContentRight}>
          <Text headline semibold numberOfLines={1}>
            {name}
          </Text>
          {statusId > 3 ? (
            <Text body1 grayColor style={styles.underName}>
              {formatDate(date)}
            </Text>
          ) : (
            <Text
              body1
              style={[
                styles.bottomName,
                styles.status,
                {backgroundColor: getStatusColor(statusId)},
              ]}>
              {statusName}
            </Text>
          )}
        </View>
      </View>

      <View style={{marginVertical: 10}}>
        <Text headline numberOfLines={1} style={{marginBottom: 5}}>
          {products.map((product, index) => {
            const item = `${product.product.name} (${product.quantity})`;
            return index > 0 ? ', ' + item : item;
          })}
        </Text>
        <Text headline semibold numberOfLines={1} style={{marginBottom: 10}}>
          Monto total: ${totalPrice}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
