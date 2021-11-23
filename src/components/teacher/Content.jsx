import React, {Component} from 'react';
import { Table, Tag, Space ,Button, Popconfirm, message} from 'antd';
import {connect} from  'react-redux';
import {openRevisingAssignment,closeRevisingAssignment,removeAssignment} from '@/actions/teacher';
import {api} from '@/utils/api';





class TeacherContent extends Component {
  constructor(props){
    super(props);
  };

  delConfirm = (id) => {
    const {removeAssignment} = this.props;
    api.post('/teacher/deleteAssignment',{id}).then(() => {
      removeAssignment(id);
      message.success('删除成功');
    });
  };

  render(){
    const {
      teacherAssignments,
      revisingAssignment,
      openRevisingAssignment,
      closeRevisingAssignment
    } = this.props;
    
    const columns = [
      {
        title: '课程',
        dataIndex: 'org_name',
        key: 'org_name',
      },
      {
        title: '作业名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '开始-截止时间',
        render: (text, record) => (
          <sapn >{`${record.start_time}-${record.end_time}`}</sapn>
        ),
      },
      {
        title: '状态',
        render: (text, record) => (
          <sapn >{`${record.student_count} 个学员/ ${record.work_count} 个提交` + 
          (record.work_count>0 ? ` - ${record.work_update_time}` : '')}</sapn>
        ),
      },
      {
        title: '操作',
        render: (text, record) => (
          record.work_count > 0?
            (!revisingAssignment?
              <Button onClick={()=>openRevisingAssignment(record)}>展开</Button>:
              <Button onClick={closeRevisingAssignment}>收回</Button>
            ):
            <Popconfirm 
              title="确定删除该作业？"
              onConfirm={()=>{this.delConfirm(record.assignment_id);}}
              okText="Yes"
              cancelText="No"
            >
              <Button>删除</Button>
            </Popconfirm>
        ),
        filteredValue:revisingAssignment ? [revisingAssignment.assignment_id] : null,
        onFilter(value,record){
          return value == record.assignment_id;
        }
      },
    ];
    
  
    return (
      <Table columns={columns} dataSource={teacherAssignments} pagination={false}/>
    );
  }
  
};

const mapStateToProps  = (state) =>  state.TeacherReducer;

const mapDispathToProps = (dispatch) => {
  return {
    openRevisingAssignment:(params)=>dispatch(openRevisingAssignment(params)),
    closeRevisingAssignment:()=>dispatch(closeRevisingAssignment()),
    removeAssignment:(params)=>dispatch(removeAssignment(params)),
  };
};


export default connect(mapStateToProps,mapDispathToProps)(TeacherContent);