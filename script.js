
const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyper Transfer Markup Link",
      "Home Tool Markup Language"
    ],
    answer: 0
  },
  {
    question: "Which CSS property changes the text color?",
    options: ["font-color", "text-style", "color", "foreground"],
    answer: 2
  },
  {
    question: "Which tag is used for the largest heading in HTML?",
    options: ["<h6>", "<heading>", "<head>", "<h1>"],
    answer: 3
  },
  {
    question: "Which keyword declares a variable that cannot be reassigned in JavaScript?",
    options: ["var", "let", "const", "static"],
    answer: 2
  },
  {
    question: "What does the DOM stand for?",
    options: [
      "Data Object Model",
      "Document Object Model",
      "Digital Ordered Markup",
      "Display Object Management"
    ],
    answer: 1
  },
  {
    question: "Which method selects an element by its id?",
    options: [
      "document.getElementById()",
      "document.queryClass()",
      "document.findId()",
      "document.selectElement()"
    ],
    answer: 0
  },
  {
    question: "How many columns does the Bootstrap grid system have?",
    options: ["6", "10", "12", "16"],
    answer: 2
  },
  {
    question: "Which symbol is used for comments in JavaScript (single line)?",
    options: ["<!-- -->", "//", "#", "**"],
    answer: 1
  }
];

let currentIndex = 0;
let score = 0;
let answered = false;

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionCount = document.getElementById("question-count");
const scoreDisplay = document.getElementById("score-display");
const progressWrapper = document.querySelector(".progress");
const progressBar = document.getElementById("progress-bar");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options");
const feedback = document.getElementById("feedback");

const finalScore = document.getElementById("final-score");
const totalQuestions = document.getElementById("total-questions");
const resultMessage = document.getElementById("result-message");


function startQuiz() {
  currentIndex = 0;
  score = 0;
  startScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  answered = false;
  const current = questions[currentIndex];

  
  questionCount.textContent = `Question ${currentIndex + 1} of ${questions.length}`;
  scoreDisplay.textContent = `Score: ${score}`;
  questionText.textContent = current.question;
  feedback.textContent = "";
  feedback.className = "feedback";
  nextBtn.classList.add("hidden");

  
  const percent = (currentIndex / questions.length) * 100;
  progressBar.style.width = `${percent}%`;
  progressWrapper.setAttribute("aria-valuenow", Math.round(percent));
  
  optionsContainer.innerHTML = "";
  current.options.forEach((optionText, index) => {
    const button = document.createElement("button");
    button.className = "option-btn";
    button.textContent = optionText;
    button.addEventListener("click", () => selectAnswer(index));
    optionsContainer.appendChild(button);
  });
}

function selectAnswer(selectedIndex) {
  if (answered) return; 
  answered = true;

  const correctIndex = questions[currentIndex].answer;
  const buttons = optionsContainer.querySelectorAll(".option-btn");

  
  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === correctIndex) {
      button.classList.add("correct");
    } else if (index === selectedIndex) {
      button.classList.add("wrong");
    }
  });

  if (selectedIndex === correctIndex) {
    score++;
    feedback.textContent = "Correct! 🎉";
    feedback.classList.add("correct");
  } else {
    feedback.textContent = "Wrong answer.";
    feedback.classList.add("wrong");
  }

  scoreDisplay.textContent = `Score: ${score}`;


  nextBtn.textContent =
    currentIndex === questions.length - 1 ? "See Results" : "Next Question";
  nextBtn.classList.remove("hidden");
  nextBtn.focus();
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  finalScore.textContent = score;
  totalQuestions.textContent = questions.length;

  const percentage = (score / questions.length) * 100;
  if (percentage === 100) {
    resultMessage.textContent = "Perfect score! You're a web dev star! 🌟";
  } else if (percentage >= 70) {
    resultMessage.textContent = "Great job! You know your basics well. 👏";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Good effort! A little more practice will help. 💪";
  } else {
    resultMessage.textContent = "Keep learning, you'll get better with practice! 📚";
  }
}

// ---------- Event listeners ----------
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", startQuiz);