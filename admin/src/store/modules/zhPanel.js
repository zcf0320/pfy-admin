import * as zhPanelApi from '@/api/zhPanel';
const state = {
  data: {}
};

const mutations = {
  SET_DATA: (state, data) => {
    state.data = data;
  }
};

const actions = {
  getData(ctx, params) {
    return zhPanelApi.getData(params);
  },
  setData({ commit }, data) {
    commit('SET_DATA', data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
