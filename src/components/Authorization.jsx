import React from 'react';
import {Form,Input,Button,message} from 'antd';
import {UserOutlined,LockOutlined} from '@ant-design/icons';
import {connect} from 'react-redux';
import {login} from '@/actions/authorization';
import {updateTeacher} from '@/actions/teacher';
import propTypes from 'prop-types';
import {api} from '@/utils/api';

// 将redux绑定到组件的props上
export default connect((state)=>{
  return {
    loggedIn:state.AuthorizationReducer.loggedIn,
  };
},(dispatch)=>{
  return {
    login: (params)=>dispatch(login(params)),
    updateTeacher: (params) => dispatch(updateTeacher(params))
  };
})(Authorization);

// 组件Authorization
function Authorization({login,updateTeacher}) {

  const [form] = Form.useForm();

  // 登录表单提交事件放啊
  const handleSubmit = (values) => {
    api.post('/auth/login',values).then(result=>{
      login(result);
      api.defaults.headers.common['Token'] = result.token;
      message.success('登录成功');
      return Promise.resolve(result.is_admin);
    }).catch(error=>{
      const errorMsg = error.response.data.msg;
      message.error(errorMsg);
    }).then((result)=>{
      if(result ===1){
        api.get('/teacher/detail').then(data => {
          updateTeacher(data);
        });
      }
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
  loggedIn:propTypes.bool,
  login:propTypes.func,
  updateTeacher:propTypes.func
};

Authorization.defaultProps = {
  loggedIn:false,
  login:() => null,
  updateTeacher:() =>null
};