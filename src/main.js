import Vue from "vue";
import App from "./App.vue";
import router from "./config/router";
import store from "./config/store";
import 'font-awesome/css/font-awesome.css';
import './config/mensagens';
import './assets/js/bootstrap.min.js'


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#menu");
