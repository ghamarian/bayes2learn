<template>
  <div id="cyto"></div>
</template>
<script>
import cytoscape from "cytoscape";
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
  mounted() {
    cytoscape({
      container: document.getElementById("cyto"),
      elements: [
        // list of graph elements to start with
        {
          // node a
          data: { id: "a" }
        },
        {
          // node b
          data: { id: "b" }
        },
        {
          // edge ab
          data: { id: "ab", source: "a", target: "b" }
        }
      ],

      style: [
        // the stylesheet for the graph
        {
          selector: "node",
          style: {
            "background-color": "#666",
            label: "data(id)"
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
        }
      ],

      layout: {
        name: "grid",
        rows: 1
      }
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
