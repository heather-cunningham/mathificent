<template>
  <div id="equation" class="row">
    <div class="col-5">1+1</div>
    <div class="col-2">=</div>
    <div class="col-5">2</div>
  </div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "GameEquation"
})
</script>

<style scoped>
#equation {
  width: 90%;
  margin: auto;
  font-size: 2rem;
  font-weight: bold;
  color: navy;
}
</style>