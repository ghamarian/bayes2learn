<template>
  <div>
    <v-layout columns wrap justify-space-around fill-width>
      <v-expansion-panel>
        <v-expansion-panel-content>
          <div slot="header">{{ postfix }}</div>

          <v-flex d-flex md12>
            <v-text-field
            v-model="substr"
            label="Enter text to search"
          ></v-text-field>
            <!-- <v-form v-model="substr" type="text" placeholder="Enter text to search"></v-form> -->
          </v-flex>
          <v-flex v-for="d in filteredElements" :key="d.name" d-flex md12 x12>
            <v-btn
              flat
              depressed
              class="text-truncate caption text-capitalize"
              id="my-button"
              @click="setNewNode($event.target.textContent)"
              :key="d.name"
              :pressed="d === getNewNode.name"
            >{{ d }}</v-btn>
          </v-flex>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-layout>
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
/* .main-bar {
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
} */

/*#my-buttons [area-pressed^=true] {
    color: black !important;
    background-color: mistyrose !important;
    border-color: white !important;
} */

/* .main-button-list {
  display: grid;
  grid-template-columns: minmax(200px, 1fr);
  grid-gap: 10px;
  overflow: scroll;
  text-align: center;
} */

/* .button-list {
  display: grid;
  grid-template-columns: minmax(200px, 1fr);
  grid-gap: 2px;
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
} */
</style>
