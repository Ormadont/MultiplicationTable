"use strict";

// --- Model ---

//Вопросы
const qs = {

  //Список вопросов - перечень вторых множителей
  listQ: [],

  //Текущий вопрос - основной первый и второй множители
  curQ: [0, 0],

  //верный ответ
  rightA: 0,

  //варианты ответа
  rndA: [],

  //число случайный неверных вариантов отвата
  numRndA: 5,

  //ответ пользователя
  userA: 0,

  //счётчик ответов пользователя
  numUserA: 0,

  //результат проверки ответа пользователя
  userRight: false,

  //инициализация !!! Установить исходное состояние
  initQA() {
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
    this.userRight = false;
  },

  //сформировать 5 неверных вариантов ответа
  computeRndA() {
     this.rndA = getRndArray(qs.numRndA, this.rightA).map(x => x*this.curQ[0]);
  },

  //Реакция на ответ пользователя
  updateQA() {

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
    qs.computeRndA();
  },

  //установить новый основной множитель
  setNewMult(newMult) {
    this.initQA();
    this.listQ[0] = newMult;
  }
};

//получить массив из цифр вида [6, 0, 9, 1, 3, 5, 2, 4, 8, 7]
//числа от 0 до 9 включительно кроме числа wastEl, неповтаряются, порядок случайный
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

//получить и удалить случайный элемент массива
function takeRemoveRndEl(array) {
  const randomIndex = Math.floor(Math.random()*array.length); //рандомный индекс первого массива
  const rand_element = array.splice(randomIndex,1) //удалённый элемент (массив) первого массива для второго массива
  return rand_element[0];
};
