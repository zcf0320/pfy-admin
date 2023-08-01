/* eslint-disable space-before-function-paren */
const keepAlive = {
  state: {
    keepAlivePage: []
  },
  mutations: {
    ADD_KEEP_ALIVE: (state, name) => {
      if (!state.keepAlivePage.includes(name)) {
        state.keepAlivePage = state.keepAlivePage.concat(name);
      }
    },
    REMOVE_KEEP_ALIVE: (state, name) => {
      const keepAlivePage = state.keepAlivePage;
      const index = keepAlivePage.indexOf(name);
      if (index > -1) {
        keepAlivePage.splice(index, 1);
      }
    }
  },
  actions: {
    addKeepAlivePage({ commit }, name) {
      commit('ADD_KEEP_ALIVE', name);
    },
    removeKeepAlive({ commit }, name) {
      commit('REMOVE_KEEP_ALIVE', name);
    }
  }
};
export default keepAlive;
