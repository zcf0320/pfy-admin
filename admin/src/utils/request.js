import axios from 'axios';
import { MessageBox, Message } from 'element-ui';
import store from '@/store';
import { getToken } from '@/utils/auth';
import router from '../router';
import JSONbig from 'json-bigint';

const timeout = 10000;
// const requestKey = new Set([]);

// 引入【json-bigint】包是因为后端返回的id值是long int类型，并且超出了js的最大安全整数的值（Number.MAX_SAFT_INTEGER）
const JSONbigToString = JSONbig({ storeAsString: true });

// create an axios service
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout,
  transformResponse: [
    function(data) {
      return JSONbigToString.parse(data);
    }
  ]
});

// request interceptor
service.interceptors.request.use(
  config => {
    // let cancelKey = config.data
    //   ? `${config.method}-${config.baseURL}${config.url}-${JSON.stringify(
    //       config.data
    //     )}`
    //   : `${config.method}-${config.baseURL}${config.url}-${JSON.stringify(
    //       config.params
    //     )}`;
    // // 生成唯一key,替换中间特殊符号
    // cancelKey = cancelKey.replace(/\\|"/g, '');
    // // 请求前检查是否存在未完成的接口
    // if (requestKey.has(cancelKey)) {
    //   return Promise.reject({
    //     code: 9999,
    //     message: '请求重复'
    //   });
    // } else {
    //   requestKey.add(cancelKey);
    //   // 请求超时后清除之前请求
    //   setTimeout(() => {
    //     if (requestKey.has(cancelKey)) {
    //       requestKey.delete(cancelKey);
    //     }
    //   }, timeout);
    // }
    if (store.getters.token) {
      config.headers['Authorization'] = getToken();
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// response interceptor
service.interceptors.response.use(
  /**
   * obj 微服务之前版本返回数据
   * data 微服务之后返回数据
   * statusCode 错误状态码
   */
  response => {
    // const { config } = response;
    let { data: res } = response;
    // let cancelKey = config.data
    //   ? `${config.method}-${config.url}-${JSON.stringify(config.data)}`
    //   : `${config.method}-${config.url}-${JSON.stringify(config.params)}`;
    // // 生成唯一key,替换中间特殊符号
    // cancelKey = cancelKey.replace(/\\|"/g, '');
    // // 请求完成移除之前的请求
    // if (requestKey.has(cancelKey)) {
    //   requestKey.delete(cancelKey);
    // }
    res = {
      ...res,
      obj: res.data, // 兼容微服务之前数据返回
      comment: res.message, // 兼容微服务之前接口信息
      code: res.status ? 0 : 1 // true 表示成功, false 失败
    };
    if (res.statusCode === 40001) {
      MessageBox.confirm('抱歉,您已经登录超时', '重新登录', {
        confirmButtonText: '重新登录',
        cancelButtonText: '关闭',
        type: 'warning'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload();
        });
      });
      return Promise.reject(res);
    } else if (res.statusCode === 40003) {
      if (window.location.hash !== '#/workflow') {
        // 首页没有权限
        // 暂无权限
        router.push({
          path: '/noPermission'
        });
      }
    } else if (res.statusCode === 40004) {
      store.commit('user/CHANGE_PASSWORD', true);
      store.commit('user/CHANGE_PASSWORD_TIPS', true);
      return res;
    } else if (res.statusCode === 70001) {
      Message({
        message: res.data.toString(),
        type: 'error',
        duration: 3000
      });
      return Promise.reject(res);
    }
    if (res.code) {
      if (
        // 首页没有权限
        window.location.hash === '#/workflow' &&
        res.statusCode === 40003
      ) {
        return false;
      }
      Message({
        message: res.message || '服务异常',
        type: 'error',
        duration: 3000
      });
      return Promise.reject(res || '服务异常');
    } else {
      return res;
    }
  },
  error => {
    if (error.message.indexOf('请求重复') === -1) {
      Message({
        message: error.message || '服务异常',
        type: 'error',
        duration: 3000
      });
      return Promise.reject(error);
    }
  },
);

export default service;
