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
        textAlign:'center',
        marginBottom:'10%',
        color: BaseColor.tertiary,
        padding:10
        
      }, 
      boton: {
        backgroundColor:'#45AACA',
        height: 40,
        width: 150,
        alignItems:'center',
        borderRadius: 50,
        alignItems: 'baseline',
        margin:'10%',
        
        
       
    },
    
    input:{
        backgroundColor:'#dedede', 
        borderRadius:5},
  
        container2: {
          flex: 1,
          flexDirection: 'column',
          backgroundColor: 'black',
        },
        preview: {
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
        },
        capture: {
          flex: 0,
          backgroundColor: '#fff',
          borderRadius: 5,
          padding: 15,
          paddingHorizontal: 20,
          alignSelf: 'center',
          margin: 20,
        },
    
  }
  
  
  
  );