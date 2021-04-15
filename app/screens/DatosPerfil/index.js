import React, { useEffect, useState } from 'react';
import { Text, View, Picker, Button } from 'react-native';
import styles from './styles';

import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DatePicker from 'react-native-datepicker'
import { RepositoryFactory } from '@repositories/RepositoryFactory';
import { checkUsers } from '@repositories/Repository';
import { nominalTypeHack, number } from 'prop-types';
import { useTheme } from '@config';
import { useSelector, useDispatch } from 'react-redux';
import { AuthActions } from '@actions';
const userRepository = RepositoryFactory.get('users');



export default function DatosScreen({ navigation }) {
    const [ocupacion, setOcupacion] = useState(null);
    const [audiovisuales, setAudiovisuales] = useState(null);
    const [Auto, setAuto] = useState(null);
    const [NivelEstudio, setNivelEstudio] = useState(null);
    const [Familiares, setFamiliares] = useState(null);
    const [professionsOptions, setProfessionsOptions] = useState([])
    const [audiovisualOptions, setAudiovisualOptions] = useState([])
    const [studyOptions, setStudyOptions] = useState([])
    const { colors } = useTheme();
    const dispatch = useDispatch();

    const fetchProfessions = async () => {
        await setProfessionsOptions(await userRepository.getprofessions());
    };
    const fetchAudiovisual = async () => {
        await setAudiovisualOptions(await userRepository.getaudiovisual());
    };
    const fetchStudy = async () => {
        await setStudyOptions(await userRepository.getstudy());
    };

    useEffect(() => {
        fetchProfessions()
        fetchAudiovisual()
        fetchStudy()
    }, []);



    const sendData = async () => {

        let DTO = {
            profession_id: ocupacion,
            audiovisual_resource_id: audiovisuales,
            has_car: Auto,
            study_level_id: NivelEstudio,
            family_members: Familiares,


        };
        let response = await userRepository.edit(DTO);

        dispatch(AuthActions.changePreferences( response , data => {}));
    };

    return (
        <View style={styles.container}>
            <Icon name="arrow-left" size={20} style={{ color: colors.secondary, padding: 10 }} onPress={() => navigation.goBack()} />

            <Text style={[styles.titulo, { color: 'white', }]}>Complete your Profile
          </Text>

            <View style={styles.cardContainer}>




                <View style={styles.formulario}>

                    <Text style={[styles.subTitulo, { fontSize: 20, marginTop: '15%', marginLeft: 20 }]}>Your information</Text>
                    <ScrollView style={{ padding: 20, paddingTop: -20 }}>

                        <Text style={styles.subTitulo}>Occupation</Text>

                        <View style={styles.input}>
                            <Picker

                                selectedValue={ocupacion}
                                style={{ height: 50, width: '95%' }}
                                onValueChange={(itemValue, itemIndex) => setOcupacion(itemValue)}>
                                     <Picker.Item label={'Select'} value={''} />
                                {professionsOptions.map(data => (
                                    <Picker.Item label={data.name} key={data.id} value={data.id} />
                                )

                                )}

                            </Picker>
                        </View>





                        <Text style={styles.subTitulo}>Audiovisual resources</Text>
                        <View style={styles.input}>
                            <Picker

                                selectedValue={audiovisuales}
                                style={{ height: 50, width: '95%' }}
                                onValueChange={(itemValue, itemIndex) => setAudiovisuales(itemValue)}
                            >  
                              <Picker.Item label={'Select'} value={''} />
                                {audiovisualOptions.map(data => (
                                    
                                    <Picker.Item label={data.name} key={data.id} value={data.id} />
                                )

                                )}
                            </Picker>
                        </View>


                        <Text style={styles.subTitulo}>
Do you have a car?</Text>
                        <View style={styles.input}>
                            <Picker
                                selectedValue={Auto}
                                style={{ height: 50, width: '95%' }}
                                onValueChange={(itemValue, itemIndex) => setAuto(itemValue)}
                            >
                                <Picker.Item label="Select" value={null} />
                                <Picker.Item label="Yes" value="Yes" />
                                <Picker.Item label="No" value="no" />
                            </Picker>
                        </View>


                        <Text style={styles.subTitulo}>Level of study</Text>

                        <View style={styles.input}>
                            <Picker
                                selectedValue={NivelEstudio}
                                style={{ height: 50, width: '95%' }}
                                onValueChange={(itemValue, itemIndex) => setNivelEstudio(itemValue)}
                            >
                                <Picker.Item label={'Select'} value={''} />
                                {studyOptions.map(data => (
                                    <Picker.Item label={data.name} key={data.id} value={data.id} />
                                )

                                )}
                            </Picker>
                        </View>

                        <Text style={styles.subTitulo}>Family Members</Text>

                        <View style={styles.input}>
                            <Picker
                                selectedValue={Familiares}
                                style={{ height: 50, width: '95%' }}
                                onValueChange={(itemValue, itemIndex) => setFamiliares(itemValue)}
                            >
                                <Picker.Item label="Select" value={null} />
                                <Picker.Item label="None" value={0} />
                                <Picker.Item label="1" value={1} />
                                <Picker.Item label="2" value={2} />
                                <Picker.Item label="More than 2" value={3} />
                            </Picker>
                        </View>

                        <TouchableOpacity style={styles.boton} onPress={() => (sendData(), navigation.navigate('Intereses'))}>
                            <Text style={{ color: colors.tertiary, marginLeft: '35%', height: 20, marginTop: '5%', fontWeight: 'bold' }}>Finish</Text>
                        </TouchableOpacity>
                    </ScrollView>


                </View>

            </View>
        </View >

    );
}



