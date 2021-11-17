import React from 'react';
import {Form,Input,Button} from 'antd';
import {UserOutlined,LockOutlined} from '@ant-design/icons';
import {connect} from 'react-redux';

@connect((state)=>{
  return state.AuthorizationReducer
})
export default function Authorization() {
  const [form] = Form.useForm();
  const handleSubmit = (values) => {
    
  };
  return (
    <div className="authorization">
      <Form 
        form={form}
        onFinish={handleSubmit}
      >
        {/* 用户名输入框 */}
        <Form.Item 
          className="filed"
          name="username"
          rules={[
            {
              required: true,
              message: '用户名是必须的',
            }
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="请输入用户名"
          />
        </Form.Item>
        {/* 密码输入框  */}
        <Form.Item 
          className="filed"
          name="password"
          rules={[
            {
              required: true,
              message: '密码是必须的',
            }
          ]}
        >
          <Input
            prefix={<LockOutlined/>}
            type="password"
            placeholder="请输入密码"
          />
        </Form.Item>
        <Form.Item className="filed">
          <Button type="primary" htmlType="submit">提交</Button>
        </Form.Item>
      </Form >
    </div >
  );
}