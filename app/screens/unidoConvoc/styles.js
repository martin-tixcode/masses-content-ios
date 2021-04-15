import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';


export default StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: BaseColor.primary,
      width:'100%',
      flexDirection:'column',
      

       
        
    },
    titulo:{
        padding:15,
        fontFamily: 'Ubuntu',
        fontSize:25,
        fontWeight: 'bold',
        margin:'10%'
       
  
      },
      cardContainer:{
          flexDirection:"row",
          backgroundColor:'white',
          borderRadius:10,
          alignContent:'center',
          justifyContent:'center',
          bottom:0,
          textAlign:'center',
          width:'90%',
          margin:'5%',
          marginTop:'30%',
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
          },
      formulario:{
          width:'80%',
          justifyContent:'center',
          

      },
      
      subTitulo:{
        fontFamily: 'Ubuntu',
        fontSize:15,
        fontWeight: 'bold',
        marginLeft:'-5%',
        margin:10,
        marginLeft:'1%'
        
      }, 
      boton: {
        backgroundColor: BaseColor.secondary,
        height: 40,
        width: 150,
        alignItems:'center',
        borderRadius: 50,
        alignItems: 'center',
        margin:'10%',
        
        
       
    },
    
    input:{
        backgroundColor:'#dedede', 
        borderRadius:5}
  
    
    
  });