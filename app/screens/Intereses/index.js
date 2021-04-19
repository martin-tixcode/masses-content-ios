import React, {useState, useEffect} from 'react';
import {Text, View, Image, Platform} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Images} from '@config';
import {RepositoryFactory} from '@repositories/RepositoryFactory';
import {checkUsers} from '@repositories/Repository';
import {nominalTypeHack, number} from 'prop-types';
import DatePicker from 'react-native-datepicker';
import {useTheme} from '@config';

const InterestRepository = RepositoryFactory.get('interests');

export default function InteresesScreen({navigation}) {
  const [topicos, setTopicos] = useState([]);
  const defaultSelect = new Array(topicos.length).fill(false);
  const [select, setIndex] = useState(defaultSelect);
  const [sendChecked, setSendChecked] = useState(null);
  const {colors} = useTheme();

  const sendData = async () => {
    let DTO = {
      interests: sendChecked,

    };
    console.log('sendChecked', sendChecked)
    let response = await InterestRepository.setInterests(DTO);
    console.log('response', response)
  };

  const fetchInterests = async () => {
    setTopicos(await InterestRepository.getInterests());
  };

  useEffect(() => {
    fetchInterests();
  }, []);

  function check(index, id) {
    let newArr = [...select];
    newArr[index] = !select[index];
    console.log('newArr', newArr);
    let checked = [...topicos];
    checked[index].check = !select[index];
    console.log('checked', checked);
    setIndex(newArr);
    setSendChecked(checked);
  }

  function renderItem() {
    let datos = [],
      temporal = [];

    topicos.forEach((data, index) => {
      temporal.push(
        <TouchableOpacity
          key={data.Titulo}
          style={{flexDirection: 'column', alignSelf: 'center'}}
          onPress={() => check(index, data.id)}>
          <View style={styles.card}>
            <Image
              source={{uri: data.imagen}}
              resizeMode="stretch"
              style={{width: '90%', height: '90%', borderRadius: 20, padding: 10}}
            />

            {select[index] && (
              <Icon
                name="check"
                size={30}
                color="yellow"
                style={{width: 200, height: 100, marginTop: '-60%', marginLeft: '40%'}}
              />
            )}
          </View>
          <Text style={styles.texto}>{data.name}</Text>
        </TouchableOpacity>,
      );
      if (index % 2 !== 0) {
        datos.push(
          <View style={{flexDirection: 'row', width: '100%'}}>{temporal}</View>,
        );
        temporal = [];
      }
    });
    if (temporal.length > 0) {
      datos.push(<View style={{flexDirection: 'row', width: '100%'}}>{temporal}</View>);
    }
    return datos;
  }
  console.log('topicos', topicos);

  return (
    <View style={styles.container}>
      <Icon
        name="arrow-left"
        size={20}
        style={{color: colors.secondary, padding: 10, marginTop: Platform.OS == 'ios' ? 50 : null}}
        onPress={() => navigation.goBack()}
      />

      <Text style={[styles.titulo, {color: 'white'}]}>Complete Interests</Text>
      <View style={[styles.cardContainer]}>
        <View style={styles.formulario}>
          <Text style={[styles.subTitulo]}>
            Select topics that {'\n'}
            may interest you
          </Text>
          {console.log('topicos', topicos)}
          <ScrollView style={{width: '100%'}}>
            <View style={{}}>{renderItem()}</View>

            <TouchableOpacity
              style={styles.boton}
              onPress={() => (sendData(), navigation.navigate('BottomTabNavigator'))}>
              <Text
                style={{
                  color: colors.tertiary,
                  marginLeft: '35%',
                  height: 20,
                  marginTop: '5%',
                  fontWeight: 'bold',
                }}>
                Finish
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
