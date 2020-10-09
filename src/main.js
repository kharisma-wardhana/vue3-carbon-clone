import { createApp } from "vue";

import "./assets/css/main.css";

import App from "./App.vue";
import DataCode from './components/preset/DataCode'
import DataLsp from './components/preset/DataLsp'
import DataErr from './components/preset/DataErr'

import router from "./router";
import store from "./store";
import "./registerServiceWorker";

const app = createApp(App);

app.use(store);

app.use(router);

app.component(DataCode.name, DataCode)
app.component(DataLsp.name, DataLsp)
app.component(DataErr.name, DataErr)

app.mount("#app");
