import * as types from '@/actions/mutation-types';

const initialState = {
  teacherAssignments : [],
  teacherOrgs :[],
  revisingAssignment:false,
};

const mutations = {
  [types.UPDATE_TEACHER](state,action){
    console.log(action.payload);
    return {
      ...state,
      teacherAssignments:action.payload.assignments,
      teacherOrgs:action.payload.orgs
    };
  },
  [types.OPEN_REVISING_ASSIGNMENT](state,action){
    return {
      ...state,
      revisingAssignment: action.payload
    };
  },
  [types.CLOSE_REVISING_ASSIGNMENT](state,action){
    return {
      ...state,
      revisingAssignment: false
    };
  },
  [types.REMOVE_ASSIGNMENT](state,action){
    const index = state.teacherAssignments.findIndex(assignment => assignment.assignment_id == action.payload);
    return {
      ...state,
      teacherAssignments: state.teacherAssignments.splice(index,1)
    };
  },
};

export default function(state=initialState,action){
  if(!mutations[action.type]) return state;
  return mutations[action.type](state,action);
};