import * as types from '@/actions/mutation-types';
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
};

export default function(state = initialState,action){
  if(!mutations[action.type]) return state;
  return mutations[action.type](state,action);
}