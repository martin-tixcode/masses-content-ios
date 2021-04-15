import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import {useTheme} from '@config';
import {Text} from '@components';

export default function SubHeader(props) {
  const {colors} = useTheme();

  return (
    <View style={[styles.banner, {backgroundColor: colors.primary}]}>
      <Text title1 semibold  style={{
        color: 'white',
        fontFamily: 'Ubuntu',
        fontSize:25,
        fontWeight: 'bold',}}>
        {props.title}
      </Text>
    </View>
  );
}

SubHeader.propTypes = {
  title: PropTypes.string.isRequired,
};
