import React, { useState, useEffect } from 'react';
import { Text, View, Picker, Button, Image, } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ScrollView, TextInput, TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';
import { Card, SubHeader } from '@components';
import Humor from '../../assets/images/Humor.jpg'
import { Images } from '@config';
import { useTranslation } from 'react-i18next';
import { RepositoryFactory } from '@repositories/RepositoryFactory';

const usersRepository = RepositoryFactory.get('users');

export default function NotificacionesScreen({ navigation }) {
    const topicos = [
        { imagen: Images.announcement1, Titulo: 'Titulo de convocatoria', Datos: 'Tu contenido ha sido selecionado' },
        { imagen: Images.interesTecnologia, Titulo: 'Titulo de convocatoria', Datos: 'Tu contenido ha sido selecionado' },
    ]
    const defaultSelect = new Array(topicos.length).fill(false);
    const [select, setIndex] = useState(defaultSelect);
    const [notifications, setNotifications] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        fetchNotifications()
    }, [])

    const fetchNotifications = async () => {
        setNotifications(await usersRepository.getNotifications())
    }

    function renderItem() {
        let datos = [];

        notifications.forEach((data, index) => {

            datos.push(
                <TouchableHighlight key={data.id} style={{ flexDirection: 'row', alignSelf: 'center' }}

                    activeOpacity={0.1}
                    underlayColor="white"
                    onPress={() => alert('Pressed!')}
                >
                    <View style={styles.card}>
                        <Image source={data.image_url} resizeMode="stretch" style={styles.imagen} />

                        <View style={styles.texto}>
                            <Text style={styles.subTitulo}>{data.title}</Text>
                            <Text>{data.description}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            )


        })

        return datos;
    }

    return (
        <View style={styles.container}>
            <SubHeader title={t('notifications')} />

            {/* <Text style={[styles.titulo, { color: 'white', }]}>Notificaciones
          </Text> */}
            <View style={[styles.cardContainer]}>
                <View style={styles.formulario}>

                    <ScrollView style={{ width: '90%', alignSelf: 'center' }}>
                        <View style={{ flexDirection: 'column', width: '100%' }}>
                            <Text style={[styles.subTitulo, { color: 'grey' }]}>{t('today')}
                            </Text>

                            <TouchableHighlight style={{ flexDirection: 'row', alignSelf: 'center' }}
                                activeOpacity={0.1}
                                underlayColor="white"
                                onPress={() => alert('Pressed!')} >

                                <View style={styles.card}>

                                    <Image source={Images.interesTecnologia} resizeMode="stretch" style={styles.imagen} />

                                    <View style={styles.texto}>
                                        <Text style={styles.subTitulo}>{t('title_casting')}</Text>
                                        <Text>{t('select_casting')}</Text>
                                    </View>

                                </View>
                            </TouchableHighlight>

                        </View>
                        <View style={{ flexDirection: 'column', width: '100%' }}>
                            <Text style={[styles.subTitulo, { color: 'grey' }]}>{t('yesterday')}
                            </Text>
                            {renderItem()}

                        </View>
                        <View style={{ flexDirection: 'column', width: '100%' }}>
                            <Text style={[styles.subTitulo, { color: 'grey' }]}>{t('earlier')}
                            </Text>
                            {renderItem()}

                        </View>

                    </ScrollView>

                </View>

            </View>
        </View >
    );
}
