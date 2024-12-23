<template>
  <div id="equation" :class="className">
    <div class="col-5">{{ question }}</div>
    <div class="col-2">=</div>
    <div id="user-answer" class="col-5">{{ userAnswer }}</div>
  </div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "GameEquation",
  props: {
    question: String,
    userAnswer: String,
    isAnswerCorrect: Boolean,
    className: String,
  }
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