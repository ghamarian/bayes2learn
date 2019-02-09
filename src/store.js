import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import distributions from "./assets/distributions.json";

export default new Vuex.Store({

  state: {
    selectedNode: "Poisson",
    newNode: "Poisson",
    elements: [],
    currentNode: null
  },
  getters: {
    getSelectedProperties: state => {
      // return distributions.Distributions[state.selectedNode];
      if (state.currentNode) {
        return state.currentNode.content;
      }
      return null;
    },
    getNewNode: state => {
      console.log(`inside getNewNode`);
      return {
        name: state.newNode,
        properties: distributions.Distributions[state.newNode]
      };
    },
    getValue: state => name => {
      if (state.currentNode) {
        return state.currentNode.content[name].value;
      }
      return null;
    },
    selectedId: state => {
      return state.selectedNode;
    },
    elements: state => {
      return state.elements;
    }
  },
  mutations: {
    selectNode: (state, node) => {
      state.selectedNode = node;
      state.currentNode = state.elements.filter(e => e.data.id == state.selectedNode)[0].data;
    },
    setNewNode: (state, node) => {
      state.newNode = node;
    },
    pushElement: (state, payload) => {
      state.elements.push(payload);
    },
    updateElement: (state, { name, value }) => {
      if (state.currentNode) {
        state.currentNode.content[name].value = value;
      }
    },
  },
  actions: {
  //   pushElement: ({
  //     commit
  //   }, payload) => {
  //     commit("updateValue", payload);
  //   }
  }
});