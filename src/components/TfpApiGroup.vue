<template>
  <div>
    <b-btn v-b-toggle="'collapse-' + postfix" variant="primary">
      <slot></slot>
    </b-btn>
    <b-collapse :id="collapseId" class="mt-2">
      <div class="button-list">
        <b-form-input v-model="substr" type="text" placeholder="Enter text to search"></b-form-input>
        <b-button
          id="my-button"
          v-for="d in filteredElements"
          @click="setNewNode($event.target.textContent)"
          :key="d.name"
          :variant="'primary'"
          :pressed="d === getNewNode.name"
        >{{ d }}</b-button>
      </div>
    </b-collapse>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "ApiGroup",

  props: ["groupName", "elements", "postfix"],
  data() {
    return {
      substr: ""
    };
  },
  computed: {
    ...mapGetters(["getNewNode"]),
    filteredElements() {
      return Object.keys(this.elements).filter(dist =>
        dist.toLowerCase().includes(this.substr.toLowerCase())
      );
    },
    collapseId() {
      return `collapse-${this.postfix}`;
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

#my-button {
  color: black !important;
  background-color: white !important;
  border-color: white !important;
}

#my-button.active {
  color: mistyrose !important;
  background-color: purple !important;
  border-color: white !important;
}

/*#my-buttons [area-pressed^=true] {
    color: black !important;
    background-color: mistyrose !important;
    border-color: white !important;
} */

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
