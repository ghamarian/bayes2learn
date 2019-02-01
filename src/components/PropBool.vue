<template>
  <div>
    <div> {{ name }} </div>
    <select>
      <option value="True">True</option>
      <option value="False" selected>False</option>
    </select>
  </div>
</template>
<script>
export default {
  props: ["name"]
};
</script>

<style scoped>
#main-div {
  background-color: brown;
}
</style>

