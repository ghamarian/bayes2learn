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
import handle_edges_defaults from "../assets/handled_edges";
import config from "../assets/CytoscapeConfig";

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

      cy.on("ehcomplete", (event, sourceNode, targetNode, addedEles) => {
        let { position } = event;
        console.log(`the edge completed.....;`)

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
              // var target = event.target || event.cyTarget;
              // target.remove();
              let id_list = [];
              for (let i = 0; i < 5; i++) {
                let new_node_id = that.$uuid.v4();
                id_list.push(new_node_id);
                let new_node = cy.add({
                  group: "nodes",
                  data: {
                    id: new_node_id,
                    name: `amir-${i}`,
                    root: "kashk",
                    weight: 75,
                    content: "kashk"
                  }
                  // position: event.position
                });
              }
              cy.center();

              cy.$(`#${id_list[0]}`).move({ parent: id_list[3] });
              cy.$(`#${id_list[1]}`).move({ parent: [id_list[3], id_list[4]] });
              cy.$(`#${id_list[2]}`).move({ parent: [id_list[4]] });

              // let new_node2 = cy.add({
              //   group: "nodes",
              //   data: {
              //     id: "kashk2",
              //     name: "amir",
              //     root: "amir",
              //     weight: 75,
              //     content: "kashk"
              //   },
              //   position: event.position
              // });

              // console.log(cy.nodes().filter(ele => ele.selected()));
              // cy.nodes()
              //   .filter(ele => ele.selected())
              //   .move({ parent: new_node_id });
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
  background: beige;
}
</style>