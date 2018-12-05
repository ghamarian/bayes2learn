<template>
  <div class="home">
    <Amir msg=""></Amir>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Amir msg="Hola"></Amir>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Amir from "@/components/Amir.vue";

export default {
  name: "home",
  components: {
    HelloWorld,
    Amir
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
