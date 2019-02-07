<template>
  <div id="cyto" ref="cyto"></div>
</template>
<script>
import cytoscape from "cytoscape";
import { mapMutations, mapGetters } from "vuex";
import contextMenus from "cytoscape-context-menus";
import "cytoscape-context-menus/cytoscape-context-menus.css";
import jquery from "jquery";

export default {
  name: "HelloWorld",
  data: function() {
    return {
      a: 2
    };
  },
  props: {
    msg: String
  },
  computed: {
    ...mapGetters(["getNewNode"])
  },
  methods: {
    ...mapMutations(["selectNode"])
  },
  mounted() {
    this.cy = cytoscape({
      container: this.$refs.cyto,
      elements: [
        // list of graph elements to start with
        {
          // node a
          data: {
            id: "Autoregressive",
            content: "Autoregressive",
            weight: 75,
            name: "Autoregressive",
            parent: ["a", "b"]
          }
        },
        {
          // node b
          data: {
            id: "BatchReshape",
            content: "BatchReshape",
            name: "BatchReshape",
            parent: "b"
          }
        },
        {
          // node b
          data: {
            id: "BatchReshape",
            content: "BatchReshape",
            name: "BatchReshape",
            parent: ["b", "d"]
          }
        },
        {
          // node b
          data: { id: "a", name: "a" }
        },
        {
          // node b
          data: { id: "b", name: "b" }
        },
        {
          // node b
          data: { id: "d", name: "c" }
        },
        {
          // edge ab
          data: { id: "ab", source: "a", target: "b" }
        }
      ],

      style: [
        // the stylesheet for the graph

        {
          selector: "edge",
          style: {
            width: 3,
            "line-color": "#ccc",
            "target-arrow-color": "#ccc",
            css: {
              "curve-style": "bezier",
              "target-arrow-shape": "triangle"
            }
          }
        },
        {
          selector: "node",
          css: {
            content: "data(id)",
            "text-valign": "center",
            "text-halign": "center",
            shape: "roundrectangle",
            label: `data(name)`
          }
        },
        {
          selector: "$node > node",
          css: {
            "padding-top": "10px",
            "padding-left": "10px",
            "padding-bottom": "10px",
            "padding-right": "10px",
            "text-valign": "top",
            "text-halign": "center",
            "background-color": "#ffffff",
            opacity: 0.5
          }
        },
        {
          selector: ":selected",
          css: {
            "background-color": "black",
            "line-color": "black",
            "target-arrow-color": "black",
            "source-arrow-color": "black"
          }
        }
      ],

      layout: {
        name: "grid",
        rows: 1
      }
    });

    let vm = this;
    // this.cy.on("tap", function(event) {
    //   let evtTarget = event.target;
    //   if (evtTarget === vm.cy) {
    //     let new_node = vm.cy.add({
    //       group: "nodes",
    //       data: {
    //         name: "a",
    //         root: "a",
    //         weight: 75,
    //         content: "a"
    //       },
    //       position: event.position
    //     });
    //   }
    // });

    this.cy.on("tap", event => {
      let evtTarget = event.target;
      if (evtTarget === vm.cy) {
        let new_node = vm.cy.add({
          group: "nodes",
          data: {
            name: vm.getNewNode.name,
            root: "",
            weight: 75,
            content: vm.getNewNode.properties
          },
          position: event.position
        });
      }
    });
    this.cy.on("tap", "node", function(evt) {
      console.log(`${evt.target.id()}, ${evt.target.data().content}`);
      vm.selectNode(evt.target.data("name"));
    });
    contextMenus(cytoscape, jquery);

    this.cy.contextMenus({
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#cyto {
  height: 100%;
  display: block;
  border: 1px solid blue;
}
</style>