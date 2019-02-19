<template>
  <div>
    <div>{{ name }}</div>
    <select
      class="my-option"
      :selected="getValue(name)"
      @change="updateElement({name: name, value: $event.target.value})"
    >
      <option value="true">True</option>
      <option value="false">False</option>
    </select>
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
.my-option {
  width: 100%;
}
#main-div {
  background-color: brown;
}
</style>

