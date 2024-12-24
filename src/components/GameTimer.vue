<template>
  <div id="time-left-div">
    Time Left: <span id="time-left">{{ timeLeft }}</span>
  </div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "GameTimer",
  props: {
    timeLeft: Number,
  },
})
</script>

<style scoped>

</style>