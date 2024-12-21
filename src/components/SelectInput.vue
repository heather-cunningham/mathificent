<template>
  <div class="row mx-1 my-3">
    <label :id="labelId" :for="id" class="fw-bold">{{ label }}</label>

    <!-- This `@input="emitInput"` is an event Emitter, for which the parent comp listens. -->
    <select :id="id" class="col form-select" :value="modelValue" @input="emitInput">
      <option :value="modelValue" disabled selected>{{ modelValue }}</option>
      <option v-for="option in options" :key="`${id}-${option[1]}`" :value="option[1]">
        {{ option[0] }}
      </option>
    </select>
  </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: "SelectInput",
  emits: [
    "update:modelValue", // This is new Vue3 way of handling the v-model directive from the Parent Comp.
    // This child comp is now a "controlled comp", being controlled by the Parent Comp.
    // The v-model directive implicitly creates a modelValue prop and an update:modelValue event,
    // which your child component should handle.
    "input",
  ],

  props: {
    id: String,
    labelId: String,
    label: String,
    options: Array,
    modelValue: String,  // fka as `currentValue`
  }, // end props

  methods: {
    emitInput(event) {
      this.$emit("update:modelValue", event.target.value); // This is new Vue3 way of handling the v-model directive from the Parent Comp.
      this.$emit("input", event.target.value);
    },
  },//end methods

});// end export
</script>

<style scoped>

</style>