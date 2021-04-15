import React, {useState} from 'react';
import {Text, View, Alert, ImageBackground, Image, Picker} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ScrollView, TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import warning from '@assets/images/warning.png';
import {useTheme} from '@config';
import {useTranslation} from 'react-i18next';
import {set} from 'react-native-reanimated';
import {RepositoryFactory} from '@repositories/RepositoryFactory';
import {useSelector} from 'react-redux';

const usersRepository = RepositoryFactory.get('users');

export default function Configuracion({navigation}) {
  const user = useSelector(state => state.auth.preferences);
  const [pantalla, setPantalla] = useState('prim');
  const [TipoCuenta, setTipoCuenta] = useState('Select');
  const [DatosCuenta, setDatosCuenta] = useState('Select');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [success, setSuccess] = useState({
    currentPassword: true,
    newPassword: true,
    repeatPassword: true,
  });
  const {t} = useTranslation();
  const {colors} = useTheme();

  const sendData = async () => {
    if (currentPassword !== '' && newPassword !== '' && repeatPassword !== '') {
      setSuccess({
        currentPassword: true,
        newPassword: true,
        repeatPassword: true,
      });
      if (newPassword === repeatPassword) {
        let response = await usersRepository.newPassword(currentPassword, newPassword);
        console.log('Cambiar contraseña', response);
        if (!response) {
          return Alert.alert('', t('current_password_not_match'), [{text: 'Aceptar'}]);
        }
        Alert.alert('', t('password_change_success'), [
          {
            text: 'Aceptar',
            onPress: () => {
              setPantalla('prim');
            },
          },
        ]);
      } else {
        Alert.alert('', t('new_repassword_not_match'), [{text: 'Aceptar'}]);
      }
    } else {
      setSuccess({
        currentPassword: currentPassword !== '',
        newPassword: newPassword !== '',
        repeatPassword: repeatPassword !== '',
      });
    }
  };

  function renderView() {
    switch (pantalla) {
      case 'prim':
        return (
          <View style={styles.container}>
            <Icon
              name="arrow-left"
              size={20}
              style={{color: colors.secondary, padding: 10}}
              onPress={() => navigation.goBack()}
            />
            <Text style={[styles.titulo, {color: 'white'}]}>Settings</Text>
            <View style={styles.cardContainer}>
              <ScrollView style={{}}>
                <View style={styles.formulario}>
                  <View style={{flexDirection: 'row'}}>
                    {/* <TouchableOpacity style={styles.card} onPress={() => setPantalla('sec')}>
                                        <Icon name="user" size={40} solid style={{ color: colors.primary, padding: 10 }} />
                                        <Text style={styles.subTitulo}>Cuenta</Text>
                                    </TouchableOpacity> */}
                    {!user.google_id ? (
                      <TouchableOpacity
                        style={styles.card}
                        onPress={() => setPantalla('terc')}>
                        <Icon
                          name="lock"
                          size={40}
                          solid
                          style={{color: colors.primary, padding: 10}}
                        />
                        <Text style={styles.subTitulo}>Password</Text>
                      </TouchableOpacity>
                    ) : null}
                    <TouchableOpacity style={styles.card} onPress={() =>  navigation.navigate('PrivacyPolicy')}>
                      <Icon
                        name="shield-alt"
                        size={40}
                        solid
                        style={{color: colors.primary, padding: 10}}
                      />
                      <Text style={styles.subTitulo}>Privacy Policy</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      style={styles.card}
                      onPress={() => navigation.navigate('TermsConds')}>
                      <Icon
                        name="question"
                        size={40}
                        solid
                        style={{color: colors.primary, padding: 10}}
                      />
                      <Text style={styles.subTitulo}>Terms of Use</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        );
      case 'sec':
        return (
          <View style={styles.container}>
            <Icon
              name="arrow-left"
              size={20}
              style={{color: '#b5b4b0', padding: 10}}
              onPress={() => setPantalla('prim')}
            />
            <Text style={[styles.titulo, {color: '#45AACA'}]}>Settings</Text>
            <View style={styles.cardContainer}>
              <ScrollView style={{padding: '5%'}}>
                <View style={styles.formulario}>
                  <Text style={[styles.titulo, {marginLeft: '-3%'}]}>Acount</Text>
                  <Text style={styles.subTitulo}>Language</Text>
                  <View style={styles.input}>
                    <Picker
                      selectedValue={TipoCuenta}
                      style={{height: 50, width: '95%'}}
                      onValueChange={(itemValue, itemIndex) => setTipoCuenta(itemValue)}>
                      <Picker.Item label="Select" value="Select" />
                      <Picker.Item label="Español" value="esp" />
                      <Picker.Item label="Ingles" value="ing" />
                    </Picker>
                  </View>
                  <TouchableOpacity
                    style={[styles.boton, {marginLeft: '55%', marginTop: '20%'}]}
                    onPress={() => setPantalla('prim')}>
                    <Text style={styles.TextoBoton}>Finish</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        );
      case 'terc':
        return (
          <View style={styles.container}>
            <Icon
              name="arrow-left"
              size={20}
              style={{color: colors.secondary, padding: 10}}
              onPress={() => setPantalla('prim')}
            />
            <Text style={[styles.titulo, {color: 'white'}]}>Settings</Text>
            <View style={styles.cardContainer}>
              <ScrollView style={{padding: '5%'}}>
                <View style={styles.formulario}>
                  <Text style={[styles.titulo, {marginLeft: '-3%'}]}>Password</Text>
                  <Text style={styles.subTitulo}>Current password</Text>
                  <TextInput
                    placeholder=""
                    secureTextEntry={true}
                    onChangeText={text => setCurrentPassword(text)}
                    style={styles.input}
                  />
                  <Text style={styles.subTitulo}>New Password</Text>
                  <TextInput
                    placeholder=""
                    secureTextEntry={true}
                    onChangeText={text => setNewPassword(text)}
                    style={styles.input}
                  />
                  <Text style={styles.subTitulo}>Repeat new password</Text>
                  <TextInput
                    placeholder=""
                    secureTextEntry={true}
                    onChangeText={text => setRepeatPassword(text)}
                    style={styles.input}
                  />
                  <TouchableOpacity
                    style={[styles.boton, {marginLeft: '55%', marginTop: '20%'}]}
                    onPress={() => sendData()}>
                    <Text style={styles.TextoBoton}>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        );
      case 'cuart':
        return (
          <View style={styles.container}>
            <Icon
              name="arrow-left"
              size={20}
              style={{color: colors.secondary, padding: 10}}
              onPress={() => setPantalla('prim')}
            />
            <Text style={[styles.titulo, {color: 'white'}]}>Settings</Text>
            <View style={styles.cardContainer}>
              <ScrollView style={{padding: '5%', width: '95%'}}>
                <View>
                  <Text style={styles.titulo}>Terms of Use</Text>
                  <Text style={{}}>
                    Aliquip eu consequat sit ea nostrud.Laborum voluptate sunt consequat
                    quis quis voluptate tempor nostrud labore amet cupidatat. Minim elit
                    eiusmod officia anim. Aliquip magna irure consequat cillum aute
                    adipisicing occaecat laborum proident occaecat in. Excepteur Lorem
                    aliquip proident laboris. Nulla proident cupidatat voluptate anim
                    consectetur eiusmod dolor nisi cupidatat nostrud sint aliqua. Labore
                    ut nulla commodo cupidatat ipsum do culpa minim et aliqua aute
                    incididunt. Ullamco amet consequat tempor duis reprehenderit ipsum
                    consequat aliquip ut Lorem deserunt. Magna culpa ut cupidatat
                    adipisicing commodo incididunt anim in laborum sint ullamco.
                    Cupidatat commodo elit tempor in deserunt voluptate nostrud ut elit
                    ipsum fugiat. Id ullamco do mollit ex do fugiat pariatur. In ipsum
                    nisi occaecat Lorem tempor dolore ea cillum ipsum dolore. Esse qui
                    mollit aute labore id. Mollit eiusmod consectetur veniam occaecat id
                    aliquip eu culpa et exercitation quis do. Pariatur id consequat
                    pariatur ad exercitation laborum pariatur commodo ullamco elit
                    officia esse. Exercitation eu est reprehenderit aliqua occaecat nisi
                    non aliquip.
                  </Text>
                </View>
              </ScrollView>
            </View>
          </View>
        );
        case 'quint':
        return (
          <View style={styles.container}>
            <Icon
              name="arrow-left"
              size={20}
              style={{color: colors.secondary, padding: 10}}
              onPress={() => setPantalla('prim')}
            />
            <Text style={[styles.titulo, {color: 'white'}]}>Settings</Text>
            <View style={styles.cardContainer}>
              <ScrollView style={{padding: '5%', width: '95%'}}>
                <View>
                  <Text style={styles.titulo}>Privacy Policy</Text>
                  <Text style={{}}>
                    Aliquip eu consequat sit ea nostrud.Laborum voluptate sunt consequat
                    quis quis voluptate tempor nostrud labore amet cupidatat. Minim elit
                    eiusmod officia anim. Aliquip magna irure consequat cillum aute
                    adipisicing occaecat laborum proident occaecat in. Excepteur Lorem
                    aliquip proident laboris. Nulla proident cupidatat voluptate anim
                    consectetur eiusmod dolor nisi cupidatat nostrud sint aliqua. Labore
                    ut nulla commodo cupidatat ipsum do culpa minim et aliqua aute
                    incididunt. Ullamco amet consequat tempor duis reprehenderit ipsum
                    consequat aliquip ut Lorem deserunt. Magna culpa ut cupidatat
                    adipisicing commodo incididunt anim in laborum sint ullamco.
                    Cupidatat commodo elit tempor in deserunt voluptate nostrud ut elit
                    ipsum fugiat. Id ullamco do mollit ex do fugiat pariatur. In ipsum
                    nisi occaecat Lorem tempor dolore ea cillum ipsum dolore. Esse qui
                    mollit aute labore id. Mollit eiusmod consectetur veniam occaecat id
                    aliquip eu culpa et exercitation quis do. Pariatur id consequat
                    pariatur ad exercitation laborum pariatur commodo ullamco elit
                    officia esse. Exercitation eu est reprehenderit aliqua occaecat nisi
                    non aliquip.
                  </Text>
                </View>
              </ScrollView>
            </View>
          </View>
        );
    }
  }

  return <View style={styles.container}>{renderView()}</View>;
}
