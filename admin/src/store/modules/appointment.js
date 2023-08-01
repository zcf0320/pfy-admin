import {
  sendMessageApi
} from '@/api/appointment';
const state = {
  // 新增个人预约弹框
  showPersionalModal: false,
  // 新增企业预约弹框
  showEnterpriseModal: false,
  // 添加新城市
  showAddNewCityModal: false,
  // 生成激活码
  showActivationModal: false,
  // 个人预约列表
  personalList: [],
  personalInfo: {
    infoPname: '', // 姓名
    infoIdcard: '', // 身份证号码
    infoPretime: '', // 预约时间
    provinceName: '', // 预约省份名称
    cityId: '', // 城市id
    siteId: '', // 网点id
    infoPhonenum: '', // 联系电话
    infoActiveCode: '', // 激活码
    recordStatus: '', // 预约状态，默认为待确认，0为待确认，1为成功，2为失败
    recordType: ''
  },
  companyInfo: {
    infoCompany: '', // 公司名称
    serviceName: '', // 服务名称
    infoPretime: '', // 预约时间
    provinceName: '', // 预约省份名称
    cityName: '', // 预约城市名称
    infoDetailAddress: '', // 详细地址
    infoPname: '', // 联系人姓名
    infoPhonenum: '', // 联系电话
    infoEmail: '', // 联系邮箱
    recordStatus: '', // 预约状态，默认为待确认，0为待确认，1为成功，2为失败
    recordType: ''
  },
  // 企业预约列表
  enterpriseList: [],
  // 企业预约设置列表
  enterpriseSettingList: [],
  // 激活码列表
  activeCodeList: [],
  // 个人设置
  personalSetting: {},
  // 删除企业预约的id
  deleteCompanyId: '',
  // 关闭理由列表
  closeReasonList: []
};

const mutations = {
  // 设置个人预约的弹框
  SET_PERSIONAL_MODAL: (state, data) => {
    state.showPersionalModal = data;
  },
  // 新增企业预约的弹框
  SET_ENTERPRISE_MODAL: (state, data) => {
    state.showEnterpriseModal = data;
  },
  // 新增城市的弹框
  SET_NEW_CITY: (state, data) => {
    state.showAddNewCityModal = data;
  },
  // 新增激活码的弹框
  SET_ACTIVATION_CODE: (state, data) => {
    state.showActivationModal = data;
  },
  // 个人预约列表
  GET_PERSONAL_LIST: (state, data) => {
    state.personalList = data;
  },
  // 个人信息
  GET_PERSONAL_INFO: (state, data) => {
    state.personalInfo = data;
  },
  // 企业列表
  SET_ENTERPRISE_LIST: (state, data) => {
    state.enterpriseList = data;
  },
  GET_ENTERPRISE_INFO: (state, data) => {
    state.companyInfo = data;
  },
  // 企业设置列表
  SET_ENTERPRISE_SETTING_LIST: (state, data) => {
    state.enterpriseSettingList = data || [];
  },
  // 个人设置
  SET_PERSONAL_SETTING: (state, data) => {
    state.personalSetting = data || {};
  },
  // 设置激活码列表
  SET_ACTIVATION_CODE_LIST: (state, data) => {
    state.activeCodeList = data;
  },
  // 设置删除企业预约id
  SET_DELETE_COMPANY_ID: (state, data) => {
    state.deleteCompanyId = data;
  },
  SET_REASON_LIST: (state, data) => {
    state.closeReasonList = data;
  }
};

