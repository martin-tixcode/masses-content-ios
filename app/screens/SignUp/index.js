import React, {useState} from 'react';
import {View, KeyboardAvoidingView, Platform, Alert, ScrollView, Text as NativeText} from 'react-native';
import {BaseStyle, useTheme, BaseColor} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Button,
  TextInput,
  Text,
  SubHeader,
} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {validateEmail} from '@utils';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import CheckBox from '@react-native-community/checkbox';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RepositoryFactory} from '@repositories/RepositoryFactory';
import {checkAuth} from '@repositories/Repository';
import {useDispatch} from 'react-redux';
import {AuthActions} from '@actions';

const authRepository = RepositoryFactory.get('auth');

export default function SignUp({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const dispatch = useDispatch();
  // const [firstName, setFirstName] = useState(null);
  // const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [repassword, setRepassword] = useState(null);
  const [toggleCheckBox1, setToggleCheckBox1] = useState(false);
  const [toggleCheckBox2, setToggleCheckBox2] = useState(false);
  const [toggleCheckBox3, setToggleCheckBox3] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState({
    // firstName: true,
    // lastName: true,
    email: true,
    password: true,
    repassword: true,
  });
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const signInWithGoogle = async () => {
    try {
      const hasPlay = await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const tokens = await GoogleSignin.getTokens();
      const accessToken = tokens.accessToken;
      console.log('accessToken', accessToken);
      // TODO: CALL GET TOKEN ENDPOINT API TO REPLACE DUMMY-TOKEN
      // GET TOKEN INFO: https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=
      //authService.getTokenWithGoogle();
      //auth('dummy-token');
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithFacebook = () => {
    LoginManager.logInWithPermissions(['public_profile']).then(
      function(result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const accessToken = data.accessToken.toString();
            // TODO: CALL GET TOKEN ENDPOINT API TO REPLACE DUMMY-TOKEN
            // GET TOKEN INFO: https://graph.facebook.com/?id=10219731834621378&access_token=
            //authService.getTokenWithFacebook();
            auth('dummy-token');
          });
        }
      },
      function(error) {
        console.log(error);
      },
    );
  };

  const sendData = async () => {
    if (
      // firstName !== '' &&
      // lastName !== '' &&
      validateEmail(email) &&
      password !== '' &&
      repassword !== ''
    ) {
      setSuccess({
        // firstName: true,
        // lastName: true,
        email: true,
        password: true,
        repassword: true,
        toggleCheckBox1: true,
        toggleCheckBox2: true,
        toggleCheckBox3: true,
      });
      if (password === repassword) {
        setLoading(true);

        let DTO = {
          // name: firstName,
          // last_name: lastName,
          email,
          password,
        };
        let response = await authRepository.signUp(DTO);
        console.log('response token', response);
        dispatch(
          AuthActions.login(
            {token: response.access_token, preferences: response.user},
            async data => {
              console.log('datadispatch', data);
              await checkAuth();

              setLoading(false);
              // navigation.navigate('BottomTabNavigator');
            },
          ),
        );

        navigation.navigate('Cuentanos');
      } else {
        Alert.alert('', t('new_repassword_not_match'), [{text: 'Aceptar'}]);
      }
    } else {
      setSuccess({
        email: validateEmail(email),
        password: password !== '',
        repassword: repassword !== '',
      });
    }
  };

  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView, {backgroundColor: colors.primary}]}
      forceInset={{top: 'always'}}>
      <View style={{backgroundColor: colors.primary}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('PreSignIn')}
          style={{marginLeft: '70%', marginTop: 10}}>
          <Text headline semibold style={{color: 'white'}}>
            {t('sign_in')}
          </Text>
        </TouchableOpacity>

        <SubHeader title={t('sign_up')} />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        keyboardVerticalOffset={offsetKeyboard}
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}>
        <ScrollView contentContainerStyle={{padding: 20, borderRadius: 20}}>
          {[
            ['email', 'email', setEmail, email, 'example@gmail.com'],
            ['password', 'password', setPassword, password, '******'],
            ['repeat_password', 'repassword', setRepassword, repassword, '******'],
          ].map(input => {
            return (
              <React.Fragment key={input[0]}>
                <View style={styles.contentTitle}>
                  <Text headline semibold primaryColor={!success[input[1]]}>
                    {t(input[0])}
                  </Text>
                </View>
                <TextInput
                  onChangeText={text => input[2](text)}
                  secureTextEntry={input[1] === 'password' || input[1] === 'repassword'}
                  value={input[3]}
                  placeholder={input[4]}
                />
              </React.Fragment>
            );
          })}
          <View style={{flexDirection: 'row', width: '90%', marginTop: 20}}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox1}
              onValueChange={newValue => setToggleCheckBox1(newValue)}
            />
            <View style={{marginLeft: 10}}>
              <Text>
                {t('Pivacy_Policy_check_1')}
                <NativeText style={{color: 'blue'}} onPress={() => navigation.navigate('PrivacyPolicy')}>{t('Pivacy_Policy')}</NativeText>
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', width: '90%', marginTop: 20}}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox2}
              onValueChange={newValue => setToggleCheckBox2(newValue)}
            />
            <View style={{marginLeft: 10}}>
              <Text>
                {t('Pivacy_Policy_check_2')}
                <NativeText style={{color: 'blue'}} onPress={() => navigation.navigate('PrivacyPolicy')}>{t('Pivacy_Policy')}</NativeText>
              </Text>
              {/* <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')}>
                <Text style={{color: 'blue'}}>{t('Pivacy_Policy')}</Text>
              </TouchableOpacity> */}
            </View>
          </View>



          <View style={{flexDirection: 'row', width: '90%', marginTop: 20}}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox3}
              onValueChange={newValue => setToggleCheckBox3(newValue)}
            />
            <View style={{marginLeft: 10}}>
              <Text>
                {t('Pivacy_Policy_check_3')}
                <NativeText style={{color: 'blue'}} onPress={() => navigation.navigate('PrivacyPolicy')}>{t('Pivacy_Policy')}</NativeText>
              </Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', width: '90%', marginTop: 20}}>
            <View>
              <Text>
                You can see our privacy policy
                <NativeText style={{color: 'blue'}} onPress={() => navigation.navigate('PrivacyPolicy')}> here</NativeText>
              </Text>
            </View>
          </View>

          {password != null && repassword != null && toggleCheckBox1 != false && toggleCheckBox2 != false && toggleCheckBox3 != false && (
            <View style={{paddingVertical: 15}}>
              <Button loading={loading} full onPress={() => sendData()}>
                {t('send')}
              </Button>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
