"use strict";

// --- Model ---

//Вопросы и ответы
const modelMult = {
    //Список вопросов - перечень вторых множителей
    listQ: [],
    //Текущий вопрос - основной (первый) и второй множители
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

    // setRank
    setRank(newRank) {
        modelMult.init();
        viewMult.hideRanks();
        viewMult.rankCount_span.innerHTML = newRank;
        this.curQ[0] = newRank;
        //сброс состояний
        viewMult.init();
    },
    //сформировать 6 вариантов ответа
    computeRndA() {
        this.rndA = getRndArray(this.numRndErrorAnswers, this.rightA / this.curQ[0]).map(x => x * this.curQ[0]);
        mixUp(this.rndA.push(this.rightA));
    },
    //Получить и проверить ответ пользователя
    treatAnswer(el) {
        //получить ответ пользователя
        this.userA = parseInt(el.textContent);
        //обновить результат проверки ответа пользователя
        if (this.userA === this.rightA) {
            this.userRight = true;
        } else {
            this.userRight = false;
            this.addGoodAnswer();
            viewMult.errorsCount_span.innerHTML =
                parseInt(viewMult.errorsCount_span.textContent) + 1;
        }
        // показать только ответ пользователя
        viewMult.showUserAnswer();
        // показать знак равенства или неравенства
        viewMult.showSignOfEqual();
        setTimeout(() => {
            //следующий вопрос
            this.nextQuestion();
            //показать количество непоказанных вопросов
            viewMult.updateResidue();
        }, 2000);
    },
    //следующий вопрос
    nextQuestion() {
        //установить второй множитель, изъять элемент из массива вторых множителей
        this.curQ[1] = takeRemoveRndEl(this.listQ);
        if (this.curQ[1] != undefined) {
            //получить верный ответ
            this.rightA = this.curQ[0] * this.curQ[1];
            //сформировать вараинты ответа
            this.computeRndA();
            //вернуть в исходное состояние оценку ответа пользователя
            this.userRight = true;
            //отрисовать
            viewMult.hideUserAnswer();
            viewMult.showQuestion();
            viewMult.showSignOfEqual();
            viewMult.showSignOfQuestion();
        }
    },
    //добавить верный ответ
    addGoodAnswer() {
        const para = document.createElement("p");
        const answer = `${this.curQ[0]} * ${this.curQ[1]} = ${this.rightA}`;
        const node = document.createTextNode(answer);
        para.appendChild(node);
        const el = document.querySelector(".goodAnswers");
        el.appendChild(para);
    },
};

//получить массив из цифр вида [6, 0, 9, 1, 3, 5, 2, 4, 8, 7]
//числа от 0 до 9 включительно кроме числа wastEl (если задано), неповтаряются, порядок случайный
function getRndArray(lengthArray, wastEl = -1) {
    const array = [];
    let rndEl = Math.floor(Math.random() * 10);
    if (((lengthArray <= 9) || ((wastEl === -1) && lengthArray === 10)) && (lengthArray != undefined)) {
        while (rndEl === wastEl) {
            rndEl = Math.floor(Math.random() * 10)
        }
        for (let i = 0; i < lengthArray; i++) {
            if (array.length != 0) {
                while (array.includes(rndEl) || (rndEl === wastEl)) {
                    rndEl = Math.floor(Math.random() * 10);
                }
            }
            array.push(rndEl);
        }
    }
    return array;
};

//перемешать произвольный массив
function mixUp(origArray) {
    const mixUpArray = [];
    while (origArray.length > 0) {
        const randomIndex = Math.floor(Math.random() * array.length); //рандомный индекс первого массива
        const rand_element = array.splice(randomIndex, 1) //удалённый элемент (массив) первого массива для второго массива
        mixUpArray.push(rand_element[0]); //добавляем элемент в новый массив
    }
    return mixUpArray;
}

//получить и удалить случайный элемент массива
function takeRemoveRndEl(array) {
    const randomIndex = Math.floor(Math.random() * array.length); //рандомный индекс первого массива
    const rand_element = array.splice(randomIndex, 1) //удалённый элемент (массив) первого массива для второго массива
    return rand_element[0];
};

// --- View ---

