import {
  isEmptyObject,
  isNotEmptyObject,
  extendObjects,
  copyProperties,
  delEmptyKey
} from './utils/ObjectUtils';

import validators from '@/utils/validate';
import { timeFormat } from '@/utils';
import * as filters from './filters'; // global filters
import moment from 'moment';
import * as enums from './utils/enum';

import store from './store';
import components from './ component';

// eslint-disable-next-line no-unused-vars
export default function install(Vue, options) {
  // ------------------------------------- 添加全局方法或属性  -------------------------------------
  // 常用对象方法
  // 判断是否为空
  Vue.prototype.$isEmpty = isEmptyObject;
  Vue.prototype.$isNotEmpty = isNotEmptyObject;
  // 对象继承
  Vue.prototype.$extends = extendObjects;
  // 对象copy
  Vue.prototype.$copyProps = copyProperties;
  // 删除对象中的空值key
  Vue.prototype.$delEmptyKey = delEmptyKey;
  // 校验规则
  Vue.prototype.$validators = validators;
  // 日期格式化成指定格式(默认 yyyy-MM-dd)
  Vue.prototype.$timeFormat = timeFormat;
  // 枚举对象值
  Vue.prototype.$enums = enums;
  moment.locale('zh-cn'); // 设置语言 或 moment.lang('zh-cn');
  Vue.prototype.$moment = moment; // 赋值使用
  // ------------------------------------- 组件注入 -------------------------------------
  components.forEach(component => {
    Vue.component(component.name, component);
  });
  // register global utility filters
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
  });
  Vue.mixin({
    data() {
      return {
        dialog: {
          visible: false
        }
      };
    },
    computed: {
      /**
       * 屏幕显示区域高度
       */
      clientHeight() {
        return (
          window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.offsetHeight
        );
      },
      /**
       * 屏幕显示宽度
       */
      clientWidth() {
        return (
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.offsetWidth
        );
      }
    },
    methods: {
      /**
       * 清空表单的校验内容
       * refName el-form组件对应的ref的值
       */
      clearValidate(refName) {
        if (!this.$isEmpty(refName)) {
          this.$nextTick(() => {
            this.$refs[refName].clearValidate();
          });
        }
      },
      // 消息提示
      hasAuth(val) {
        if (this.$isEmpty(val)) {
          this.$message.warning('您暂无权限查看详情，如果疑问请联系管理员');
          return false;
        }
        return true;
      },
      // 判断是否有菜单权限
      hasMenuAuth(pUrl, childUrl, sonUrl) {
        const menuList = store.state.user.menuList;
        const pMenu = menuList.find(item => item.url === pUrl);
        // 判断是否有权限
        if (!this.hasAuth(pMenu.children)) {
          return false;
        }
        const childMenu = pMenu.children.find(item => item.url === childUrl);
        // 判断是否有权限
        if (!this.hasAuth(childMenu)) {
          return false;
        }
        const sonMenu = childMenu.children.find(item => item.url === sonUrl);
        // 判断是否有权限
        if (!this.hasAuth(sonMenu)) {
          return false;
        }
        return true;
      }
    }
  });
}
