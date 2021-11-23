import * as types from '../mutation-types';

// 获取登录信息
export function login(state){
  return {
    type:types.LOGIN,
    payload:state
  };
};


