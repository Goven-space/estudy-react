// 引入axios
import axios from 'axios';

const api = axios.create({
  baseURL:'http://www.goven-zone.xyz:80'
});

// 设置请求头文件格式为json
api.defaults.headers.post['Content-Type'] = 'application/json';

//设置返回信息拦截器
api.interceptors.response.use(response => {
  return response.data.data;
},error => {
  const headers = error.config.headers;
  const response = error.response;
  if (! headers._slient) {
      
  };
  return Promise.reject(error);

});

export {api};