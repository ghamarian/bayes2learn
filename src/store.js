import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import distributions from "./assets/distributions.json";

export default new Vuex.Store({

  state: {
    selectedNode: "Poisson",
    newNode: "Poisson",
    nodes: {},
    cy: null
  },
  getters: {
    getSelectedProperties: state => {
      return distributions.Distributions[state.selectedNode];
    },
    getNewNode: state => {
      console.log(`inside getNewNode`);
      return { name: state.newNode, 
        properties: distributions.Distributions[state.newNode] };
    },
    getCy: state => {
      return state.cy;
    }
  },
  mutations: {
    selectNode: (state, node) => {
      state.selectedNode = node;
    },
    setNewNode: (state, node) => {
      state.newNode = node;
    },
    setCy: (state, cy) => {
      state.cy = cy;
    }
  },
  actions: {
    setCy: ({ commit }, cy) => {
      commit("setCy", cy);
    }
  }
});
