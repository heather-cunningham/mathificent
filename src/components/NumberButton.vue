<template>
  <button :id="id" class="btn btn-primary number-button" type="button" :value="value" :aria-label="label">
    {{ label }}
  </button>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "NumberButton",

  props: {
    id: String,
    value: String,
    label: String,
  },
})
</script>

<style scoped>
button.number-button {
  width: 6rem;
  height: 6rem;
  margin: .15rem;
  font-size: 3rem;
  text-align: center;
  border-radius: 0.67rem;
}
</style>