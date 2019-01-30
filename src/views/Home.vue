<template>
  <div class="home">
    <Amir msg="First"></Amir>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Properties></Properties>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Amir from "@/components/Amir.vue";
import Properties from "@/components/Properties.vue"

export default {
  name: "home",
  components: {
    HelloWorld,
    Amir,
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
