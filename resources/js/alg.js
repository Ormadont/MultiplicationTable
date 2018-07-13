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

let answers = [-1,-1,-1,-1,-1,-1];
let rightAnswer = 15;
const answer1_span = document.getElementById('answer1');
const answer2_span = document.getElementById('answer2');
const answer3_span = document.getElementById('answer3');
const answer4_span = document.getElementById('answer4');
const answer5_span = document.getElementById('answer5');
const answer6_span = document.getElementById('answer6');
const answers_span = [answer1_span, answer2_span, answer3_span, answer4_span, answer5_span, answer6_span];
let showed = false; //перечень вариантов на экране?

const equal_span = document.getElementById('equal'); //знак равенства

let effortsCount = 0;
const effortsCount_span = document.getElementById('effortsCount');

let errorsCount = 0;
const errorsCount_span = document.getElementById('errorsCount');

//знак вопроса, по нажатию на который должна появиться таблица умножения
const multTableQ_span = document.getElementById('multTableQ');
const multTable_div = document.querySelector('.multTable');
const multTable = createArrayForMTable();


// ---------------------------
// debugger;

rankCount = Math.floor(Math.random()*8) + 2;

initBoard();

multTable_div.innerHTML = multTable;


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
  restorElementColors(answer4_span);
  restorElementColors(answer5_span);
  restorElementColors(answer6_span);
}

function restorElementColors(element) {
  element.style.color = "hsl(43, 89%, 84%)";
  element.style.backgroundColor = "hsla(292, 25%, 24%, 0.9)";
  element.style.borderColor = "hsla(292, 25%, 24%, 0.9)";
}

function initBoard() {

  questions = generateMixUpArrayFrom0to9(); //example: [2, 3, 8, 6, 0, 7, 1, 9, 4]
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

answer4_span.addEventListener('click',() => {
  if (!(answered())) {treatAnswer(answer4_span)}
});

answer5_span.addEventListener('click',() => {
  if (!(answered())) {treatAnswer(answer5_span)}
});

answer6_span.addEventListener('click',() => {
  if (!(answered())) {treatAnswer(answer6_span)}
});

multTableQ_span.addEventListener('click',() => {
  initBoard();
  if (multTable_div.style.display === "none" || multTable_div.style.display === "") {

    multTable_div.style.display = "grid";
  } else {
    multTable_div.style.display = "none";
  }

})


//закрытие по верхнему левому элементу
const x_span = document.getElementById('n00');
x_span.addEventListener('click', () => {
  multTable_div.style.display = "none";
})

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
  answer4_span.style.display = "inline-block";
  answer5_span.style.display = "inline-block";
  answer6_span.style.display = "inline-block";
  answer1_span.innerHTML = answers[0];
  answer2_span.innerHTML = answers[1];
  answer3_span.innerHTML = answers[2];
  answer4_span.innerHTML = answers[3];
  answer5_span.innerHTML = answers[4];
  answer6_span.innerHTML = answers[5];
  showed = true;
}

