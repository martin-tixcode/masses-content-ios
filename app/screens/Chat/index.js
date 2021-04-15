import React, { useState } from 'react';
import { Text, View, Picker, Button, TextInput, } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { set } from 'react-native-reanimated';
import { element } from 'prop-types';




export default function Chat({ navigation }) {
  const [text, setText] = useState('');
  const [enviado, setEnviado] = useState(['',]);
  

  




  return (
    <View style={styles.container}>
      <Icon name="arrow-left" size={20} style={{ color: '#b5b4b0', padding: 10 }} onPress={() => navigation.goBack()} />
        
        {enviado != '' &&
        <View style={{width:'30%', backgroundColor:'#45AACA', borderRadius:50, marginLeft:10, padding: 10}}><Text>{enviado}</Text></View>}
          
        <View style={{flexDirection:'row',backgroundColor: '#e0e0e0', bottom: 0,
        width: '100%',
        position: 'absolute', borderRadius:50}}>
          <TextInput
            style={{width: '60%', height: 40, marginLeft:'5%'}}
            placeholder="Escribe aqui..."
            onChangeText={text => setText(text)}
            defaultValue={text}
          />
          

          <Icon name="arrow-circle-up" size={40} style={{  marginLeft:'22%', color: '#45AACA'}} onPress={() => enviado.push(text + ' ')}/>
         
        </View>
      
    </View >

  );
}