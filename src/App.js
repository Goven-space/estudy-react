import React, { Component ,Suspense,lazy } from 'react';
import { Layout } from 'antd';
import { Route, Switch ,Redirect ,BrowserRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import {updateTeacher} from '@/actions/teacher';
import {updataStudent} from '@/actions/student';
import {getToken,logout} from '@/actions/authorization';
import {api} from '@/utils/api';
import propTypes from 'prop-types';
// import {asyncComponent} from './utils/asyncComponent';

// 路由懒加载
let Authorization = lazy(() => import('./components/Authorization'));
let TeacherContent = lazy(() =>  import('./components/teacher/Content'));
let StudentContent = lazy(() =>  import('./components/student/Content'));
let TeacherHeader = lazy(() =>  import('./components/teacher/Header')) ;
let StudentHeader = lazy(() =>  import('./components/student/Header'));
let HeaderCommon = lazy(() =>  import('./components/Common.jsx'));

const { Header, Content } = Layout;


class App extends Component{
  constructor(props){
    super(props);
    this.checkedLogin();
  };
  loadDetails = () => {
    const {isTeacher,updateTeacher,updataStudent} = this.props;
    if (isTeacher==='teacher') {
      api.get('/teacher/detail').then(data => {
        updateTeacher(data);
      });
    } else {
      api.get('/student/detail').then(data => {
        updataStudent(data);
      });
    }
  };
  checkedLogin = () => {
    const {token,getToken,loggedIn,logout} = this.props; 
    if(loggedIn){
      api.defaults.headers.common['Token'] = token;
      api.post('/auth/refreshToken',{},{headers:{_slient:true}}).then(result =>{
        if(!!result){
          getToken(result);
          this.loadDetails();
        }else{
          logout();
        }
      }).catch(err => {
        logout();
      });
    }  
  };

  render(){
    const {loggedIn,isTeacher} = this.props;
    return (
      <BrowserRouter>
        <Layout className="App">
          <Header className="header flexrow">
            <h2>eStudy</h2>
            <div className="right flexrow" >
              <Suspense fallback={<div>Loading...</div>}>
                <Route path="/teacher" component={TeacherHeader}/>
                <Route path="/student" component={StudentHeader}/>
                <Route path="/:limit" component={HeaderCommon}/>
              </Suspense>
            </div>
          </Header>
          <Content className="Content">
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route path="/teacher" component={TeacherContent} />
                <Route path="/student" component={StudentContent} />
                <Route path="/" component={Authorization} />
              </Switch>
            </Suspense>
            {loggedIn?<Redirect to={`/${isTeacher}`} />:<Redirect to='/estudy-react' />}
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
    updataStudent: (params) => dispatch(updataStudent(params)),
    getToken: (params) => dispatch(getToken(params)),
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(App);

App.propTypes = {
  loggedIn:propTypes.bool,
  isTeacher:propTypes.string,
  token:propTypes.string,
  updateTeacher:propTypes.func,
  updataStudent:propTypes.func,
  getToken:propTypes.func,
  logout:propTypes.func
};

App.defaultProps = {
  loggedIn:false,
  isisTeacher:'',
  token:'',
  updateTeacher:()=>null,
  updataStudent:()=>null,
  getToken:()=>null,
  logout:()=>null,
};