"use strict";

// --- Model ---

//Вопросы и ответы
const modelMult = {
  //Список вопросов - перечень вторых множителей
  listQ: [],
  //Текущий вопрос - основной первый и второй множители
  curQ: [0, 0],
  //верный ответ
  rightA: 0,
  //в случайном порядке варианты ответа, включая верный
  rndA: [],
  //число случайных неверных вариантов отвата
  numRndErrorAnswers: 5,
  //ответ пользователя
  userA: 0,
  //счётчик ответов пользователя
  numUserA: 0,
  //результат проверки ответа пользователя
  userRight: true,
  //инициализация !!! Установить исходное состояние
  init() {
    //получить массив вопросов - 10 целых чисел
    this.listQ = getRndArray(10);

    //установить первый основной множитель
    this.curQ[0] = Math.floor(Math.random()*9) + 1;

    //установить второй множитель, изъять элемент из массива вторых множителей
    this.curQ[1] = takeRemoveRndEl(this.listQ);

    //получить верный ответ
    this.rightA = this.curQ[0] * this.curQ[1];

    //Счётчик ответов пользователя
    this.numUserA = 0;

    //Последний ответ пользователя
    this.userA = -1;

    //результат проверки ответа пользователя
    this.userRight = true;

    //сформировать варианты ответа
    this.computeRndA();
  },
  //сформировать 6 вариантов ответа
  computeRndA() {
     this.rndA = getRndArray(this.numRndErrorAnswers, this.rightA/this.curQ[0]).map(x => x*this.curQ[0]);
     mixUp(this.rndA.push(this.rightA));
  },
  //Реакция на ответ пользователя
  responseToUserAnswer() {

    //увеличть счётчик ответов пользователя
    this.numUserA++;

    //обновить результат проверки ответа пользователя
    if (this.userA === this.rightA) {
      this.userRight = true;
    } else {
      this.userRight = false;
    }

    //установить второй множитель, изъять элемент из массива вторых множителей
    this.curQ[1] = takeRemoveRndEl(this.listQ);

    //получить верный ответ
    this.rightA = this.curQ[0] * this.curQ[1];

    //сформировать вараинты неверных ответов
    this.computeRndA();
  },
  //установить новый основной множитель
  setNewMult(newMult) {
    this.initQA();
    this.listQ[0] = newMult;
  },
};

//получить массив из цифр вида [6, 0, 9, 1, 3, 5, 2, 4, 8, 7]
//числа от 0 до 9 включительно кроме числа wastEl (если задано), неповтаряются, порядок случайный
function getRndArray(lengthArray, wastEl = -1) {
  const array = [];
  let rndEl = Math.floor(Math.random()*10);
  if (((lengthArray <= 9) || ((wastEl === -1) && lengthArray === 10)) && (lengthArray != undefined)) {
    while (rndEl === wastEl) {
      rndEl = Math.floor(Math.random()*10)
    }
    for (let i = 0; i < lengthArray; i++) {
      if (array.length != 0) {
        while (array.includes(rndEl) || (rndEl === wastEl)) {
          rndEl = Math.floor(Math.random()*10);
        }
      }
      array.push(rndEl);
    }
  }
  return array;
};

//перемешивание произвольного массива, где array - массив
function mixUp(origArray) {
  const mixUpArray = [];
  while (origArray.length>0) {
    const randomIndex = Math.floor(Math.random()*array.length); //рандомный индекс первого массива
    const rand_element = array.splice(randomIndex,1) //удалённый элемент (массив) первого массива для второго массива
    mixUpArray.push(rand_element[0]); //добавляем элемент в новый массив
  }
  return mixUpArray;
}

//получить и удалить случайный элемент массива
function takeRemoveRndEl(array) {
  const randomIndex = Math.floor(Math.random()*array.length); //рандомный индекс первого массива
  const rand_element = array.splice(randomIndex,1) //удалённый элемент (массив) первого массива для второго массива
  return rand_element[0];
};

// --- View ---

const viewMult = {
  //Варианты ответа
  answers_span: [],
  //Количество попыток совершённых пользователем
  effortsCount_span: document.getElementById('effortsCount'),
  //Знак равенства
  equal_span: document.getElementById('equal'),
  //Количество ошибок совершённых пользователем
  errorsCount_span: document.getElementById('errorsCount'),
  //Таблица умножения
  multTable_div: document.querySelector('.multTable'),
  //Знак вопроса
  multTableQ_span: document.getElementById('multTableQ'),
  //Вопрос вида: 3*5
  question_span: document.getElementById('question'),
  //Первый множитель
  rankCount_span: document.getElementById('rankCount'),
  // Контейнер элементов для выбора первого множителя. По умолчанию скрыт
  ranks_div: document.querySelector('.ranks'),
  //начальное представление
  init() {
    for (let i = 0; i < modelMult.rndA.length; i++)
      this.answers_span.push(document.getElementById(`answer${i+1}`));
    this.showQuestion();
    this.showSign();
    this.hideAnswers();

    //...
  },
  //Показать текущий вопрос
  showQuestion() {
    this.question_span.innerHTML = `${modelMult.curQ[0]} * ${modelMult.curQ[1]}`;
  },
  //показать варианты ответа
  showAnswers() {
    for (let i = 0; i < modelMult.rndA.length; i++) {
      this.answers_span[i].innerHTML = modelMult.rndA[i];
      this.answers_span[i].style.display = "inline-block";
    };
  },
  //скрыть варианты ответа
  hideAnswers() {
    this.answers_span.forEach(el => el.style.display = "none");
    this.answers_span[0].innerHTML = '?';
    this.answers_span[0].style.display = 'inline-block';
  },
  //показать знак равенства или неравенства - истина, ложь
  showSign() {
      if (modelMult.userRight) {
        this.equal_span.innerHTML = '='
      } else {
        this.equal_span.innerHTML = '&ne;'
      }
  },

};

// --- Controller ---

const controlMult = {

}
