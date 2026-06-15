// DOM Elements
const startScreen = document.getElementById("start-screen");
const questionScreen = document.getElementById("question-screen");
const resultScreen = document.getElementById("result-screen");
const startBtn = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const currentQuestionSpan = document.getElementById("current-question-number");
const totalQuestionSpan = document.getElementById("total-question-number");
const quizOptions = document.getElementById("quiz-options");
const marksScoredSpan = document.getElementById("marks-scored");
const finalScoreSpan = document.getElementById("final-score");
const totalMarksSpan = document.getElementById("total-marks");
const resultMessage = document.getElementById("result-message");
const restartBtn = document.getElementById("restart-btn");
const progress = document.getElementById("progress");

// Quiz Questions
const quizQuestion = [
  {
    question: "Which planet is known as the 'Red Planet'?",
    options: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the capital city of France?",
    options: [
      { text: "Rome", correct: false },
      { text: "Madrid", correct: false },
      { text: "Paris", correct: true },
      { text: "Berkin", correct: false },
    ],
  },
  {
    question: "Which symbol represents O2",
    options: [
      { text: "Gold", correct: false },
      { text: "Silver", correct: false },
      { text: "Oxygen", correct: true },
      { text: "Iron", correct: false },
    ],
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    options: [
      { text: "Charles Dickens", correct: false },
      { text: "Jane Austen", correct: false },
      { text: "Mark Twain", correct: false },
      { text: "William Shakespeare", correct: true },
    ],
  },
  {
    question: "What is the largest mammal in the world?",
    options: [
      { text: "African Elephant", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Giraffe", correct: false },
      { text: "Great White Shark", correct: false },
    ],
  },
];

// Quiz State variables

let currentQuestionIndex = 0;
let score = 0;
let optionsDisabled = false; // handling of the disabling of options after selection to resolve double click bug
let eachQuestionMarks = 2;

// handling of span element
totalQuestionSpan.textContent = quizQuestion.length;
totalMarksSpan.textContent = quizQuestion.length * eachQuestionMarks;

startBtn.addEventListener("click", startQuiz); // when we click on stard button js will reach that click event and will triger the function called startQuiz
restartBtn.addEventListener("click", restartQuiz); // same with reseatart button js will check the click event and will triger the function called restartQuiz

function startQuiz() {
  score = 0
  marksScoredSpan.textContent = 0;
  startScreen.classList.remove("active");
  questionScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  optionsDisabled = false;

  const currentQuestion = quizQuestion[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  // progress bar percentge defining
  const progressPercentage = (currentQuestionIndex / quizQuestion.length) * 100;
  progress.style.width = progressPercentage + "%";

  questionText.textContent = currentQuestion.question;

  // now options creation
  quizOptions.innerHTML = "";

  //  here we are setting each options aand creating a button and setting the options text in it
  currentQuestion.options.forEach((answer) => {
    const optionButton = document.createElement("button");
    optionButton.textContent = answer.text;
    optionButton.classList.add("answer-btn");

    // it helps to store the custom data on a button element
    optionButton.dataset.correct = answer.correct;

    optionButton.addEventListener("click", selectAnswer);

    quizOptions.appendChild(optionButton);
  });
}

function selectAnswer(event) {
  if (optionsDisabled) return;

  optionsDisabled = true;

  const selectedOption = event.target;
  const isCorrect = selectedOption.dataset.correct === "true";
  if (isCorrect) {
    score++;
    marksScoredSpan.textContent = score * eachQuestionMarks;
  }

  Array.from(quizOptions.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedOption) {
      button.classList.add("incorrect");
    }
  });

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestion.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 10);

  console.log("Option Clicked");
}

function showResult() {
  questionScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score * eachQuestionMarks;

  totalMarksSpan.textContent = quizQuestion.length * eachQuestionMarks;
  const percentage =
    (finalScoreSpan.textContent / totalMarksSpan.textContent) * 100;

  console.log(percentage);

  if (percentage === 100) {
    resultMessage.textContent = "Perfect!!! You are a genius";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Good effort!! Keep learning";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Average! Need a bit more hard work";
  } else {
    resultMessage.textContent = "Failed:( Better Luck next time";
  }
  console.log("Result Screen reached");
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  questionScreen.classList.add("active");

  currentQuestionIndex = 0
  score = 0

  startQuiz()

  console.log("Quiz Restarted");
}
