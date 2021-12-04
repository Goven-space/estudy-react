import React ,{useState } from 'react';
import { Button , Modal ,Form ,Input ,Select ,DatePicker,message} from 'antd';
import {FileAddOutlined} from '@ant-design/icons';
import {connect} from 'react-redux';
import {api} from '@/utils/api';
import {addAssignment} from '@/actions/teacher';
import propTypes from 'prop-types';

const { Option } = Select;
const { RangePicker } = DatePicker;

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};


function TeacherHeader({teacherOrgs,full_name,addAssignment}) {
  
  const [form] = Form.useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);//作业创建窗口开关
  const [confirmLoading, setConfirmLoading] = React.useState(false);//异步延迟关闭创建窗口

  // 
  const showModal = () => {
    setIsModalVisible(true);
  };
  

  const handleCreateAssiCancel = () => {
    setIsModalVisible(false);
  };

  //创建作业表单提交
  const createAssignment = (values) => {
    setConfirmLoading(true);
    api.post('/teacher/createAssignment',
      {org_id:values.org_id,
        name:values.name,
        start_time:values.time_range[0],
        end_time:values.time_range[1]
      }
    ).then(data => {
      addAssignment(data);
      message.success('添加成功');
      setConfirmLoading(false);
      setIsModalVisible(false);
      
    });
  };
  // ===================================
  return (
    <>
      <div className="flexrow">
        <h3>
          <span class="user_info">{full_name}</span>
        </h3>
        <Button
          className="vcenter"
          type="primary"
          onClick={showModal}
        >
          <FileAddOutlined />
          新建作业
        </Button>
      </div >
      {/* 创建作业对话框 */}
      <Modal 
        visible={isModalVisible}
        onCancel={handleCreateAssiCancel}
        destroyOnClose={true}
        confirmLoading={confirmLoading}
        footer={false}
      >
        <Form 
          form={form}
          preserve={false}
          onFinish={createAssignment}
        >
          <Form.Item 
            name="org_id" 
            label="班级" 
            {...formItemLayout}
          >
            <Select placeholder="请选择班级">
              {teacherOrgs.map((org,index) => {
                return (<Option key={org.id}>{org.full_name}</Option>);
              })}
            </Select>
          </Form.Item>
          <Form.Item 
            label="作业名称" 
            name="name"
            {...formItemLayout}
          >
            <Input placeholder="请输入作业名称" />
          </Form.Item>
          <Form.Item 
            name="time_range"
            label="开始/结束时间"
            {...formItemLayout}
          >
            <RangePicker showTime format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
            <Button type="primary" htmlType="submit">保存</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};


const mapStateToProps = (state) => {
  return {
    teacherOrgs:state.TeacherReducer.teacherOrgs,
    full_name:state.AuthorizationReducer.info.full_name,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addAssignment:(params) => dispatch(addAssignment(params),)
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(TeacherHeader);

TeacherHeader.propTypes = {
  full_name:propTypes.string,
  teacherOrgs:propTypes.array,
  addAssignment:propTypes.func,
  isModalVisible:propTypes.bool,
  confirmLoading:propTypes.bool,
};

TeacherHeader.defaultProps = {
  full_name:'',
  teacherOrgs:[],
  addAssignment: ()=>null,
  isModalVisible:false,
  confirmLoading:false,
};