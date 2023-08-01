import smartApi from '@/api/smartMedical';

const state = {
  data: {}
};

const mutations = {
  SET_DATA: (state, data) => {
    state.data = data;
  }
};

const actions = {
  getSmartBoardData(ctx, params) {
    return smartApi.getBoardData(params);
  },
  setBoardData({ commit }, data) {
    commit('SET_DATA', data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
