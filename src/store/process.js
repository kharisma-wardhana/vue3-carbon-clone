function state() {
  return {
    isVisible: false
  };
}

const mutations = {
  setVisible(state, { isVisible }) {
    state.isVisible = isVisible;
  }
};

const actions = {
  showProcess({ commit }) {
    commit("setVisible", {
      isVisible: true
    });
  },
  hideProcess({ commit }) {
    commit("setVisible", {
      isVisible: false
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
