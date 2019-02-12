<template>
  <div class="main-bar">
    <component
      v-for="(p_value, p_name) in getSelectedProperties"
      :is="componentType(p_value)"
      :key="`${selectedId}_${p_name}`"
      :name="p_name"
    ></component>
    <!-- <p v-for="p in getSelectedProperties">{{ p }}</p> -->
  </div>
</template>

<script>
import PropText from "@/components/PropText.vue";
import PropBool from "@/components/PropBool.vue";
import { mapGetters } from "vuex";

export default {
  name: "Properties",
  computed: {
    ...mapGetters(["getSelectedProperties", "selectedId"])
  },
  data: function() {
    return {
      componentTypeMap: {
        bool: "PropBool",
        NoneType: "PropText",
        str: "PropText",
        unknown: "PropText",
        DType: "PropText",
        int: "PropText"
      }
    };
  },
  methods: {
    componentType(p) {
      console.log(p.type);
      return this.componentTypeMap[p.type];
    }
  },
  components: {
    PropText,
    PropBool
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-bar {
  border: 1px solid pink;
  overflow: scroll;
  height: calc(100vh - 110px);
  box-sizing: border-box;
  text-align: center;
}

.main-button-list {
  display: grid;
  grid-template-columns: minmax(200px, 1fr);
  grid-gap: 10px;
  overflow: scroll;
  text-align: center;
}

.button-list {
  display: grid;
  grid-template-columns: minmax(200px, 1fr);
  grid-gap: 2px;
  /* height: 100vh; */
  overflow: scroll;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
