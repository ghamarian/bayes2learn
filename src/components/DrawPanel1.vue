<template>
  <!-- <cytoscape :config="config" :preConfig="preConfig" :afterCreated="afterCreated"/> -->
  <cytoscape
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

let selected_color = "#666666";
let white = "#ffffff";
const config = {
  elements: [
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
    // {
    //     selector: 'node:selected',
    //     style: {
    //         'border-width': 3,
    //         'border-color': selected_color
    //
    //     }
    // },

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

const elements = [...config.elements];
delete config.elements;

export default {
  name: "DrawPanel",
  data: function() {
    return {
      config,
      elements
    };
  },
  computed: {
    ...mapGetters(["getNewNode"])
  },
  props: {
    msg: String
  },
  methods: {
    ...mapMutations(["selectNode"]),
    preConfig(cytoscape) {
      // it can be used both ways
      contextMenus(cytoscape, jquery);
      // cytoscape.use(contextMenus, jquery)
    },
    async addNode(event) {
      let evtTarget = event.target;
      const cy = await this.$cytoscape.instance
      if (evtTarget === cy) {
        let new_node = {
          group: "nodes",
          data: {
            name: this.getNewNode.name,
            root: "",
            weight: 75,
            content: this.getNewNode.properties
          },
          position: event.position
        };
        this.elements.push(new_node);
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

      //   cy.on("tap", event => {
      //     let evtTarget = event.target;
      //     if (evtTarget === cy) {
      //       let new_node = cy.add({
      //         group: "nodes",
      //         data: {
      //           name: that.getNewNode.name,
      //           root: "",
      //           weight: 75,
      //           content: that.getNewNode.properties
      //         },
      //         position: event.position
      //       });
      //     }
      //     console.dir(that.$cytoscape);
      //   });
      //   cy.on("tap", "node", function(evt) {
      //     console.log(`${evt.target.id()}, ${evt.target.data().content}`);
      //     that.selectNode(evt.target.data("name"));
      //   });
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
}
</style>