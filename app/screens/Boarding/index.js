import React, { useState } from 'react';
import {Text, View, Button, ImageBackground, Image, Platform} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Images, BaseColor, useTheme } from '@config';
import boarding from '@assets/images/boarding.png';
import cameraStick from '@assets/images/cameraStick.png';
import Frame from '@assets/images/Frame.png';
import editUser from '@assets/images/editUser.png';
import { useTranslation } from 'react-i18next';

export default function Boarding({ navigation }) {
  const { t } = useTranslation();
  const [pantalla, setPantalla] = useState('prim');
  const { colors } = useTheme();

  function renderView() {
    switch (pantalla) {
      case 'prim':
        return (
          <View
            style={{
              backgroundColor: colors.primary,
              height: '100%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>

            <Image source={boarding} style={{ marginLeft: '-5%', height: '70%', width: '80%' }} />

            <TouchableOpacity
              style={[
                styles.boton,
                { marginLeft: '15%', width: 200, marginTop: '5%', height: 40 },
              ]}
              onPress={() => setPantalla('sec')}>
              <Text
                style={{
                  height: 20,

                  alignSelf: 'center',
                  fontWeight: 'bold',
                }}>
                {t('join')}
              </Text>
            </TouchableOpacity>
            <View style={{ marginTop: '-7%', flexDirection: 'row' }}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>
                {t('you_have_an_account')}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('PreSignIn')}>
                <Text
                  style={{
                    color: colors.secondary,
                    fontWeight: 'bold',
                  }}>
                  {t('login')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
        break;
      case 'sec':
        return (
          <ScrollView style={{ backgroundColor: colors.primary, height: '100%' }}>
            <View style={{ width: '90%', alignSelf: 'center' }}>

              <View style={styles.navBar}>
                <Icon
                  name="arrow-left"
                  size={20}
                  style={{ color: colors.secondary, padding: 10, marginTop: Platform.OS == 'ios' ? 50 : 0}}
                  onPress={() => setPantalla('prim')}
                />
                <TouchableOpacity onPress={() => setPantalla('cuart')}>
                  <Text style={{ color: colors.secondary, fontWeight: 'bold', marginTop: Platform.OS == 'ios' ? 50 : 0 }}>{t('skip')}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.info}>
                <Image source={cameraStick} style={{ width: 220, height: 220 }} />
                <View style={{ justifyContent: 'flex-start' }}>
                  <Text style={styles.titulo}>{t('Title_boarding_1')}</Text>
                  <Text style={styles.texto}>{t('P_Boarding_1')}</Text>
                </View>

                <TouchableOpacity
                  style={[styles.boton, { marginLeft: '55%' }]}
                  onPress={() => setPantalla('terc')}>
                  <Text
                    style={{
                      height: 20,

                      justifyContent: 'center',
                      alignSelf: 'center',
                      fontWeight: 'bold',
                    }}>
                    {t('next')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        );
        break;
      case 'terc':
        return (
          <ScrollView style={{ backgroundColor: colors.primary, height: '100%' }}>
            <View style={{ width: '90%', alignSelf: 'center' }}>


              <View style={styles.navBar}>
                <Icon
                  name="arrow-left"
                  size={20}
                  style={{ color: colors.secondary, padding: 10,  marginTop: Platform.OS == 'ios' ? 50 : 0}}
                  onPress={() => setPantalla('sec')}
                />
                <TouchableOpacity onPress={() => setPantalla('cuart')}>
                  <Text style={{ color: colors.secondary, fontWeight: 'bold', marginTop: Platform.OS == 'ios' ? 50 : 0 }}>{t('skip')}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.info}>
                <Image source={Frame} style={{ width: 220, height: 220 }} />
                <View style={{ justifyContent: 'flex-start' }}>
                  <Text style={styles.titulo}>{t('Title_boarding_2')}</Text>
                  <Text style={styles.texto}>{t('P_Boarding_2')}</Text>
                </View>

                <TouchableOpacity
                  style={[styles.boton, { marginLeft: '55%' }]}
                  onPress={() => setPantalla('cuart')}>
                  <Text
                    style={{
                      height: 20,

                      justifyContent: 'center',
                      alignSelf: 'center',
                      fontWeight: 'bold',
                    }}>
                    {t('next')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        );
        break;
      case 'cuart':
        return (
          <ScrollView style={{ backgroundColor: colors.primary, height: '100%' }}>
            <View style={{ width: '90%', alignSelf: 'center' }}>



              <View style={styles.navBar}>
                <Icon
                  name="arrow-left"
                  size={20}
                  style={{ color: colors.secondary, padding: 10, marginTop: Platform.OS == 'ios' ? 50 : 0 }}
                  onPress={() => setPantalla('terc')}
                />
              </View>
              <View style={styles.info}>
                <Image source={editUser} style={{ width: 220, height: 220 }} />
                <View style={{ justifyContent: 'flex-start' }}>
                  <Text style={styles.titulo}>{t('Title_boarding_3')}</Text>
                  <Text style={styles.texto}>{t('P_Boarding_3')}</Text>
                </View>

                <TouchableOpacity
                  style={[styles.boton, { marginLeft: '55%' }]}
                  onPress={() => navigation.navigate('SignUp')}>
                  <Text
                    style={{
                      height: 20,

                      justifyContent: 'center',
                      alignSelf: 'center',
                      fontWeight: 'bold',
                    }}>
                    {t('sign_up')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        );
        break;
    }
  }

  return <View style={styles.container}>{renderView()}</View>;
}
