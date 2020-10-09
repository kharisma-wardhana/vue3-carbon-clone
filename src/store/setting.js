function state() {
  return {
    lang: "",
    twoslash: "",
    filename: "",
    highlight: 0
  };
}

const mutations = {
  setSetting(state, { lang, twoslash, filename, highlight }) {
    state.lang = lang;
    state.twoslash = twoslash;
    state.filename = filename;
    state.highlight = highlight;
  },
  resetSetting(state) {
    state.lang = "";
    state.twoslash = "";
    state.filename = "";
    state.highlight = 0;
  }
};

const actions = {
  async settingCode({ commit }, { setting }) {
    commit("setSetting", {
      lang: setting.lang,
      twoslash: setting.twoslash,
      filename: setting.filename,
      highlight: setting.highlight
    });
  },
  async resetCode({ commit }) {
    commit("resetSetting");
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
