import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { BaseColor, useTheme, useFont } from '@config';
import { useTranslation } from 'react-i18next';
import { Icon } from '@components';
import Perfil from '@screens/Perfil';

import SignUp from '@screens/SignUp';
import SignIn from '@screens/SignIn';
import ResetPassword from '@screens/ResetPassword';
import ChangePassword from '@screens/ChangePassword';
import ChangeEmail from '@screens/ChangeEmail';
import ProfileEdit from '@screens/ProfileEdit';
import PreSignIn from '@screens/PreSignIn';
import Summary from '@screens/Summary';
import Notificaciones from '@screens/Notificaciones';
import Boarding from '@screens/Boarding';
import CompletarPerfil from '@screens/CompletarPerfil';
import NotFound from '@screens/NotFound';
import Notification from '@screens/Notification';
import Home from '@screens/Home';
import MyAnnouncements from '@screens/MyAnnouncements';
import AnnouncementDetail from '@screens/AnnouncementDetail';
import Cuentanos from '@screens/Cuentanos';
import PickerScreen from '@screens/PickerScreen';
import Profile from '@screens/Profile';
import CallId from '@screens/CallId';


const MainStack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

export default function Main() {
  const isLoggedIn = useSelector(state => state.auth).isLoggedIn;

  return (
    <MainStack.Navigator headerMode="none" initialRouteName="BottomTabNavigator">
      {isLoggedIn ? (
        <>
          <MainStack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
          <MainStack.Screen name="ChangePassword" component={ChangePassword} />
          <MainStack.Screen name="ChangeEmail" component={ChangeEmail} />
          <MainStack.Screen name="ProfileEdit" component={ProfileEdit} />
          <MainStack.Screen name="Summary" component={Summary} />
          <MainStack.Screen name="CompletarPerfil" component={CompletarPerfil} />
          <MainStack.Screen name="Home" component={Home} />
          <MainStack.Screen name="NotFound" component={NotFound} />
          <MainStack.Screen name="Notification" component={Notification} />
          <MainStack.Screen name="AnnouncementDetail" component={AnnouncementDetail} />
          <MainStack.Screen name="Cuentanos" component={Cuentanos} />
          <MainStack.Screen name="PickerScreen" component={PickerScreen} />
          <MainStack.Screen name="CallId" component={CallId} />
         
        </>
      ) : (
          <>
            <MainStack.Screen name="Boarding" component={Boarding} />
            <MainStack.Screen name="PreSignIn" component={PreSignIn} />
            <MainStack.Screen name="SignIn" component={SignIn} />
            <MainStack.Screen name="SignUp" component={SignUp} />
            <MainStack.Screen name="Cuentanos" component={Cuentanos} />
            <MainStack.Screen name="ResetPassword" component={ResetPassword} />


          </>
        )}
    </MainStack.Navigator>
  );
}

function BottomTabNavigator() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const font = useFont();
  const isLoggedIn = useSelector(state => state.auth).isLoggedIn;
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      headerMode="none"
      tabBarOptions={{
        showIcon: true,
        showLabel: false,
        activeTintColor: colors.primary,
        inactiveTintColor: BaseColor.grayColor,
        style: { borderTopWidth: 1 },
      }}>
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => {
            return <Icon color={color} name="home" size={28} solid />;
          },
        }}
      />
      <BottomTab.Screen
        name="MyAnnouncements"
        component={MyAnnouncements}
        options={{
          tabBarIcon: ({ color }) => {
            return <Icon color={color} name="calendar-check" size={28} solid />;
          },
        }}
      />

      <BottomTab.Screen
        name="CallId"
        component={CallId}
        options={{
          tabBarIcon: ({ color }) => {
            return <Icon color={color} name="eye" size={28} solid />;
          },
        }}
      />
      {/* <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color}) => {
            return <Icon solid color={color} name="user-alt" size={28} />;
          },
        }}
      /> */}
      <BottomTab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarIcon: ({ color }) => {
            return <Icon solid color={color} name="user-alt" size={28} />;
          },
        }}
      />
    </BottomTab.Navigator>
  );
}
