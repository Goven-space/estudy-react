import * as types from '@/actions/mutation-types';
const initialState = {
  form:{
    username:null,
    password:null,
  },
};

const mutations = {
  [types.LOGIN](state,action){
    return  {
      ...state.form,
      ...action.payload
    };
  },
};

export default function(state = initialState,action){
  if(!mutations[action.type]) return state;
  return mutations[action.type](state,action);
}