function answered() {
  if (
      answer1_span.style.display==="none"
      || answer3_span.style.display==="none"
      || answer4_span.style.display==="none"
      || answer5_span.style.display==="none"
      || answer6_span.style.display==="none") {
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
  rightAnswer =  rankCount * rand_element;
  answers[0] = rightAnswer;

  //начинаем с 1, т.к. с индексом 0 - это правильный ответ
  for (let i = 1; i < answers.length; i++) {
    const RandomAnswer = getRandomAnswer();
    if (answers.includes(RandomAnswer)) {
      i--;
      continue;
    }
    answers[i] = RandomAnswer;
  }
  answers = mixUp(answers); //перемешиваем ответы
  return question;
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

function getRandomAnswer() {
  return Math.floor(Math.random()*10)*rankCount;
}

//таблица умножения, первая строка и первый столбец - указатели
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
// [1, 1, 2, 3, 4, 5, 6, 7, 8, 9]
// ...
// [8, 8, 16, 24, 32, 40, 48, 56, 64, 72]
// [9, 9, 18, 27, 36, 45, 54, 63, 72, 81]
function createArrayForMTable() {
  const size = 10;
  var a = new Array(size);
  let num="";
  for (i = 0; i < size; i++) {
    a[i] = new Array(size);
    for (j = 0; j < size; j++) {
      if (i === 0 || j === 0) {
        num = i.toString() + j.toString();
        a[i][j] = `<span id="n${num}">${(i+1) * (j+1) - 1}</span>`
      } else {
        num = i.toString() + j.toString();
        a[i][j] = `<span id="n${num}">${i * j}</span>`;
      }
    }
  }
  a[0][0] = `<span id="n00">X</span>`;
  //преобразование в строку и удаление запятых
  return a.join("").replace(/,/g,"");
}

//предназначено для работы сразу после появлении на экране таблицы
let currentElement=document.getElementById(`n00`); //текущий выделенный элемент таблицы, инициализирован первым элементом табицы
let currentElement1=document.getElementById(`n00`); //текущий выделенный элемент таблицы, инициализирован первым элементом табицы
let currentRElement=document.getElementById(`n00`); //текущая выделенная строка таблицы, инициализирована первым элементом табицы
let currentCElement=document.getElementById(`n00`); //текущий выделенный столбец таблицы, инициализирован первым элементом табицы
let currentRElement1=document.getElementById(`n00`); //текущая выделенная строка таблицы, инициализирована первым элементом табицы
let currentCElement1=document.getElementById(`n00`); //текущий выделенный столбец таблицы, инициализирован первым элементом табицы
(function enhMultTable() {
  const numSpansOfMultTable = 100;
  let idName=``;
  for (let i = 0; i < numSpansOfMultTable; i++) { //i - номер ячейки таблицы
    if (i<10) {
      idName = `n0${i}`;
    } else {
      idName = `n${i}`;
    }
    document.getElementById(idName).addEventListener('mouseover', (event) => {
      let rndColor = `hsla(${Math.floor(Math.random()*358)} , 100%, 28%, 0.7)`;
      // highlight the mouseover target
      enhElem2(event.target, rndColor);
      //покрасить номер столбца
      enhElem2(`n0${getColNum(i)}`, rndColor);
      //покрасить номер строки
      enhElem2(`n${getRowNum(i)}0`, rndColor);

      // reset the color after a short delay
      setTimeout(function() {
        deEnhElemMove(currentElement);
        if (currentRElement != `n${getRowNum(i)}0`) {
          deEnhElemMove(currentRElement);
        }
        if (currentCElement != `n0${getColNum(i)}`) {
          deEnhElemMove(currentCElement);
        }
        currentElement = event.target;
        currentRElement = `n${getRowNum(i)}0`;
        currentCElement = `n0${getColNum(i)}`;
      }, 500);

    }, false);

    document.getElementById(idName).addEventListener('click', (event) => {
      // highlight the mouseover target
      enhElem1(event.target);
      //покрасить номер столбца
      enhElem1(`n0${getColNum(i)}`);
      //покрасить номер строки
      enhElem1(`n${getRowNum(i)}0`);

      // reset the color after a short delay
      setTimeout(function() {
        deEnhElemClick(currentElement1);
        if (currentRElement1 != `n${getRowNum(i)}0`) {
          deEnhElemClick(currentRElement1);
        }
        if (currentCElement1 != `n0${getColNum(i)}`) {
          deEnhElemClick(currentCElement1);
        }
        currentElement1 = event.target;
        currentRElement1 = `n${getRowNum(i)}0`;
        currentCElement1 = `n0${getColNum(i)}`;
      }, 100);
    }, false);
  }
})()

function getRowNum(rowAndCol) {
  if (rowAndCol < 10) {
    return 0;
  } else {
    return Math.floor(rowAndCol/10);
  }
}

function getColNum(rowAndCol) {
  return rowAndCol - 10*Math.floor(rowAndCol/10);
}

//выделение по нажатию
function enhElem1(Elem) {
  let element;
  if ((typeof Elem) === "string") { //id's name
    element = document.getElementById(Elem);
  }
  else //event.target
  {
    element = Elem;
  }
  element.style.color = "hsl(43, 89%, 84%)";
  element.style.backgroundColor = "hsla(0, 0%, 0%, 0.7)";
  element.style.transform = "scale(1.2)";
}

//выделение по движению
function enhElem2(Elem, rndColor) {
  let element;
  if ((typeof Elem) === "string") { //id's name
    element = document.getElementById(Elem);
  }
  else //event.target
  {
    element = Elem;
  }
  element.style.borderColor = rndColor;
  element.style.fontWeight = "bold";
}

//вернуть исходные цвета по нажатию
function deEnhElemClick(Elem) {
  let element;
  if ((typeof Elem) === "string") { //id's name
    element = document.getElementById(Elem);
  }
  else //event.target
  {
    element = Elem;
  }
  element.style.color = "";
  element.style.backgroundColor = "";
  element.style.transform = "";
}

//вернуть исходные цвета по движению
function deEnhElemMove(Elem) {
  let element;
  if ((typeof Elem) === "string") { //id's name
    element = document.getElementById(Elem);
  }
  else //event.target
  {
    element = Elem;
  }
  element.style.borderColor = "";
  element.style.fontWeight = "normal";
}
