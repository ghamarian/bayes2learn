<template>
  <div class="home">
    <Amir msg="Hola something"></Amir>
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

<style>
.home {
  font-size: small;
  border: 1px solid blueviolet;
  background: mistyrose;
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
  height: 100vh;
  width: 100vw;
}

.logo-holder {
  display: block;
}
</style>
