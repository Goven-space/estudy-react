import './styles/App.scss';
import { Layout } from 'antd';
import { Route, Switch } from "react-router-dom";
import TeacherHeader from "./components/teacher/header"
import StudentHeader from "./components/student/header"



const { Header, Content } = Layout;

function App() {
  return (
    <Layout className="App">
      <Header className="header flexrow">
        <h2>eStudy</h2>

        <div className="right flexrow" >
          <Switch>
            <Route path="/teacher" component={TeacherHeader}/>
            <Route path="/student" component={StudentHeader}/>
          </Switch>
        
        {/* <a class="vcenter" href="https://github.com/Goven-space" target="_blank">
          <a-button icon="home">代码仓库</a-button>
        </a>
        <a-button class="vcenter" icon="logout" @click="$store.dispatch('user/logout')">退出</a-button> */}
      </div>

      </Header>
      <Content>Content</Content>
      
    </Layout>
  );
}

export default App;
