import React from 'react';
import {Form,Input,Button,message} from 'antd';
import {UserOutlined,LockOutlined} from '@ant-design/icons';
import {connect} from 'react-redux';
import {login} from '@/actions/authorization';
import propTypes from 'prop-types';
import {api} from '@/utils/api';

export default connect((state)=>{
  return state.AuthorizationReducer;
},(dispatch)=>{
  return {
    login: (params)=>dispatch(login(params))
  };
})(Authorization);

function Authorization({login}) {
  const [form] = Form.useForm();
  const handleSubmit = (values) => {
    api.post('/auth/login',values).then(result=>{
      console.log(result);
      login(result);
      message.success('登录成功');
    }).catch(error=>{
      console.log(error);
      message.error('用户名或密码错误');
    });
    ;
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
          name="name"
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

Authorization.propTypes = {

};