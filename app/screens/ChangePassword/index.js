import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { BaseStyle, useTheme } from '@config';
import { useTranslation } from 'react-i18next';
import { Header, SafeAreaView, Icon, Text, Button, TextInput } from '@components';
import styles from './styles';

export default function ChangePassword({ navigation }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRepassword, setNewRepassword] = useState('');

  const [success, setSuccess] = useState({
    currentPassword: true,
    newPassword: true,
    newRepassword: true,
  });
  const { colors } = useTheme();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const sendData = () => {
    if (currentPassword !== '' && newPassword !== '' && newRepassword !== '') {
      setSuccess({
        currentPassword: true,
        newPassword: true,
        newRepassword: true,
      });
      if (newPassword === newRepassword) {
        setLoading(true);
        // DO API CALL
        setLoading(false);
        Alert.alert('', t('password_change_success'), [
          { text: 'Aceptar', onPress: () => navigation.goBack() },
        ]);
      } else {
        Alert.alert('', t('new_repassword_not_match'), [{ text: 'Aceptar' }]);
      }
    } else {
      setSuccess({
        currentPassword: currentPassword !== '',
        newPassword: newPassword !== '',
        newRepassword: newRepassword !== '',
      });
    }
  };

  console.log('password_change_success', newPassword)

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        title={t('change_password')}
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
        style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
          {[
            ['current_password', 'currentPassword', setCurrentPassword, currentPassword],
            ['new_password', 'newPassword', setNewPassword, newPassword],
            ['repeat_new_password', 'newRepassword', setNewRepassword, newRepassword],
          ].map(input => {
            return (
              <React.Fragment key={input[0]}>
                <View style={styles.contentTitle}>
                  <Text headline semibold primaryColor={!success[input[1]]}>
                    {t(input[0])}
                  </Text>
                </View>
                <TextInput
                  onChangeText={text => input[2](text)}
                  secureTextEntry={true}
                  value={input[3]}
                />
              </React.Fragment>
            );
          })}

          <View style={{ paddingVertical: 15 }}>
            <Button loading={loading} full onPress={() => sendData()}>
              {t('confirm')}
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
