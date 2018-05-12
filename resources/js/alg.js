// 1. Журнал должен отражать активность за сессию
// 2. В журнале информация должна быть представлена кратко по категориям в виде таблицы
// 2.1 попыток на 3 всего 6, из них ошибок 50%; попыток на 4 всего 9, из них ошибок 33%
// 2.2 нежелательно чтобы информация открывалась в отдельной странице: вставка в html?

let rankCount = 9; //Номер части таблицы умножения. Например, 3 - это 3*0, 3*1, ...
const rankCount_span = document.getElementById('rankCount');

let questions = [];
let question = "3 * 5";
const question_span = document.getElementById('question');

let answers = [15,11,23];
let rightAnswer = 15;
const answer1_span = document.getElementById('answer1');
const answer2_span = document.getElementById('answer2');
const answer3_span = document.getElementById('answer3');
const answers_span = [answer1_span, answer2_span, answer3_span];
let showed = false; //перечень вариантов на экране?

const equal_span = document.getElementById('equal'); //знак равенства

let effortsCount = 0;
const effortsCount_span = document.getElementById('effortsCount');

let errorsCount = 0;
const errorsCount_span = document.getElementById('errorsCount');

// ---------------------------
// debugger;

console.log("branch: changeRank");

initBoard();

// ---------------------------------------

function treatAnswer(element) {
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

function restoreStateAfterQuestion() {
  hideElements(answer2_span); //скрыть прочие
  equal_span.innerHTML = "=";
  answer2_span.innerHTML = "?";
  answer1_span.style.color = "hsl(43, 89%, 84%)";
  answer2_span.style.color = "hsl(43, 89%, 84%)";
  answer3_span.style.color = "hsl(43, 89%, 84%)";
}

function initBoard() {

  questions = generateMixUpArrayFrom0to9();
  effortsCount = 0;
  errorsCount = 0;
  rankCount_span.innerHTML = rankCount;

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

  nextQuestion(question, true);
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
  return parseInt(answerForCheck) === rightAnswer ? true : false;
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

function nextQuestion(question, firstQuestion) {
  if (firstQuestion) {
    question_span.innerHTML =  generateQA();
    restoreStateAfterQuestion();
    firstQuestion = false
    showed = false;
  } else {
    if (questions.length > 0) {
      setTimeout( () =>{
        question_span.innerHTML =  generateQA();
        restoreStateAfterQuestion();
        showed = false;
      }, 2000);
      return true;
    } else {
      return false;
    }
  }

};

function generateQA() {
  // debugger;
  const randomIndex = Math.floor(Math.random()*questions.length); //рандомный индекс первого массива
  const rand_element = questions.splice(randomIndex,1) //удалённый элемент (массив)
  question = `${rankCount} * ${rand_element}`;
  rightAnswer = rand_element * rankCount;
  answers[0] = rightAnswer;
  answers[1] = rightAnswer + posDiffAnswer();
  answers[2] = rightAnswer - negDiffAnswer();
  answers = mixUp(answers); //перемешиваем ответы
  console.log(questions.length + " question:" + question + " answer:" + rightAnswer);
  console.log(answers);
  return question;
}

function posDiffAnswer() {
  return Math.floor(Math.random()*rankCount);
}

function negDiffAnswer() {
  let x = 100;
  if (rightAnswer === 0) {
     x = -1;
  } else {
    while (!((x > 0) && (x < Math.floor(rightAnswer/2)) || x === 1)) {
      x = Math.floor(Math.random()*rankCount);
    }
  }
  return x;
}

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

function generateMixUpArrayFrom0to9() {
  const array = [];
  for (var i = 0; i < 10; i++) {
    array.push(i);
  }
  return mixUp(array);
}
