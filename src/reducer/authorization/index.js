import * as types from '@/actions.mutation-types';

const mutations = {
  [types.LOGIN](state,action){
    return  {
      ...state,
      ...action.payload
    };
  },
};

export default function(state,action){
  if(!mutations[action.type]) return state;
  return mutations[action.type](state,action);
}