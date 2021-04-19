import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';


export default StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: BaseColor.primary,
        width:'100%',
        
    },
    titulo:{
        padding:15,
        fontFamily: 'Ubuntu',
        fontSize:25,
        fontWeight: 'bold',
       
  
      },
      cardContainer: {
        flexDirection: "column",
        backgroundColor: 'white',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        alignContent: 'center',
        justifyContent: 'center',
        bottom: 0,
        width: '100%',
        position: 'absolute',

        height: '80%',

    },
    formulario: {
      width: '95%',
      justifyContent: 'center',
      height: '90%',
      marginLeft: '10%'



  },
      
      subTitulo:{
        fontFamily: 'Ubuntu',
        fontSize:20,
        fontWeight: 'bold',
        marginLeft:'-5%',
        margin:20,
        marginLeft:'1%'
        
      }, 
      card: {
        width: 150, 
        height: 150,
        
        
        margin: 10,
        
      },
      texto:{
          padding:10,
          textAlign:'center',
          
      },
      boton: {
        backgroundColor: BaseColor.secondary,
        height: 40,
        width: 150,
        alignItems:'center',
        borderRadius: 50,
        alignItems: 'baseline',
        marginTop:10,
        marginLeft:'25%',
        
    },
    
    input:{
        backgroundColor:'#dedede', 
        borderRadius:5}
  
    
    
  });
