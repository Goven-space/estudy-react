import * as types from '@/actions/mutation-types';

const initialState = {
  teacherAssignments : [],
  teacherOrgs :[],
};

const mutations = {
  [types.UPDATE_TEACHER](state,action){
    return {
      ...state,
      teacherAssignments:action.payload.assignments,
      teacherOrgs:action.payload.orgs
    };
  },

  // 删除作业
  [types.REMOVE_ASSIGNMENT](state,action){
    const index = state.teacherAssignments.findIndex(assignment => assignment.assignment_id == action.payload);
    const newteacherAssignments = [...state.teacherAssignments];
    newteacherAssignments.splice(index,1);
    return {
      ...state,
      teacherAssignments:[...newteacherAssignments]
    };
  },
  
  // 创建作业
  [types.ADD_ASSIGNMENT](state,action){
    const org = state.teacherOrgs.find(org => org.id == action.payload.org_id);
    action.payload.student_count = org.student_count;
    return {
      ...state,
      teacherAssignments:[action.payload,...state.teacherAssignments]
    };
  },
  // 退出登录
  [types.LOGOUT](state){
    return {
      ...initialState
    };
  },
  // 老师批改更新
  [types.UPDATE_REVIEW](state,action){
    const teacherAssignments = state.teacherAssignments;
    // 需要修改的评价(精确到某个作业的某个学生)
    const work = teacherAssignments[action.payload.assignment_index].works[action.payload.student_index];
    
    // 跟新作业中的两个属性
    work[status] = action.payload.status;
    work.teacher_review = action.payload.teacher_review;
    return {
      ...state, 
      teacherAssignments
    };
  }
};

export default function(state=initialState,action){
  if(!mutations[action.type]) return state;
  return mutations[action.type](state,action);
};