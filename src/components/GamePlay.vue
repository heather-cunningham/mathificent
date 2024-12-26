<!--suppress CssUnusedSymbol -->
<template>
  <div id="game-container" class="text-center">
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
            <ClearButton @click="clear"/>
          </div>

          <button id="quit-btn"
                  class="btn btn-danger form-control"
                  type="button"
                  value="quit"
                  aria-label="Quit"
                  @click="loadConfigScreen">
            Quit
          </button>
        </div>
      </template><!-- end Game Template -->
    </transition>
  </div> <!-- end "game-container" -->
</template>

<script>
import {defineComponent} from 'vue'
import GameEquation from "@/components/GameEquation.vue";
import ClearButton from "@/components/ClearButton.vue";
import GameScore from "@/components/GameScore.vue";
import NumberButton from "@/components/NumberButton.vue";
import GameTimer from "@/components/GameTimer.vue";
import {getRandomInteger} from "@/helpers/helpers.js";

export default defineComponent({
  name: "GamePlay",

  props: {
    operation: String,
    maxNumber: String,
  },

  components: {
    GameTimer,
    NumberButton,
    GameScore,
    ClearButton,
    GameEquation,
  }, // end components

  data: ()=>{
    return {
      // operation: selectDefaultMsg,
      // maxNumber: selectDefaultMsg,
      numberButtonList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      answerInput: "",
      operands: {
        num1: "1",
        num2: "1",
      },
      isAnswerCorrect: false, // aka: named `answered` in course = bad variable name, confusing
      userScore: 0,
      // gameLength: 60,
      timeLeft: 60,
      timerIntervalId: null, // aka timer in class files, again confusing. This var is not the timer itself,
      // but the interval id returned by setInterval().
    };
  },

  computed: {
    question() {
      return this.setNewQuestion();
    },
    equationClass(){
      return this.setEquationClassStyle();
    },
  },// end computed

  methods: {
    mounted() {
      console.log("#### mounted() called!!!");
      this.resetQuestion();
      this.startTimer();
    },

    // aka config() in class files, the names of variables and fcns in these class files is terrible and very confusing
    loadConfigScreen() {
      // this.screen = "config"; Instead, push the route onto the router:
      this.$router.push("/");
      // this.operation = selectDefaultMsg;
      // this.maxNumber = selectDefaultMsg;
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

    // aka restart() in class files
    restartGame() {
      this.userScore = 0;
      this.startTimer();
      this.resetQuestion();
    },

    setAnswerInput(numberSelected) {
      console.log("#### setAnswerInput(numberSelected) called!!!");
      console.log("#### operation IS: " + this.operation);
      console.log("#### operands ARE: " + this.operands.num1 + ", " + this.operands.num2);

      this.answerInput = String(Number(this.answerInput + String(numberSelected)));
      this.isAnswerCorrect = this.checkAnswer(this.answerInput, this.operation, this.operands);

      console.log("#### this.isAnswerCorrect = " + this.isAnswerCorrect);

      if(this.isAnswerCorrect){
        setTimeout(()=>this.resetQuestion(),300);
        this.userScore++;
      }
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
      window.addEventListener("keyup", this.handleKeyUp);
      //this.timeLeft = this.gameLength;

      if(this.timeLeft > 0){
        this.timerIntervalId = setInterval(
            ()=>{
              this.timeLeft--;
              if(this.timeLeft === 0) {
                clearInterval(this.timerIntervalId);
                window.removeEventListener("keyup", this.handleKeyUp);
              }
            },
            1000
        ); // end setInterval()
      }
    }, //end  startTimer()

    checkAnswer(userAnswer, operation, operands){
      console.log("#### checkAnswer() called!!!");

      if(isNaN(userAnswer)) {
        console.log("#### userAnswer is NaN!!!");
        return false;
      }

      const userNum = parseInt(userAnswer);
      console.log("#### userNum = " + userNum);
      console.log("#### userNum DATA TYPE = " + typeof userNum);

      const num1 = Number(operands.num1);
      const num2 = Number(operands.num2);
      let correctAnswer = 0;
      switch(operation){
        case "+":
          correctAnswer = num1 + num2;
          console.log("#### correctAnswer = " + correctAnswer);
          break;
        case "-":
          correctAnswer = num1 - num2;
          console.log("#### correctAnswer = " + correctAnswer);
          break;
        case "x":
          correctAnswer = num1 * num2;
          console.log("#### correctAnswer = " + correctAnswer);
          break;
        case "/":
          correctAnswer = num1 / num2;
          console.log("#### correctAnswer = " + correctAnswer);
          break;
        default:
          console.log("Invalid user answer entered.");
          return false;
      }
      return (userNum === correctAnswer);
    },

    clear() {
      this.answerInput = "";
    },


    handleKeyUp(event) {
      event.preventDefault();

      if(event.key === " " || event.key === "Enter"){
        this.clear();
      } else if(event.key === "Backspace") {
        this.answerInput = this.answerInput.substring(0, this.answerInput.length - 1);
      } else if(!isNaN(event.key)) {
        this.setAnswerInput(event.key);
      }
    },

  },// end methods
})
</script>

<style scoped>
#scoreboard {
  font-size: 1.5rem;
  font-weight: bold;
}

#quit-btn {
  width: 19rem;
  margin: 1.33rem auto;
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