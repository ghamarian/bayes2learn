<template>
  <div class="home">
    <Nodes msg="First"></Nodes>
    <DrawPanel msg="Welcome to Your Vue.js App"/>
    <Properties></Properties>
  </div>
</template>

<script>
// @ is an alias to /src
import DrawPanel from "@/components/DrawPanel1.vue";
import Nodes from "@/components/Nodes.vue";
import Properties from "@/components/Properties.vue"

export default {
  name: "home",
  components: {
    DrawPanel,
    Nodes,
    Properties
  }
};
</script>

<style scoped>
.home {
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
  font-size: small;
  box-sizing: border-box;
}

.logo-holder {
  display: block;
}
</style>
