import React, {useState} from 'react';
import {Text, View, Picker, Button, Platform} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {Images, BaseColor, useTheme} from '@config';
import {color} from 'react-native-reanimated';
import {useTranslation} from 'react-i18next';

export default function unidoConvoc({navigation, route}) {
  const [pais, setPais] = useState('Select');
  const [sexo, setSexo] = useState('Select');
  const [datos, setstate] = useState(route.params?.announcementData?.id);
  const {colors} = useTheme();
  const {t} = useTranslation();

  return (
    <ScrollView style={styles.container}>
      <Icon
        name="arrow-left"
        size={20}
        style={{color: colors.secondary, padding: 10, marginTop: Platform.OS == 'ios' ? 50 : null}}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.cardContainer}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'space-around',
          }}>
          <Text style={styles.titulo}>{t('join_casting')}</Text>
          <TouchableOpacity
            style={styles.boton}
            onPress={() =>
              navigation.navigate('SubirContenido', {
                id: route.params?.announcementData?.id,
              })
            }>
            <Text
              style={{
                color: colors.tertiary,
                marginTop: '5%',
                fontWeight: 'bold',
              }}>
              {t('upload_video')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('BottomTabNavigator')}>
            <Text
              style={{
                color: colors.tertiary,
                marginBottom: '5%',
                fontWeight: 'bold',
              }}>
              {t('upload_later')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
