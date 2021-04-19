import React, {useState, useEffect} from 'react';
import {View, Text, Image, ImageBackground, Alert, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Card} from '@components';
import {useTranslation} from 'react-i18next';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import styles from './styles';
import {useSelector} from 'react-redux';
import {RepositoryFactory} from '@repositories/RepositoryFactory';
import ImagePicker from 'react-native-image-picker';
import {BaseSetting} from '@config/setting';
import {RNS3} from 'react-native-upload-aws-s3';
import {useTheme} from '@config';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const usersRepository = RepositoryFactory.get('users');

export default function HomeScreen({navigation}) {
  const preferences = useSelector(state => state.auth.preferences);
  const {colors} = useTheme();
  const [id] = useState('8');
  const [format] = useState('image/png');
  const [portfolios, setPortfolios] = useState([]);
  const {t} = useTranslation();
  const [image] = useState(preferences.country);
  const [user, setUser] = useState({
    name: preferences.name,
    lastName: preferences.last_name,
    city: preferences.country,
    image_url: preferences.avatar,
  });
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    fetchPortfolio();
  }, [preferences]);

  useEffect(() => {
    setUser({
      name: preferences.name,
      lastName: preferences.last_name,
      city: preferences.country,
      image_url: preferences.avatar,
    });
  }, [preferences]);

  const fetchPortfolio = async () => {
    let info = await usersRepository.getProfile();
    setPortfolios(info.portfolios);
  };

  return (
    <View style={{flex: 1,alignItems: 'center', justifyContent: 'center'}}>
      <ImageBackground
        source={
          user.image_url
            ? {uri: user.image_url}
            : require('@assets/images/Perfil.png')
        }
        style={{flex: 1, width: '100%', height: '60%', resizeMode: 'cover'}}>
        {console.log('imagen', user.image_url)}
        <View
          style={{
            position: 'absolute',
            width: '100%',
            top: 0,
              marginTop: Platform.OS == 'ios' ? 50 : null,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignContent: 'center',
              margin: 20,
              alignItems: 'center',
            }}
            onPress={() => navigation.openDrawer()}>
            <Icon name="bars" size={30} color="white" />
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 25,
                marginLeft: 10,
              }}>
              {t('profile')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignContent: 'center',
              margin: 20,
              alignItems: 'center',
              color: 'blue',

            }}
            onPress={() =>
              navigation.navigate('PickerScreen', {
                id,
                format,
                prefix: 'avatar/',
              })
            }>
            <Icon name="camera" size={25} color={colors.secondary} />
            {/* <Text
              style={{
                color: '#00f5e4',
                fontWeight: 'bold',
                fontSize: 10,
                marginLeft: 10,
              }}>
              {t('profile_photo')}
            </Text> */}
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <View
        style={{
          backgroundColor: 'white',
          height: '55%',
          width: '90%',
          borderRadius: 10,
          position: 'absolute',
          bottom: 0,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
            justifyContent: 'space-around',
          }}>
          <View style={{padding: '5%', flexDirection: 'column', width: 150}}>
            <Text style={{fontWeight: 'bold', fontSize: 20, marginTop: '10%'}}>
              {user.name} {user.lastName}
            </Text>
            <Text>{user.city}</Text>
          </View>
          <TouchableOpacity
            //style={{styles.boton}}
              /*style={{
                  //backgroundColor: colors.secondary,
                  height: 40,
                  width: 150,
                  //alignItems:'center',
                  borderRadius: 50,
                  alignItems: 'baseline',
                  //color: colors.tertiary
              }}*/
            onPress={() => navigation.navigate('CompletarPerfil')}>
            <Text
              style={{
                fontWeight: 'bold',
                marginLeft: '15%',
                height: 20,
                marginTop: '5%',
              }}>
              {t('complete_profile')}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
            alignContent: 'space-around',
            justifyContent:'space-around',
          }}>
          <Text style={{fontSize: 20, textAlign: 'left'}}>
            {t('my_portfolio')}
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() =>
              navigation.navigate('PickerScreen', {
                id,
                format,
                prefix: 'portfolio/',
              })
            }>
            <Text style={{color: colors.tertiary, fontWeight: 'bold'}}>
              {t('add_portfolio')}
            </Text>
            <Icon
              name="camera"
              size={20}
              color={colors.tertiary}
              style={{margin: 5}}
            />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              width: '90%',
              alignSelf: 'center',
              margin: 'auto',
              flexWrap: 'wrap',
              marginTop: '10%',
              justifyContent: 'center',
            }}>
            {portfolios.length == 0 ? (
              <Text
                style={{
                  color: '#b5b5b5',
                  alignSelf: 'center',
                  marginTop: '25%',
                  textAlign: 'center',
                }}>
                {t('empty_portfolio')}
              </Text>
            ) : (
              portfolios.map(port => (
                <Image style={styles.foto} source={{uri: port.file_url}} />
              ))
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

{
  /* <Image source={require('@assets/images/Perfil.png')} style={{ width: '100%' }} />
      <View
        classname="menu"
        style={{ flex: 1, flexDirection: 'row', marginRight: '60%', marginTop: '-100%' }}>
        <Icon
          name="bars"
          size={30}
          color="white"
          onPress={() => navigation.openDrawer()}
        />
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25, marginLeft: 10 }}>
          {t('profile')}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          width: '93%',
          height: '50%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 20,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-around' }}>
          <View style={{ padding: '5%', flexDirection: 'column' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: '10%' }}>
              {user.name} {user.lastName}
            </Text>
            <Text>{user.city}</Text>
          </View>
          <TouchableOpacity
            style={styles.boton}
            onPress={() => navigation.navigate('CompletarPerfil')}>
            <Text
              style={{ color: 'white', marginLeft: '15%', height: 20, marginTop: '5%' }}>
              Completar perfil
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
            alignContent: 'space-around',
            marginLeft: '15%',
          }}>
          <Text style={{ fontSize: 20, textAlign: 'center', margin: 'auto' }}>
            Mi Portfolio
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('PickerScreen', { id, format })}>
            <Text style={{ color: '#45AACA', marginLeft: '40%' }}>Agregar foto</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            {portfolios.map(port => (
              <Card style={styles.foto} image={port.file_url} />
            ))}
          </View>
          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            <Card style={styles.foto} />
            <Card style={styles.foto} />
            <Card style={styles.foto} />
          </View>
        </ScrollView>
      </View> */
}
