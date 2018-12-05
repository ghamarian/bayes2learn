<template>
  <div class="hello">
    <div id="cyto"></div>
  </div>
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
    console.log("amir");
    let k = document.getElementById("cyto");
    console.dir(k);
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
  max-width: none !important;
  width: 500px;
  height: 500px;
  display: block;
}
.hello {
  border: 1px solid blue;
  width: 100%;
  height: 100vh;
  max-width: none;
}
</style>
