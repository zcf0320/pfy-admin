import Cookies from 'js-cookie';
import {
  getAllCityList,
  getSysLogs,
  getSysLogsFe,
  getImageUrl,
  getSysConfig,
  getPersonCredit,
  updatePassword,
  getNoticeList,
  getUserRole
} from '@/api/system';
import { getAll } from '@/api/notification';
const state = {
  sidebar: {
    // opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    opened: true,
    withoutAnimation: false
  },
  device: 'desktop',
//   size: Cookies.get('size') || 'medium',
  proviceList: [],
  // 网点列表
//   siteList: [],
  // 企业城市列表
  companyCityList: [],
  // 个人企业列表
  personCityList: [],
  // 地区级联数据
  locationList: [],
  // 职业数据
  jobList: [],
  allCityList: [],
  articleList: {
    1: [],
    2: []
  },
  // 保险产品职业列表
//   getInsuredJob: [],
  // 用户中心弹框状态
  userCenterShow: false,
  // 分页记录数据
  pageNum: 0,
  employeeInfo: {
    headPortrait: ''
  },
  noticeList: [],
  barStatus: true, // 菜单收缩展开
  showInput: false // 客服查询
};

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened;
    state.sidebar.withoutAnimation = false;
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1);
    } else {
      Cookies.set('sidebarStatus', 0);
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0);
    state.sidebar.opened = false;
    state.sidebar.withoutAnimation = withoutAnimation;
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device;
  },
//   SET_SIZE: (state, size) => {
//     state.size = size;
//     Cookies.set('size', size);
//   },
  SET_PROVICE: (state, data) => {
    state.proviceList = data;
  },
//   SET_SITE: (state, data) => {
//     state.siteList = data;
//   },
  SET_COMPANY_CITY_LIST: (state, data) => {
    state.companyCityList = data;
  },
  SET_PERSON_CITY_LIST: (state, data) => {
    state.personCityList = data;
  },
  SET_ALL_CITY_LIST: (state, data) => {
    state.allCityList = data;
  },
  SET_SYS_CONFIG: (state, data) => {
    state.sysConfig = data;
  },
  SET_ARTICLE_LIST: (state, data) => {
    state.articleList = data;
  },
  CHANGE_USER_CENTER: (state, data) => {
    state.userCenterShow = data;
  },
  SET_PAGE_NUM: (state, data) => {
    state.pageNum = data;
  },
  SET_EMPLOEE_INFO: (state, employeeInfo) => {
    Object.assign(state.employeeInfo, employeeInfo);
  },
  SET_AVATAR: (state, data) => {
    state.employeeInfo.headPortrait = data;
  },
  SET_NOTICE_LIST: (state, data) => {
    state.noticeList = data;
  },
  TOGGLE_BAR: state => {
    state.barStatus = !state.barStatus;
  },
  SET_SHOW_INPUT: state => {
    state.showInput = !state.showInput;
  }
};

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR');
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation);
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device);
  },
//   setSize({ commit }, size) {
//     commit('SET_SIZE', size);
//   },
  // 获取省份列表
//   getProviceList({ commit }) {
//     // 获取省份
//     return new Promise((resolve, reject) => {
//       getProvice()
//         .then(response => {
//           const { records } = response;
//           let proviceList = [];
//           proviceList = records.filter(item => {
//             return item.cityPid === '0';
//           });
//           getPersonCity().then(rs => {
//             const { obj } = rs;
//             proviceList.forEach(item => {
//               item.children = [];
//               item.value = item.id;
//               item.label = item.cityName;
//               obj.forEach(pItem => {
//                 if (item.id === pItem.cityPid) {
//                   pItem.value = pItem.id;
//                   pItem.label = pItem.cityName;
//                   item.children.push(pItem);
//                 }
//               });
//             });

