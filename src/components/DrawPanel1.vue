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
  </div>
</template>
<script>
import jquery from "jquery";
import contextMenus from "cytoscape-context-menus";
import "cytoscape-context-menus/cytoscape-context-menus.css";
import { mapMutations, mapGetters } from "vuex";
import _ from "lodash";
import edgehandles from "cytoscape-edgehandles";
import config from "../assets/CytoscapeConfig";
import IncomingProperty from "./IncomingProperty";
import EventSubscriber from "../js/CySubscribedEvents.js";
import nearley from "nearley";
import grammar from "../js/grammar.js";

// const elements = [...config.elements];
delete config.elements;

export default {
  name: "DrawPanel",
  data: function() {
    return {
      config,
      currentTarget: null,
      incomingEdge: null,
      modalShow: false
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
      "getEdgeIncomingProperty"
    ])
  },
  props: {
    msg: String
  },
  components: {
    IncomingProperty
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
          this.getCyElement(cy).data("name", this.getEdgeIncomingProperty)
        );
      }
    },
    afterCreated(cy) {
      let subscriber = new EventSubscriber(cy, this);
      // Create a Parser object from our grammar.
      const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

      // Parse something!
      parser.feed("a = log(10) ");

      // parser.results is an array of possible parsings.
      console.log(parser.results); // [[[[ "foo" ],"\n" ]]]
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
cytoscape {
  height: 100%;
  background: mistyrose;
}
#cyto {
  height: 100%;
  display: block;
  border: 1px solid blue;
  background: beige;
}
</style>