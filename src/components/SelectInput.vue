<template>
  <label :for="id" >Select Label</label>
  <select :id="id" >
    <option value="0" disabled selected>Please, select one</option>
    <option value="sample value">Sample Value</option>
  </select>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: "SelectInput",
  props: {
    id: String,
  }
});
</script>

<style scoped>

</style>