import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';


export default StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: BaseColor.primary,
      width:'100%',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center'
     
      

       
        
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
        fontSize:20,
        fontWeight: 'bold',
        marginLeft:'-5%',
        marginBottom:'10%',
        marginLeft:'1%'
        
      }, 
      boton: {
        backgroundColor: BaseColor.secondary,
        flexDirection:'column',
        height: 40,
        width: 150,
        
        borderRadius: 50,
       
        margin: '10%',
        alignItems:'center',
        alignContent:'center',
        

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