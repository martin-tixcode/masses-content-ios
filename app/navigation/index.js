import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useTheme, BaseSetting} from '@config';
import SplashScreen from 'react-native-splash-screen';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {useSelector} from 'react-redux';

/* Main Stack Navigator */
import Main from 'app/navigation/main';
/* Modal Screen only affect iOS */
import Loading from '@screens/Loading';
import Filter from '@screens/Filter';
// import AddProduct from '@screens/AddProduct';

// import MyPreferences from '@screens/MyPreferences';
import DatosScreen from '@screens/DatosPerfil'
import InteresesScreen from '@screens/Intereses'
import InteresesRegistroScreen from '@screens/InteresesRegistro'
import NotificacionesScreen from '@screens/Notificaciones';
import unidoConvocScreen from '@screens/unidoConvoc';
import PickerScreen from '@screens/PickerScreen';
import SubirContenidoScreen from '@screens/SubirContenido';
import CamaraScreen from '@screens/Camara';
import CamaraPhoto from '@screens/camaraPhoto';
import BoardingScreen from '@screens/Boarding';
import SignUpScreen from '@screens/SignUp';
import ConfiguracionScreen from '@screens/Configuracion';
import Confirmation from '@screens/Confirmation';
import PrivacyPolicy from '@screens/PrivacyPolicy';
import TermsConds from '@screens/TermsConds';




const RootStack = createStackNavigator();

export default function Navigator() {
  const storeLanguage = useSelector(state => state.application.language);
  const {theme, colors} = useTheme();

  const forFade = ({current, closing}) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  useEffect(() => {
    i18n.use(initReactI18next).init({
      resources: BaseSetting.resourcesLanguage,
      lng: storeLanguage ?? BaseSetting.defaultLanguage,
      fallbackLng: BaseSetting.defaultLanguage,
    });
    SplashScreen.hide();
    StatusBar.setBackgroundColor(colors.primary, true);
    StatusBar.setBarStyle('light-content', true);
  });

  return (
    <NavigationContainer theme={theme}>
      <RootStack.Navigator mode="modal" headerMode="none" initialRouteName="Loading">

        <RootStack.Screen
          name="Loading"
          component={Loading}
          options={{gestureEnabled: false}}
        />
        <RootStack.Screen name="Main" component={Main} />
        <RootStack.Screen name="Filter" component={Filter} />
        <RootStack.Screen name="Datos" component={DatosScreen} />
        <RootStack.Screen name="Intereses" component={InteresesScreen} />
        <RootStack.Screen name="InteresesRegistro" component={InteresesRegistroScreen} />
        <RootStack.Screen name="Notificaciones" component={NotificacionesScreen} />
        <RootStack.Screen name="unidoConvoc" component={unidoConvocScreen} />
        <RootStack.Screen name="SubirContenido" component={SubirContenidoScreen} />
        <RootStack.Screen name="PickerScreen" component={PickerScreen} />
        <RootStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <RootStack.Screen name="TermsConds" component={TermsConds} />
        <RootStack.Screen name="Camara" component={CamaraScreen} />
        <RootStack.Screen name="camaraPhoto" component={CamaraPhoto} />
        <RootStack.Screen name="Confirmation" component={Confirmation} />
        <RootStack.Screen name="Boarding" component={BoardingScreen} />
        <RootStack.Screen name="SignUp" component={SignUpScreen} />
        <RootStack.Screen name="Configuracion" component={ConfiguracionScreen} />
        
     
        
        
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
