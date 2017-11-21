function askQuestions() {
  const myQuestions = [{
    question: "Question 1: From what source is the fire of magic born into the hands of human casters?",
    answers: [
      "Suffering",
      "Innate magical ability",
      "Deals with magical denizens",
      "All of the above"
    ],
    correctAnswerIndex: 3
  }, {
    question: "Your local priest needs help performing an exorcism on a child. You suspect that this is a very high level possession. What is the only surest way to prevent the demon from jumping meat suits and possessing you instead?",
    answers: [
      "Wearing a symbol of my faith",
      "Never making eye contact",
      "Learning the name of the devil first",
      "Carving a Solomon seal into the body of the child"
    ],
    correctAnswerIndex: 3
  }];
  var currentQuestionIndex = 0;
  var score = 0; //increases by 1 per right answer (and zero for a wrong answer)
  const maxScore = myQuestions.length;

  const quizContainer = $('#quiz');
  const resultsContainer = $('#results');
  const submitButton = $('#submit');
  const startButton = $('#startQuiz');

  function buildHTML(questionObject) {
    var answerBlock = '';
    for (i = 0; i < questionObject.answers.length; i++) {
      answerBlock +=
        `<input type="radio" id="${i}" name="answer" value="${questionObject.answers[i]}"><label for="${i}">${questionObject.answers[i]}</label>`
    }
    return (
      `<div class="question-block">${questionObject.question}</div><div class="answer-block">${answerBlock}</div>`
    )
  }

  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizContainer.html(buildHTML(myQuestions[0]));
    submitButton.removeClass('hidden');
    submitButton.on('click', function(event) {
      handleSubmit(event)
    })
  }

  function handleSubmit(event) {
    event.preventDefault();
    var answerID = $('input[name=answer]:checked').attr('id');
    var correctID = myQuestions[currentQuestionIndex].correctAnswerIndex;
    if (answerID == correctID) { //double equals because JQuery returns a string for ID
      score++
    }
    nextQuestion();

  }

  function nextQuestion() {
    updateScore(score);
    currentQuestionIndex++;
    if (currentQuestionIndex + 1 > myQuestions.length) {
      endTest()
    } else {
      quizContainer.html(buildHTML(myQuestions[currentQuestionIndex]));
    }
  }

  function endTest() {
    resultsContainer.prepend(`<div>quiz over dude, go home!</div>`)
  }

  function updateScore() {
    resultsContainer.html(
      `<div class="score-block">your score is ${score}</div>`);
  }

  //presents the 'start test' screen without a question
  function setupTest() {
    startButton.on('click', function(event) {
      startButton.remove();
      startQuiz();
    })
  }



}


$(document).ready(function() {
  askQuestions();
});
