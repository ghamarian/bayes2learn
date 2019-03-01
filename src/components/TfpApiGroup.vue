<template>
  <div>
    <v-container class="button-list">
      <v-text-field v-model="substr" label="Enter text to search"></v-text-field>
      <v-btn-toggle block >
        <v-btn
          v-for="d in filteredElements"
          block
          depressed
          class="text-truncate text-capitalize"
          id="my-button"
          @click="setNewNode($event.target.textContent)"
          :key="d.name"
        >{{ d }}</v-btn>
      </v-btn-toggle>
    </v-container>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "ApiGroup",

  props: ["elements"],
  data() {
    return {
      substr: ""
    };
  },
  computed: {
    ...mapGetters(["getNewNode"]),
    filteredElements() {
      return Object.keys(this.elements)
        .filter(dist => dist.toLowerCase().includes(this.substr.toLowerCase()))
        .map(ele => (ele.length < 23 ? ele : `${ele.slice(0, 20)}...`));
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
.v-btn-toggle {
  flex-direction: column;
  width: 100%;
  /* align-items: stretch; */
  /* justify-content: stretch; */
  /* align-content: stretch; */
}
.button-list {
  overflow: scroll;
  max-height: 70vh;
}


</style>
