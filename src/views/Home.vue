<template>
  <div class="home">
    <Amir msg="Hola amir"></Amir>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Amir msg="Hola amir"></Amir>
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
  display: grid;
  border: 1px solid blueviolet;
  background: mistyrose;
  grid-template-columns: 1fr 5fr 1fr;
  justify-content: stretch;
  justify-items: stretch;
}

.logo-holder {
  display: block;
}
</style>