const viewMult = {
    //Варианты ответа
    answers_span: [],
    //Вопрос вида: 3 * 5
    question_span: document.getElementById('question'),
    //знак вопроса
    signOfQuestion: document.getElementById('signOfQuestion'),
    // ответ пользователя
    userAnswer: document.getElementById('userAnswer'),
    //Количество вопросов без ответа пользователя
    residueCount_span: document.getElementById('residueCount'),
    //Количество ошибок совершённых пользователем
    errorsCount_span: document.getElementById('errorsCount'),
    // //Таблица умножения (Пифагора)
    multTable_div: document.querySelector('.multTable'),
    //Первый множитель
    rankCount_span: document.getElementById('rankCount'),
    // меню выбора множителей
    ranks_div: document.querySelector('.ranks'),

    // массивы цветов ячеек, пример `hsla(${color}, 100%, 32%, 0.94)`
    colorsForTP: {

      paleColor: [] ,
      paleBackGround: [], //бледный задний фон
      paleBorder: [], //бледный бордюр

      brightColor: [],
      brightBackGround: [], //яркий задний фон
      brightBorder: [], //яркий бордюр
    },

    //начальное представление
    init() {
        for (let i = 0; i < modelMult.rndA.length; i++)
            this.answers_span.push(document.getElementById(`answer${i + 1}`));
        this.showQuestion();
        this.showSignOfEqual();
        this.hideAnswers();
        this.hideUserAnswer();
        this.showSignOfQuestion();
        this.updateResidue();
        //обнулить число ошибок
        this.errorsCount_span.innerHTML = 0;
        //показать первый основной множитель
        this.rankCount_span.innerHTML = modelMult.curQ[0];
        //отрисовка таблицы Пифагора
        this.multTable_div.style.display = "none";
        if (this.multTable_div.childElementCount == 0) {
            this.multTable_div.innerHTML = this.createArrayForMTable();
        };
        //разрисовать таблицу Пифагора
        this.fillColorsForCellsTP();
        this.decorateTP();

    },

    // разрисовать таблицу Пифагора
    decorateTP() {
      const numLines = 9;
      for (let i = 0; i < numLines; i++) {
        for (var j = 0; j < numLines; j++) {
          const el = document.getElementById(`n${i+1}${j+1}`);
          el.style.color = this.colorsForTP.paleColor[j];
          el.style.backgroundColor = this.colorsForTP.paleBackGround[i];
          el.style.borderColor = this.colorsForTP.paleBorder[i];
        }

      }
    },

    //создание набора тэгов таблицы Пифагора
    createArrayForMTable() {
        const size = 10;
        const a = new Array(size);
        let num = "";
        for (let i = 0; i < size; i++) {
            a[i] = new Array(size);
            for (let j = 0; j < size; j++) {
                num = i.toString() + j.toString();
                if (i === 0 || j === 0) {
                    a[i][j] = `<span class="header r${i} c${j}" id="n${num}">${(i + 1) * (j + 1) - 1}</span>`
                } else {
                    a[i][j] = `<span class="r${i} c${j}" id="n${num}">${i * j}</span>`;
                }
            }
        }
        a[0][0] = `<span id="n00">X</span>`;
        //преобразование в строку и удаление запятых
        return a.join("").replace(/,/g, "");
    },

    // показать меню выбора множителей
    showRanks() {
        this.ranks_div.style.display = "flex";
    },
    hideRanks() {
        this.ranks_div.style.display = "none";
    },
    //показать количество непоказанных вопросов
    updateResidue() {
        this.residueCount_span.innerHTML = modelMult.listQ.length;
    },
    //показать знак вопроса
    showSignOfQuestion() {
        signOfQuestion.style.display = "inline-block";
    },
    //скрыть знак вопроса
    hideSignOfQuestion() {
        signOfQuestion.style.display = "none";
    },
    //Показать текущий вопрос
    showQuestion() {
        this.question_span.innerHTML = `${modelMult.curQ[0]} * ${modelMult.curQ[1]}`;
    },
    // скрыть ответ пользователя
    hideUserAnswer() {
        userAnswer.style.display = "none";
    },
    //показать варианты ответа
    showAnswers() {
        for (let i = 0; i < modelMult.rndA.length; i++) {
            this.answers_span[i].innerHTML = modelMult.rndA[i];
            this.answers_span[i].style.display = "inline-block";
        };
        this.hideSignOfQuestion();
    },
    //показать ответ пользователя только
    showUserAnswer() {
        this.hideAnswers();
        this.hideSignOfQuestion();
        this.userAnswer.textContent = modelMult.userA;
        this.userAnswer.style.display = "inline-block";
        if (modelMult.userRight) {
            this.userAnswer.style.color = "hsl(43, 89%, 84%)";
        } else {
            this.userAnswer.style.color = "red";
        }
    },
    //скрыть варианты ответа
    hideAnswers() {
        this.answers_span.forEach(el => el.style.display = "none");
        this.showSignOfQuestion();
    },
    //показать знак равенства или неравенства - истина, ложь
    showSignOfEqual() {
        const el = document.getElementById('equal');
        if (modelMult.userRight) {
            el.innerHTML = '=';
            el.style.color = "hsla(292, 25%, 24%, 0.9)";
        } else {
            el.innerHTML = '&ne;';
            el.style.color = "red";
        }
    },

    // показать/скрыть таблицу Пифагора
    TabelP() {
        if (viewMult.multTable_div.style.display == "grid") {
            viewMult.multTable_div.style.display = "none"
        } else {
            viewMult.multTable_div.style.display = "grid"
        }
    },

    //отметить ячейку Таблицы Пифагора цветом
    enhEl(el) {
        this.deEnh();

        //id = "n" + "rowNum" + "colNum"
        let rowNum = parseInt(el.id.substr(1,1),10);
        let colNum = parseInt(el.id.substr(2,1),10);
        if (colNum == 0) {
          colNum = 1;
        }
        if (rowNum == 0) {
          rowNum = 1
        }
        const rowHeader = document.getElementById(`n${rowNum}0`);
        const colHeader = document.getElementById(`n0${colNum}`);

        enhEl(el);
        enhEl(rowHeader);
        enhEl(colHeader);

        // красим столбец
        for (let i = 0; i < 10; i++) {
          const el = document.getElementById(`n${i+1}${colNum}`);
          if (i<9) {
            el.style.color = this.colorsForTP.brightColor[colNum-1];
            el.style.backgroundColor = this.colorsForTP.brightBackGround[i];
            el.style.borderColor = this.colorsForTP.brightBorder[i];
          }
        }

        // красим строку
        for (let i = 1; i < 10; i++) {
          const el = document.getElementById(`n${rowNum}${i}`);
          el.style.color = this.colorsForTP.brightColor[i-1];
          el.style.backgroundColor = this.colorsForTP.brightBackGround[rowNum-1];
          el.style.borderColor = this.colorsForTP.brightBorder[rowNum-1];;
        }

    },

    // вернуть таблице Пифагора первоначальный вид
    deEnh() {
      // FIXME: исключить обработку ненужных ячеек внутри таблицы!
        let idName = ``;
        for (let i = 0; i < 100; i++) {
            if (i < 10) {
                idName = `n0${i}`;
            } else {
                idName = `n${i}`;
            }
            const el = document.getElementById(idName)
            el.style.backgroundColor = "";
            el.style.borderColor = "";
            el.style.transform = "";
            el.style.borderRadius = "";
            el.style.borderStyle = "";
        }
        this.decorateTP();
    },

    // подготовить цвета для разукрашивания таблицы Пифагора
    fillColorsForCellsTP() {
      let color = 0;
      const numLines = 9;
      const colorDiff = 360/(numLines+1);
      for (let i = 0; i < numLines; i++) {

        this.colorsForTP.paleColor.push(
          `hsla(${color}, 21%, 58%, 0.74)`);
        this.colorsForTP.paleBackGround.push(
          `hsla(${color}, 22%, 20%, 0.9)`);
        this.colorsForTP.paleBorder.push(
          `hsla(${color}, 32%, 47%, 0.72)`);

        this.colorsForTP.brightColor.push(
          `hsla(${color}, 100%, 82%, 0.95)`);
        this.colorsForTP.brightBackGround.push(
          `hsla(${color}, 30%, 20%, 0.8)`);
        this.colorsForTP.brightBorder.push(
          `hsla(${color}, 50%, 40%, 0.8)`);

        color += colorDiff;
      }
    },
};

