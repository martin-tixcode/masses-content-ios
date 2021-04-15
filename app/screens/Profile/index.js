import React, {useState, useEffect} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {AuthActions} from '@actions';
import {BaseStyle, useTheme, Images} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  ProfilePerformance,
} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {GoogleSignin} from '@react-native-community/google-signin';
/*
import {
  LoginManager as FacebookLoginManager,
  AccessToken as FacebookAccessToken,
} from 'react-native-fbsdk';
*/

export default function Profile({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [loading, setLoading] = useState(false);
  const [userData] = useState({
    firstName: 'Mariana',
    lastName: 'Palummo',
    performance: [{value: '45', title: 'orders'}],
    points: [
      {
        id: 1,
        pubId: 1,
        pubImage: Images.pub1,
        pubName: '878 Bar',
        points: 97,
      },
      {
        id: 1,
        pubId: 1,
        pubImage: Images.pub1,
        pubName: '878 Bar',
        points: 97,
      },
      {
        id: 1,
        pubId: 1,
        pubImage: Images.pub1,
        pubName: '878 Bar',
        points: 97,
      },
    ],
  });
  const dispatch = useDispatch();

  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  const onLogOut = async () => {
    setLoading(true);
    const isGoogleSignedIn = await GoogleSignin.isSignedIn();
    if (isGoogleSignedIn) {
      googleLogOut();
    }

    /*

    FacebookAccessToken.getCurrentAccessToken().then(data => {
      const isFacebookSignedIn = data;

      if (isFacebookSignedIn) {
        FacebookLoginManager.logOut();
      }
    });

    */

    // CALL LOG OUT ENDPOINT API

    dispatch(
      AuthActions.logout(() => {
        navigation.navigate('PreSignIn');
      }),
    );
  };

  const googleLogOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
      <Header title={t('my_account')} />
      <ScrollView>
        <View style={styles.contain}>
          <Text title2 style={{textAlign: 'center'}}>
            {userData.firstName} {userData.lastName}
          </Text>
          <ProfilePerformance
            data={userData.performance}
            style={{marginTop: 20, marginBottom: 20}}
          />
          {[
            ['ChangeLanguage', 'ChangeLanguage'],
            ['MyPoints', 'my_points'],
            ['ProfileEdit', 'edit_data'],
            ['ChangePassword', 'change_password'],
            ['ChangeEmail', 'change_email'],
          ].map(item => {
            return (
              <TouchableOpacity
                style={[
                  styles.profileItem,
                  {borderBottomColor: colors.border, borderBottomWidth: 1},
                ]}
                onPress={() => {
                  navigation.navigate(item[0], userData);
                }}
                key={item[1]}>
                <Text body1>{t(item[1])}</Text>
                <Icon
                  name="angle-right"
                  size={18}
                  color={colors.primary}
                  style={{marginLeft: 5}}
                  enableRTL={true}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      <View style={{paddingHorizontal: 20, paddingVertical: 15}}>
        <Button full loading={loading} onPress={() => onLogOut()}>
          {t('sign_out')}
        </Button>
      </View>
    </SafeAreaView>
  );
}
