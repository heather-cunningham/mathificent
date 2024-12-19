<template>
  <main id="main-container">
    <h1>Mathificent!</h1>
    <div>
      <SelectInput id="select1" />
    </div>
    <div>
      <SelectInput id="select2" />
    </div>
    <div>
      <PlayButton/>
    </div>
  </main>
</template>

<script>
import {defineComponent} from 'vue';
import SelectInput from "@/components/SelectInput.vue";
import PlayButton from "@/components/PlayButton.vue";

export default defineComponent({
  name: "MainContainer",
  components: {
    PlayButton,
    SelectInput,
  },
});
</script>


<style scoped>
#main-container {
  margin: auto;
  width: 380px;
}
</style>