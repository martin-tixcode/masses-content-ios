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

export default class Camara extends PureComponent {
  constructor(props) {
    super(props);
    // props.route.params
    this.player = React.createRef();
    this.id = props.route?.params?.id;

    this.state = {
      swiperVisble: 'si',
      cameraType: 'video/',
      cameraTypeVisible: 'no',
      urlVideo: null,
      swiperScreen: 'prim',
      backCamera: true,
      flashCamera: true,
    };
  }

  takeVideo = async () => {
    this.setState({cameraTypeVisible: 'no'});
    if (this.camera) {
      try {
        const options = {
          quality: 0.5,
          videoBitrate: 8000000,
          maxDuration: 12000000,
        };
        const promise = this.camera.recordAsync(options);
        console.log('promise', promise);
        if (promise) {
          this.setState({recording: true});
          const data = await promise;
          console.log(data.uri);

          this.setState({recording: false, urlVideo: data.uri});
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  //stop the recording by below method
  stoprec = async () => {
    await this.camera.stopRecording();
  };

  takePicture = async () => {
    console.log('aca entro');

    if (this.camera) {
      console.log('aca tambien');
      console.log('thisCamara', this.camera.takePictureAsync());
      try {
        console.log('entra al try');
        const options = {quality: 0.5, base64: true};

        const promise = this.camera.takePictureAsync(options);
        console.log('promise', promise);
        if (promise) {
          console.log('entra al if del try');
          const data = await promise;

          console.log('data loguea', data);

          this.setState({urlVideo: data.uri});
          console.log(urlVideo);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // takePicture = async () => {
  //   console.log('aca entro')
  //   if (this.camera) {
  //     console.log('aca tambien')
  //     const options = { quality: 0.5, base64: true };
  //     console.log('options', options)
  //     const data = this.camera.takePictureAsync(options);
  //     console.log('data loguea', data.uri);

  //   }
  // };

  sendData = async () => {
    this.stoprec.bind(this);

    const file = {
      // `uri` can also be a file system path (i.e. file://)
      uri: this.state.urlVideo,
      name: Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, '')
        .substr(0, 15),
      type: 'video/mp4',
    };

    console.log('aws', BaseSetting);
    const options = {
      keyPrefix: 'video/',
      bucket: BaseSetting.AWS_BUCKET,
      region: BaseSetting.AWS_DEFAULT_REGION,
      accessKey: BaseSetting.AWS_ACCESS_KEY_ID,
      secretKey: BaseSetting.AWS_SECRET_ACCESS_KEY,
      successActionStatus: 201,
    };

    try {
      const response = await RNS3.put(file, options);
      if (response.status === 201) {
        console.log('body', response);
        console.log('Success: ', response.body);
        let form = {
          casting_id: this.id,
          url_video: response.body.postResponse.location,
        };

        await castingsRepository.sendVideo(form);
        Alert.alert('Your content was uploaded successfully!');
        /**
         * {
         *   postResponse: {
         *     bucket: "your-bucket",
         *     etag : "9f620878e06d28774406017480a59fd4",
         *     key: "uploads/image.png",
         *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
         *   }
         * }
         */
      } else {
        console.log('Failed to upload image to S3: ', response);
      }
    } catch (error) {
      console.log(error);
    }

    // console.log('letDatus', response);
  };

  renderSwiper() {
    switch (this.state.swiperScreen) {
      case 'prim':
        return (
          <View style={styles.slide1}>
            <Icon
              name="times"
              size={20}
              color="grey"
              style={{marginTop: '-10%', marginLeft: '80%'}}
              onPress={() =>
                this.setState({swiperVisble: 'no', cameraTypeVisible: 'si'})
              }
            />
            <Image source={camara} style={{margin: 20}} />
            <Text style={styles.text}>
              Please pay attention {'\n'}
              to framing and lenght {'\n'}
              suggested in the call description
            </Text>
            <TouchableOpacity
              style={styles.botonNext}
              onPress={() => {
                this.setState({swiperScreen: 'sec'});
              }}>
              <Text
                bold
                style={{
                  alignSelf: 'center',
                  marginTop: '5%',
                  color: BaseColor.tertiary,
                  fontWeight: 'bold',
                }}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
        );

        break;
      case 'sec':
        return (
          <View style={styles.slide1}>
            <Icon
              name="times"
              size={20}
              color="grey"
              style={{marginTop: '-20%', marginLeft: '80%'}}
              onPress={() =>
                this.setState({swiperVisble: 'no', cameraTypeVisible: 'si'})
              }
            />
            <Image source={star} style={{margin: 20}} />

            <Text style={styles.text}>
              Take advantage {'\n'}
              of nature light {'\n'}
              for good lighting!
            </Text>

            <TouchableOpacity
              style={styles.botonNext}
              onPress={() => {
                this.setState({swiperScreen: 'terc'});
              }}>
              <Text
                bold
                style={{
                  alignSelf: 'center',
                  marginTop: '5%',
                  color: BaseColor.tertiary,
                  fontWeight: 'bold',
                }}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
        );
        break;
      case 'terc':
        return (
          <View style={styles.slide1}>
            <Icon
              name="times"
              size={20}
              color="grey"
              style={{marginTop: '-20%', marginLeft: '80%'}}
              onPress={() =>
                this.setState({swiperVisble: 'no', cameraTypeVisible: 'si'})
              }
            />
            <Image source={noise} style={{margin: 20}} />

            <Text style={styles.text}>
              Find a quiet place{'\n'}
              and avoid outside noises
            </Text>

            <TouchableOpacity
              style={styles.botonNext}
              onPress={() => {
                this.setState({swiperScreen: 'cuart'});
              }}>
              <Text
                bold
                style={{
                  alignSelf: 'center',
                  marginTop: '5%',
                  color: BaseColor.tertiary,
                  fontWeight: 'bold',
                }}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
        );
        break;
      case 'cuart':
        return (
          <View style={styles.slide1}>
            <Icon
              name="times"
              size={20}
              color="grey"
              style={{marginTop: '-30%', marginLeft: '80%'}}
              onPress={() =>
                this.setState({swiperVisble: 'no', cameraTypeVisible: 'si'})
              }
            />
            <Image source={stop} style={{margin: 20}} />
            <Text style={styles.text}>
              Pay attention not to have{'\n'}
              third parties logos or brands{'\n'}
              in the frame or the scene
            </Text>

            <TouchableOpacity
              style={styles.botonNext}
              onPress={() => {
                this.setState({swiperScreen: 'quint'});
              }}>
              <Text
                bold
                style={{
                  alignSelf: 'center',
                  marginTop: '5%',
                  color: BaseColor.tertiary,
                  fontWeight: 'bold',
                }}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
        );
        break;
      case 'quint':
        return (
          <View style={styles.slide1}>
            <Icon
              name="times"
              size={20}
              color="grey"
              style={{marginTop: '5%', marginLeft: '80%'}}
              onPress={() =>
                this.setState({swiperVisble: 'no', cameraTypeVisible: 'si'})
              }
            />
            <Image source={idea} style={{margin: 5}} />
            <Text style={styles.text}>
              Your creativity will be{'\n'}
              valuable, we want{'\n'}
              real content so{'\n'}
              Be real!
            </Text>
            <TouchableOpacity
              style={styles.boton}
              onPress={() =>
                this.setState({swiperVisble: 'no', cameraTypeVisible: 'si'})
              }>
              <Text style={{color: 'white', marginLeft: '35%', marginTop: '5%'}}>
                Start
              </Text>
            </TouchableOpacity>
          </View>
        );
        break;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={
            this.state.backCamera
              ? RNCamera.Constants.Type.back
              : RNCamera.Constants.Type.front
          }
          flashMode={
            this.state.flashCamera
              ? RNCamera.Constants.FlashMode.on
              : RNCamera.Constants.FlashMode.off
          }
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({barcodes}) => {}}
          captureAudio={true}>
          {this.state.urlVideo && (
            <View
              style={{
                alignSelf: 'center',
                marginTop: '30%',
                height: '50%',
                justifyContent: 'center',
                flexDirection: 'column',
                alignContent: 'space-around',
                alignItems: 'center',
                borderRadius: 10,
                backgroundColor: 'white',
                position: 'absolute',

                top: 0,
                bottom: 0,
              }}>
              <Video
                source={{uri: this.state.urlVideo}}
                ref={this.player}
                style={{width: 200, height: 200, marginTop: '10%'}}
                resizeMode="cover"
              />

              <TouchableOpacity
                style={styles.boton}
                onPress={() => {
                  this.sendData(), this.props.navigation.navigate('Confirmation');
                }}>
                <Text
                  bold
                  style={{
                    alignSelf: 'center',
                    marginTop: '5%',
                    color: BaseColor.tertiary,
                    fontWeight: 'bold',
                  }}>
                  Send
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({urlVideo: null}),
                    this.setState({cameraTypeVisible: 'si'});
                }}>
                <Text
                  style={{alignSelf: 'center', fontWeight: 'bold', color: '#343D55'}}>
                  Repeat Capture
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {this.state.cameraTypeVisible == 'si' && (
            <View style={styles.cameraType}>
              <TouchableOpacity
                style={{margin: 15}}
                onPress={() =>
                  this.props.navigation.navigate('PickerScreen', {
                    id: this.id,
                    format: 'image/png',
                    prefix: 'video/',
                    picker: 'camera/',
                  })
                }>
                {/* this.props.navigation.navigate('camaraPhoto') */}
                <Icon
                  name="camera"
                  solid
                  size={25}
                  color={
                    this.state.cameraType == 'photo/' ? BaseColor.secondary : 'black'
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{margin: 15}}
                onPress={() => this.setState({cameraType: 'video/'})}>
                <Icon
                  name="video"
                  solid
                  size={25}
                  color={
                    this.state.cameraType == 'video/' ? BaseColor.secondary : 'black'
                  }
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{margin: 15}}
                onPress={() =>
                  this.setState(prevState => ({
                    backCamera: !prevState.backCamera,
                  }))
                }>
                <Icon name="sync-alt" solid size={25} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{margin: 15}}
                onPress={() =>
                  this.setState(prevState => ({
                    flashCamera: !prevState.flashCamera,
                  }))
                }>
                <Icon name="bolt" solid size={25} color="black" />
              </TouchableOpacity>
            </View>
          )}

          {this.state.swiperVisble == 'si' && (
            <View style={styles.wrapper}>{this.renderSwiper()}</View>
          )}
          <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
            {this.state.cameraType == 'video/'
              ? this.state.urlVideo == null &&
                this.state.swiperVisble == 'no' &&
                (this.state.recording ? (
                  <TouchableOpacity
                    onPress={this.stoprec.bind(this)}
                    style={styles.capture}>
                    <Icon name="stop-circle" solid size={40} color="black" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={this.takeVideo.bind(this)}
                    style={styles.capture}>
                    <Icon name="video" solid size={40} color="red" />
                  </TouchableOpacity>
                ))
              : this.state.swiperVisble == 'no' && (
                  <TouchableOpacity
                    onPress={this.takePicture.bind(this)}
                    style={styles.capture}>
                    <Icon name="camera" solid size={40} color="black" />
                  </TouchableOpacity>
                )}
          </View>
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
  cameraType: {
    flex: 0,

    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    margin: 10,
    marginBottom: '20%',
    justifyContent: 'space-between',
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
  wrapper: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: '10%',
    width: '90%',
    height: '80%',
  },

  slide1: {
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  text: {
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  boton: {
    backgroundColor: BaseColor.secondary,

    height: 40,
    width: 150,
    alignItems: 'center',
    borderRadius: 50,
    alignItems: 'baseline',
    margin: '10%',
    marginTop: '15%',
  },
  botonNext: {
    backgroundColor: BaseColor.secondary,

    height: 40,
    width: 150,
    alignItems: 'center',
    borderRadius: 50,
    alignItems: 'baseline',
    marginTop: 30,
  },
});

AppRegistry.registerComponent('App', () => Camara);

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
