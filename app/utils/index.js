import {
  Platform,
  UIManager,
  LayoutAnimation,
  PixelRatio,
  Dimensions,
  I18nManager,
  Alert,
} from 'react-native';
import RNRestart from 'react-native-restart';
// import messaging from '@react-native-firebase/messaging';
import {store} from 'app/store';
import {AuthActions} from '@actions';
import {PermissionsAndroid} from 'react-native';

const scaleValue = PixelRatio.get() / 2;

export const enableExperimental = () => {
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
};

export const scaleWithPixel = (size, limitScale = 1.2) => {
  /* setting default upto 20% when resolution device upto 20% with defalt iPhone 7 */
  const value = scaleValue > limitScale ? limitScale : scaleValue;
  return size * value;
};

export const agoraRtcEngine = async (
  agoraRtcInstance,
  channelName,
  events,
  clientRole,
  live,
) => {
  if (live) {
    agoraRtcInstance.setChannelProfile(1);
  }
  if (clientRole) {
    agoraRtcInstance.setClientRole(clientRole);
  }
  agoraRtcInstance.setDefaultAudioRoutetoSpeakerphone(true);
  agoraRtcInstance.joinChannel(null, channelName, null, 0); // JOIN CHANNEL USING NULL TOKEN

  agoraRtcInstance.enableVideo();
  agoraRtcInstance.enableAudio();

  //agoraRtcInstance.adjustPlaybackSignalVolume(100); // MUSIC AND VOICE VOLUME FROM ALL USERS. DEFAULT 100

  agoraRtcInstance.addListener('UserJoined', events.handleUserJoined);
  agoraRtcInstance.addListener('UserOffline', events.handleUserOffline);
  agoraRtcInstance.addListener('JoinChannelSuccess', events.handleJoinSucceed);

  return agoraRtcInstance;
};

export const heightHeader = () => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const landscape = width > height;

  if (Platform.OS === 'android') {
    return 45;
  }
  if (Platform.isPad) {
    return 65;
  }
  switch (height) {
    case 375:
    case 414:
    case 812:
    case 896:
      return landscape ? 45 : 88;
    default:
      return landscape ? 45 : 65;
  }
};

export const heightTabView = () => {
  const height = Dimensions.get('window').height;
  let size = height - heightHeader();
  switch (height) {
    case 375:
    case 414:
    case 812:
    case 896:
      size -= 30;
      break;
    default:
      break;
  }

  return size;
};

export const getWidthDevice = () => {
  return Dimensions.get('window').width;
};

export const requestAndroidCameraAndAudioPermission = async (t, navigation) => {
  const showAlert = () => {
    Alert.alert('', t('needs_permission'), [
      {
        text: 'Aceptar',
        onPress: () => {
          navigation.goBack();
        },
      },
    ]);
  };
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]);
    if (
      granted['android.permission.RECORD_AUDIO'] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted['android.permission.CAMERA'] ===
        PermissionsAndroid.RESULTS.GRANTED
    ) {
      return true;
    } else {
      showAlert();
    }
  } catch (err) {
    console.warn(err);
    showAlert();
  }
};

export const getHeightDevice = () => {
  return Dimensions.get('window').height;
};

export const scrollEnabled = (contentWidth, contentHeight) => {
  return contentHeight > Dimensions.get('window').height - heightHeader();
};

export const languageFromCode = code => {
  switch (code) {
    case 'en':
      return 'English';
    case 'vi':
      return 'Vietnamese';
    case 'ar':
      return 'Arabic';
    case 'da':
      return 'Danish';
    case 'de':
      return 'German';
    case 'el':
      return 'Greek';
    case 'fr':
      return 'French';
    case 'he':
      return 'Hebrew';
    case 'id':
      return 'Indonesian';
    case 'ja':
      return 'Japanese';
    case 'ko':
      return 'Korean';
    case 'lo':
      return 'Lao';
    case 'nl':
      return 'Dutch';
    case 'zh':
      return 'Chinese';
    case 'fa':
      return 'Iran';
    case 'km':
      return 'Cambodian';
    default:
      return 'Unknown';
  }
};

export const isLanguageRTL = code => {
  switch (code) {
    case 'ar':
    case 'he':
      return true;
    default:
      return false;
  }
};

export const reloadLocale = (oldLanguage, newLanguage) => {
  const oldStyle = isLanguageRTL(oldLanguage);
  const newStyle = isLanguageRTL(newLanguage);
  if (oldStyle != newStyle) {
    I18nManager.forceRTL(newStyle);
    RNRestart.Restart();
  }
};

export const formatDate = string => {
  var options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  return new Date(string).toLocaleDateString([], options);
};

export const validateEmail = email => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

export const getNotificationsPermission = async () => {
  /*
  let permissionRejected = false;
  const getToken = async () => {
    let fcmToken = store.getState().auth.firebaseToken;
    if (!fcmToken) {
      fcmToken = await messaging().getToken();

      if (fcmToken) {
        // user has a device token
        store.dispatch(AuthActions.setFirebaseToken(fcmToken));
        console.log(fcmToken);
      }
    }
  };

  const requestPermission = async () => {
    try {
      await messaging().requestPermission();
      // User has authorised
      getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
      permissionRejected = true;
    }
  };

  const enabled = await messaging().hasPermission();
  if (enabled) {
    getToken();
  } else {
    await requestPermission();
    if (permissionRejected) {
      return false;
    }
  }

   */
};

/*

export const subscribeNotificationsInApp = messaging().onMessage(
  async message => {
    Alert.alert(message.notification.title, message.notification.body);
  },
);


 */

export const getAnnouncementMinorText = (item, t) => {
  switch (item.statusId) {
    case 1:
      return t('deadline') + ': ' + item.endDate;
    case 2:
    case 4:
    case 5:
      return t('sended') + ': ' + item.sendedDate;
    case 3:
      return t('meeting') + ': ' + item.meetingDate + ' hs.';
    default:
      return t('deadline') + ': ' + item.endDate;
  }
};
