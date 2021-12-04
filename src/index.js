import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import 'antd/dist/antd.css';
import App from './App';
import {Provider} from 'react-redux';
import configureStore from './store';
import { PersistGate } from 'redux-persist/es/integration/react';
import moment from 'moment';

// antd中文配置
import zhCN from 'antd/lib/locale/zh_CN';
import 'moment/locale/zh-cn';
import {ConfigProvider} from 'antd';

moment.locale('zh-cn');
// 中文

const { persistor, store } = configureStore();//redux数据持久化

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ConfigProvider locale={zhCN}>
        <App key={zhCN}/>
      </ConfigProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
