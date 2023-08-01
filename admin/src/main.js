import Vue from 'vue';
import Cookies from 'js-cookie';
import 'normalize.css/normalize.css'; // a modern alternative to CSS resets
import Element from 'element-ui';
import './styles/element-variables.scss';
import '@/styles/index.scss'; // global css
import App from './App';
import store from './store';
import router from './router';
// import './icons' // icon
import './permission'; // permission control
import './utils/error-log'; // error log
import Base from './base';
// 全局修复弹框点击遮罩不关闭弹框
Element.Dialog.props.closeOnClickModal.default = false;

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }
Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
});
// 基础方法、指令、组件安装
Vue.use(Base);
Vue.config.productionTip = false;
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
