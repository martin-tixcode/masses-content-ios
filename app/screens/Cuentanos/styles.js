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
      
        alignContent:'center'
        



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
       
        borderRadius: 50,
        
        margin:50,
        alignItems:'center',
        justifyContent:'center',
        alignContent:'center',
        alignSelf:'center'
        
    },
    
    input:{
        backgroundColor:'#dedede', 
        borderRadius:5}
  
    
    
  });