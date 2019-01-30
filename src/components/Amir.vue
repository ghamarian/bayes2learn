<template>
  <div class="main-bar">
    <h1>{{ selected_node }}</h1>
    <div class="main-button-list">
      <b-btn v-b-toggle.collapse1 variant="primary">Bijectors</b-btn>
      <b-collapse id="collapse1" class="mt-2">
        <div class="button-list">
          <button class="btn">Poission</button>
          <button class="btn">Normal</button>
          <button class="btn">Normal</button>
          <button class="btn">Normal</button>
          <button class="btn">Normal</button>
        </div>
      </b-collapse>
      <b-btn v-b-toggle.collapse2 variant="primary">Distributions</b-btn>
      <b-collapse id="collapse2" class="mt-2">
        <div class="button-list">
          <button class="btn" v-for="d in Object.keys(distributions)">{{ d }}</button>
        </div>

      </b-collapse>
    </div>
  </div>
</template>

<script>
import distributions from "../assets/distributions.json";

export default {
  name: "Amir",
  // props: {
  //   msg: String
  // },
  computed: {
    selected_node() {
      return this.$store.state.selected_node;
    }
  },
  data: function() {
    return {
      distributions: distributions.Distributions
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-bar {
  border: 1px solid pink;
  overflow: scroll;
  height: calc(100vh - 110px);
  box-sizing: border-box;
  text-align: center;
}

.main-button-list {
  display: grid;
  grid-template-columns: minmax(200px, 1fr);
  grid-gap: 10px;
  overflow: scroll;
  text-align: center;
}

.button-list {
  display: grid;
  grid-template-columns: minmax(200px, 1fr);
  grid-gap: 2px;
  /* height: 100vh; */
  overflow: scroll;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
