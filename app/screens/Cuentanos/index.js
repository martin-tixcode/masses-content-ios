import React, {useState, useEffect} from 'react';
import {Text, View, Picker, Button, Alert, StyleSheet} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useTranslation} from 'react-i18next';

import SelectInput from 'react-native-select-input-ios'
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {RepositoryFactory} from '@repositories/RepositoryFactory';
import {checkUsers} from '@repositories/Repository';
import DatePicker from 'react-native-datepicker';
import {useTheme} from '@config';
import {checkAuth} from '@repositories/Repository';
import {useDispatch} from 'react-redux';
import {AuthActions} from '@actions';

const userRepository = RepositoryFactory.get('users');

export default function Cuentanos({navigation}) {
  const {t} = useTranslation();
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [prefix, setPrefix] = useState(null);
  const [number, setNumber] = useState(null);
  const [countries, setCountries] = useState([]);
  const [countriesPhone, setCountriesPhone] = useState([]);
  const [country, setCountry] = useState(null);
  const [dateBirth, setDateBirth] = useState(null);
  /* const [pais, setPais] = useState({
        pais: null,
        id: null
    }); */
  const [sexo, setSexo] = useState(null);
  const {colors} = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    await checkAuth();
    let result = await userRepository.getCountries();
    let info = []
    let info2 = []

    result.forEach( country => {
      let data = {}
      data.label = '+' + country.code + ' ' + country.name
      data.value = country.code
      info.push(data)
    })

    result.forEach( co => {
      let data = {}
      data.label = co.name
      data.value = co.id
      info2.push(data)
    })

    setCountriesPhone(info);
    setCountries(info2)
  };

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

    dispatch(AuthActions.changePreferences(response, data => {}));
  };

  return (
    <View style={styles.container}>
      {/* <Icon
        name="arrow-left"
        size={20}
        style={{ color: colors.secondary, padding: 10 }}
        onPress={() => navigation.navigate('SignUp')}
      /> */}

      <Text style={[styles.titulo, {color: 'white', marginTop: 50}]}>
        Tell us about yourself
      </Text>
      <View style={styles.cardContainer}>
        <Text style={[styles.titulo, {fontSize: 20}]}>Your information</Text>
        <ScrollView style={{padding: '5%'}}>
          <View style={styles.formulario}>
            <Text style={styles.subTitulo}>{t('first_name')}</Text>

            <TextInput
              placeholder={'First name'}
              onChangeText={text => setFirstName(text)}
              style={styles.inputCuentanos}
            />

            <Text style={styles.subTitulo}>{t('last_name')}</Text>

            <TextInput
              placeholder={'Last name'}
              onChangeText={text => setLastName(text)}
              style={styles.inputCuentanos}
            />

            <Text style={styles.subTitulo}>{t('phone_number')}</Text>

            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
              }}>
                <View style={{margin :10}}>
                  <SelectInput
                      value={prefix ? prefix : countriesPhone[0]?.value}
                      options={countriesPhone}
                      onSubmitEditing={(itemValue, itemIndex) => setPrefix(itemValue)}
                      style={[styles.selectInput, styles.selectInputSmall]}
                  />
                </View>
              <View style={{width: '50%'}}>
                <TextInput
                  placeholder="Number"
                  defaultValue={number}
                  keyboardType="numeric"
                  onChangeText={text => setNumber(text)}
                  style={styles.inputCuentanos}
                />
              </View>
            </View>

            <Text style={styles.subTitulo}>{t('birth_date')}</Text>

            <View style={styles.input}>
              <DatePicker
                style={{width: '100%', height: 40}}
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
                  },
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={date => {
                  setDateBirth(date);
                }}
              />
            </View>
            <Text style={styles.subTitulo}>{t('country')}</Text>
            <View style={styles.smallInputWrapper}>
              <SelectInput
                  value={country ? country : countries[0]?.value}
                  options={countries}
                  onSubmitEditing={(itemValue, itemIndex) => setCountry(itemValue)}
                  style={[styles.selectInput, styles.selectInputSmall]}
              />
            </View>
            {/*<Picker
              selectedValue={country}
              itemStyle={{height: 40, width: '100%', marginLeft: 0}}
              style={{width: '100%', marginLeft: 0, paddingLeft: 0}}
              onValueChange={(itemValue, itemIndex) => setCountry(itemValue)}>
              <Picker.Item label="Select" value="Select" />
              {countries.map(country => (
                <Picker.Item label={country.name} value={country.id} />
              ))}
            </Picker>*/}
            <Text style={styles.subTitulo}>{t('gender')}</Text>
            <SelectInput
                value={sexo ? sexo : 1}
                options={[
                  { label: 'Female', value: 1},
                  { label: 'Male', value: 2},
                  { label: 'Other', value: 3},
                ]}
                onSubmitEditing={(itemValue, itemIndex) => setSexo(itemValue)}
                style={[styles.selectInput, styles.selectInputSmall]}
            />
            {/*<Picker
              selectedValue={sexo}
              itemStyle={{height: 40, width: '100%', marginLeft: 0}}
              style={{width: '100%', marginLeft: 0, paddingLeft: 0}}
              onValueChange={(itemValue, itemIndex) => setSexo(itemValue)}>
              <Picker.Item label="Select" value={null} />
              <Picker.Item label="Female" value={1} />
              <Picker.Item label="Male" value={2} />
              <Picker.Item label="Other" value={3} />
            </Picker>*/}

            <TouchableOpacity
              style={styles.boton}
              onPress={() => (sendData(), navigation.navigate('Intereses'))}>
              <Text
                style={{
                  color: colors.tertiary,
                  fontWeight: 'bold',
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

const styless = StyleSheet.create({
  scrollViewContentContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  label: {
    fontSize: 13,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallInputWrapper: {
    width: '45%',
    flexDirection: 'column',
  },
  selectInput: {
    flexDirection: 'row',
    height: 36,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  selectInputSmall: {
    width: '100%',
  },
  selectInputLarge: {
    width: '100%',
  },
  bananawrapper: {
    marginBottom: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    height: 1,
    backgroundColor: 'black',
  },
});
