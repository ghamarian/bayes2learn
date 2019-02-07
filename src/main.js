import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "cytoscape";
import VueCytoscape from "vue-cytoscape";
import "vue-cytoscape/dist/vue-cytoscape.css";

Vue.use(VueCytoscape);
Vue.config.productionTip = false;

Vue.use(BootstrapVue);

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
