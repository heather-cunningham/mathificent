<template>
  <label :id="labelId" :for="id" >{{ label }}</label>
  <select :id="id" >
    <option value="0" disabled selected>Please, select one</option>
<!--    :key="`${option}-${yourVariable}`"-->
    <option v-for="option in options" :key="`${id}-${option[1]}`" :value="option[1]">
      {{ option[0] }}
    </option>
  </select>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: "SelectInput",

  props: {
    id: String,
    labelId: String,
    label: String,
    options: Array,
  }, // end props

});// end export
</script>

<style scoped>

</style>