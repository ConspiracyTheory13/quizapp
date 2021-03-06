console.log('script loaded')

function askQuestions() {
  console.log('askQuestions called')
  const myQuestions = [{
    question: "From what source is the fire of magic born into the hands of human casters?",
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
  var score = 0;
  const maxScore = myQuestions.length;

  const quizContainer = $('#quiz');
  const resultsContainer = $('#results');
  const submitButton = $('#submit');
  const startButton = $('#startQuiz');

  function buildHTML(questionObject) {
    var answerBlock = '';
    for (let i = 0; i < questionObject.answers.length; i++) {
      var answerString =
        `<input type="radio" id="${i}" name="answer" value=${questionObject.answers[i]}"><label for="${i}">${questionObject.answers[i]}</label>`
      console.log(answerString);
      answerBlock += answerString
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
    if (answerID == correctID) {
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

  function endTest() {}

  function updateScore() {
    resultsContainer.html(
      `<div class="score-block">your score is ${score}</div>`);

  }

  function setupTest() {
    console.log('setupTest called')
    startButton.on('click', function(event) {
      console.log('recieved a click!')
      startButton.remove();
      startQuiz();
    })
  }
  setupTest();

}

$(document).ready(function() {
  askQuestions();
})
