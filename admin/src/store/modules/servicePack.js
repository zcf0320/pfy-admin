const state = {
  // 字段选中弹框打开
  keySelectModalShow: false,
  // 服务项选中字段类型 1 需求数据 2 回收数据
  keySelectType: 1,
  // 服务项选中字段
  keySelectedList: {
    1: [],
    2: [],
    3: [],
    4: []
  },
  // 产品修改弹框
  serviceItemsModalShow: false
};

const mutations = {
  // 修改数据弹框
  SET_KEY_SELECT_MODAL: (state, data) => {
    state.keySelectModalShow = data.show;
    state.keySelectType = data.type;
  },
  // 修改产品弹框
  SET_SERVICE_MODAL: (state, data) => {
    state.serviceItemsModalShow = data;
  }
};

const actions = {
  // 发送短信
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
