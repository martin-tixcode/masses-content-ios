import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';

export default StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: BaseColor.primary,
        width:'100%',
        
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
    texto:{
      padding:10,
      textAlign:'center',
      alignContent:'center',
      alignItems: 'flex-start'
      
  },
    titulo:{
        padding:15,
        fontFamily: 'Ubuntu',
        fontSize:25,
        fontWeight: 'bold',
        marginTop: '9%'
       
  
      },
   
      formulario:{
          flexDirection: 'column',
          width:'95%',
          alignItems: 'flex-end',
          height:'100%',
          
          margin:15,
          marginTop:'20%',
          paddingBottom: 0,


      },
      
      subTitulo:{
        fontFamily: 'Ubuntu',
        fontSize:15,
        fontWeight: 'bold',
        
       
      }, 

      imagen:{
        width: 50,
        height: 50, 
        borderRadius:50 ,
        marginLeft:10
      },
      card: {
        
        flexDirection:'row',
        alignItems:'center',
        alignContent: 'space-between',
        backgroundColor:'white',
        borderRadius:10,
        marginBottom:20,
        width:'98%',
        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 1,
},
shadowOpacity: 0.20,
shadowRadius: 1.41,

elevation: 2,
        
      },
      
      boton: {
        backgroundColor:'#45AACA',
        height: 40,
        width: 150,
        alignItems:'center',
        borderRadius: 50,
        alignItems: 'baseline',
        margin:50,
        marginLeft:'30%',
        
    },
    
    input:{
        backgroundColor:'#dedede', 
        borderRadius:5}
  
    
    
  });