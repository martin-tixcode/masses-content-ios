import React, {useState} from 'react';
import {
  Button,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Alert, Platform,
} from 'react-native';

import styles from './style';
import {Images, BaseColor, useTheme} from '@config';
import {ScrollView, FlatList} from 'react-native-gesture-handler';
import style from './style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import imgPorcentaje from '../../assets/images/porcentaje.png';
import {useSelector} from 'react-redux';
import * as Progress from 'react-native-progress';

export default function CompletarPerfil({navigation}) {
  const {colors} = useTheme();
  const userName = useSelector(state => state.auth.preferences.name);
  const lastName = useSelector(state => state.auth.preferences.last_name);
  const date_birth = useSelector(state => state.auth.preferences.date_birth);
  const country = useSelector(state => state.auth.preferences.country);
  const genre_id = useSelector(state => state.auth.preferences.genre?.name);
  const googleId = useSelector(state => state.auth.preferences.googleId);
  const facebookId = useSelector(state => state.auth.preferences.facebookId);
  const profession_id = useSelector(
    state => state.auth.preferences.profession?.name,
  );
  const user = useSelector(state => state.auth.preferences);
  var progress = 0;

  const [porcentaje, setPorcentaje] = useState(60);

  // useSelector, y ver de redux

  function completar() {
    userName && (progress += 0.2);
    lastName && (progress += 0.2);
    date_birth && (progress += 0.2);
    genre_id && (progress += 0.2);
    profession_id && (progress += 0.2);
  }
  const datosList = [
    {value: 'Name', key: userName ? userName : 'Needs completing'},
    {value: 'Last name', key: lastName ? lastName : 'Needs completing'},
    {value: 'Date of Birth', key: date_birth ? date_birth : 'Needs completing'}, //ToDo: traducir
    {
      value: 'Gender',
      key: genre_id ? (genre_id === 2 ? 'Men' : 'Woman') : 'Needs completing',
    },
    {
      value: 'Occupation',
      key: profession_id ? profession_id : 'Needs completing',
    },
  ];
  console.log('datoslist', datosList);
  const interesesList = [
    {value: 'Animals and Pets'},
    {value: 'Arts and Humanities'},
    {value: 'Beauty and Personal Care'},
  ];

  const redesList = [
    {value: 'Facebook', key: 'User'},
    {value: 'Instagram', key: 'Admin'},
    {value: 'Twitter', key: 'Admin'},
  ];

  function misDatos() {
    let respose = [];
    datosList.forEach(data => {
      respose.push(
        <View key={data.key} style={styles.lista}>
          <Icon
            name="circle"
            size={20}
            solid
            style={{color: colors.secondary, padding: 10, width: '15%'}}
          />

          <View style={{width: '50%'}}>
            <Text style={style.subTitulo}>{data.value}</Text>
          </View>

          <View style={style.key}>
            <Text style={{color: colors.primary}}>{data.key}</Text>
          </View>
        </View>,
      );
    });
    return respose;
  }

  function misIntereses() {
    let respose = [];
    interesesList.forEach(data => {
      respose.push(
        <View key={data.key} style={styles.lista}>
          <Icon
            name="circle"
            size={20}
            solid
            style={{color: colors.secondary, padding: 10, width: '15%'}}
          />

          <View style={{width: '80%'}}>
            <Text style={style.subTitulo}>{data.value}</Text>
          </View>
        </View>,
      );
    });
    return respose;
  }

  function misRedes() {
    let respose = [];
    redesList.forEach(data => {
      respose.push(
        <View key={data.key} style={styles.lista}>
          <Icon
            name="circle"
            size={20}
            solid
            style={{color: colors.secondary, padding: 10, width: '15%'}}
          />

          <View style={{width: '50%'}}>
            <Text style={style.subTitulo}>{data.value}</Text>
          </View>

          <View style={style.key}>
            <Text>{data.key}</Text>
          </View>
        </View>,
      );
    });
    return respose;
  }

  return (
    <ScrollView style={[styles.container]}>
      <Icon
        name="arrow-left"
        size={20}
        style={{color: colors.secondary, padding: 10, marginTop: Platform.OS == 'ios' ? 50 : null, marginLeft: 10}}
        onPress={() => navigation.goBack()}
      />
      {/* <Button onPress={() => navigation.goBack()} title="Going  home" /> */}
      <View style={{paddingVertical: 15}}>
        {completar()}
        <View style={{justifyContent: 'space-between', padding: '2%'}}>
          <View style={{flexDirection: 'row', width: '100%'}}>
            <Text style={[styles.titulo, {color: 'white'}]}>
              Your profile is {'\n'}
              Almost complete
            </Text>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Progress.Circle
                style={{marginHorizontal: '7%'}}
                size={90}
                progress={progress}
                color={colors.secondary}
                thickness={15}
                animated
                direction={'counter-clockwise'}
                borderColor={colors.primary}
              />

              <Text style={{marginTop: '-40%', color: colors.secondary}}>
                {Math.round(progress * 100)}%
              </Text>
            </View>
            {/* <ImageBackground source={imgPorcentaje} style={style.porcentaje} >
            <Text style={[styles.titulo, { color: colors.secondary, marginTop: '15%' }]}>
              {porcentaje} %
            </Text>
            </ImageBackground> */}
          </View>
          <Text style={{width: 200, padding: 10, color: 'white'}}>
            Get more visibility and reach more calls with a more complete
            profile
          </Text>
        </View>
        <ScrollView horizontal={true} style={styles.scroll}>
          <View style={[styles.slideContainer, styles.slide]}>
            <Text style={[styles.titulo, {marginLeft: '-50%'}]}>My data</Text>
            {misDatos()}

            <TouchableOpacity onPress={() => navigation.navigate('Datos')}>
              <Text
                style={[style.subTitulo, {color: '#45AACA', marginTop: '7%'}]}>
                Complete
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.slideContainer, styles.slide]}>
            <Text style={[styles.titulo, {marginLeft: '-30%'}]}>
              My Interests and {'\n'}Skills
            </Text>
            {misIntereses()}

            <TouchableOpacity onPress={() => navigation.navigate('Intereses')}>
              <Text
                style={[style.subTitulo, {color: '#45AACA', marginTop: '30%'}]}>
                Complete
              </Text>
            </TouchableOpacity>
          </View>
          {/* <View style={[styles.slideContainer, styles.slide]}>
            <Text style={[styles.titulo, {marginLeft: '-50%'}]}>Mis Redes</Text>
            {misRedes()}

            <Icon
              name="check-circle"
              size={30}
              solid
              style={{color: '#24CE85', padding: 30, marginTop: '30%'}}
            />
          </View> */}
        </ScrollView>
      </View>
    </ScrollView>
  );
}
