import React, {useState} from 'react';
import {Text, View, Picker, Button, Image, Platform} from 'react-native';
import styles from './styles';
import {Images, BaseColor, useTheme} from '@config';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ScrollView, TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import subir from '@assets/images/subir.png';
import select from '@assets/images/select.png';
import ImagePicker from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

export default function unidoConvoc({navigation, route}) {
  const [id] = useState(route.params?.id);
  const {colors} = useTheme();
  const {t} = useTranslation();
//   const [format] = useState('video/mp4');
  const [screen, setScreen] = useState('prim');

  function renderScreen() {
    switch (screen) {
      case 'prim':
        return (
          <View>
            <Icon
              name="arrow-left"
              size={20}
              style={{color: colors.secondary, padding: 10, marginTop: Platform.OS == 'ios' ? 50 : 0}}
              onPress={() => navigation.goBack()}
            />
            <TouchableOpacity
              style={[styles.cardContainer, {marginTop: '10%'}]}
              onPress={() =>
                // setScreen('sec')
                navigation.navigate('Camara', {id})
              }>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'space-around',
                }}>
                <Image source={subir} style={{marginLeft: '10%', marginTop: '30%'}} />
                <Text style={styles.subTitulo}>{t('record_now')}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.cardContainer]}
              onPress={
                () => setScreen('sec')

                // navigation.navigate('PickerScreen', {id, format, prefix: 'video/'})
              }>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'space-around',
                }}>
                <Image source={select} style={{marginLeft: '5%', marginTop: '30%'}} />
                <Text style={styles.subTitulo}>{t('select_file')}</Text>
              </View>
            </TouchableOpacity>
          </View>
        );

        break;
      case 'sec':
        return (
          <View>
            <Icon
              name="arrow-left"
              size={20}
              style={{color: colors.secondary, padding: 10}}
              onPress={() => navigation.goBack()}
            />
             <TouchableOpacity
              style={[styles.cardContainer]}
              onPress={() =>
                navigation.navigate('PickerScreen', {id, format: 'image/png', prefix:'video/'})
              }>
              <Icon
                name="camera"
                size={25}
                style={{color: colors.tertiary, margin: 5}}
                onPress={() => navigation.goBack()}
              />

              <Text
                style={{
                  color: colors.tertiary,
                  margin: 5,
                  fontWeight: 'bold',
                  fontSize: 20,
                }}>
                {t('Photo')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.cardContainer]}
              onPress={() =>
                navigation.navigate('PickerScreen', {id, format: 'video/mp4', prefix: 'video/'})
              }>
              <Icon
                name="video"
                size={25}
                style={{color: colors.tertiary, margin: 5}}
                onPress={() => navigation.goBack()}
              />

              <Text
                style={{
                  color: colors.tertiary,
                  margin: 5,
                  fontWeight: 'bold',
                  fontSize: 20,
                }}>
                {t('Video')}
              </Text>
            </TouchableOpacity>
          </View>
        );
        break;
      default:
        return (
          <View>
            <Text>Hola miguel</Text>
          </View>
        );
        break;
    }
  }
  return <ScrollView style={styles.container}>{renderScreen()}</ScrollView>;
}
