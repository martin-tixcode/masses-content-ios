import React, {useState, useEffect} from 'react';
import {Text, View, Button, Alert, Image, Picker, Platform} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import warning from '@assets/images/warning.png';
import {useTheme} from '@config';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {RepositoryFactory} from '@repositories/RepositoryFactory';

const usersRepository = RepositoryFactory.get('users');

export default function Pagos({navigation}) {
  const user = useSelector(state => state.auth.preferences);
  const [pantalla, setPantalla] = useState('terc');
  const [typeAccount, setTypeAccount] = useState(null);
  const [DatosCuenta, setDatosCuenta] = useState('Select');
  const [paymentMethod, setPaymentMethod] = useState(null);

  const [name, setName] = useState(paymentMethod?.name);
  const [lastName, setLastName] = useState(paymentMethod?.last_name);
  const [birthDate, setBirthDate] = useState(paymentMethod?.date_birth);
  const [dni, setDni] = useState(
    paymentMethod?.identification_number
      ? paymentMethod.identification_number
      : '',
  );
  const [email, setEmail] = useState(paymentMethod?.email);
  const [phone, setPhone] = useState(paymentMethod?.phone);
  const [bankName, setBankName] = useState(paymentMethod?.bank_name);
  const [cbu, setCbu] = useState(paymentMethod?.cbu);
  // const [alias, setAlias] = useState(paymentMethod?.alias);
  const {t} = useTranslation();
  const {colors} = useTheme();

  useEffect(() => {
    fetchPaymentMethod();
  }, []);

  const fetchPaymentMethod = async () => {
    let payment = await usersRepository.getPaymentMethod();
    setPaymentMethod(payment);
    setName(payment.name);
    setLastName(payment.last_name);
    setBirthDate(payment.date_birth);
    setCbu(payment.bank_account_number);
    setBankName(payment.bank_name);
    setDni(payment.identification_number ? payment.identification_number : '');
    setPhone(payment.phone);

    setAlias(payment.alias);
    return setPantalla(payment ? 'prim' : 'terc');
  };

  const sendData = async () => {
    // if (!typeAccount) {
    //   return Alert.alert('', t('valid_payment_method'), [{text: 'Aceptar'}]);
    // }

    let data = {
      name,
      last_name: lastName,
      //date_birth: birthDate,
      identification_number: parseInt(dni),
      email,
      phone: phone,
      bank_name: bankName,
      bank_account_number: cbu,
      id: paymentMethod?.id,
      // name,
      // lastName: last_name,
      // dateBirth: date_birth,
      // email,
      // phone ,
      // // payment_method_id: typeAccount,
      // identificationNumber: parseInt(dni),
      // cbu: cbu? cbu : null,
      // alias:  alias ? alias  : null
    };
    console.log('data', data);

    let response = await usersRepository.setPayment(data);
    // setPaymentMethod(response);
    // setCbu(null);
    // setAlias(null);
    // setDni('');
    // setName('');
    // setTypeAccount(null);
    setPantalla('prim');
  };

  function renderView() {
    switch (pantalla) {
      case 'prim': {
        return (
          <View style={styles.formulario}>
            <Text style={styles.subTitulo}>{t('name')}</Text>
            <View style={styles.input}>
              <Text style={{color: 'grey'}}>{paymentMethod.name}</Text>
            </View>
            <Text style={styles.subTitulo}>{t('lastName')}</Text>
            <View style={styles.input}>
              <Text style={{color: 'grey'}}>{paymentMethod.lastName}</Text>
            </View>
            <Text style={styles.subTitulo}>{t('type_account')}</Text>
            <View style={styles.input}>
              <Text style={{color: 'grey'}}>
                {paymentMethod.payment_method_id === 1
                  ? t('bank_transfer')
                  : 'PayPal'}
              </Text>
            </View>

            <Text style={styles.subTitulo}>{t('dni')}</Text>
            <View style={styles.input}>
              <Text style={{color: 'grey'}}>{paymentMethod.dni}</Text>
            </View>
            <Text style={styles.subTitulo}>{t('info_account')}</Text>
            <View style={styles.input}>
              <Text style={{color: 'grey'}}>{paymentMethod?.user.email}</Text>
            </View>
            <Text style={styles.subTitulo}>{t('cbu')}</Text>
            <View style={styles.input}>
              <Text style={{color: 'grey'}}>
                {paymentMethod.cbu ? paymentMethod.cbu : t('needs_completing')}
              </Text>
            </View>
            <Text style={styles.subTitulo}>{t('alias')}</Text>
            <View style={styles.input}>
              <Text style={{color: 'grey'}}>
                {paymentMethod.alias
                  ? paymentMethod.alias
                  : t('needs_completing')}
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.boton, {marginLeft: '55%', marginTop: '20%'}]}
              onPress={() => setPantalla('sec')}>
              <Text style={styles.TextoBoton}>{t('edit')}</Text>
            </TouchableOpacity>
          </View>
        );
      }

      case 'sec':
        return (
          <View style={styles.formulario}>
            <Text style={styles.subTitulo}>{t('Name')}</Text>
            <TextInput
              placeholder="John"
              value={name}
              onChangeText={text => setName(text)}
              style={styles.input}
            />
            <Text style={styles.subTitulo}>{t('Last name')}</Text>
            <TextInput
              placeholder="Doe"
              value={lastName}
              onChangeText={text => setLastName(text)}
              style={styles.input}
            />
            <Text style={styles.subTitulo}>{t('Identification Number')}</Text>
            <TextInput
              placeholder="00000000"
              keyboardType="numeric"
              value={String(dni)}
              onChangeText={text => setDni(text)}
              style={styles.input}
            />
            <Text style={styles.subTitulo}>{t('Birth Date')}</Text>
            <TextInput
              placeholder="MM/DD/YYYY"
              value={birthDate}
              onChangeText={text => setBirthDate(text)}
              style={styles.input}
            />

            <Text style={styles.subTitulo}>{t('Email')}</Text>
            <TextInput
              placeholder="masses@content.com"
              value={email}
              onChangeText={text => setEmail(text)}
              style={styles.input}
            />
            <Text style={styles.subTitulo}>{t('Phone')}</Text>
            <TextInput
              placeholder="phone numbre"
              value={phone}
              onChangeText={text => setPhone(text)}
              style={styles.input}
              keyboardType={'numeric'}
            />
            {/* <Text style={styles.subTitulo}>{t('type_account')}</Text> */}

            {/* <View style={styles.input}>
              <Picker
                selectedValue={typeAccount}
                style={{height: 50, width: '95%'}}
                onValueChange={(itemValue, itemIndex) => setTypeAccount(itemValue)}>
                <Picker.Item label={t('select')} value={null} />
                <Picker.Item label={t('bank transfer')} value={1} />
                <Picker.Item label="PayPal" value={2} />
              </Picker>
            </View> */}

            <Text style={styles.subTitulo}>{t('Bank Name')}</Text>
            <TextInput
              placeholder="John Doe"
              value={bankName}
              onChangeText={text => setBankName(text)}
              style={styles.input}
            />
            <View>
              <View>
                <Text style={styles.subTitulo}>{t('Bank Account Number')}</Text>
                <TextInput
                  placeholder="00000000000000"
                  value={cbu}
                  onChangeText={text => setCbu(text)}
                  style={styles.input}
                  keyboardType={'numeric'}
                />
              </View>
            </View>

            {/* <Text style={styles.subTitulo}>{t('info_account')}</Text>

            <View style={styles.input}>
              <Picker
                selectedValue={DatosCuenta}
                style={{height: 50, width: '95%'}}
                onValueChange={(itemValue, itemIndex) => setDatosCuenta(itemValue)}>
                <Picker.Item label={t('select')} value={null} />
                <Picker.Item label="CBU" value="cbu" />
                <Picker.Item label="Alias" value="alias" />
              </Picker>
            </View> */}

            {/* <View>
              {DatosCuenta == 'alias' && (
                <View>
                  <Text style={styles.subTitulo}>{t('alias')}</Text>
                  <TextInput
                    placeholder="alias.cuenta.bancaria"
                    value={alias}
                    onChangeText={text => setAlias(text)}
                    style={styles.input}
                  />
                </View>
              )}
            </View> */}

            <TouchableOpacity
              style={[styles.boton, {marginLeft: '55%', marginTop: '20%'}]}
              onPress={() => sendData()}>
              <Text style={styles.TextoBoton}>{t('save')}</Text>
            </TouchableOpacity>
            {/* {t('save')} */}
          </View>
        );

      case 'terc':
        return (
          <View style={styles.formulario}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image source={warning} style={{width: 80, height: 80}} />
              <Text style={{textAlign: 'center'}}>
                {t('method_payment_text')}
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.boton,
                {marginLeft: '22%', marginTop: '20%', width: 200},
              ]}
              onPress={() => setPantalla('sec')}>
              <Text style={styles.TextoBoton}>{t('add_method_payment')}</Text>
            </TouchableOpacity>
          </View>
        );
    }
  }

  return (
    <View style={styles.container}>
      <Icon
        name="arrow-left"
        size={20}
        style={{
          color: colors.secondary,
          padding: 10,
          marginTop: Platform.OS == 'ios' ? 50 : null,
        }}
        onPress={() => navigation.goBack()}
      />

      <Text style={[styles.titulo, {color: 'white'}]}>{t('payment')}</Text>
      <View style={styles.cardContainer}>
        <Text style={[styles.titulo, {fontSize: 20}]}>
          {t('your_information')}
        </Text>
        <ScrollView style={{padding: '5%'}}>{renderView()}</ScrollView>
      </View>
    </View>
  );
}
