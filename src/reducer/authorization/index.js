import * as types from '@/actions/mutation-types';
import {api} from '@/utils/api';


const initialState = {
  loggedIn:false,
  info:{},
};

const mutations = {
  [types.LOGIN](state,action){
    return  {
      loggedIn:true,
      info:{
        ...state.info,
        ...action.payload
      }
    };
  },
  [types.GET_TOKEN](state,action){
    return {
      ...state,
      info:{
        ...state.info,
        token:action.payload
      }
    };
  },
  [types.LOGOUT](state){
    api.defaults.headers.common['Token'] = '';
    return {
      ...initialState
    };
  },
};

export default function(state = initialState,action){
  if(!mutations[action.type]) return state;
  return mutations[action.type](state,action);
}