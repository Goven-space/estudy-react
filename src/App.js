import React, { Component } from 'react';
import { Layout } from 'antd';
import { Route, Switch ,Redirect ,BrowserRouter} from 'react-router-dom';
import TeacherHeader from './components/teacher/Header';
import TeacherContent from './components/teacher/Content';
import StudentHeader from './components/student/Header';
import HeaderCommon from './components/Common.jsx';
import Authorization from './components/Authorization';
import { connect } from 'react-redux';
import {updateTeacher} from '@/actions/teacher';
import {getToken,logout} from '@/actions/authorization';
import {api} from '@/utils/api';


const { Header, Content } = Layout;


class App extends Component{
  constructor(props){
    super(props);
    this.checkedLogin();
  };
  loadDetails = () => {
    const {isTeacher,updateTeacher} = this.props;
    if (isTeacher==='teacher') {
      api.get('/teacher/detail').then(data => {
        updateTeacher(data);
      });
    } else {
      
    }
  };
  checkedLogin = () => {
    const {token,getToken,logout} = this.props;
    api.defaults.headers.common['Token'] = token;
    api.post('/auth/refreshToken',{},{headers:{_slient:true}}).then(result =>{
      getToken(result);
      this.loadDetails();
    }).catch(err => {
      logout();
    });
  };

  render(){
    const {loggedIn,isTeacher} = this.props;
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
              <Route path="/" component={Authorization} />
            </Switch>
            {loggedIn?<Redirect to={`/${isTeacher}`} />:<Redirect to='/' />}
          </Content>  
        </Layout>
      </BrowserRouter>
    );
  };
};

const mapStateToProps = ({AuthorizationReducer}) => {
  return {
    loggedIn:AuthorizationReducer.loggedIn,//登录状态
    isTeacher:AuthorizationReducer.info.is_admin?'teacher':'student',//权限
    token:AuthorizationReducer.info.token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateTeacher: (params) => dispatch(updateTeacher(params)),
    getToken: (params) => dispatch(getToken(params)),
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(App);