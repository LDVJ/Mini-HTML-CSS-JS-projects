//  DOM

const startScreen = document.getElementById("start-screen");
const questionScreen = document.getElementById("question-screen");
const resultScreen = document.getElementById("result-screen");
const startBtn = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const currentQuestionSpan = document.getElementById("current-question-number");
const totalQuestionSpan = document.getElementById("total-question-number");
const marksScoredSpan = document.getElementById("marks-scored");
const quizOptions = document.getElementById("quiz-options");
const progress = document.getElementById("progress");
const resultMessage = document.getElementById("result-message");
const finalScoreSpan = document.getElementById("final-score");
const totalMarksSpan = document.getElementById("total-marks");
const restartBtn = document.getElementById("restart-btn");

const EACH_QUESTION_MARKS = 2;

let quizQuestion = [];

let currentQuestionIndex = 0;
let score = 0;
let optionsDisabled = false; // handling the disable state of the options once i click on options

async function loadQuizQuestion() {
  try {
    const response = await fetch("quiz_question.json");

    if (!response.ok) {
      throw new Error(`Http error! status: ${response.status}`);
    }

    quizQuestion = await response.json();

    initilizeQuiz();
  } catch (error) {
    console.error("Failed to load Quiz Question:", error);
    questionText.textContent =
      "Failed To load Question. Please try again later!";
  }
}

function initilizeQuiz() {
  totalQuestionSpan.textContent = quizQuestion.length;
  totalMarksSpan.textContent = quizQuestion.length * EACH_QUESTION_MARKS;

  startBtn.addEventListener("click", () => startQuiz(currentQuestionIndex, score));
  restartBtn.addEventListener("click",() => restartQuiz());

  console.log("Json Successfully parsed");
}

  // function startQuiz(index, score) {
    
  // }

loadQuizQuestion()