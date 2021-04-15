import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, AsyncStorage} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../PerfilHome';
import CompletarPerfil from '../CompletarPerfil';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  ProfilePerformance,
} from '@components';
import InteresesRegistroScreen from '@screens/InteresesRegistro';
import PagosScreen from '@screens/Pagos';
import BoardingScreen from '@screens/Boarding';
import ConfiguracionScreen from '@screens/Configuracion';
import ChatScreen from '@screens/Chat';

import PreSignIn from '@screens/PreSignIn';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
// import {GoogleSignin} from '@react-native-community/google-signin';
/*
import {
  LoginManager as FacebookLoginManager,
  AccessToken as FacebookAccessToken,
} from 'react-native-fbsdk';
*/
import {AuthActions} from '@actions';
import ChangeLanguageScreen from '@screens/ChangeLanguage';

const Drawer = createDrawerNavigator();

export default function Perfil() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {t} = useTranslation();

  useEffect(() => {
    // GoogleSignin.configure();
  }, []);

  const onLogOut = async () => {
    setLoading(true);
    /*

    const isGoogleSignedIn = await GoogleSignin.isSignedIn();
    if (isGoogleSignedIn) {
      googleLogOut();
    }


    FacebookAccessToken.getCurrentAccessToken().then(data => {
      const isFacebookSignedIn = data;

      if (isFacebookSignedIn) {
        FacebookLoginManager.logOut();
      }
    });

    const googleLogOut = async () => {
      try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      } catch (error) {
        console.error(error);
      }
    };

    */

    // CALL LOG OUT ENDPOINT API
    await AsyncStorage.removeItem('auth');
    dispatch(
      AuthActions.logout(() => {
        navigation.navigate('PreSignIn');
      }),
    );
  };

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label={t('sign_out')} onPress={() => onLogOut()} />
          </DrawerContentScrollView>
        );
      }}>
      <Drawer.Screen name={t('home')} component={HomeScreen} />
      {/* <Drawer.Screen name="Completar Perfil" component={CompletarPerfil} /> */}

      {/* <Drawer.Screen name="InteresesRegistro" component={InteresesRegistroScreen} /> */}
      {/* <Drawer.Screen name="Boarding" component={BoardingScreen} /> */}
      <Drawer.Screen name={t('payment')} component={PagosScreen} />
      <Drawer.Screen
        name={t('configuration')}
        component={ConfiguracionScreen}
      />
      {/* <Drawer.Screen name="Chat" component={ChatScreen} /> */}

      {/* <Drawer.Screen name={t('Sign Out')} component={PreSignIn}  onPress={() => onLogOut()}/> */}
    </Drawer.Navigator>
  );
}
