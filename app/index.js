import React, {useState, useEffect} from 'react';
import {store, persistor} from 'app/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Navigator from './navigation';
import {Alert} from 'react-native';
// import messaging from '@react-native-firebase/messaging';
// import PushNotification from 'react-native-push-notification';
import {RepositoryFactory} from '@repositories/RepositoryFactory';
import {AuthActions} from '@actions';
import {useDispatch} from 'react-redux';

console.disableYellowBox = true;

export default function App() {
  // const [userToken, setUserToken] = useState('')
  // const dispatch = useDispatch();

  /*

  // function notificationConfig() {
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {},

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);

      // process the notification

      // (required) Called when a remote is received or opened, or local notification is opened
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
      console.log('ACTION:', notification.action);
      console.log('NOTIFICATION:', notification);

      // process the action
    },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    requestPermissions: true,
  });
  // }

  function testPush() {
    PushNotification.localNotification({
      title: 'My Notification Title', // (optional)
      message: 'My Notification Message', // (required)
    });
    // Alert.alert('entra al testPush')
  }

  */

  useEffect(() => {
    // Alert.alert('entran a los alert del use')
    //testPush()
    /*

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('entra al mensaje');
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;


     */
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigator />
      </PersistGate>
    </Provider>
  );
}
