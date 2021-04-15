import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';



export default StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: BaseColor.primary,
        width:'100%',
       alignContent:'center',
       justifyContent:'center',
       alignItems:'center',

        
    },
    titulo:{
        padding:15,
        fontFamily: 'Ubuntu',
        fontSize:25,
        fontWeight: 'bold',
       
  
      },
      card:{
        backgroundColor:'white',
        height:'60%',
        width:'80%',
        borderRadius:10,
        alignContent:'center',
        justifyContent:'center',
        alignItems:'center',
        
      
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
    
    
  });