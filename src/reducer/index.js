import {combineReducers} from 'redux';
import AuthorizationReducer from './authorization';
import TeacherReducer from './teacher';

export default combineReducers({
  AuthorizationReducer,
  TeacherReducer
});