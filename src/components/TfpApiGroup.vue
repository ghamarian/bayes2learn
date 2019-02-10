<template>
  <div>
    <b-btn v-b-toggle.collapse variant="primary"><slot></slot></b-btn>
    <b-collapse id="collapse" class="mt-2">
      <div class="button-list">
        <label for="filter">Filter</label>
        <input id="filter" type="text" v-model="substr">
        <button
          class="btn"
          v-for="d in filteredElements"
          @click="setNewNode($event.target.textContent)"
          :key="d.name"
        >{{ d }}</button>
      </div>
    </b-collapse>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "ApiGroup",

  props: ['groupName', 'elements'],
  data() {
    return {
      substr: ""
    };
  },
  computed: {
    filteredElements() {
      return Object.keys(this.elements).filter(dist =>
        dist.toLowerCase().includes(this.substr.toLowerCase())
      );
    }
  },
  methods: {
    ...mapMutations(["setNewNode"])
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