const actions = {
  // 获取个人预约列表
//   getPersionalList({ commit }, params) {
//     return new Promise((resolve, reject) => {
//       getPersonList(params)
//         .then(response => {
//           commit('GET_PERSONAL_LIST', response.records);
//           resolve(response);
//         })
//         .catch(error => {
//           reject(error);
//         });
//     });
//   },
  // 添加/ 修改
//   savePersonInfo(ctx, params) {
//     return new Promise((resolve, reject) => {
//       addPersonInfo(params)
//         .then(response => {
//           resolve(response);
//         })
//         .catch(error => {
//           reject(error);
//         });
//     });
//   },
  // 个人详情
//   getPeopleInfo({ commit }, params) {
//     return new Promise((resolve, reject) => {
//       getPersonInfo(params)
//         .then(response => {
//           const { obj } = response;
//           commit('GET_PERSONAL_INFO', obj);
//           resolve(obj);
//         })
//         .catch(error => {
//           reject(error);
//         });
//     });
//   },
//   getCompanyList({ commit }, params) {
//     return new Promise((resolve, reject) => {
//       getEnterpriseList(params)
//         .then(response => {
//           commit('SET_ENTERPRISE_LIST', response.records);
//           resolve(response);
//         })
//         .catch(error => {
//           reject(error);
//         });
//     });
//   },
  // 企业信息
//   getEnterpriseInfo({ commit }, params) {
//     return new Promise((resolve, reject) => {
//       getCompanyInfo(params)
//         .then(response => {
//           const { obj } = response;
//           commit('GET_ENTERPRISE_INFO', obj);
//           resolve(response);
//         })
//         .catch(error => {
//           reject(error);
//         });
//     });
//   },
  // saveMany
//   saveManyPeople(ctx, params) {
//     return new Promise((resolve, reject) => {
//       saveMany(params)
//         .then(response => {
//           resolve(response);
//         })
//         .catch(error => {
//           reject(error);
//         });
//     });
//   },
  // 作废企业预约
//   closeEnterpriseSettingList(ctx, params) {
//     return new Promise((resolve, reject) => {
//       deleteEnterprise(params)
//         .then(response => {
//           resolve(response);
//         })
//         .catch(error => {
//           reject(error);
//         });
//     });
//   },
  // 保存设置
//   saveSet(ctx, params) {
//     return new Promise((resolve, reject) => {
//       saveSetting(params)
//         .then(() => {
//           resolve();
//         })
//         .catch(error => {
//           reject(error);
//         });
//     });
//   },
  // 删除城市设置
//   deleteCitySetting(ctx, params) {
//     return new Promise((resolve, reject) => {
//       deleteCity(params)
//         .then(() => {
//           resolve();
//         })
//         .catch(error => {
//           reject(error);
//         });
//     });
//   },
  // 获取激活码列表
//   getActiveCodeList({ commit }, params) {
//     return new Promise((resolve, reject) => {
//       getCodeList(params)
//         .then(response => {
//           commit('SET_ACTIVATION_CODE_LIST', response.records);
//           resolve(response);
//         })
//         .catch(error => {
//           reject(error);
//         });
//     });
//   },
  // 生成激活码
//   saveCode(ctx, params) {
//     return new Promise((resolve, reject) => {
//       addCode(params)
//         .then(response => {
//           resolve(response);
//         })
//         .catch(error => {
//           reject(error);
//         });
//     });
//   },
  // 作废激活码
//   closeCode(ctx, params) {
//     return new Promise((resolve, reject) => {
//       deleteCode(params)
//         .then(response => {
//           resolve(response);
//         })
//         .catch(error => {
//           reject(error);
//         });
//     });
//   },
  // 获取城市设置列表
//   getCitySetting({ commit }, params) {
//     return new Promise((resolve, reject) => {
//       getCompanySetting(params)
//         .then(response => {
//           const { records } = response;
//           commit('SET_ENTERPRISE_SETTING_LIST', records);
//           resolve(response);
//         })
//         .catch(error => {
//           reject(error);
//         });
//     });
//   },
  // 获取个人设置
//   getPersonalSetting({ commit }) {
//     return new Promise((resolve, reject) => {
//       getPersonSetting()
//         .then(response => {
//           const { obj } = response;
//           commit('SET_PERSONAL_SETTING', obj);
//           resolve(response);
//         })
//         .catch(error => {
//           reject(error);
//         });
//     });
//   },
//   getReasonList({ commit }, params) {
//     return new Promise((resolve, reject) => {
//       getReason(params)
//         .then(response => {
//           const { records } = response;
//           commit('SET_REASON_LIST', records);
//           resolve(response);
//         })
//         .catch(error => {
//           reject(error);
//         });
//     });
//   },
//   exportCompany(ctx, params) {
//     return new Promise((resolve, reject) => {
//       exportCompanyList(params)
//         .then(response => {
//           window.location.href = response.url;
//           resolve(response);
//         })
//         .catch(error => {
//           reject(error);
//         });
//     });
//   },
//   exportPerson(ctx, params) {
//     return new Promise((resolve, reject) => {
//       exportPersonList(params)
//         .then(response => {
//           window.location.href = response.url;
//           resolve(response);
//         })
//         .catch(error => {
//           reject(error);
//         });
//     });
//   },
//   exportActiveCode(ctx, params) {
//     return new Promise((resolve, reject) => {
//       exportActiveCodeList(params)
//         .then(response => {
//           window.location.href = response.url;
//           resolve(response);
//         })
//         .catch(error => {
//           reject(error);
//         });
//     });
//   },
  // 发送短信
  sendMessage(ctx, params) {
    return new Promise((resolve, reject) => {
      sendMessageApi(params)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
