import * as types from '../mutation-types';

export function updataStudent(state){
  return {
    type: types.UPDATE_STUDENT,
    payload:state
  };
};