import * as types from '@/actions/mutation-types';

const initialState = {
  studentOrgs : [],
  stats : {},
  studentAssignments : []
};


const mutations = {
  [types.UPDATE_STUDENT](state,action){
    return {
      ...state,
      studentOrgs:action.payload.orgs,
      stats:action.payload.stats,
      studentAssignments:action.payload.assignments
    };
  },
  // 退出登录
  [types.LOGOUT](state){
    return {
      ...initialState
    };
  },
};

export default function(state=initialState,action){
  if(!mutations[action.type]) return state;
  return mutations[action.type](state,action);
};