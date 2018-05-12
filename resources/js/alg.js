// 1. Журнал должен отражать активность за сессию
// 2. В журнале информация должна быть представлена кратко по категориям в виде таблицы
// 2.1 попыток на 3 всего 6, из них ошибок 50%; попыток на 4 всего 9, из них ошибок 33%
// 2.2 нежелательно чтобы информация открывалась в отдельной странице: вставка в html?

let rankCount = 6; //Номер части таблицы умножения. Например, 3 - это 3*0, 3*1, ...
const rankCount_span = document.getElementById('rankCount');
const ranks_div = document.querySelector('.ranks');

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

rankCount = Math.floor(Math.random()*8) + 2;

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
    addParagraphOfErrors();
  }
  nextQuestion(question);
}

function restoreStateAfterQuestion() {
  hideElements(answer2_span); //скрыть прочие
  equal_span.innerHTML = "=";
  answer2_span.innerHTML = "?";
  restorElementColors(answer1_span);
  restorElementColors(answer2_span);
  restorElementColors(answer3_span);
}

function restorElementColors(element) {
  element.style.color = "hsl(43, 89%, 84%)";
  element.style.backgroundColor = "hsla(292, 25%, 24%, 0.9)";
  element.style.borderColor = "hsla(292, 25%, 24%, 0.9)";
}

function initBoard() {

  questions = generateMixUpArrayFrom0to9();
  resetErrorsAndEfforts();

  rankCount_span.innerHTML = rankCount;
  nextQuestion(question, true);
}

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

rankCount_span.addEventListener('click', () => {
  showRanks();
  initBoard();
})

// choose rankCount

function showRanks() {
  ranks_div.style.display = "flex";

  document.getElementById('rankCount2').addEventListener('click', () => {
    setRankCount(2);
    hideRanks();
  })
  document.getElementById('rankCount3').addEventListener('click', () => {
    setRankCount(3);
    hideRanks();
  })
  document.getElementById('rankCount4').addEventListener('click', () => {
    setRankCount(4);
    hideRanks();
  })
  document.getElementById('rankCount5').addEventListener('click', () => {
    setRankCount(5);
    hideRanks();
  })
  document.getElementById('rankCount6').addEventListener('click', () => {
    setRankCount(6);
    hideRanks();
  })
  document.getElementById('rankCount7').addEventListener('click', () => {
    setRankCount(7);
    hideRanks();
  })
  document.getElementById('rankCount8').addEventListener('click', () => {
    setRankCount(8);
    hideRanks();
  })
  document.getElementById('rankCount9').addEventListener('click', () => {
    setRankCount(9);
    hideRanks();
  })
}

function setRankCount(rank) {
  rankCount_span.innerHTML = rank;
  rankCount = rank;
};

function hideRanks() {
  ranks_div.style.display = "none";
  initBoard();
}

//other

function incCountErrors() {
  errorsCount++;
  errorsCount_span.innerHTML = errorsCount;
}

function incCountEfforts() {
  effortsCount++;
  effortsCount_span.innerHTML = effortsCount;
}

function resetErrorsAndEfforts() {
  effortsCount = 0;
  effortsCount_span.innerHTML = effortsCount;
  errorsCount = 0;
  errorsCount_span.innerHTML = errorsCount;
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
  console.log("rightAnswer:" + rightAnswer);
  while (answers[1] >= 100) {
    answers[1] = rightAnswer + posDiffAnswer();
  }
  // debugger;
  while ((answers[0] === answers[1])
  ||  (answers[0] === answers[2])
  ||  (answers[1] === answers[2])) {
    answers[1]+= Math.floor(Math.random()*2);
    answers[2]+= Math.floor(Math.random()*2);
  }
  console.log(questions.length + " question:" + question + " answer:" + rightAnswer);
  console.log(answers);
  answers = mixUp(answers); //перемешиваем ответы
  return question;
}

function posDiffAnswer() {
  return Math.floor(Math.random()*(rightAnswer/2));
}

function negDiffAnswer() {
  let x = 0;
  if (rightAnswer === 0) {
     x = -1;
  } else {
    x = Math.floor(Math.random()*rightAnswer/2);
  }
  return x;
}

function styleBadAnswer(element) {
  element.style.color = "red";
  equal_span.innerHTML = "&ne;";
}

function styleRightAnswer(element) {
  element.style.color = "hsla(292, 25%, 24%, 0.9)";
  element.style.backgroundColor = "hsl(43, 89%, 84%)";
  element.style.borderColor = "hsl(43, 89%, 84%)";
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

function addParagraphOfErrors() {
  var para = document.createElement("p");
  neededQ = `${question} = ${rightAnswer}`;
  var node = document.createTextNode(neededQ);
  para.appendChild(node);
  var element = document.querySelector(".goodAnswers");
  element.appendChild(para);
}
