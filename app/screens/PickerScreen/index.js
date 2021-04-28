import React, { useState } from 'react';
import {Text, View, Picker, Button, Image, Alert, Platform} from 'react-native';
import styles from './styles';
import { Images, BaseColor, useTheme } from '@config';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import subir from '@assets/images/subir.png';
import select from '@assets/images/select.png';
import ImagePicker from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import { BaseSetting } from '@config/setting';
import { RepositoryFactory } from '@repositories/RepositoryFactory';
import { RNS3 } from 'react-native-upload-aws-s3';
import Video from 'react-native-video';
import { AuthActions } from '@actions';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

const castingsRepository = RepositoryFactory.get('castings');
const usersRepository = RepositoryFactory.get('users');

export default function PickerScreen({ navigation, route }) {
  const [id] = useState(route.params ? route.params.id : null);
  const [format] = useState(route.params ? route.params.format : null);
  const [picker] = useState(route.params ? route.params.picker : null);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [avatar, setAvatar] = useState(null);
  const [keyPrefix] = useState(route.params.prefix);
  const [loading, setLoading] = useState(false);

  const options =
    format == 'video/mp4'
      ? {
        title: 'Select video',
        mediaType: 'video',
        path: 'video',
        quality: 1,
      }
      : {
        title: 'Select Avatar',
        storageOptions: {
          skipBackup: true,
          path: 'galery',
        },
      };

  /**
   * The first arg is the options object for customization (it can also be null or omitted for default options),
   * The second arg is the callback which sends object: response (more info in the API Reference)
   */

  function launchCamera() {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        setAvatar(source);
        console.log('source',source)
        // console.log('response', JSON.stringify(response));
        // this.setState({
        //   filePath: response,
        //   fileData: response.data,
        //   fileUri: response.uri
        // });
      }
    });

  }

  function Picker() {
    ImagePicker.launchImageLibrary(options, response => {

      if (response.didCancel) {
        navigation.goBack()
        // console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        setAvatar(source);
      }
    });
  }

  const sendData = async () => {
    console.log('urieeel', avatar)
    const file = {
      // `uri` can also be a file system path (i.e. file://)
      uri: avatar.uri,

      name: Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, '')
        .substr(0, 15),
      type: format,
    };


    const options = {
      keyPrefix: keyPrefix,
      bucket: BaseSetting.AWS_BUCKET,
      region: BaseSetting.AWS_DEFAULT_REGION,
      accessKey: BaseSetting.AWS_ACCESS_KEY_ID,
      secretKey: BaseSetting.AWS_SECRET_ACCESS_KEY,
      successActionStatus: 201,
    };

    try {
      console.log('rns3',await RNS3.put(file, options))
      const response = await RNS3.put(file, options);
      console.log('respomse', response)
      if (response.status === 201) {
        console.log('Success: ', response.body);

        switch (keyPrefix) {
          case 'avatar/':
            {
              let form = {
                image_url: response.body.postResponse.location,
              };
              let info = await usersRepository.edit(form);
              dispatch(AuthActions.changePreferences(info, data => { }));
            }
            break;
          case 'video/':
            {
              let form = {
                casting_id: id,
                url_video: response.body.postResponse.location,
              };
              await castingsRepository.sendVideo(form);
            }
            break;
          case 'portfolio/':
            {
              let form = {
                file_url: response.body.postResponse.location,
              };
              let info = await usersRepository.createPortfolio(form);
              dispatch(AuthActions.changePreferences(info, data => { }));
            }
            break;
            case 'camera/':
            {console.log('entra al case')
              let form = {
                file_url: response.body.postResponse.location,
              };
              let info = await usersRepository.createPortfolio(form);
              dispatch(AuthActions.changePreferences(info, data => { }));
            }
            break;
        }

        setLoading(false);
        Alert.alert(t('uploaded_successfully'));
        navigation.navigate('Confirmation');
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
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>


       <Icon name="arrow-left" size={20}
             style={{ color: colors.secondary, padding: 10, position:'absolute', left:10, top: 10, marginTop: Platform.OS == 'ios' ? 50 : null}}
             onPress={() => navigation.goBack()}
       />
      {loading ?
        <View
          style={{
            flex: 1,

            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',

          }}>
          <Image
            style={{ height: 20, width: 20 }}
            source={require('@assets/images/loading.gif')}
          />
        </View>
        :

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            borderRadius: 20,
            marginTop: '20%',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              width: '80%',
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 30,
              borderRadius: 10
            }}>
            {avatar == null ? (
              picker == 'camera/' ?
              launchCamera() :
              Picker()
            ) : format == 'video/mp4' ? (
              <Video
                source={avatar}
                // ref={this.player}
                style={{ width: 200, height: 200, marginTop: '10%' }}
                resizeMode="cover"
              />
            ) : (
                  <Image source={avatar} style={{ width: 200, height: 200, }} />
                )}
            <TouchableOpacity
              style={styles.boton}
              onPress={() => {
                sendData();
                setLoading(true);
              }}>
              <Text style={{ marginTop: '5%' }}>{t('send')}</Text>
            </TouchableOpacity>
          </View>
        </View>

      }


    </ScrollView>
  );
}
