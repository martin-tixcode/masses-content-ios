import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Platform,
  ImageBackground,
  Image,
  ScrollView,
  Alert,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import {
  SafeAreaView,
  //   FloatingWords,
  //   Icon,
  //   Button,
  //   BattleTimer,
  Text,
  SubHeader,
} from '@components';
import { useTheme, BaseSetting, Images } from '@config';
import * as Utils from '@utils';
// import styles from './styles';
import { useTranslation } from 'react-i18next';
import RtcEngine, { RtcLocalView, RtcRemoteView } from 'react-native-agora';
import KeepAwake from 'react-native-keep-awake';

import { RepositoryFactory } from '@repositories/RepositoryFactory';
import { useSelector } from 'react-redux';
import switchCamera from '../../assets/images/switchCamera.png';

const videoCallRepository = RepositoryFactory.get('videocall');

export default function CallId({ navigation, route }) {
  const LocalView = RtcLocalView.SurfaceView;
  const RemoteView = RtcRemoteView.SurfaceView;

  const agoraRtcEngine = useRef();
  const timeoutGoBack = useRef();
  //   const userData = useSelector(state => state.auth);

  const { t } = useTranslation();
  const { colors } = useTheme();
  const [appId, setAppId] = useState(BaseSetting.agoraAppId);
  const [peerIds, setPeerIds] = useState([1]);
  const [showViews, setShowViews] = useState(false);
  //const [agoraChannel, setAgoraChannel] = useState(null);
  const [textView, setTextView] = useState('');
  const [validChanell, setValidChanell] = useState(false);
//  const [waiting, setWaiting] = useState(false)

  const endCall = async () => {
    let data = {
      videocall_title: textView.toUpperCase(),
    };
    await videoCallRepository.endCall(data);
    agoraRtcEngine.current.removeAllListeners();
    agoraRtcEngine.current.leaveChannel();
    agoraRtcEngine.current.destroy();
    setShowViews();
    setTextView('');
  };

  const enterCall = async channel => {

    let data = {
      videocall_title: channel,
    };

    console.log('object', data)

    let response = await videoCallRepository.joinCall(data);


    /*if (Platform.OS === 'android') {
      requestAndroidCameraAndAudioPermission();
    } else {
      console.log('android');
    }*/

    if (!response) {
      Alert.alert('Ingrese un canal valido');
      return console.log('false');
    } else if (response == 'Wait for the host') {
      Alert.alert('Wait for the host');
      return console.log('false');
    } else {

      console.log('pase igual');
      setValidChanell(response);

      const requestAndroidCameraAndAudioPermission = async () => {
        const permissionsEnabled = await Utils.requestAndroidCameraAndAudioPermission(
            t,
            navigation,
        );
        if (permissionsEnabled) {
          console.log('useEfect');
        }
      };

      initCall(channel);

    }

    function handleUserJoined(data) {
      console.log('peer joined: ', data);
      if (peerIds.indexOf(data) === -1) {
        setPeerIds(currentState => [...currentState, data]);
      }
    }

    function handleUserOffline() {
      console.log(' console.log(timeoutGoBack.current)', timeoutGoBack.current);
      if (timeoutGoBack.current === undefined) {
        timeoutGoBack.current = setTimeout(() => {
          // setShowViews(false)
          // navigation.goBack();
          endCall();
        }, 2000);
      } else {
        endCall();
      }
    }

    function handleJoinSucceed() {

      setShowViews(true);
    }

    async function initCall(channelName) {
      agoraRtcEngine.current = await RtcEngine.create(appId);

      const events = {
        handleUserJoined,
        handleUserOffline,
        handleJoinSucceed,
      };
      Utils.agoraRtcEngine(agoraRtcEngine.current, channelName, events, null, false);
    }

    return () => {
      if (agoraRtcEngine.current) {
        agoraRtcEngine.current.removeAllListeners();
        agoraRtcEngine.current.leaveChannel();
        agoraRtcEngine.current.destroy();
      }

      //   if (timeoutGoBack.current) clearTimeout(timeoutGoBack.current);
    };

  };

  const FadeInView = props => {
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 10000,
      }).start();
    }, [fadeAnim]);

    return (
        <Animated.View // Special animatable View
            style={{
              ...props.style,
              opacity: fadeAnim, // Bind opacity to animated value
            }}>
          {props.children}
        </Animated.View>
    );
  };

  return (
      <View style={{ flex: 1 }}>
        <KeepAwake />

        {/* {waiting && <View style={{backgroundColor: '#5663A9'}}>
          <SubHeader title={'The Masses Eye'} style={{marginTop: '-50%'}} />
          <View
            style={{
              backgroundColor: 'white',
              borderTopEndRadius: 20,
              borderTopLeftRadius: 20,
              justifyContent:  'center',
              alignItems:'center',
            }}>
            <View style={{margin: 20, }}>
              <View style={{marginTop: '20%',backgroundColor: 'white', flex:1}}>
              <Text style={{fontWeight: 'bold', fontSize: 30}}>
                Waiting for the host
              </Text>

                <FadeInView style={{width: 250, height: 50, alignSelf:'center', marginTop: '10%'}}>
                  <Image
                    style={{width: 200, height: 200, resizeMode: 'contain', alignSelf:'center'}}

                    source={require('../../assets/images/MassesLogo.png')}
                  />
                </FadeInView>
              </View>

            </View>
          </View>
        </View>} */}

        {!showViews && (


            <View style={{ backgroundColor: '#5663A9' }}>

              <SubHeader title={'The Masses Eye'} style={{ marginTop: '-50%' }} />

              <View
                  style={{
                    backgroundColor: 'white',
                    borderTopEndRadius: 20,
                    borderTopLeftRadius: 20,
                    justifyContent: 'center',
                  }}>
                <View style={{ margin: 20 }}>
                  <TextInput
                      style={{ backgroundColor: '#f6f6f6', height: 50,borderRadius: 5 }}
                      placeholder="Call ID"
                      defaultValue={textView}
                      onChangeText={text => setTextView(text)}
                  />

                  <TouchableOpacity
                      style={{
                        backgroundColor: colors.secondary,
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignContent: 'center',
                        width: 150,
                        height: 50,
                        borderRadius: 40,
                        margin: 20,
                        marginLeft: '50%',
                        justifyContent: 'center',
                      }}
                      onPress={() => enterCall(textView.toUpperCase())}>
                    <Text style={{ color: colors.tertiary }} bold>
                      {t('enter')}
                    </Text>
                    <Icon name="phone" size={15} style={{ color: colors.tertiary, padding: 10 }} />
                  </TouchableOpacity>

                </View>
              </View>
            </View>
        )}

        {/* {showViews && ( */}
        {showViews && (
            <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always' }}>
              <RemoteView
                  zOrderMediaOverlay={true}
                  style={{
                    flex: 0,
                    width: 150,
                    height: 150,
                    marginTop: '5%',
                    marginLeft: '60%',
                  }}
                  uid={peerIds[peerIds.length - 1]}
                  renderMode={1}
              />
              <LocalView
                  style={{ flex: 1, height: '100%', marginTop: '-50%' }}
                  cameraType={'back'}
                  zOrderMediaOverlay={false}
                  uid={1}
                  renderMode={1}
              />
              <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    height: '10%',
                    backgroundColor: 'white',
                    alignContent: 'center',
                    alignItems: 'center',
                  }}>
                <TouchableOpacity
                    onPress={() => agoraRtcEngine.current.switchCamera()}
                    style={{ alignSelf: 'center', marginLeft: '5%' }}>
                  <Image
                      style={{ width: 35, height: 35, padding: 10, resizeMode: 'contain' }}
                      size={10}
                      source={require('../../assets/images/switchCamera.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => endCall()}
                    style={{ alignSelf: 'center', marginLeft: '40%' }}>
                  <Icon
                      name="phone-slash"
                      size={35}
                      style={{
                        color: 'red',
                      }}
                  />
                </TouchableOpacity>
              </View>

              {/* <Text style={{backgroundColor: 'red'}}>{agoraChannel}</Text>


          <View style={{flex: 1}}>
            <View
              style={{
                flex: 1,
                zIndex: 2,
                height: 150,
                width: 150,
                position: 'absolute',
                right: '5%',
                top: '5%',
              }}>
              <RemoteView style={{}} uid={2} renderMode={10} />
            </View>
            <View style={{flex: 1, height: '100%', zIndex:1,}}>

              <LocalView
                style={{flex: 1, height: '100%'}}
                uid={1}
                zOrderMediaOverlay={false}
                renderMode={1}
              />
            </View>
          </View>
          <TouchableOpacity style={{width: 100,
              height: 100,

              borderRadius: 100,
              backgroundColor: 'white',
              zIndex: 100,
              alignContent:'center',
              alignItems:'center',
              bottom: 10,
              alignSelf: 'center',



             }} onPress={() => endCall()}>
              <Icon

            name="phone"
            size={35}
            style={{color: 'red',marginTop:'50%',transform: [{  rotate: '230deg' }] }}
            onPress={() => navigation.goBack()}
          />
            </TouchableOpacity> */}
            </SafeAreaView>
        )}
      </View>
  );
}
