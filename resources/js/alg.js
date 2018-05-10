// 1. Журнал должен отражать активность за сессию
// 2. В журнале информация должна быть представлена кратко по категориям в виде таблицы
// 2.1 попыток на 3 всего 6, из них ошибок 50%; попыток на 4 всего 9, из них ошибок 33%
// 2.2 нежелательно чтобы информация открывалась в отдельной странице: вставка в html?

let rankCount = 0; //Номер части таблицы умножения. Например, 3 - это 3*0, 3*1, ...
const rankCount_span = document.getElementById('rankCount');

let questions = [];
let question = ["3 * 5"];
const question_span = document.getElementById('question');

let answers = [15,11,23];
let rightAnswer = "15";
const answer1_span = document.getElementById('answer1');
const answer2_span = document.getElementById('answer2');
const answer3_span = document.getElementById('answer3');
const answers_span = [answer1_span, answer2_span, answer3_span];
let showed = false; //перечень вариантов на экране?

const equal_span = document.getElementById('equal');

let effortsCount = 0;
const effortsCount_span = document.getElementById('effortsCount');

let errorsCount = 0;
const errorsCount_span = document.getElementById('errorsCount');

// ---------------------------

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

// ---------------------------------------

function treatAnswer(element) {
  // debugger;
  answers = mixUp(answers); //перемешиваем ответы
  hideElements(element);
  incCountEfforts();
  if (checkAnswer(element.textContent)) {
    styleRightAnswer(element);
  } else {
    incCountErrors();
    styleBadAnswer(element);
  }
  nextQuestion(question);
}

function restoreState() {
  hideElements(answer2_span); //скрыть прочие
  equal_span.innerHTML = "=";
  answer2_span.innerHTML = "?";
  answer1_span.style.color = "hsl(43, 89%, 84%)";
  answer2_span.style.color = "hsl(43, 89%, 84%)";
  answer3_span.style.color = "hsl(43, 89%, 84%)";
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
  });
  element.style.display = "inline-block";
}

function nextQuestion(question) {
  setTimeout( () =>{
    question_span.innerHTML = question;
    restoreState();
    showed = false;
  }, 2000);
};

function styleBadAnswer(element) {
  element.style.color = "red";
  equal_span.innerHTML = "&ne;";
}

function styleRightAnswer(element) {
  element.style.color = "yellow";
  // equal_span.innerHTML = "&ne;";
}

//перемешивание произвольного массива, где array - массив
function mixUp(origArray) {
  const mixUpArray = [];
  const array = origArray.slice();
  while (array.length>0) {
    const randomIndex = Math.floor(Math.random()*array.length); //рандомный индекс первого массива
    const rand_element = array.splice(randomIndex,1) //удалённый элемент (массив) первого массива для второго массива
    mixUpArray.push(rand_element[0]); //добавляем элемент в новый массив
  }
  return mixUpArray;
}

function generateArray() {

}

// rankCount_span.addEventListener('click', function () {
//   rankCount_span.innerHTML = rankCount;
// });

// document.getElementById("p").style.color = "blue";
