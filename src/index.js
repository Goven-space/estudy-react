import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import 'antd/dist/antd.css';
import App from './App';
import {Provider} from 'react-redux';
import store from './store';
import moment from 'moment';

// antd中文配置
import zhCN from 'antd/lib/locale/zh_CN';
import 'moment/locale/zh-cn';
import {ConfigProvider} from 'antd';
// import reportWebVitals from './reportWebVitals';

moment.locale('zh-cn');
// 中文



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <App key={zhCN}/>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
