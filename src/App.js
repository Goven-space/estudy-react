import React, { Component } from 'react';
import { Layout } from 'antd';
import { Route, Switch ,Redirect ,BrowserRouter} from 'react-router-dom';
import TeacherHeader from './components/teacher/Header';
import TeacherContent from './components/teacher/Content';
import StudentHeader from './components/student/Header';
import HeaderCommon from './components/Common.jsx';
import Authorization from './components/Authorization';
import { connect } from 'react-redux';


const { Header, Content } = Layout;

export default connect(({AuthorizationReducer}) => {
  return {
    loggedIn:AuthorizationReducer.loggedIn,//登录状态
    isTeacher:AuthorizationReducer.info.is_admin?'teacher':'student'//权限
  };
})(App);

function App ({loggedIn,isTeacher}){
  return (
    <BrowserRouter>
      <Layout className="App">
        <Header className="header flexrow">
          <h2>eStudy</h2>
          <div className="right flexrow" >
            <Route path="/teacher" component={TeacherHeader}/>
            <Route path="/student" component={StudentHeader}/>
            <Route path="/:limit" component={HeaderCommon}/>
          </div>
        </Header>
        <Content>
          <Switch>
            <Route path="/teacher"component={TeacherContent} />
            <Route path="/" component={Authorization}>
              {/* 登录后自动跳转路由 */}
              {loggedIn?<Redirect to={`/${isTeacher}`} />:null}
            </Route>
          </Switch>
        </Content>  
      </Layout>
    </BrowserRouter>
  );
};