import { login, getListByUserName } from '@/api/user';
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth';
import router, { resetRouter } from '@/router';
import { isEmptyObject } from '@/utils/ObjectUtils';
import { recursionAuth } from '../../utils/common';

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: ['admin'],
  menuList: [],
  pageAuthority: {},
  changePassword: false,
  isShowCode: false,
  isShowTips: false
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: state => {
    state.roles = ['admin'];
  },
  SET_MENU_LIST: (state, menuList) => {
    state.menuList = menuList;
  },
  SET_PAGE_AUTHORITY: (state, pageAuthority) => {
    state.pageAuthority = pageAuthority;
  },
  CHANGE_PASSWORD: (state, status) => {
    state.changePassword = status;
  },
  SET_CODE: (state, isShowCode) => {
    state.isShowCode = isShowCode;
  },
  CHANGE_PASSWORD_TIPS: (state, isShowTips) => {
    state.isShowTips = isShowTips;
  }
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password: password,
        grant_type: 'password',
        scope: 'select',
        client_id: 'client_p',
        client_secret: 'ghcare2020',
        userplatform: 'senro-tree'
      })
        .then(res => {
          const { data, status, message } = res;
          if (status) {
            commit('SET_TOKEN', data.access_token);
            setToken(`Bearer ${data.access_token}`);
            resolve();
          } else {
            reject(message);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // get user info
  // getInfo({ commit, state }) {
  //     return new Promise((resolve, reject) => {
  //         getInfo(state.token)
  //             .then(response => {
  //                 const { data } = response;

  //                 if (!data) {
  //                     reject("Verification failed, please Login again.");
  //                 }

  //                 const { roles, name, avatar, introduction } = data;

  //                 // roles must be a non-empty array
  //                 if (!roles || roles.length <= 0) {
  //                     reject("getInfo: roles must be a non-null array!");
  //                 }

  //                 commit("SET_ROLES", roles);
  //                 commit("SET_NAME", name);
  //                 commit("SET_AVATAR", avatar);
  //                 commit("SET_INTRODUCTION", introduction);
  //                 resolve(data);
  //             })
  //             .catch(error => {
  //                 reject(error);
  //             });
  //     });
  // },

  // user logout
  logout({ commit }) {
    return new Promise(resolve => {
      //   logout(state.token).then(() => {
      commit('SET_TOKEN', '');
      commit('SET_MENU_LIST', []);
      const pollingST = localStorage.getItem('polling');
      if (pollingST) clearTimeout(pollingST);

      localStorage.clear();
      removeToken();
      resolve();
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '');
      //   commit('SET_ROLES', [])
      removeToken();
      resolve();
    });
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token';

      commit('SET_TOKEN', token);
      setToken(token);

      const { roles } = await dispatch('getInfo');

      resetRouter();

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, {
        root: true
      });

      // dynamically add accessible routes
      router.addRoutes(accessRoutes);

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true });

      resolve();
    });
  },
  // 获取用户权限
  getListByUserName(ctx, params) {
    return getListByUserName(params);
  },
  // 赋值菜单权限
  setMenuList({ commit }, menuList) {
    const pageAuthority = recursionAuth(menuList);
    if (isEmptyObject(menuList)) {
      return;
    }
    const ids = ['100501', '170601', '110301', '180101', '180102'];
    const list = [];
    menuList.forEach(item => {
      item.children.forEach(child => {
        child.hasRemind = false;
        child.children &&
          child.children.forEach(auth => {
            if (auth.flag && ids.includes(auth.value)) {
              list.push(auth.value);
            }
            if (auth.remindNumber) {
              child.hasRemind = true;
            }
          });
      });
    });
    commit('SET_MENU_LIST', menuList);
    commit('SET_PAGE_AUTHORITY', pageAuthority);
    commit('SET_CODE', list && list.length > 0 ? true : false); // 判断是否展示报表二维码
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
