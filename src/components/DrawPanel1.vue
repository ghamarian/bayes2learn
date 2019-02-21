<template>
  <!-- <cytoscape :config="config" :preConfig="preConfig" :afterCreated="afterCreated"/> -->
  <div>
    <cytoscape id="cyto" :config="config" :preConfig="preConfig" :afterCreated="afterCreated">
      <!-- <cy-element v-for="def in elements" :key="`${def.data.id}`" :definition="def"/> -->
    </cytoscape>
    <incoming-property
      :modalShow="modalShow"
      :properties="currentTarget"
      :active="incomingEdge"
      @closeModal="closeModal"
    ></incoming-property>
    <utility-node :variables="variables" :utilityModalShow="utilityModalShow" @closeUtilityModal="closeUtilityModal"></utility-node>
  </div>
</template>
<script>
import jquery from "jquery";
import contextMenus from "cytoscape-context-menus";
import "cytoscape-context-menus/cytoscape-context-menus.css";
import _ from "lodash";
import { mapMutations, mapGetters } from "vuex";
import edgehandles from "cytoscape-edgehandles";
import config from "../assets/CytoscapeConfig";
import IncomingProperty from "./IncomingProperty";
import UtilityNode from "./UtilityNode";
import EventSubscriber from "../js/CySubscribedEvents.js";
// import nearley from "nearley";
// import grammar from "../js/grammar.js";

// const elements = [...config.elements];
delete config.elements;

export default {
  name: "DrawPanel",
  data: function() {
    return {
      config,
      currentTarget: null,
      incomingEdge: null,
      modalShow: false,
      utilityModalShow: false,
      variables: null
      // elements
    };
  },
  computed: {
    ...mapGetters([
      "getNewNode",
      "elements",
      "getEdgeValue",
      "getSelectedProperties",
      "getCyElement",
      "getEdgeIncomingProperty",
      "getCurrentEdge",
      "getAllIncomingVariables"
    ])
  },
  props: {
    msg: String
  },
  components: {
    IncomingProperty,
    UtilityNode
  },
  methods: {
    ...mapMutations(["selectNode", "pushElement", "selectEdge"]),
    preConfig(cytoscape) {
      // it can be used both ways
      contextMenus(cytoscape, jquery);
      // cytoscape.use(contextMenus, jquery)
      cytoscape.use(edgehandles);
    },
    async closeModal() {
      this.modalShow = false;
      if (this.getEdgeIncomingProperty) {
        const cy = await this.$cytoscape.instance;
        this.$cytoscape.instance.then(cy =>
          this.getCurrentEdge(cy).data("name", this.getEdgeIncomingProperty)
        );
      }
    },
    closeUtilityModal() {
      this.utilityModalShow = false;
    },
    afterCreated(cy) {
      let subscriber = new EventSubscriber(cy, this);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
cytoscape {
  height: 100%;
  /* background: mistyrose; */
}
#cyto {
  height: 100%;
  display: block;
  /* border: 1px solid blue; */
  /* background: lightgray; */
  background-color: #f7f7f7;
  background-image: linear-gradient(white 2px, transparent 2px),
    linear-gradient(90deg, white 2px, transparent 2px),
    linear-gradient(rgba(255, 255, 255, 0.74) 1px, transparent 1px),
    linear-gradient(90deg, rgb(255, 255, 255) 1px, transparent 1px);
  background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
}
</style>