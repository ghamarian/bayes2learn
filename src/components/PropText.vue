<template>
  <div>
    <!-- <div>{{ name }}</div> -->
    <!-- <label :for="name">{{ name }}</label>
    <input
      :id="name"
      class="prop-input"
      :value="getValue(name)"
      @input="updateElement({name: name, value: $event.target.value})"
      type="text"
    >-->
    <v-text-field
      :id="name"
      :label="name"
      :placeholder="getValue(name)"
      @input="updateElement({name: name, value: $event})"
    ></v-text-field>
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
</style>

