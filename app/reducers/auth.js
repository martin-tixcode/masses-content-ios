import * as actionTypes from '@actions/actionTypes';
const initialState = {
  isLoggedIn: false,
  token: null,
  tokenDevice: null,
  preferences: [],
  firebaseToken: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        isLoggedIn: true,
        token: action.token,
        preferences: action.preferences,
      };
    case actionTypes.LOGOUT:
      return {
        isLoggedIn: false,
        token: null,
        preferences: [],
      };
    case actionTypes.CHANGE_PREFERENCES:
      return {
        ...state,
        preferences: action.preferences,
      };
    case actionTypes.SET_FIREBASE_TOKEN:
      return {
        ...state,
        firebaseToken: action.firebaseToken,
      };
    case actionTypes.SET_TOKEN_DEVICE:
      return {
        ...state,
        tokenDevice: action.tokenDevice,
      };
    default:
      return state;
  }
};
