import { createStore } from "vuex";
import user from "./user";
import code from "./code";
import notif from "./notif";
import process from "./process";
import setting from "./setting";

export default createStore({
  state() {
    return {};
  },
  modules: {
    user,
    code,
    notif,
    process,
    setting
  }
});
