<template>
  <!-- <cytoscape :config="config" :preConfig="preConfig" :afterCreated="afterCreated"/> -->
  <cytoscape
    id="cyto"
    :config="config"
    :preConfig="preConfig"
    :afterCreated="afterCreated"
    v-on:mousedown="addNode"
    v-on:cxttapstart="updateNode"
  >
    <cy-element v-for="def in elements" :key="`${def.data.id}`" :definition="def"/>
  </cytoscape>
</template>
<script>
import jquery from "jquery";
import contextMenus from "cytoscape-context-menus";
import "cytoscape-context-menus/cytoscape-context-menus.css";
import { mapMutations, mapGetters } from "vuex";
import _ from "lodash";
import edgehandles from "cytoscape-edgehandles";
import handle_edges_defaults from "../assets/handled_edges.js";

let selected_color = "#666666";
let white = "#ffffff";
const config = {
  elements: [
    {
      // node b
      data: {
        id: "a",
        content: "a",
        name: "a"
      }
    },
    {
      // node b
      data: {
        id: "b",
        content: "b",
        name: "b"
      }
    },
    {
      // node a
      data: {
        id: "Autoregressive",
        content: "Autoregressive",
        weight: 75,
        name: "Autoregressive",
        parent: "a"
      }
    },
    {
      // node b
      data: {
        id: "BatchReshape",
        content: "BatchReshape",
        name: "BatchReshape",
        parent: ["a", "b"]
      }
    },
    {
      // edge ab
      data: { id: "ab", source: "Autoregressive", target: "BatchReshape" }
    }
  ],
  style: [
    // the stylesheet for the graph
    {
      selector: "node",
      style: {
        "text-valign": "center",
        color: "white",
        width: 200,
        height: 40,
        shape: "roundrectangle",
        label: `data(name)`
      }
    },
    {
      selector: "edge",
      style: {
        width: 3,
        "line-color": "#ccc",
        "target-arrow-color": "#ccc",
        "target-arrow-shape": "triangle"
      }
    },
    {
      selector: ".eh-handle",
      style: {
        "background-color": selected_color,
        width: 12,
        height: 12,
        shape: "ellipse",
        "overlay-opacity": 0,
        "border-width": 12, // makes the handle easier to hit
        "border-opacity": 0
      }
    },
    {
      selector: ".eh-hover",
      style: {
        "background-color": selected_color
      }
    },
    {
      selector: ".eh-source",
      style: {
        "border-width": 2,
        "border-color": selected_color
      }
    },
    {
      selector: ".eh-target",
      style: {
        "border-width": 2,
        "border-color": selected_color
      }
    },
    {
      selector: ".eh-preview, .eh-ghost-edge",
      style: {
        "background-color": selected_color,
        "line-color": selected_color,
        "target-arrow-color": selected_color,
        "source-arrow-color": selected_color
      }
    },
    {
      selector: ".eh-ghost-edge .eh-preview-active",
      style: {
        opacity: 0
      }
    }
  ],
  layout: {
    name: "grid",
    rows: 1
  }
};

// const elements = [...config.elements];
delete config.elements;

export default {
  name: "DrawPanel",
  data: function() {
    return {
      config
      // elements
    };
  },
  computed: {
    ...mapGetters(["getNewNode", "elements"])
  },
  props: {
    msg: String
  },
  methods: {
    ...mapMutations(["selectNode", "pushElement"]),
    preConfig(cytoscape) {
      // it can be used both ways
      contextMenus(cytoscape, jquery);
      // cytoscape.use(contextMenus, jquery)
      cytoscape.use(edgehandles);
    },
    async addNode(event) {
      let evtTarget = event.target;
      const cy = await this.$cytoscape.instance;
      if (evtTarget === cy) {
        let new_node = {
          group: "nodes",
          data: {
            id: this.$uuid.v4(),
            name: this.getNewNode.name,
            root: "",
            weight: 75,
            content: _.cloneDeep(this.getNewNode.properties, true)
          },
          position: event.position
        };
        this.pushElement(new_node);
      }
    },
    updateNode(event) {
      if (event.target.id) {
        const n = {
          data: { id: event.target.id(), shape: "rectangle" },
          position: event.target.position(),
          group: "nodes"
        };
        console.log("updating: ", n);
        const elements = [
          ...this.elements.filter(e => e.data.id !== event.target.id()),
          n
        ];
        console.log("filtered elements: ", elements);
        this.elements = elements;
      }
    },
    removeNode(event) {
      if (event.target.id) {
        console.log("removing: ", event.target.id());
        this.elements = this.elements.filter(
          e => e.data.id !== event.target.id()
        );
      }
    },
    afterCreated(cy) {
      const that = this;

      cy.edgehandles(handle_edges_defaults);

      cy.on("tap", "node", function(evt) {
        console.log(`${evt.target.id()}, ${evt.target.data().content}`);
        that.selectNode(evt.target.id());
      });
      cy.contextMenus({
        menuItems: [
          {
            id: "remove",
            content: "remove",
            tooltipText: "remove",
            image: { src: "remove.svg", width: 12, height: 12, x: 6, y: 4 },
            selector: "node, edge",
            onClickFunction: function(event) {
              var target = event.target || event.cyTarget;
              target.remove();
            },
            hasTrailingDivider: true
          },
          {
            id: "hide",
            content: "hide",
            tooltipText: "hide",
            selector: "*",
            onClickFunction: function(event) {
              var target = event.target || event.cyTarget;
              target.hide();
            },
            disabled: false
          }
        ]
      });
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
  background: moccasin;
}
</style>