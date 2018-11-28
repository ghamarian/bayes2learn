<template>
  <div class="home">
    <Amir msg="Hola amir"></Amir>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
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
  display: flex;
  border: 1px solid blueviolet;
}

.logo-holder {
  display: block;
}
</style>
