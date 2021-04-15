import React, { useState, useEffect } from 'react';
import { Text, View, Picker, Button, Alert } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useTranslation } from 'react-i18next';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { RepositoryFactory } from '@repositories/RepositoryFactory';
import { checkUsers } from '@repositories/Repository';
import DatePicker from 'react-native-datepicker';
import { useTheme } from '@config';
import { checkAuth } from '@repositories/Repository';
import { useDispatch } from 'react-redux';
import { AuthActions } from '@actions';

const userRepository = RepositoryFactory.get('users');

export default function Cuentanos({ navigation }) {
    const { t } = useTranslation();
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [prefix, setPrefix] = useState(null);
    const [number, setNumber] = useState(null);
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState(null);
    const [dateBirth, setDateBirth] = useState(null);
    /* const [pais, setPais] = useState({
        pais: null,
        id: null
    }); */
    const [sexo, setSexo] = useState(null);
    const { colors } = useTheme();
    const dispatch = useDispatch();

    useEffect(() => {
        fetchCountries()
    }, [])

    const fetchCountries = async () => {
        await checkAuth()
        let result = await userRepository.getCountries();
        setCountries(result)
    }

    const sendData = async () => {

        let DTO = {
            name: firstName,
            last_name: lastName,
            phone: '+' + parseInt(prefix + number),
            date_birth: dateBirth,
            country_id: country,
            genre_id: sexo,

        };
        let response = await userRepository.edit(DTO);

        dispatch(AuthActions.changePreferences(response, data => { }));
    };

    return (
        <View style={styles.container}>
            {/* <Icon
        name="arrow-left"
        size={20}
        style={{ color: colors.secondary, padding: 10 }}
        onPress={() => navigation.navigate('SignUp')}
      /> */}

            <Text style={[styles.titulo, { color: 'white' }]}>Tell us about yourself</Text>
            <View style={styles.cardContainer}>
                <Text style={[styles.titulo, { fontSize: 20 }]}>Your information
</Text>
                <ScrollView style={{ padding: '5%' }}>
                    <View style={styles.formulario}>
                        <Text style={styles.subTitulo}>{t('first_name')}</Text>

                        <View style={styles.input}>
                            <TextInput
                                onChangeText={text => setFirstName(text)}
                            />
                        </View>

                        <Text style={styles.subTitulo}>{t('last_name')}</Text>

                        <View style={styles.input}>
                            <TextInput
                                onChangeText={text => setLastName(text)}
                            />
                        </View>
                        <Text style={styles.subTitulo}>{t('phone_number')}</Text>
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>

                            <View style={[styles.input, { width: '40%' }]}>

                                <Picker
                                    selectedValue={prefix}
                                    style={{ height: 50, width: '95%' }}
                                    onValueChange={(itemValue, itemIndex) => setPrefix(itemValue)}>
                                    <Picker.Item label="Select" value="Select" />
                                    {
                                        countries.map(country => (
                                            <Picker.Item label={'+' + country.code + ' ' + country.name} value={country.code} />
                                        ))
                                    }
                                </Picker>
                            </View>
                            <View style={[styles.input, { width: '75%' }]}>

                                <TextInput

                                    placeholder="number"
                                    defaultValue={number}
                                    keyboardType="numeric"
                                    onChangeText={text => setNumber(text)}
                                />
                            </View>
                        </View>

                        <Text style={styles.subTitulo}>{t('birth_date')}</Text>

                        <View style={styles.input}>
                            <DatePicker
                                style={{ width: '100%', height: 50 }}
                                date={dateBirth}
                                mode="date"
                                placeholder=""
                                format="YYYY-MM-DD"
                                minDate="1900-01-01"
                                // maxDate="2016-06-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        right: 0,
                                        top: 4,
                                        marginLeft: 0,
                                    },
                                    dateInput: {
                                        marginLeft: '-75%',
                                        alignSelf: 'center',
                                        borderWidth: 0,
                                        marginTop: '1%',
                                    },
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={date => {
                                    setDateBirth(date);
                                }}
                            />
                        </View>
                        <Text style={styles.subTitulo}>{t('country')}</Text>
                        <View style={styles.input}>
                            <Picker
                                selectedValue={country}
                                style={{ height: 50, width: '95%' }}
                                onValueChange={(itemValue, itemIndex) => (setCountry(itemValue))}>
                                <Picker.Item label="Select" value="Select" />
                                {
                                    countries.map(country => (
                                        <Picker.Item label={country.name} value={country.id} />
                                    ))
                                }
                            </Picker>
                        </View>
                        <Text style={styles.subTitulo}>{t('gender')}</Text>
                        <View style={styles.input}>
                            <Picker
                                selectedValue={sexo}
                                style={{ height: 50, width: '95%' }}
                                onValueChange={(itemValue, itemIndex) => setSexo(itemValue)}>
                                <Picker.Item label="Select" value={null} />
                                <Picker.Item label="Female" value={1} />
                                <Picker.Item label="Male" value={2} />
                                <Picker.Item label="Other" value={3} />
                            </Picker>
                        </View>

                        <TouchableOpacity
                            style={styles.boton}
                            onPress={() => (sendData(), navigation.navigate('Intereses'))}>
                            <Text
                                style={{
                                    color: colors.tertiary,
                                    fontWeight: 'bold'
                                }}>
                                Next
              </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}
