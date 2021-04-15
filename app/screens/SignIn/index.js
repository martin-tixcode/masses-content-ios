import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AuthActions} from '@actions';
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  AsyncStorage,
} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {Header, SafeAreaView, Icon, Text, Button, TextInput} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {RepositoryFactory} from '@repositories/RepositoryFactory';
import {checkAuth} from '@repositories/Repository';
import PushNotification from 'react-native-push-notification';

export default function SignIn({navigation}) {
  const authRepository = RepositoryFactory.get('auth');
  const usersRepository = RepositoryFactory.get('users');
  let tokenDevice = useSelector(state => state.auth.tokenDevice?.token);

  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {colors} = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState({email: true, password: true});
  const [error, setError] = useState('');

  /*

  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      console.log('object,', tokenDevice);
      if (!tokenDevice) {
        dispatch(AuthActions.setTokenDevice(token));
      }
    },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },
  });

   */

  const onLogin = async () => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setError('');
      return setTimeout(() => {
        setError(t('Invalid_email_address'));
      }, 2000);
    }

    if (email === '' || password === '') {
      setSuccess({
        ...success,
        email: false,
        password: false,
      });
    } else {
      let DTO = {
        email,
        password,
        remember_me: true,
      };
      let data = await authRepository.signIn(DTO);

      setLoading(true);
      // DO LOGIN REQUEST
      await AsyncStorage.setItem(
        'auth',
        JSON.stringify({token: data.access_token, preferences: data.user}),
      );

      dispatch(
        AuthActions.login(
          {token: data.access_token, preferences: data.user},
          async data => {
            checkAuth();

            let info = await usersRepository.postToken({token: tokenDevice});
            console.log('logue el Token', tokenDevice);
            console.log('info', info);
            setLoading(false);
            // navigation.navigate('BottomTabNavigator');
          },
        ),
      );
    }
  };

  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });
  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        keyboardVerticalOffset={offsetKeyboard}
        style={{flex: 1}}>
        <View style={styles.contain}>
          <TextInput
            onChangeText={text => setEmail(text)}
            onFocus={() => {
              setSuccess({
                ...success,
                email: true,
              });
            }}
            placeholder={t('email')}
            success={success.email}
            value={email}
          />
          <TextInput
            style={{marginTop: 10}}
            onChangeText={text => setPassword(text)}
            onFocus={() => {
              setSuccess({
                ...success,
                password: true,
              });
            }}
            placeholder={t('password')}
            secureTextEntry={true}
            success={success.password}
            value={password}
          />
          {error !== '' && (
            <Text bold style={{color: 'red', margin: 10}}>
              {error}
            </Text>
          )}

          <Button
            style={{marginTop: 20}}
            full
            loading={loading}
            onPress={() => {
              onLogin();
            }}>
            {t('sign_in')}
          </Button>
          <TouchableOpacity
            onPress={() => navigation.navigate('ResetPassword')}>
            <Text body1 grayColor style={{marginTop: 25, fontSize: 15}}>
              {t('forgot_your_password')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text body1 grayColor style={{marginTop: 25, fontSize: 15}}>
              {t('create_account')}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
