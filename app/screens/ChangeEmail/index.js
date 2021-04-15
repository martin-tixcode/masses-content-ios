import React, {useState} from 'react';
import {View, KeyboardAvoidingView, Platform, ScrollView, Alert} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {useTranslation} from 'react-i18next';
import {Header, SafeAreaView, Icon, Text, Button, TextInput} from '@components';
import styles from './styles';
import {validateEmail} from '@utils';

export default function ChangeEmail({navigation}) {
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState({email: true});
  const {colors} = useTheme();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const sendData = () => {
    if (validateEmail(email)) {
      setLoading(true);
      // TODO: DO API CALL

      setLoading(false);
      Alert.alert('', t('check_the_email') + email, [
        {text: 'Aceptar', onPress: () => navigation.goBack()},
      ]);
    } else {
      setSuccess({
        email: false,
      });
    }
  };
  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
      <Header
        title={t('change_email')}
        renderLeft={() => {
          return (
            <Icon name="arrow-left" size={20} color={colors.primary} enableRTL={true} />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        keyboardVerticalOffset={offsetKeyboard}>
        <View style={{padding: 20}}>
          <Text body1 style={{paddingBottom: 40}}>
            {t('change_your_email')}.
          </Text>
          <TextInput
            onChangeText={text => setEmail(text)}
            onFocus={() => {
              setSuccess({
                ...success,
                email: true,
              });
            }}
            placeholder={t('email')}
            value={email}
            success={success.email}
          />
          <View style={{paddingVertical: 15}}>
            <Button
              loading={loading}
              full
              onPress={() => {
                sendData();
              }}>
              {t('send')}
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
