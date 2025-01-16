<template>
  <div>Score: <span id="user-score">{{ userScore }}</span></div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: "GameScore",
  props: {
    userScore: Number,
  },
});
</script>

<style scoped>

</style>