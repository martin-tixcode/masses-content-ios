import React, {useState, useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import {AuthActions} from '@actions';
import {BaseStyle, useTheme, BaseColor} from '@config';
import {
  Header,
  SafeAreaView,
  Text,
  Button,
  Icon,
  Card,
  SubHeader,
} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import Swiper from 'react-native-swiper';
// import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
// import {LoginManager, AccessToken} from 'react-native-fbsdk';
import SignIn from '../SignIn/index';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {RepositoryFactory} from '@repositories/RepositoryFactory';
import {checkAuth} from '@repositories/Repository';
// import Axios from 'axios';

const authRepository = RepositoryFactory.get('auth');

export default function PreSignIn({navigation}) {
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const [slide] = useState([
    {key: 1, icon: 'shopping-basket', text: t('choose_a_product')},
    {key: 2, icon: 'credit-card', text: t('pay')},
    {key: 3, icon: 'child', text: t('enjoy')},
  ]);

  useEffect(() => {
    // GoogleSignin.configure();
  }, []);

  /*

  const signInWithGoogle = async () => {
    try {
      const hasPlay = await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const tokens = await GoogleSignin.getTokens();
      const accessToken = tokens.accessToken;

      Axios.get(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`,
      )
        .then(async result => {
          email = result.data.email;
          user_id = result.data.user_id;

          let response = await authRepository.getTokenWithGoogle(
            email,
            user_id,
          );

          dispatch(
            AuthActions.login(
              {token: response.access_token, preferences: response.user},
              data => {
                checkAuth();
                // navigation.navigate('BottomTabNavigator');
              },
            ),
          );
        })
        .catch(error => {
          console.error(error);
        });

      // TODO: CALL GET TOKEN ENDPOINT API TO REPLACE DUMMY-TOKEN
      // GET TOKEN INFO: https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=
      //authService.getTokenWithGoogle();
      //auth('dummy-token');
    } catch (error) {
      console.log(error);
    }
    navigation.navigate('Cuentanos');
  };

  const signInWithFacebook = () => {
    LoginManager.logInWithPermissions(['public_profile']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const accessToken = data.accessToken.toString();

            Axios.get(`https://graph.facebook.com/me/?access_token=${accessToken}`)
              .then(async (result) => {
                let user_id = result.data.id;
                let name = result.data.name;

                console.log('response Facebook', result)
                let response = await authRepository.getTokenWithFacebook(name, user_id)

                console.log('response Facebook', response)
                dispatch(
                  AuthActions.login({ token: response.access_token, preferences: response.user }, data => {
                    checkAuth();
                    // navigation.navigate('BottomTabNavigator');
                  }),
                );
              })
              .catch((error) => {
                console.error(error)
              });
            // TODO: CALL GET TOKEN ENDPOINT API TO REPLACE DUMMY-TOKEN
            // GET TOKEN INFO: https://graph.facebook.com/?id=10219731834621378&access_token=
            //authService.getTokenWithFacebook();
            //auth('dummy-token');
          });
        }
      },
      function (error) {
        console.log(error);
      },
    );
  };

  */

  const auth = token => {
    dispatch(
      AuthActions.login({token: token, preferences: [1, 2, 3]}, () => {
        setLoading(false);
        navigation.navigate('BottomTabNavigator');
      }),
    );
  };

  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView, {backgroundColor: colors.primary}]}
      forceInset={{top: 'always'}}>
      <SubHeader title={t('sign_in')} />

      <ScrollView contentContainerStyle={styles.contain}>
        <View style={styles.wrapper}>
          {/* <Button
            style={{ margin: 20, backgroundColor: BaseColor.opaqueRed }}
            onPress={signInWithGoogle}
            icon={
              <Icon
                name="google"
                size={18}
                color="white"
                onPress={() => navigation.openDrawer()}
                style={{ marginRight: 20 }}
              />
            }>
            <Text style={{ color: 'white' }}>{t('Google')}</Text>
          </Button> */}

          {/*<Button
            style={{ margin: 20, backgroundColor: BaseColor.navyBlue }}
            onPress={signInWithFacebook}
            icon={
              <Icon
                name="facebook-f"
                size={18}
                color="white"
                onPress={() => navigation.openDrawer()}
                style={{ marginRight: 20 }}
              />
            }>
            <Text style={{ color: 'white' }}>{t('Facebook')}</Text>
          </Button>*/}
        </View>

        <View style={[styles.wrapper, {marginTop: '-80%'}]}>
          {SignIn({navigation})}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
