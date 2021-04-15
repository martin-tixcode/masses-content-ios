













'use strict';
import React, {PureComponent} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Video from 'react-native-video';
import camara from '@assets/images/camara.png';
import star from '@assets/images/star.png';
import stop from '@assets/images/stop.png';
import idea from '@assets/images/idea.png';
import noise from '@assets/images/noise.png';
import {BaseSetting} from '@config/setting';
import {RepositoryFactory} from '@repositories/RepositoryFactory';
import {RNS3} from 'react-native-upload-aws-s3';
import {BaseColor} from '@config';

const castingsRepository = RepositoryFactory.get('castings');

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text>Waiting</Text>
  </View>
);



export default class CamaraPhoto extends PureComponent {
  constructor(props) {
    super(props);
    // props.route.params
    this.player = React.createRef();
    this.id = props.route?.params?.id;

    this.state = {
     
      urlVideo: null,
      swiperScreen: 'prim',
      backCamera: true,
      flashCamera: true,
    };
  }

  
//   takePicture = async function() {
//       console.log('acaentro')
//     if (this.camera) {
//         console.log('acaentro')
//       this.camera.takePictureAsync().then(data => {
//         console.log('data: ', data);
//       });
//     }
//   };
  
  
  takePicture = async () => {
    console.log('aca entro')
    
    if (this.camera) {
      console.log('aca tambien')
      
      try {
        console.log('entra al try')
        const options = {quality: 0.5, base64: true};
       
        const promise = await this.camera.takePictureAsync(options);
        console.log('promise', promise)
        if (promise) {
          console.log('entra al if del try')
          const data =  promise;
          
          console.log('data loguea', data);

          this.setState({urlVideo: data.uri});
          console.log(urlVideo);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };


  render() {
    return (
        <View style={styles.container}>
    <RNCamera
     ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
        >
          {({ camera, status, recordAudioPermissionStatus }) => {
            if (status !== 'READY') return <PendingView />;
            return (
              <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
                  <Text style={{ fontSize: 14 }}> SNAP </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </RNCamera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'black',
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    capture: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 20,
      alignSelf: 'center',
      margin: 20,
    },
  });

AppRegistry.registerComponent('App', () => CamaraPhoto);

// <View style={styles.container}>
//         <RNCamera
//           style={styles.preview}
//           type={RNCamera.Constants.Type.back}
//           flashMode={RNCamera.Constants.FlashMode.on}
//           androidCameraPermissionOptions={{
//             title: 'Permission to use camera',
//             message: 'We need your permission to use your camera',
//             buttonPositive: 'Ok',
//             buttonNegative: 'Cancel',
//           }}
//           androidRecordAudioPermissionOptions={{
//             title: 'Permission to use audio recording',
//             message: 'We need your permission to use your audio',
//             buttonPositive: 'Ok',
//             buttonNegative: 'Cancel',
//           }}
//         >
//           {({ camera, status, recordAudioPermissionStatus }) => {
//             if (status !== 'READY') return <PendingView />;
//             return (
//               <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
//                 <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
//                   <Text style={{ fontSize: 14 }}> SNAP </Text>
//                 </TouchableOpacity>
//               </View>

//             );
//           }}
//         </RNCamera>
//       </View>
