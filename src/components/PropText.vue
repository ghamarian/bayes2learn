<template>
  <div>
    <div>{{ name }}</div>
    <input @input="updateElement({name: name, value: $event.target.value})" type="text">
  </div>
</template>
<script>

import { mapMutations } from 'vuex';

export default {
  props: ["name", "value"],
  methods: {
    ...mapMutations(["updateElement"])
  }
};
</script>
