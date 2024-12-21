<template>
  <div class="row mx-1 my-3">
    <button id="play-btn"
            class="btn btn-primary form-control"
            type="button"
            value="Play"
            aria-label="Play button"
            @click="clickPlayBtn">
      Play
    </button>
  </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: "PlayButton",
  emits: ["click"],

  methods: {
    clickPlayBtn() {
      this.$emit("click");
    },
  },//end methods
});
</script>

<style scoped>

</style>