const controlMult = {
    start() {
        modelMult.curQ[0] = Math.floor(Math.random() * 8) + 2;
        modelMult.init();
        viewMult.init();
        this.addEvents();
        //показать таблицу Пифагора
        viewMult.TabelP();
    },

    //установить действия по событиям
    addEvents() {
        // знак вопроса
        viewMult.signOfQuestion.addEventListener('click', () => viewMult.showAnswers());

        // варианты ответа
        viewMult.answers_span.forEach(el =>
            el.addEventListener('click', () => modelMult.treatAnswer(el)));

        // вход на выбор множителя
        viewMult.rankCount_span.addEventListener('click', () => viewMult.showRanks());
        for (let i = 2; i < 10; i++) {
            document.getElementById(`rankCount${i}`).addEventListener('click', el => {
                modelMult.setRank(parseInt(el.target.textContent));
            });
        };

        // Показать таблицу умножения
        document.getElementById('multTableQ').addEventListener('click',
            () => viewMult.TabelP());

        // Скрыть таблицу умножения
        document.getElementById('n00').addEventListener('click',
            () => viewMult.TabelP());

        //  обработчик события на каждую ячейку таблицы Пифагора
        let idName = ``;
        for (var i = 0; i < 100; i++) {
            if (i < 10) idName = `n0${i}`
            else idName = `n${i}`
            document.getElementById(idName).addEventListener('mouseover',
                (event) => viewMult.enhEl(event.target), false);
        }
    },
};

function enhEl(el) {
  el.style.transform = "scale(1.4)";
  el.style.borderRadius = "50%";
}

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        controlMult.start();
    }
};
