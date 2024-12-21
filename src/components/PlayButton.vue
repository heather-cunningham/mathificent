<template>
  <button id="play-btn"
          class="btn btn-primary"
          type="button"
          value="Play"
          aria-label="Play button" @click="clickPlayBtn">
    Play
  </button>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: "PlayButton",
  emits: ['click'],

  methods: {
    clickPlayBtn() {
      this.$emit("click");
    },
  },//end methods
});
</script>

<style scoped>

</style>