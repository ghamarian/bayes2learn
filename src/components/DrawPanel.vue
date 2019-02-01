<template>
  <cytoscape :config="config" :preConfig="preConfig" :afterCreated="afterCreated"/>
</template>
<script>
import jquery from "jquery";
import contextMenus from "cytoscape-context-menus";
import "cytoscape-context-menus/cytoscape-context-menus.css";
import { mapMutations, mapGetters } from 'vuex';

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
        name: "Autoregressive"
      }
    },
    {
      // node b
      data: {
        id: "BatchReshape",
        content: "BatchReshape",
        name: "BatchReshape"
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

export default {
  name: "DrawPanel",
  data: function() {
    return {
      config: config
    };
  },
  computed: {
    ...mapGetters(["getNewNode"]),
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
    afterCreated(cy) {
      const that = this;

      cy.on("tap", event => {
        let evtTarget = event.target;
        if (evtTarget === cy) {
          let new_node = cy.add({
            group: "nodes",
            data: {
              name: that.getNewNode.name,
              root: "",
              weight: 75,
              content: that.getNewNode.properties 
            },
            position: event.position
          });
        }
      });
      cy.on("tap", "node", function(evt) {
        console.log(`${evt.target.id()}, ${evt.target.data().content}`);
        that.selectNode(evt.target.data('name'));
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
}
</style>
