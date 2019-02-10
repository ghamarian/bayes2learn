<template>
  <div>
    <div> {{ name }} </div>
    <select class='my-option'>
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
.my-option {
  width: 100%;
}
#main-div {
  background-color: brown;
}
</style>

