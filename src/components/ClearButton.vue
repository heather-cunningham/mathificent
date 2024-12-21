<template>
  <button id="clear-btn" class="btn btn-primary" type="button" value="clear" aria-label="Clear">
    Clear
  </button>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "ClearButton"
})
</script>

<style scoped>
#clear-btn {
  width: 12.5rem;
  height: 6rem;
  margin: .15rem;
  font-size: 3rem;
  text-align: center;
  border-radius: 0.67rem;
}
</style>