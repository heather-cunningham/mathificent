<template>
  <div id="config-container">
    <h1 id="mathificent-header">Mathificent!</h1>
    <SelectInput id="operation"
                 label="Operation"
                 label-id="operation-lbl"
                 :options="operationList"
                 v-model="operation"
                 @input="setOperation"/>
    <SelectInput id="max-number"
                 label="Maximum Number"
                 label-id="max-number-lbl"
                 :options="numberList"
                 v-model="maxNumber"
                 @input="setMaxNum"/>
    <!-- This `@input="setMaxNum"` is an Event Listener, which listens for the value emitted by child
     comp, SelectInput. -->
    <PlayButton @click="loadGameScreen" />
  </div>
</template>

<script>
import {defineComponent} from 'vue'
import PlayButton from "@/components/PlayButton.vue";
import SelectInput from "@/components/SelectInput.vue";
import {selectDefaultMsg} from "@/helpers/helpers.js";

export default defineComponent({
  name: "GameConfig",

  components: {
    SelectInput,
    PlayButton,
  },

  data: () => {
    return {
      operationList: [
        ['Addition', '+'],
        ['Subtraction', '-'],
        ['Multiplication', 'x'],
        ['Division', '/']
      ],
      operation: selectDefaultMsg,
      maxNumber: selectDefaultMsg,
    };
  },// end data

  computed: {
    numberList(){
      return this.setNumberList();
    },
  },

  methods: {
    setNumberList() {
      const numberList = [];
      for (let number = 2; number <= 100; number++) {
        numberList.push([number, number]);
      }
      return numberList;
    },

    // Value here is the $event.target.value implicit variable, and it can't be named anything else.
    setOperation(value) {
      this.operation = value;
    },

    setMaxNum(value) {
      this.maxNumber = value;
    },

    // aka play() in class files
    loadGameScreen() {
      // this.screen = "play";
      this.$router.push("/play/" + encodeURIComponent(this.operation) + "/" + this.maxNumber);
    },

  },// end methods
})
</script>

<style scoped>
#mathificent-header {
  text-align: center;
}
</style>