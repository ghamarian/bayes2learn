<template>
  <v-container fluid grid-list-md fill-height>
    <v-layout row wrap justify-space-around>
      <v-flex d-flex md2>
        <Nodes msg="First"></Nodes>
      </v-flex>
      <v-flex d-flex md8>
        <DrawPanel msg="Welcome to Your Vue.js App"/>
      </v-flex>
      <v-flex d-flex md2>
        <Properties></Properties>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src
import DrawPanel from "@/components/DrawPanel1.vue";
import Nodes from "@/components/Nodes.vue";
import Properties from "@/components/Properties.vue";

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
/* .home {
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
  font-size: small;
  box-sizing: border-box;
} */

.logo-holder {
  display: block;
}
</style>
