<template>
  <div>
    <tfp-api-group
      class="button-list"
      :postfix="'Distributions'"
      :elements="distributions"
    >Distirbutions</tfp-api-group>
    <tfp-api-group class="button-list" :postfix="'Utility'" :elements="utilities">Utilities</tfp-api-group>
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
      distributions: distributions.Distributions,
      utilities: utilities.Utilities
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
<style scoped>

</style>
