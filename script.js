const questions = [
  {
    question: "What is Eldin's Favorite Soccer Team?",
    answers: [
      { text: "Real Madrid", correct: true },
      { text: "Barcelona", correct: false },
      { text: "Manchester United", correct: false },
      { text: "Liverpool", correct: false }
    ]
  },
  {
  question: "What is Eldin's Favorite Machine at Planet Fitness?",
  answers: [
    { text: "Tricep Machine", correct: false },
    { text: "Preacher Curl", correct: false },
    { text: "Smith Machine", correct: false },
    { text: "Chest Flys", correct: true }
  ]
},
{
  question: "What is Eldin's Favorite Game to Play With Friends?",
  answers: [
    { text: "Fortnite", correct: false },
    { text: "Madden", correct: false },
    { text: "NBA 2K", correct: true },
    { text: "FIFA", correct: false }
  ]
},
{
  question: "What is Eldin's Favorite Protein?",
  answers: [
    { text: "Lamb", correct: false },
    { text: "Turkey", correct: false },
    { text: "Steak", correct: false },
    { text: "Chicken", correct: true }
  ]
}
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = 'Next';
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    answerButtons.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
  });
}

function resetState(){
  nextButton.style.display = 'none';
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct;
  if(isCorrect){
    selectedBtn.classList.add('correct');
    score++;
  } else {
    selectedBtn.classList.add('incorrect');
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add('correct');
    } 
    button.disabled = true;
  });
  nextButton.style.display = 'block';
}

function showScore(){
  resetState();
  questionElement.innerHTML = 'You scored ' + score + ' out of ' + questions.length;
  nextButton.innerHTML = 'Restart Quiz';
  nextButton.style.display = 'block';
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener('click', () => {
  if(currentQuestionIndex<questions.length){
    handleNextButton();
  } else{
    startQuiz();
  }
});


startQuiz();