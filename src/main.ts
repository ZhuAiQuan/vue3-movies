import { createApp } from "vue";
import App from "./App.vue";
import importComponents from "./config/vant";
import { Toast } from "vant";
import router from './router';
import './permission';
import store from './stores'
import './styles/index.less'

const app = createApp(App);
importComponents.forEach((item) => app.use(item));
app.provide("toast", Toast);// 全局插入toast提示
app.use(router).use(store)

app.mount("#app");
