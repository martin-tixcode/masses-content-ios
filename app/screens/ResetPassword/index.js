import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { BaseStyle, useTheme } from '@config';
import { Header, SafeAreaView, Icon, TextInput, Button, Text } from '@components';
import { useTranslation } from 'react-i18next';
import { RepositoryFactory } from '@repositories/RepositoryFactory';

export default function ResetPassword({ navigation }) {
  const usersRepository = RepositoryFactory.get('users');
  const { colors } = useTheme();
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [screen, setScreen] = useState('prim')
  const [success, setSuccess] = useState({ email: true, token: true, newPassword: true });

  const onReset = async () => {
    if (email === '') {
      setSuccess({
        ...success,
        email: false,
      });
    } else {
      await usersRepository.resetPassword(email);
      setLoading(true);

      setLoading(false);
      setScreen('sec');
    }
  };

  const changePassword = async () => {
    if (token === '' || newPassword === '') {
      setSuccess({
        ...success,
        token: false,
        newPassword: false,
      });
    } else {
      let data = {
        token_password: token,
        new_password: newPassword
      }
      await usersRepository.sendTokenAndPassword(data);
      setLoading(true);
      setLoading(false);

      navigation.navigate('SignIn');
    }
  };

  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        title={t('recover_password')}
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
        {screen === "prim" ? <View style={{ padding: 20 }}>
          <Text body1 style={{ paddingBottom: 40 }}>
            {t('enter_your_email')}.
          </Text>
          <TextInput
            style={{ marginTop: 10 }}
            onChangeText={text => setEmail(text)}
            onFocus={() => {
              setSuccess({
                ...success,
                email: true,
              });
            }}
            placeholder={t('email')}
            success={success.email}
            value={email}
            selectionColor={colors.primary}
          />
          <Button
            style={{ marginTop: 20 }}
            full
            onPress={() => {
              onReset();
            }}
            loading={loading}>
            {t('send')}
          </Button>
        </View> : <View style={{ padding: 20 }}>
            <Text body1 style={{ paddingBottom: 20 }}>
              {t('token_password')}
            </Text>
            <TextInput
              onChangeText={text => setToken(text)}
              onFocus={() => {
                setSuccess({
                  ...success,
                  token: true,
                });
              }}
              placeholder={t('token_password')}
              success={success.token}
              value={token}
              selectionColor={colors.primary}
            />
            <Text body1 style={{ paddingBottom: 20 }}>
              {t('new_password')}
            </Text>
            <TextInput
              onChangeText={text => setNewPassword(text)}
              onFocus={() => {
                setSuccess({
                  ...success,
                  newPassword: true,
                });
              }}
              placeholder={'******'}
              success={success.newPassword}
              value={newPassword}
              selectionColor={colors.primary}
            />
            <Button
              style={{ marginTop: 20 }}
              full
              onPress={() => {
                changePassword();
              }}
              loading={loading}>
              {t('send')}
            </Button>
          </View>}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
