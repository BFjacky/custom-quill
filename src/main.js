import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ViewUI from "view-design";
import axios from "axios";
import config from "./config/index.js";
import "view-design/dist/styles/iview.css";
Vue.use(ViewUI);
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$config = config;
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
