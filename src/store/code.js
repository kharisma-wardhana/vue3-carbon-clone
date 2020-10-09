import { delCode, editCode, getAllCode, saveCode } from "../service/code";

function state() {
  return {
    listCode: []
  };
}

const mutations = {
  setListCode(state, { listCode }) {
    state.listCode = listCode;
  },
  resetListCode(state) {
    state.listCode = [];
  }
};

const actions = {
  async getAllCode({ commit, dispatch }, { userId, filter }) {
    try {
      dispatch("process/showProcess", null, { root: true });

      const respon = await getAllCode(userId, filter);

      if (respon.success && !respon.error) {
        commit("setListCode", {
          listCode: respon.data
        });
      } else {
        throw new Error(respon.message);
      }
    } catch (error) {
      commit("resetListCode");
      const notifErr = {
        isVisible: true,
        message: error.message || "Silahkan masuk terlebih dahulu"
      };
      dispatch("notif/showNotification", notifErr, { root: true });
      console.log(error);
    } finally {
      dispatch("process/hideProcess", null, { root: true });
    }
  },

  async saveCode({ dispatch }, { userId, contentData }) {
    try {
      dispatch("process/showProcess", null, { root: true });

      const respon = await saveCode(userId, contentData);

      if (respon.success && !respon.error) {
        const notif = {
          isVisible: true,
          message: "Kode berhasil disimpan"
        };

        await dispatch(`notif/showNotification`, notif, { root: true });
      } else {
        throw new Error(respon.message);
      }
    } catch (error) {
      const notifErr = {
        isVisible: true,
        message: error.message || "Silahkan masuk terlebih dahulu"
      };
      dispatch("notif/showNotification", notifErr, { root: true });
      console.log(error);
    } finally {
      dispatch("process/hideProcess", null, { root: true });
    }
  },

  async editCode({ dispatch }, { userId, codeId, contentData }) {
    try {
      dispatch("process/showProcess", null, { root: true });

      const respon = await editCode(codeId, userId, contentData);

      if (respon.success && !respon.error) {
        const notif = {
          isVisible: true,
          message: "Kode berhasil diubah"
        };

        await dispatch(`notif/showNotification`, notif, { root: true });
      } else {
        throw new Error(respon.message);
      }
    } catch (error) {
      const notifErr = {
        isVisible: true,
        message: error.message || "Silahkan masuk terlebih dahulu"
      };
      dispatch("notif/showNotification", notifErr, { root: true });
      console.log(error);
    } finally {
      dispatch("process/hideProcess", null, { root: true });
    }
  },

  async delCode({ dispatch }, { userId, codeId }) {
    try {
      dispatch("process/showProcess", null, { root: true });

      const respon = await delCode(codeId, userId);

      if (respon.success && !respon.error) {
        const notif = {
          isVisible: true,
          message: "Kode berhasil dihapus"
        };

        await dispatch(`notif/showNotification`, notif, { root: true });
      } else {
        throw new Error(respon.message);
      }
    } catch (error) {
      const notifErr = {
        isVisible: true,
        message: error.message || "Silahkan masuk terlebih dahulu"
      };
      dispatch("notif/showNotification", notifErr, { root: true });
      console.log(error);
    } finally {
      dispatch("process/hideProcess", null, { root: true });
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
