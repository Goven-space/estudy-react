import React from 'react';
import { Table ,Button, Popconfirm, message} from 'antd';
import {connect} from  'react-redux';
import {openRevisingAssignment,closeRevisingAssignment,removeAssignment} from '@/actions/teacher';
import {api} from '@/utils/api';
import propTypes from 'prop-types';
import {DownloadOutlined,PlusSquareOutlined,MinusSquareOutlined,FormOutlined} from '@ant-design/icons';



function TeacherContent(props){
  const {
    teacherAssignments,
    revisingAssignment,
    openRevisingAssignment,
    closeRevisingAssignment
  } = props;

  const downloadHost = 'http://www.goven-zone.xyz:80/teacher/download';

  const work_status = {
    '0' : '待批改',
    '1' : '需完善',
    '2' : '已完成'
  };

  // 删除作业函数
  const delConfirm = (id) => {
    const {removeAssignment} = this.props;
    api.post('/teacher/deleteAssignment',{id}).then(() => {
      removeAssignment(id);
      message.success('删除成功');
    });
  };
  
  // 主列表==========================
  const columns = [
    {
      title: '课程',
      dataIndex: 'org_name',
    },
    {
      title: '作业名称',
      dataIndex: 'name',
    },
    {
      title: '开始-截止时间',
      key:'time',
      render: (text, record) => (
        <span >{`${record.start_time}-${record.end_time}`}</span>
      ),
    },
    {
      title: '状态',
      key:'status',
      render: (text, record) => (
        <span >{`${record.student_count} 个学员/ ${record.work_count} 个提交` + 
        (record.work_count>0 ? ` - ${record.work_update_time}` : '')}</span>
      ),
    },
    {
      title: '操作',
      key:'control',
      render: (text, record) => (
        <>
          {
            record.work_count<1
              ?<Popconfirm 
                title="确定删除该作业？"
                onConfirm={()=>{this.delConfirm(record.assignment_id);}}
                okText="Yes"
                cancelText="No">
                <Button>删除</Button>
              </Popconfirm>
              :<>
                {
                  !!revisingAssignment
                    ?(<Button type="primary" onClick={closeRevisingAssignment}><MinusSquareOutlined />收回</Button>)
                    :<Button type="primary" onClick={()=>openRevisingAssignment(record)}><PlusSquareOutlined />展开</Button>
                }
                <a href={`${downloadHost}All?id=${record.assignment_id}`}>
                  <Button><DownloadOutlined />下载全部</Button>
                </a>
              </>
          }
        </>
      ),
      filteredValue:revisingAssignment ? [revisingAssignment.assignment_id] : null,
      onFilter(value,record){
        return value == record.assignment_id;
      }
    },
  ];

  //副列表=======================
  const workColumns = [
    {
      title : '学员名字',
      dataIndex : ['user','full_name']
    },
    {
      title : '学号',
      dataIndex : ['user','name'] 
    },
    {
      title : '提交作业名称',
      dataIndex : 'student_upload_name'
    },
    {
      title : '提交时间',
      dataIndex : 'commit_time'
    },
    {
      title : '状态',
      key: 'work_status',
      render(text,record){
        return (
          <span>{work_status[record.status]}</span>
        );
      }
    },
    {
      title : '操作',
      key: 'work_control',
      render(text,record){
        return (
          <>
            <a href={`${downloadHost}?id=${record.id}&type=student&flag=ture`} target="_blank">
              <Button><DownloadOutlined />下载</Button>
            </a>
            <Button type="primary" onClick="">
              <FormOutlined />
              批改
            </Button>
          </>
        );
      }
    }
  ];

    
  return (
    <>
      <Table columns={columns} dataSource={teacherAssignments} rowKey={(record => record.assignment_id)} pagination={false}/>
      {
        !!revisingAssignment
          ?<Table columns={workColumns} dataSource={revisingAssignment.works} rowKey={(work => work.id)} />
          :null
      }
      
    </>
  );  
};

const mapStateToProps  = (state) =>  state.TeacherReducer;

const mapDispathToProps = (dispatch) => {
  return {
    openRevisingAssignment:(params)=>dispatch(openRevisingAssignment(params)),
    closeRevisingAssignment:()=>dispatch(closeRevisingAssignment()),
    removeAssignment:(params)=>dispatch(removeAssignment(params)),
  };
};

TeacherContent.propTypes = {
  teacherAssignments:propTypes.array,
  revisingAssignment:propTypes.bool,
  openRevisingAssignment:propTypes.func,
  closeRevisingAssignment:propTypes.func,
  removeAssignment:propTypes.func,
};

TeacherContent.defaultProps = {
  teacherAssignments:[],
  revisingAssignment:false,
  openRevisingAssignment: ()=>null,
  closeRevisingAssignment: ()=>null,
  removeAssignment: ()=>null,
};


export default connect(mapStateToProps,mapDispathToProps)(TeacherContent);