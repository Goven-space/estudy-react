import React ,{useState } from 'react';
import { Button , Modal ,Form ,Input ,Select ,DatePicker} from 'antd';
import {FileAddOutlined} from '@ant-design/icons';
import {connect} from 'react-redux';

const { Option } = Select;
const { RangePicker } = DatePicker;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

function TeacherHeader({teacherOrgs}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <div className="flexrow">
        <h3>
          <span>luwei</span>
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
      <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form>
          <Form.Item 
            name="org_id" 
            label="班级" 
            {...formItemLayout}
            rules={[
              {
                required: true,
                message: '必须选择班级',
              }
            ]}
          >
            <Select placeholder="请选择班级">
              {teacherOrgs.map((org,index) => {
                return (<Option key={org.id}>{org.full_name}</Option>);
              })}
            </Select>
          </Form.Item>
          <Form.Item 
            label="作业名称" 
            {...formItemLayout}
            rules={[
              {
                required: true,
                message: '必须写上作业名称',
              }
            ]}
          >
            <Input placeholder="请输入作业名称" />
          </Form.Item>
          <Form.Item 
            label="开始/结束时间"
            label-col="{ span: 5 }"
            rules={[
              {
                required: true,
                message: '请选择在什么时间内完成该作业',
              }
            ]}
          >
            <RangePicker showTime format="YYYY-MM-DD" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    teacherOrgs:state.TeacherReducer.teacherOrgs
  };
};

export default connect(mapStateToProps)(TeacherHeader);