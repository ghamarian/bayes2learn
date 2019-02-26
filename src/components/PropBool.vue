<template>
  <div>
    <v-select
      :items="[true, false]"
      :label="name"
      :value="getValue(name)"
      @change="updateElement({name: name, value: $event})"
    ></v-select>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";

export default {
  props: ["name", "value"],
  computed: {
    ...mapGetters(["getValue"])
  },
  methods: {
    ...mapMutations(["updateElement"])
  }
};
</script>

<style scoped>
</style>

