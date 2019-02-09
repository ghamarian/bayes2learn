import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import distributions from "./assets/distributions.json";

export default new Vuex.Store({

  state: {
    selectedNode: "Poisson",
    newNode: "Poisson",
    elements: [],
  },
  getters: {
    getSelectedProperties: state => {
      // return distributions.Distributions[state.selectedNode];
      let selected = state.elements.filter(e => e.data.id == state.selectedNode);
      if (selected.length > 0) {
        return selected[0].data.content;
      } else return [];
    },
    getNewNode: state => {
      console.log(`inside getNewNode`);
      return { name: state.newNode, 
        properties: distributions.Distributions[state.newNode] };
    },
    getCy: state => {
      return state.cy;
    },
    elements: state => {
      return state.elements;
    }
  },
  mutations: {
    selectNode: (state, node) => {
      state.selectedNode = node;
    },
    setNewNode: (state, node) => {
      state.newNode = node;
    },
    pushElement: (state, payload) => {
      state.elements.push(payload);
    },
    updateElement: (state, {name, value}) => {
      let selected = state.elements.filter(e => e.data.id == state.selectedNode);
      if (selected.length > 0) {
        selected[0].data.content[name].value = value;
      } 
    },
  },
  actions: {
    pushElement: ({ commit }, payload) => {
      commit("updateValue", payload);
    }
  }
});
