import React from 'react';
import { StyleSheet } from 'react-native';
import { BaseColor } from '@config';


export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BaseColor.primary,
        width: '100%',

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
        alignItems:'center',
        height: '80%',

    },
    formulario: {
        width: '95%',
        justifyContent: 'center',
        



    },
    card: {
        height: 150,
        width: 150,
        borderRadius: 5,
        backgroundColor: 'white',
        shadowColor: "#000",
        margin: 15,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

    subTitulo: {
        fontFamily: 'Ubuntu',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: '-5%',
        margin: 10,
        marginLeft: '1%',
        color: BaseColor.primary,

    },
    boton: {
        backgroundColor: BaseColor.secondary,
        height: 40,
        width: 150,

        alignItems: 'center',
        borderRadius: 50,
        alignItems: 'baseline',
        margin: 50,
        marginLeft: '60%'
    },

    TextoBoton: {
        color: BaseColor.primary,
        justifyContent: 'center',
        alignSelf: 'center',
        fontWeight: 'bold',
        marginTop: '5%'
    },

    input: {
        backgroundColor: '#dedede',
        borderRadius: 5,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    }



});