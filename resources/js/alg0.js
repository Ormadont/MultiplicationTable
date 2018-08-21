'use strict'

// --- Model ---

//Вопросы
const qs = {

  //Список вопросов
  listQ: [],

  //Текущий вопрос - первый и второй множители
  curQ: [0, 0],

  //верный ответ
  rightA: 0,

  //текущий ответ пользователя
  userA: 0,

  //количество вопросов, оставшихся без ответа
  countQ: 0,

  //проверить: ответ пользователя совпадает с верным ответом?
  checkUserA() {
    return this.rightA == this.userA;
  },

  initQA() {
    //получить массив вопросов
    this.listQ = generateMixUpArrayFrom0to9();
    //получить следующий вопрос
    // this.curQ =
    //получить верный ответ
    // this.rightA = this.getRightA();
  }

};



//получить массив из десяти цифр вида [6, 0, 9, 1, 3, 5, 2, 4, 8, 7]
function generateMixUpArrayFrom0to9() {
  const array = [];
  for (let i = 0; i < 10; i++) {
    array.push(i);
  }
  return mixUp(array);
}

//перемешивание произвольного массива, где array - массив
function mixUp(origArray) {
  const mixUpArray = [];
  while (origArray.length>0) {
    mixUpArray.push(takeRndEl(origArray)[0]); //добавляем элемент в новый массив
  }
  return mixUpArray;
}

//получить и удалить случайный элемент массива
function takeRndEl(array) {
  const randomIndex = Math.floor(Math.random()*array.length); //рандомный индекс первого массива
  const rand_element = array.splice(randomIndex,1) //удалённый элемент (массив) первого массива для второго массива
  return rand_element;
}
