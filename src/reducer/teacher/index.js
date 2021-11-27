import * as types from '@/actions/mutation-types';

const initialState = {
  teacherAssignments : [],
  teacherOrgs :[],
  revisingAssignment:false,
};

const mutations = {
  [types.UPDATE_TEACHER](state,action){
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
    const newteacherAssignments = [...state.teacherAssignments];
    newteacherAssignments.splice(index,1);
    return {
      ...state,
      teacherAssignments:[...newteacherAssignments]
    };
  },
  [types.ADD_ASSIGNMENT](state,action){
    const org = state.teacherOrgs.find(org => org.id == action.payload.org_id);
    action.payload.student_count = org.student_count;
    return {
      ...state,
      teacherAssignments:[action.payload,...state.teacherAssignments]
    };
  },
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