import * as actionTypes from './actionTypes';

const onLogin = (token, preferences) => {
  return {
    type: actionTypes.LOGIN,
    token,
    preferences,
  };
};

const onLogout = data => {
  return {
    type: actionTypes.LOGOUT,
  };
};

const onChangePreferences = preferences => {
  return {
    type: actionTypes.CHANGE_PREFERENCES,
    preferences,
  };
};

const onSetFirebaseToken = firebaseToken => {
  return {
    type: actionTypes.SET_FIREBASE_TOKEN,
    firebaseToken,
  };
};

const onSetTokenDevice = tokenDevice => {
  return {
    type: actionTypes.SET_TOKEN_DEVICE,
    tokenDevice,
  };
};

// EXPORTS

export const login = (userData, callback) => dispatch => {
  const token = userData.token;
  const preferences = userData.preferences;
  dispatch(onLogin(token, preferences));
  if (typeof callback === 'function') {
    callback();
  }
};

export const logout = callback => dispatch => {
  dispatch(onLogout());
  if (typeof callback === 'function') {
    callback();
  }
};

export const changePreferences = (preferences, callback) => dispatch => {
  dispatch(onChangePreferences(preferences));
  if (typeof callback === 'function') {
    callback();
  }
};

export const setFirebaseToken = firebaseToken => dispatch => {
  dispatch(onSetFirebaseToken(firebaseToken));
};

export const setTokenDevice = tokenDevice => dispatch => {
  dispatch(onSetTokenDevice(tokenDevice));
};
