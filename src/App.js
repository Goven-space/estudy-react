import { Layout } from 'antd';
import { Route, Switch } from 'react-router-dom';
import TeacherHeader from './components/teacher/Header';
import StudentHeader from './components/student/Header';
import HeaderCommon from './components/Common.jsx';
import Authorization from './components/Authorization';



const { Header, Content } = Layout;

function App() {
  return (
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
        <Authorization path="/" component={Authorization} />
      </Content>  
    </Layout>
  );
}

export default App;
