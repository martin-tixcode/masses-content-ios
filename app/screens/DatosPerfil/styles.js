import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';


export default StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: BaseColor.primary,
        width:'100%',
        
    },
    titulo: {
      padding: 15,
      fontFamily: 'Ubuntu',
      fontSize: 25,
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
      width: '100%',
      justifyContent: 'center',
      alignSelf:'center'
      



  },
  subTitulo: {
    fontFamily: 'Ubuntu',
    fontSize: 15,
    fontWeight: 'bold',
   marginVertical: '5%'
    

},
      boton: {
        backgroundColor: BaseColor.secondary,
        height: 40,
        width: 150,
        alignItems:'center',
        borderRadius: 50,
        alignItems: 'baseline',
        margin:50,
        marginLeft:'30%'
    },
    
    input:{
        backgroundColor:'#dedede', 
        borderRadius:5}
  
    
    
  });