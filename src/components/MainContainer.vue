<template>
  <main id="main-container">
    <div id="config-container" v-if="screen === 'config'">
      <h1>Mathificent!</h1>
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

    <div id="game-container" class="text-center" v-else-if="screen === 'play'">
      <div id="scoreboard" class=" row border-bottom">
        <div id="score" class="col px-3 text-left">
          <GameScore :user-score="userScore" />
        </div>
        <div id="timer" class="col px-3 text-right">
          <GameTimer />
        </div>
      </div>

      <div id="game-equation" class="row my-2">
        <GameEquation :class="equationClass"
            :question="question"
            :user-answer="answerInput"
            :is-answer-correct="isAnswerCorrect" />
      </div>

      <div id="calculator-buttons">
        <!-- Use `v-for` directive to loop through list of numbers to create the number
         buttons, instead of hardcoding ea. one. -->
        <NumberButton v-for="number in numberButtonList"
                      :id="`${number}-btn`"
                      :label="`${number}`"
                      :value="`${number}`"
                      :key="number"
                      @click="setAnswerInput(number)" />
        <ClearButton @click="clickClearBtn" />

        <!-- Do above ^ instead of these divs.  Don't need the extra divs w/ cols either b/c
         the NumberButton's style and the main container constrain them.  -->
<!--   <div id="calc-top-row" class="col">
          <NumberButton id="one-btn" value="1" label="1" />
          <NumberButton id="two-btn" value="2" label="2" />
          <NumberButton id="three-btn" value="3" label="3" />
        </div>
        <div id="calc-middle-row" class="col">
          <NumberButton id="four-btn" value="4" label="4" />
          <NumberButton id="five-btn" value="5" label="5" />
          <NumberButton id="six-btn" value="6" label="6" />
        </div>
        <div id="calc-bottom-row" class="col">
          <NumberButton id="seven-btn" value="7" label="7" />
          <NumberButton id="eight-btn" value="8" label="8" />
          <NumberButton id="nine-btn" value="9" label="9" />
        </div>
        <div id="calc-clr-btn-row" class="col">
          <NumberButton id="zero-btn" value="0" label="0" />
          <ClearButton />
        </div>-->
      </div>
    </div>
  </main>
</template>


<script>
import {defineComponent} from 'vue';
import SelectInput from "@/components/SelectInput.vue";
import PlayButton from "@/components/PlayButton.vue";
import GameScore from "@/components/GameScore.vue";
import GameTimer from "@/components/GameTimer.vue";
import GameEquation from "@/components/GameEquation.vue";
import NumberButton from "@/components/NumberButton.vue";
import ClearButton from "@/components/ClearButton.vue";
import {getRandomInteger} from "@/helpers/helpers.js";


const selectDefaultMsg = "Please, select one";

// All properties, including the `props` property, here in the OptionsAPI
// are assigned to objs w/ further properties inside most.
// noinspection UnnecessaryLocalVariableJS
export default defineComponent({
  name: "MainContainer",

  components: {
    SelectInput,
    PlayButton,
    GameEquation,
    GameTimer,
    GameScore,
    ClearButton,
    NumberButton,
  }, // end components

  data: () => {
    // The data property always returns an obj filled with reactive variables.
    // Basically, all your let's go here.
    return {
      operationList: [
        ['Addition', '+'],
        ['Subtraction', '-'],
        ['Multiplication', 'x'],
        ['Division', '/']
      ],
      operation: selectDefaultMsg,
      maxNumber: selectDefaultMsg,
      screen: "config",
      numberButtonList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      answerInput: "",
      operands: {
        num1: "1",
        num2: "1",
      },
      isAnswerCorrect: false, // aka: named `answered` in course = bad variable name, confusing
      userScore: 0,
    };
  }, // end data

  computed: {
    numberList(){
      return this.setNumberList();
    },
    question() {
      return this.setNewQuestion();
    },
    equationClass(){
      return this.setEquationClassStyle();
    },
  },// end computed

  // Methods also is always assigned to an obj, and then fcns are placed inside that obj
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

    loadConfigScreen() {
      this.screen = "config";
    },

    loadGameScreen() {
      this.screen = "play";
      this.resetQuestion();
    },

    setAnswerInput(numberSelected) {
      this.answerInput = String(Number(this.answerInput + String(numberSelected)));
      this.isAnswerCorrect = this.checkAnswer(this.answerInput, this.operation, this.operands);

      if(this.isAnswerCorrect){
        setTimeout(()=>this.resetQuestion(),300);
        this.userScore++;
      }
    },

    getRandomNumbers(operator, low, high) {
      let num1 = getRandomInteger(low, high);
      let num2 = getRandomInteger(low, high);
      const numHigh = Math.max(num1, num2);
      const numLow = Math.min(num1, num2);

      // Make sure higher num comes first if op is Subtraction
      if(operator === '-') {
        num1 = numHigh;
        num2 = numLow;
      }

      // No division by zero if op is Division
      if(operator === '/') {
        if (num2 === 0) {
          num2 = getRandomInteger(1, high);
        }
        num1 = (num1 * num2);
      }
      return {num1, num2};
    },

    setNewQuestion() {
      const num1 = this.operands.num1;
      const num2 = this.operands.num2;
      return `${num1} ${this.operation} ${num2}`;
    },

    setEquationClassStyle() {
      if(this.isAnswerCorrect) {
        return "row fade";
      } else {
        return "row";
      }
    },

    resetQuestion(){
      this.answerInput = "";
      this.isAnswerCorrect = false;
      this.operands = this.getRandomNumbers(this.operation, 0, this.maxNumber);
    },

    checkAnswer(userAnswer, operation, operands){
      if(isNaN(userAnswer))
        return false;

      const num1 = operands.num1;
      const num2 = operands.num2;
      let correctAnswer = 0;
      switch(operation){
        case "+":
          correctAnswer = num1 + num2;
          break;
        case "-":
          correctAnswer = num1 - num2;
          break;
        case "x":
          correctAnswer = num1 * num2;
          break;
        case "/":
          correctAnswer = num1 / num2;
          break;
        default:
          console.log("Invalid user answer entered.");
          return false;
      }
      return (parseInt(userAnswer) === correctAnswer);
    },

    clickClearBtn() {
      this.answerInput = "";
    },
  },//end methods

});// end export
</script>


<style scoped>
#main-container {
  margin: auto;
  width: 21rem;
}

#scoreboard {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>