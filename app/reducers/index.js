import { combineReducers } from 'redux';
import AuthReducer from './auth';
import ApplicationReducer from './application';
import CastingReducer from './casting';

export default combineReducers({
  auth: AuthReducer,
  application: ApplicationReducer,
  casting: CastingReducer,
});
