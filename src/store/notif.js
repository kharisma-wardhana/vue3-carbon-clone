function state() {
  return {
    isVisible: false,
    message: null
  };
}

const mutations = {
  setNotification(state, { isVisible, message }) {
    state.isVisible = isVisible;
    state.message = message;
  },
  delNotification(state) {
    state.isVisible = false;
    state.message = null;
  }
};

const actions = {
  showNotification({ commit }, { isVisible, message }) {
    commit("setNotification", {
      isVisible,
      message
    });
    setTimeout(() => {
      commit("delNotification");
    }, 3000);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
