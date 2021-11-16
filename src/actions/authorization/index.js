import * as types from '../mutation-types';

export function login(state){
  return {
    type:types.LOGIN,
    payload:state
  };
}