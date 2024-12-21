<template>
  <main id="main-container">
    <h1>Mathificent!</h1>
    <div>
      <SelectInput id="operation" label="Operation" label-id="operation-lbl" :options="operationList" />
    </div>
    <div>
      <SelectInput id="max-number" label="Maximum Number" label-id="max-number-lbl" :options="numberList" />
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

// All properties, including the `props` property, here in the OptionsAPI
// are assigned to objs w/ further properties inside most.
// noinspection UnnecessaryLocalVariableJS
export default defineComponent({
  name: "MainContainer",

  components: {
    PlayButton,
    SelectInput,
  }, // end components

  data: () => {
    // The data property always returns an obj
    return {
      operationList: [
        ['Addition', '+'],
        ['Subtraction', '-'],
        ['Multiplication', 'x'],
        ['Division', '/']
      ],
    };
  }, // end data

  computed: {
    numberList: () => {
      const numberList = [];
      for (let number = 2; number <= 100; number++) {
        numberList.push([number, number]);
      }
      return numberList;
    }
  },// end computed

});// end export
</script>


<style scoped>
#main-container {
  margin: auto;
  width: 380px;
}
</style>