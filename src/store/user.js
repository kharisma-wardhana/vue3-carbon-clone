import { signIn, signUp } from "../service/auth";

function state() {
  return {
    userId: null,
    username: null,
    isLogin: false
  };
}

const mutations = {
  setUser(state, { userId, username, isLogin }) {
    state.userId = userId;
    state.username = username;
    state.isLogin = isLogin;
  },
  resetUser(state) {
    state.userId = null;
    state.username = null;
    state.isLogin = false;
  }
};

const actions = {
  async login({ commit, dispatch }, { username }) {
    try {
      dispatch("process/showProcess", null, { root: true });

      const respon = await signIn(username);

      if (respon.success && !respon.error) {
        commit("setUser", {
          userId: respon.data.id,
          username: respon.data.name,
          isLogin: true
        });
        const notifData = {
          isVisible: true,
          message: "Login Success"
        };
        await dispatch("notif/showNotification", notifData, { root: true });
      } else {
        throw new Error(respon.message);
      }
    } catch (error) {
      const notifDataErr = {
        isVisible: true,
        message: error.message
      };
      dispatch("notif/showNotification", notifDataErr, { root: true });
      console.log(error);
    } finally {
      dispatch("process/hideProcess", null, { root: true });
    }
  },
  async signUp({ commit, dispatch }, { username }) {
    try {
      dispatch("process/showProcess", null, { root: true });

      const respon = await signUp(username);
      console.log(respon);
      if (respon.success && !respon.error) {
        commit("setUser", {
          userId: respon.data.id,
          username: respon.data.name,
          isLogin: true
        });
        const notifData = {
          isVisible: true,
          message: "SignUp Success"
        };
        await dispatch("notif/showNotification", notifData, { root: true });
      } else {
        throw new Error(respon.message);
      }
    } catch (error) {
      const notifDataErr = {
        isVisible: true,
        message: error.message
      };
      dispatch("notif/showNotification", notifDataErr, { root: true });
      console.log(error);
    } finally {
      dispatch("process/hideProcess", null, { root: true });
    }
  },
  signOut({ commit, dispatch }) {
    commit("resetUser");
    commit("code/resetListCode", null, { root: true });

    localStorage.removeItem("user");
    const notifData = {
      isVisible: true,
      message: "SignOut Success"
    };
    dispatch("notif/showNotification", notifData, { root: true });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