//             const result = proviceList.filter(cItem => {
//               return cItem.children.length > 0;
//             });
//             commit('SET_PERSON_CITY_LIST', result);
//           });
//           commit('SET_PROVICE', proviceList);
//           resolve(response);
//         })
//         .catch(error => {
//           reject(error);
//         });
//     });
//   },
  // 获取个人省份列表
  //   getPersonCityList(ctx) {
  //     // 获取省份
  //     return new Promise((resolve, reject) => {
  //       getPersonCity()
  //         .then(response => {
  //           resolve(response);
  //         })
  //         .catch(error => {
  //           reject(error);
  //         });
  //     });
  //   },
  // 获取省份列表
//   getCompanyCityList({ commit }) {
//     // 获取省份
//     return new Promise((resolve, reject) => {
//       getCompanyCity()
//         .then(response => {
//           const { obj } = response;
//           let proviceList = [];
//           if (obj.length) {
//             proviceList = obj.filter(item => {
//               return item.cityPid === '0';
//             });
//             proviceList.forEach(item => {
//               item.children = [];
//               item.value = item.id;
//               item.label = item.cityName;
//               obj.forEach(rItem => {
//                 if (item.id === rItem.cityPid) {
//                   rItem.value = rItem.id;
//                   rItem.label = rItem.cityName;
//                   item.children.push(rItem);
//                 }
//               });
//             });
//           }
//           commit('SET_COMPANY_CITY_LIST', proviceList);
//           resolve(response);
//         })
//         .catch(error => {
//           reject(error);
//         });
//     });
//   },
  // 获取网点列表
//   getSiteList({ commit }) {
//     // 获取省份
//     return new Promise((resolve, reject) => {
//       getServiceSiteList()
//         .then(response => {
//           const { records } = response;
//           commit('SET_SITE', records);
//           resolve(response);
//         })
//         .catch(error => {
//           reject(error);
//         });
//     });
//   },
  // 获取地区级联数据
  getLocations() {
    return new Promise((resolve, reject) => {
      getAllCityList()
        .then(res => {
          state.locationList = res.obj;
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 获取职业数据
//   getJobsList() {
//     getJobsList().then(res => {
//       state.jobList = res.obj;
//     });
//   },
  // 获取保险产品职业列表
//   getInsuredJob() {
//     getInsuredJob().then(res => {
//       state.getInsuredJob = res.obj;
//     });
//   },
  // 操作日志
  getSysLogs(ctx, params) {
    return getSysLogs(params);
  },
  // 独立Ai操作日志
  getSysLogsFe(ctx, params) {
    return getSysLogsFe(params);
  },
  // 获取图片地址
  getImageUrl(ctx, params) {
    return getImageUrl(params);
  },
  // 获取所有城市列表
  getAllCityList({ commit }) {
    getAllCityList().then(res => {
      commit('SET_ALL_CITY_LIST', res.obj);
      return Promise.resolve();
    });
  },
  // 获取配置选项
  getSysConfig(ctx, params) {
    return getSysConfig(params);
  },
  // 查询个人信用
  getPersonCredit(ctx, params) {
    return getPersonCredit(params);
  },
  // 修改密码
  updatePassword(ctx, params) {
    return updatePassword(params);
  },
  // 获取未读消息
  getNoticeList({ commit }, params) {
    getNoticeList(params).then(res => {
      const article = {
        1: [...res.obj.noticeDtoList],
        2: []
      };
      commit('SET_ARTICLE_LIST', article);
      commit('SET_EMPLOEE_INFO', res.obj.employee);
      const data = {
        employeeId: res.obj.employee.id,
        pageNum: 1,
        pageSize: 5
      };
      getAll(data).then(resp => {
        commit('SET_NOTICE_LIST', resp.records);
      });
    });
  },
  // 获取用户角色
  getUserRole(ctx, params) {
    return new Promise((resolve, reject) => {
      getUserRole(params)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  toggleBar({ commit }) {
    commit('TOGGLE_BAR');
  },
  setShowInput({ commit }) {
    commit('SET_SHOW_INPUT');
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
