import React ,{useState} from 'react';
import { Table,Modal,Select,Form,Input,Button, Popconfirm, message,Upload} from 'antd';
import {connect} from  'react-redux';
import {openRevisingAssignment,closeRevisingAssignment,removeAssignment} from '@/actions/teacher';
import {api} from '@/utils/api';
import propTypes from 'prop-types';
import {DownloadOutlined,PlusSquareOutlined,MinusSquareOutlined,FormOutlined,UploadOutlined} from '@ant-design/icons';


const {Option} = Select;
const { TextArea } = Input;

// 批改串口元素位置
const checkAssiLayout = {
  labelCol:{ span: 5 },
  wrapperCol:{ span: 16 }
};

function TeacherContent(props){
  const {
    teacherAssignments,
    revisingAssignment,
    openRevisingAssignment,
    closeRevisingAssignment
  } = props;

  console.log(teacherAssignments);
  const [checkAssignment,setCheckAssignment] = useState([]);

  const baseHost = 'http://www.goven-zone.xyz:80';
  const downloadHost = baseHost + '/teacher/download';
  const reviewHost = baseHost + '/teacher/review';

  // 打开批改窗口
  const handleCheckAssignment = (record) => {
    setCheckAssignment(record);
  };

  // 关闭批改窗口
  const handleCheckAssiCancel = () => {
    setCheckAssignment([]);
  };
    
  // 提交批改信息
  const submitCheckAssignment = (values) =>{
    console.log(values);
    const checkForm = {
      id : checkAssignment.id,
      review:values.review,
      status:values.status
    };
    console.log(checkForm);
    api.post(reviewHost,checkForm).then(data => {
      console.log(data);
      // Object.entries(data).forEach(item => this.$set(this.checkAssignment,item[0],item[1]));
    }).finally(() => {
      // checkAssignment = [];
    });
  };

  
  

  const work_status = [
    '待批改',
    '需完善',
    '已完成'
  ];

  // 删除作业函数
  const delConfirm = (id) => {
    const {removeAssignment} = props;
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
                onConfirm={()=>{delConfirm(record.assignment_id);}}
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
            <Button type="primary" onClick={()=>handleCheckAssignment(record)}>
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
      <Modal
        visible={checkAssignment.length != 0}
        footer={false}
        onCancel={handleCheckAssiCancel}
        destroyOnClose={true}
      >
        <Form onFinish={submitCheckAssignment}>
          <Form.Item 
            label='状态'
            name='status'
            {...checkAssiLayout}
          >
            <Select placeholder={work_status[checkAssignment.status]}>
              {work_status.map((status,index) =>{
                return (
                  <Option 
                    key={index}
                    name="status"
                  >
                    { status }
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label='批改意见'
            name='review'
            {...checkAssiLayout}
          >
            <TextArea placeholder={checkAssignment.teacher_review} autoSize={true}></TextArea>
          </Form.Item>
          <Form.Item
            label='附件'
            {...checkAssiLayout}
          >
            <Upload>
              <Button icon={<UploadOutlined />}>上传</Button>
            </Upload>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 16, offset: 5 }}>
            <Button type="primary" htmlType="submit">保存</Button>
          </Form.Item>
        </Form>
      </Modal>
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
  checkAssignment:propTypes.array,
};

TeacherContent.defaultProps = {
  teacherAssignments:[],
  revisingAssignment:false,
  openRevisingAssignment: ()=>null,
  closeRevisingAssignment: ()=>null,
  removeAssignment: ()=>null,
  checkAssignment:[]
};


export default connect(mapStateToProps,mapDispathToProps)(TeacherContent);