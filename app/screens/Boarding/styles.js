import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';


export default StyleSheet.create({
    container: {
      flex:1,
      
        
        
    },

    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      },

      navBar:{
        flexDirection: "row",
        alignItems:'center',
        justifyContent: 'space-between',
        alignContent: 'center',
        width:'90%',
        marginTop:'5%'
      },
      info:{
        marginTop:10,
        padding:10,
        flexDirection: 'column',
        alignItems:'center',
        justifyContent: 'space-between',
        alignContent: 'center',
        
      },

      
    titulo:{
        marginTop: 10,
        fontFamily: 'Ubuntu',
        fontSize:25,
        fontWeight: 'bold',
        color: 'white'
       
  
      },
    texto:{
        marginTop:10,
        color: 'white',
        textAlign:'justify'

    } , 
      
      subTitulo:{
        fontFamily: 'Ubuntu',
        fontSize:15,
        fontWeight: 'bold',
        marginLeft:'-5%',
        margin:10,
        marginLeft:'1%',
        color: 'white'
        
      }, 
      boton: {
        backgroundColor: BaseColor.secondary,
        color: BaseColor.tertiary,
        justifyContent:'center',
        alignContent:'center',
        width:150,
        height:40,
        alignItems:'center',
        borderRadius: 50,
        flexDirection:'column',
        margin:50,
        marginLeft:'30%',
        

    },
    
    input:{
        backgroundColor:'#dedede', 
        borderRadius:5}
  
    
    
  });