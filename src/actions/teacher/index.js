import * as types from '../mutation-types';

export function updateTeacher(state){
  return {
    type:types.UPDATE_TEACHER,
    payload:state
  };
};

export function openRevisingAssignment(state){
  return {
    type:types.OPEN_REVISING_ASSIGNMENT,
    payload:state
  };
};

export function closeRevisingAssignment(){
  return {
    type:types.CLOSE_REVISING_ASSIGNMENT,
  };
};

export function removeAssignment(state){
  return {
    type :types.REMOVE_ASSIGNMENT,
    payload:state
  };
};

export function addAssignment(state){
  return {
    type : types.ADD_ASSIGNMENT,
    payload:state
  };
};