import React, {useState} from 'react';
import {View, ScrollView, KeyboardAvoidingView, Platform, Alert} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {Header, SafeAreaView, Icon, Text, Button, TextInput} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';

export default function ProfileEdit({navigation, route}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [firstName, setFirstName] = useState(route.params.firstName);
  const [lastName, setLastName] = useState(route.params.lastName);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState({firstName: true, lastName: true});

  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const sendData = () => {
    if (firstName !== '' && lastName !== '') {
      setSuccess({
        firstName: true,
        lastName: true,
      });
      setLoading(true);
      // DO API CALL
      setLoading(false);
      Alert.alert('', t('data_changed_success'), [
        {text: 'Aceptar', onPress: () => navigation.goBack()},
      ]);
    } else {
      setSuccess({
        firstName: firstName !== '',
        lastName: lastName !== '',
      });
    }
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
      <Header
        title={t('edit_data')}
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
        keyboardVerticalOffset={offsetKeyboard}
        style={{flex: 1}}>
        <ScrollView contentContainerStyle={{paddingHorizontal: 20}}>
          {[
            ['first_name', 'firstName', setFirstName, firstName],
            ['last_name', 'lastName', setLastName, lastName],
          ].map(input => {
            return (
              <React.Fragment key={input[0]}>
                <View style={styles.contentTitle}>
                  <Text headline semibold primaryColor={!success[input[1]]}>
                    {t(input[0])}
                  </Text>
                </View>
                <TextInput onChangeText={text => input[2](text)} value={input[3]} />
              </React.Fragment>
            );
          })}
          <View style={{paddingVertical: 15}}>
            <Button loading={loading} full onPress={() => sendData()}>
              {t('confirm')}
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
