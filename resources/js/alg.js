// 1. Журнал должен отражать активность за сессию
// 2. В журнале информация должна быть представлена кратко по категориям в виде таблицы
// 2.1 попыток на 3 всего 6, из них ошибок 50%; попыток на 4 всего 9, из них ошибок 33%
// 2.2 нежелательно чтобы информация открывалась в отдельной странице: вставка в html?

let rankCount = 0; //Номер части таблицы умножения. Например, 3 - это 3*0, 3*1, ...
const rankCount_span = document.getElementById('rankCount');

const questions = [];
let question = ["0 * 0"];
const question_span = document.getElementById('question');

const answers = [15,11,23];
let rightAnswer = "15";
const answer1_span = document.getElementById('answer1');
const answer2_span = document.getElementById('answer2');
const answer3_span = document.getElementById('answer3');
const answers_span = [answer1_span, answer2_span, answer3_span];
let showed = false;

const equal_span = document.getElementById('equal');

let effortsCount = 0;
const effortsCount_span = document.getElementById('effortsCount');

let errorsCount = 0;
const errorsCount_span = document.getElementById('errorsCount');

answer1_span.addEventListener('click',() => {
  if (!(answered())) {treatAnswer(answer1_span)}
});

answer2_span.addEventListener('click',() => {
  if (!showed) {showAnswers()}
  else if (!(answered())) {treatAnswer(answer2_span)}
});

answer3_span.addEventListener('click',() => {
  if (!(answered())) {treatAnswer(answer3_span)}
});

function treatAnswer(element) {
  // debugger;
  incCountEfforts();
  if (checkAnswer(element.textContent)) {
    styleRightAnswer(element);
  } else {
    incCountErrors();
    styleBadAnswer(element);
  }
  hideElements(element); //скрыть прочие
}

function incCountErrors() {
  errorsCount++;
  errorsCount_span.innerHTML = errorsCount;
}

function incCountEfforts() {
  effortsCount++;
  effortsCount_span.innerHTML = effortsCount;
}

function checkAnswer(answerForCheck) {
  return answerForCheck === rightAnswer ? true : false;
}

function showAnswers() {
  answer1_span.style.display = "inline-block";
  answer3_span.style.display = "inline-block";
  answer1_span.innerHTML = answers[0];
  answer2_span.innerHTML = answers[1];
  answer3_span.innerHTML = answers[2];
  showed = true;
}

function answered() {
  if (
      answer1_span.style.display==="none"
      || answer3_span.style.display==="none"
      || answer3_span.style.display==="none") {
    return true;
  }
  else {
    return false;
  }
}

//скрывает заданный элемент
function hideElement(element) {element.style.display = "none"};

//скрывает другие элементы
function hideElements(element) {
  answers_span.forEach((el) => {
    if (el !== element) {
      hideElement(el);
    }
  })
}

function insAnswer(question) {
  question_span.innerHTML(question);
};

function styleBadAnswer(element) {
  element.style.color = "red";
  equal_span.innerHTML = "&ne;";
}

function styleRightAnswer(element) {
  // element.style.color = "red";
  // equal_span.innerHTML = "&ne;";
}

function getAnswers() {
  return [];
}

function getRand3() {
  return Math.floor(Math.random()*3);
}




// rankCount_span.addEventListener('click', function () {
//   rankCount_span.innerHTML = rankCount;
// });

// document.getElementById("p").style.color = "blue";
