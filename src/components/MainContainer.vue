<!--suppress CssUnusedSymbol -->
<template>
  <main id="main-container">
    <div id="config-container" v-if="screen === 'config'">
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

    <div id="game-container" class="text-center" v-else-if="screen === 'play'">

      <transition name="slide">
        <!-- Time’s Up Game Play template-->
        <template v-if="timeLeft === 0">
          <div id="endgame-container">
            <h2 id="times-up-header">Time’s Up!</h2>

            <div id="endgame-msg-div">
              <strong class="big">You answered:</strong>
              <div id="end-score" class="huge">{{ userScore }}</div>
              <strong class="big">questions correctly!</strong>
            </div>

            <div id="button-div">
              <button id="play-again-btn"
                      class="btn btn-primary form-control"
                      type="button"
                      value="Play Again"
                      aria-label="Play Again"
                      @click="restartGame">
                Play Again with the same settings?
              </button>
              <button id="change-settings-btn"
                      class="btn btn-secondary form-control"
                      type="button"
                      value="Change Settings"
                      aria-label="Change Settings"
                      @click="loadConfigScreen">
                Change Settings
              </button>
            </div>
          </div>
        </template><!-- end Time's Up template -->
      </transition>

      <transition name="slide-right">
        <!-- Game Template -->
        <template v-if="timeLeft > 0">
          <div id="gameboard-container">
            <div id="scoreboard" class=" row border-bottom">
              <div id="score" class="col px-3 text-left">
                <GameScore :user-score="userScore"/>
              </div>
              <div id="timer" class="col px-3 text-right">
                <GameTimer :time-left="timeLeft"/>
              </div>
            </div>

            <div id="game-equation" class="row my-2">
              <GameEquation :class="equationClass"
                            :question="question"
                            :user-answer="answerInput"
                            :is-answer-correct="isAnswerCorrect"/>
            </div>

            <div id="calculator-buttons">
              <!-- Use `v-for` directive to loop through list of numbers to create the number
               buttons, instead of hardcoding ea. one. -->
              <NumberButton v-for="number in numberButtonList"
                            :id="`${number}-btn`"
                            :label="`${number}`"
                            :value="`${number}`"
                            :key="number"
                            @click="setAnswerInput(number)"/>
              <ClearButton @click="clickClearBtn"/>
            </div>
          </div>
        </template><!-- end Game Template -->
      </transition>
    </div> <!-- end "game-container" -->

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
      gameLength: 60,
      timeLeft: 0,
      timerIntervalId: null, // aka timer in class files, again confusing. This var is not the timer itself,
      // but the interval id returned by setInterval().
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

    // aka config() in class files, the names of variables and fcns in these class files is terrible and very confusing
    loadConfigScreen() {
      this.screen = "config";
      this.operation = selectDefaultMsg;
      this.maxNumber = selectDefaultMsg;
    },

    // aka play() in class files
    loadGameScreen() {
      this.screen = "play";
      this.resetQuestion();
      this.startTimer();
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

    // aka question: unnamed fcn in data props
    setNewQuestion() {
      const num1 = this.operands.num1;
      const num2 = this.operands.num2;
      return `${num1} ${this.operation} ${num2}`;
    },

    // aka newQuestion() in class files
    resetQuestion(){
      this.answerInput = "";
      this.isAnswerCorrect = false;
      this.operands = this.getRandomNumbers(this.operation, 0, this.maxNumber);
    },

    setEquationClassStyle() {
      if(this.isAnswerCorrect) {
        return "row fade";
      } else {
        return "row";
      }
    },

    startTimer(){
      this.timeLeft = this.gameLength;

      if(this.timeLeft > 0){
        this.timerIntervalId = setInterval(
            ()=>{
              this.timeLeft--;
              if(this.timeLeft === 0)
                clearInterval(this.timerIntervalId);
            },
            1000
        );
      }
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

    // aka restart() in class files
    restartGame() {
      this.userScore = 0;
      this.startTimer();
      this.resetQuestion();
    },
  },//end methods

});// end export
</script>


<style scoped>
#main-container {
  margin: auto;
  width: 21rem;
}

#mathificent-header {
  text-align: center;
}

#scoreboard {
  font-size: 1.5rem;
  font-weight: bold;
}

.slide-leave-active,
.slide-enter-active {
  width: 21rem;
  position: absolute;
  top: 3.11rem;
  transition: 500ms;
}

.slide-enter-from {
  transform: translate(-100%, 0);
  transition: opacity .5s;
}

.slide-leave-to {
  transform: translate(100%, 0);
  opacity:0;
}

.slide-right-leave-active,
.slide-right-enter-active {
  width: 21rem;
  position: absolute;
  top: 3.11rem;
  transition: 500ms;
}

.slide-right-enter-from {
  transform: translate(100%, 0);
  transition: opacity .5s;
}

.slide-right-leave-to {
  transform: translate(-100%, 0);
  opacity:0;
}

#endgame-container {
  margin-top: 2rem;
}

#times-up-header {
  font-size: 3rem;
}

#endgame-msg-div {
  margin-bottom: 1rem;
}

.big {
  font-size: 1.75rem;
}

.huge {
  font-size: 5rem;
}

#play-again-btn, #change-settings-btn {
  margin: 0.33rem 0;
}
</style>