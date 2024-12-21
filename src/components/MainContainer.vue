<template>
  <main id="main-container">
    <h1>Mathificent!</h1>
    <SelectInput id="operation"
                 label="Operation"
                 label-id="operation-lbl"
                 :options="operationList"
                 v-model="operation"
                 @input="setOperation" />
    <SelectInput id="max-number"
                 label="Maximum Number"
                 label-id="max-number-lbl"
                 :options="numberList"
                 v-model="maxNumber"
                 @input="setMaxNum" />
    <!-- This `@input="setMaxNum"` is an Event Listener, which listens for the value emitted by child
     comp, SelectInput. -->
    <PlayButton/>
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
      operation: "Please, select one",
      maxNumber: "Please, select one",
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

  methods: {
    // Value here is the $event.target.value implicit variable, and it can't be named anything else.
    setOperation(value) {
      this.operation = value;
    },

    setMaxNum(value) {
      this.maxNumber = value;
    },
  },//end methods

});// end export
</script>


<style scoped>
#main-container {
  margin: auto;
  width: 380px;
}
</style>