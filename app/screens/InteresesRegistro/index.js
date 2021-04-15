import React, { useState } from 'react';
import { Text, View, Image, } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Images } from '@config';
import {useTheme} from '@config';




export default function InteresesRegistroScreen({ navigation }) {
    const topicos = [
        { imagen: Images.interesMascotas, name: 'Mascotas y Animales', },
        { imagen: Images.interesDeportes, name: 'Deportes y aire libre' },
        { imagen: Images.interesAutomoviles, name: 'Automoviles' },
        { imagen: Images.interesBelleza, name: 'Belleza y Cuidado' },
        { imagen: Images.interesFitness, name: 'Fitness y vida sana' },
        { imagen: Images.interesComida, name: 'Comida y Bebidas' },
        { imagen: Images.interesSalud, name: 'Salud y Medicina' },
        { imagen: Images.interesDeco, name: 'Deco y hogar' },
        { imagen: Images.interesModa, name: 'Moda' },
        { imagen: Images.interesBebes, name: 'Juguetes y Bebés' },
        { imagen: Images.interesPolitica, name: 'Política y Sociedad' },
        { imagen: Images.interesCine, name: 'Cine y fotografía' },
        { imagen: Images.interesVideojuegos, name: 'Videojuegos' },
        { imagen: Images.interesViaje, name: 'Viajes y Turismo' },




    ]
    const defaultSelect = new Array(topicos.length).fill(false);
    const [select, setIndex] = useState(defaultSelect);
    const {colors} = useTheme();


    function check(index) {
        let newArr = [...select];
        newArr[index] = !select[index];
        setIndex(newArr);
    }


    function renderItem() {
        let datos = [], temporal = [];

        topicos.forEach((data, index) => {

            temporal.push(


                <TouchableOpacity key={data.Titulo} style={{ flexDirection: 'column', alignSelf: 'center' }} onPress={() => check(index)}>

                    <View style={styles.card}>


                        <Image source={data.imagen} resizeMode="stretch" style={{ width: 150, height: 150, borderRadius: 20, padding: 10 }} />

                        {select[index] && <Icon name="check" size={30} color='yellow' style={{ width: 200, height: 100, marginTop: '-60%', marginLeft: '40%', }} />}

                    </View>
                    <Text style={styles.texto}>{data.name}</Text>
                </TouchableOpacity>
            )
            if (index % 2 !== 0) {
                datos.push(
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        {temporal}
                    </View>
                )
                temporal = [];
            }

        })
        if (temporal.length > 0) {
            datos.push(
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    {temporal}
                </View>
            )
        }
        return datos;
    }

    return (
        <View style={styles.container}>
            <Icon name="arrow-left" size={20} style={{ color: colors.secondary, padding: 10 }} onPress={() => navigation.goBack()} />

            <Text style={[styles.titulo, { color: 'white', }]}>Intereses
          </Text>
            <View style={[styles.cardContainer]}>


                <View style={styles.formulario}>
                    <Text style={[styles.subTitulo]}>Seleccionaros tópicos que{"\n"}
                     pueden interesarte
                        </Text>
                    <ScrollView>



                        <View style={{ flexDirection: 'column', width: '100%' }}>




                            {renderItem()}





                        </View>


                        <TouchableOpacity style={styles.boton} onPress={()=> navigation.navigate('PreSignIn')}>
                            <Text style={{ color: colors.tertiary, marginLeft: '35%', height: 20, marginTop: '5%' }}>Finish</Text>
                        </TouchableOpacity>

                    </ScrollView>







                </View>

            </View>
        </View >

    );
}
