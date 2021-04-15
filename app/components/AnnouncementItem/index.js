import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Image, Text} from '@components';

import PropTypes from 'prop-types';
import styles from './styles';
import {useTranslation} from 'react-i18next';

export default function AnnouncementItem(props) {
  const {style, image, name, onPress, description, minorText, bottomElements} = props;
  const {t} = useTranslation();

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
        <Text body2 numberOfLines={3} style={{marginVertical: 10}}>
          {description}
        </Text>
        
        <Text grayColor>{minorText}</Text>
        <View style={styles.bottomElements}>{bottomElements}</View>
      </TouchableOpacity>
    </View>
  );
}

AnnouncementItem.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  minorText: PropTypes.string.isRequired,
  bottomElements: PropTypes.string.isRequired,
};

AnnouncementItem.defaultProps = {
  style: {},
  onPress: () => {},
};
