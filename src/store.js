import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { selected_node: "Poisson" },
  getters: {},
  mutations: {
    select_node: (state, node) => {
      state.selected_node = node;
    }
  },
  actions: {}
});
