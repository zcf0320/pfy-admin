import * as ytPanelApi from '@/api/ytPanel';

const state = {
  data: {}
};

const mutations = {
  SET_DATA: (state, data) => {
    state.data = data;
  }
};

const actions = {
  // 亚泰看板
  getData(ctx, params) {
    return ytPanelApi.getData(params);
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
