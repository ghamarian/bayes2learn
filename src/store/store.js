import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import distributions from "../assets/distributions.json";
import utilities from "../assets/utilities.json";

let all_props = Object.assign({}, distributions.Distributions, utilities.Utilities);

export default new Vuex.Store({
  strict: true,
  state: {
    currentEdge: null,
    selectedNode: null,
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
        properties: all_props[state.newNode]
      };
    },
    getValue: state => name => {
      if (state.currentNode) {
        return state.currentNode.content[name].value;
      }
      return null;
    },
    getEdgeValue: state => {
      if (state.currentEdge) {
        return state.currentEdge;
      }
      return null;
    },
    getEdgeIncomingProperty: state => {
      if (state.currentEdge) {
        return state.currentEdge.incoming;
      }
      return null;
    },
    selectedId: state => {
      return state.selectedNode;
    },
    elements: state => {
      return state.elements;
    },
    getCyElement: state => cy => {
      return cy.$(`#${state.selectedNode}`);
    },
    getCurrentEdge: state => cy => {
      return cy.$(`#${state.currentEdge.id}`);
    },
    getAllIncomingVariables: state => cy => {
      let cyNode = cy.$(`#${state.selectedNode}`);
      let resultList = cyNode.incomers().filter(ele => ele.isEdge()).map(ele => ele.data('name'));
      return resultList;

    }
  },
  mutations: {
    selectNode: (state, node) => {
      state.selectedNode = node;
      state.currentNode = state.elements.find(e => e.data.id == state.selectedNode).data;
    },
    selectEdge: (state, node) => {
      state.selectedNode = node;
      state.currentEdge = state.elements.find(e => e.data.id == state.selectedNode).data;
    },
    setNewNode: (state, node) => {
      state.newNode = node;
    },
    pushElement: (state, payload) => {
      state.elements = [...state.elements, payload];
    },
    updateElement: (state, { name, value }) => {
      if (state.currentNode) {
        Vue.set(state.currentNode.content, name, {"value": value, type: "unknown"});
      }
    },
    updateEdgeValue: (state, value) => {
      if (state.currentEdge) {
        state.currentEdge.incoming = value;
      }
    }
  },
  actions: {
  }
});