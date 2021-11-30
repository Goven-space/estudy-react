import {combineReducers} from 'redux';
import AuthorizationReducer from './authorization';
import TeacherReducer from './teacher';
import StudentReducer from './student';

export default combineReducers({
  AuthorizationReducer,
  TeacherReducer,
  StudentReducer
});