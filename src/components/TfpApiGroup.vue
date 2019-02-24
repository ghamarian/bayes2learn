<template>
  <div>
    <v-expansion-panel>
      <v-expansion-panel-content>
        <div class="text-center" slot="header">{{ postfix }}</div>
        <v-container>
          <v-text-field v-model="substr" label="Enter text to search"></v-text-field>
          <v-btn-toggle block>
            <v-btn
              v-for="d in filteredElements"
              block
              depressed
              class="text-truncate caption text-capitalize"
              id="my-button"
              @click="setNewNode($event.target.textContent)"
              :key="d.name"
            >{{ d }}</v-btn>
          </v-btn-toggle>
        </v-container>
      </v-expansion-panel-content>
    </v-expansion-panel>
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
</style>
