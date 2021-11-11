import './App.scss';
import { Layout } from 'antd';
const { Header, Content } = Layout;

function App() {
  return (
    <Layout className="App">
      <Header className="header flexrow">
        <h2>eStudy</h2>
        {/* <div class="right flexrow" v-if="loggedIn">
        <!-- 老师界面 -->
        <div v-if="isTeacher" class="flexrow">
          <h3>
            <span>{{info.full_name}}</span>
          </h3>
          <a-button
            icon="file-add"
            class="vcenter"
            type="primary"
            @click="showAssignment = true"
          >新建作业</a-button>
        </div>
        <!-- 学生界面 -->
        <div class="flexrow" v-else>
          <h3 class="flexcol">
            <span>{{info.full_name}}</span>
            <span>学号:{{info.name}}</span>
          </h3>
          <h4 class="flexcol">
            <span v-for="(org,value) in studentOrgs" :key="`${org}_${value}`">{{org}}</span>
          </h4>
          <div>
            <span class="label">{{stats.uncommitted}}个作业待提交</span>
            <span class="label">{{stats.revising}}个作业待批改</span>
            <span class="label">{{stats.improvable}}个作业需完善</span>
            <span class="label">{{stats.finished}}个作业已完成</span>
          </div>
        </div>
        <a class="vcenter" href="https://github.com/Goven-space" target="_blank">
          <a-button icon="home">代码仓库</a-button>
        </a>
        <a-button class="vcenter" icon="logout" @click="$store.dispatch('user/logout')">退出</a-button>
      </div> */}
      </Header>
      <Content>Content</Content>
      
    </Layout>
  );
}

export default App;
