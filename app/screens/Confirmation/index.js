import React, {useState} from 'react';
import {Text, View, Image} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Images} from '@config';
import listo from '@assets/images/listo.png';
import {BaseColor} from '@config';

export default function Confimation({navigation}) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Image source={listo} style={{height: 100, width: 100}} />
        <Text style={styles.titulo}>Thank you !</Text>
        <Text>
          
Please wait for the upload confirmation {'\n'} of the content before closing
          the application
        </Text>
        <TouchableOpacity
          style={styles.boton}
          onPress={() => navigation.navigate('BottomTabNavigator')}>
          <Text
            bold
            style={{
              alignSelf: 'center',
              marginTop: '5%',
              color: BaseColor.tertiary,
              fontWeight: 'bold',
            }}>
            Return
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
