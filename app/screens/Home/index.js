import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Alert,
  AsyncStorage,
  RefreshControl,
} from 'react-native';
import {AnnouncementItem, SafeAreaView, SubHeader, Button} from '@components';
import {Images, BaseColor, useTheme} from '@config';
import * as Utils from '@utils';
import {useTranslation} from 'react-i18next';
import {RepositoryFactory} from '@repositories/RepositoryFactory';
import {useSelector, useDispatch} from 'react-redux';
import {checkAuth} from '@repositories/Repository';
import {CastingActions, AuthActions} from '@actions';
import PushNotification from 'react-native-push-notification';

const castingsRepository = RepositoryFactory.get('castings');

export default function Home({navigation}) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const userName = useSelector(state => state.auth.preferences.name);

  let announcements = useSelector(state => state.casting.castings);
  const {colors} = useTheme();

  const [refreshing, setRefreshing] = useState(false);

  // function notificationConfig() {
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      dispatch(AuthActions.setTokenDevice(token));
    },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },
  });

  const wait = timeout => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(1000).then(() => setRefreshing(false));
  }, []);

  const fetchRecentCastings = async () => {
    checkAuth();

    dispatch(CastingActions.getCasting(await castingsRepository.getCastings()));
  };

  useEffect(() => {
    fetchRecentCastings();
  }, []);

  //const [announcements, setAnnouncements] = useState([])
  function androidPermissions() {
    const requestAndroidCameraAndAudioPermission = async () => {
      const permissionsEnabled = await Utils.requestAndroidCameraAndAudioPermission(
        t,
        navigation,
      );
      if (permissionsEnabled) {
        console.log('useEfect');
      }
    };
    if (Platform.OS === 'android') {
      requestAndroidCameraAndAudioPermission();
      //Alert.alert('entra')
    } else {
      console.log('android');
      //Alert.alert('Noentra')
    }
  }

  useEffect(() => {
    androidPermissions();
    const getNotificationsPermission = async () => {
      const hasPermission = await Utils.getNotificationsPermission();

      if (hasPermission === false) {
        Alert.alert('', t('need_notifications_permission'), [
          {
            text: 'Aceptar',
            onPress: () => {
              Utils.getNotificationsPermission();
            },
          },
        ]);
      }
    };

    // getNotificationsPermission();

    // Utils.subscribeNotificationsInApp;

    // return Utils.subscribeNotificationsInApp;

    return null;
  }, []);

  const bottomElements = item => {
    return (
      <Button
        style={{width: '80%'}}
        onPress={() =>
          navigation.navigate('AnnouncementDetail', {announcementData: item})
        }>
        {t('join')}
      </Button>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: colors.primary}}>
      <SafeAreaView
        style={{flex: 1, backgroundColor: colors.primary}}
        forceInset={{top: 'always'}}>
        <View>
          <SubHeader title={t('hello') + ', ' + userName} />
          <View
            style={{
              paddingVertical: 30,
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
              backgroundColor: 'white',
              minHeight: '85%',
            }}>
            <View style={{maxHeight: '90%'}}>
              <ScrollView
                style={{marginBottom: '2%'}}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }>
                <FlatList
                  data={announcements}
                  keyExtractor={(item, index) => item.id.toString()}
                  renderItem={({item, index}) => (
                    <AnnouncementItem
                      image={{uri: item.image}}
                      name={item.title}
                      description={item.description}
                      minorText={t('deadline') + ': ' + item.endDate}
                      style={{margin: 20}}
                      bottomElements={bottomElements(item)}
                      onPress={() => {
                        navigation.navigate('AnnouncementDetail', {
                          announcementData: item,
                        });
                      }}
                    />
                  )}
                />
              </ScrollView>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
