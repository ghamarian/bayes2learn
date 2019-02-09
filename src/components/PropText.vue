<template>
  <div>
    <div>{{ name }}</div>
    <input :value="getValue(name)" @input="updateElement({name: name, value: $event.target.value})" type="text">
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";

export default {
  props: ["name"],
  computed: {
    ...mapGetters(["getValue"])
  },
  methods: {
    ...mapMutations(["updateElement"])
  }
};
</script>
