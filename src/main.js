import { createApp } from "vue";

import "./assets/css/main.css";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

const app = createApp(App);

app.use(store);

app.use(router);

app.mount("#app");
