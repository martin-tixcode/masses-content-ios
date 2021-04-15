import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Image, Text, Button, Icon} from '@components';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import styles from './styles';

import {useTheme} from '@config';

export default function Product(props) {
  const {t} = useTranslation();
  const {
    style,
    image,
    name,
    price,
    description,
    onPress,
    editButton,
    quantity,
    deleteButton,
    onPressDelete,
    categoryId,
  } = props;
  const {colors} = useTheme();
  Product.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    image: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    editButton: PropTypes.bool,
    quantity: PropTypes.number,
    deleteButton: PropTypes.bool,
    onPressDelete: PropTypes.func,
    categoryId: PropTypes.number.isRequired,
  };

  Product.defaultProps = {
    style: {},
    editButton: false,
    deleteButton: false,
    onPressDelete: () => {},
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={[styles.listContent, style]}>
      <Image source={image} style={styles.listImage} />
      <View style={styles.listContentRight}>
        <View style={styles.titleRow}>
          <Text headline semibold numberOfLines={1} style={{flex: 5}}>
            {name}
          </Text>
          {deleteButton ? (
            <TouchableOpacity
              hitSlop={{top: 15, left: 15, bottom: 15, right: 15}}
              onPress={onPressDelete}
              style={{flex: 1}}>
              <Icon name="trash-alt" size={22} color={colors.primaryLight} />
            </TouchableOpacity>
          ) : null}
        </View>
        <Text body1 grayColor numberOfLines={2} style={styles.description}>
          {description}
        </Text>
        <View style={styles.listContentRightBottom}>
          <Text title3 semiBold numberOfLines={1}>
            {categoryId === 4 ? `${price} ${t('points')}` : '$' + price}
          </Text>
          {quantity ? (
            <View style={styles.productAdded}>
              <Text headline bold style={styles.productAddedText}>
                {quantity}
              </Text>
            </View>
          ) : null}
          <Button onPress={onPress} style={styles.buttonAdd}>
            {!editButton ? t('add') : t('edit')}
          </Button>
        </View>
      </View>
    </TouchableOpacity>
  );
}
