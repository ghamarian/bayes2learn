<template>
  <div>
    <div>{{ name }}</div>
    <input class="prop-input" :value="getValue(name)" @input="updateElement({name: name, value: $event.target.value})" type="text">
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

<style scoped>
.prop-input {
  width: 100%;
  height: calc(2.25rem + 2px);
}
</style>

