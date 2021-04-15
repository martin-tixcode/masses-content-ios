import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Image, Text} from '@components';

import PropTypes from 'prop-types';
import styles from './styles';
export default function PubItem(props) {
  const {style, image, name, onPress, description} = props;

  return (
    <View style={[styles.listContent, style]}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
        <Image source={image} style={styles.listImage} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.listContentRight}
        onPress={onPress}
        activeOpacity={0.9}>
        <Text title3 semibold numberOfLines={1}>
          {name}
        </Text>
        <Text body numberOfLines={3}>
          {description}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

PubItem.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

PubItem.defaultProps = {
  style: {},
  onPress: () => {},
};
