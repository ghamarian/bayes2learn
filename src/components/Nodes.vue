<template>
  <div>
    <v-expansion-panel>
      <v-expansion-panel-content v-for="(grp, name) in tfpGroups" :key="grp">
        <template v-slot:header>
          <div>{{ name }}</div>
        </template>
        <tfp-api-group :elements="grp"></tfp-api-group>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>

<script>
import distributions from "../assets/distributions.json";
import utilities from "../assets/utilities.json";
import { mapMutations } from "vuex";
import TfpApiGroup from "@/components/TfpApiGroup.vue";

export default {
  name: "Nodes",

  data: function() {
    return {
      tfpGroups: {
        Distributions: distributions.Distributions,
        Utilities: utilities.Utilities
      }
    };
  },
  methods: {
    ...mapMutations(["setNewNode"])
  },
  components: {
    TfpApiGroup
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
html {
  height: 100%;
  overflow: hidden !important;
}
.v-expansion-panel {
  text-align: center !important;
}
</style>
