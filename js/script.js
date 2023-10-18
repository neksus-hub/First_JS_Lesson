"use strict";
const title = document.getElementsByTagName("h1")[0];
const startBtn = document.getElementsByClassName("handler_btn")[0];
const buttonPlus = document.querySelector(".screen-btn");
const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");
const getInput = document.querySelectorAll("input.total-input");
const getSpan = document.querySelector(".main-controls__range>.range-value");
let getScreenClass = document.querySelectorAll(".screen");

const appData = {
  // Объект
  title: "",
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  fullPrice: 0,
  servicePrecentPrice: 0,
  allServicePrices: 0,
  services: {},

  init: function () {
    // метод Inin запускает методы
    appData.addTitle(); // добавляет заголовок
    startBtn.addEventListener("click", appData.addScreens); // по клику на кнопку "Расчитать" запускает метод addScreens
    buttonPlus.addEventListener("click", appData.addScreenBlock); // по клику на кнопку "+" клонирует блок
  },

  addTitle: function () {
    // добавляет title во вкладку
    document.title = title.textContent;
  },

  asking: function () {
    // спрашивает какие дополнительные типы услуг нам нужны и выполняет проверки на число и на строку
    for (let i = 0; i < 2; i++) {
      let nameFirst = "";
      let nameSecond = "";
      let sum = 0;

      if (i === 0) {
        do {
          nameFirst = prompt(
            "Какой дополнительный тип услуги нужен?",
            "метрика"
          );
        } while (!isNaN(nameFirst));
        do {
          sum = prompt("Сколько это будет стоить?");
        } while (!appData.isNumber(sum));
        appData.services[nameFirst] = +sum;
      } else if (i === 1) {
        do {
          nameSecond = prompt(
            "Какой дополнительный тип услуги нужен?",
            "метрика"
          );
        } while (!isNaN(nameSecond));
        do {
          sum = prompt("Сколько это будет стоить?");
        } while (!appData.isNumber(sum));
        appData.services[nameSecond] = +sum; // суммирует стоимость дополнительных услуг
      }
    }
  },

  addPrices: function () {
    //
    appData.screenPrice = appData.screens.reduce(function (sum, item) {
      return sum + item.price;
    }, 0);
    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
  },

  addScreens: function () {
    getScreenClass = document.querySelectorAll(".screen"); // получает перед каждой итерацией блок с классом screen
    getScreenClass.forEach((screen, index) => {
      // перебирает этот блок
      const select = screen.querySelector("select"); // ищет в каждом новом блоке select и input
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent; // переменной selectName присваивается текстовое значение того options которой мы выбрали
      appData.screens.push({
        // в массив screens передаются значения индекса, имени, стоимости выбранного экрана
        id: index,
        name: selectName,
        price: +select.value * +input.value,
      });
    });
    console.log(appData.screens); // выводим массив в консоль
  },

  addScreenBlock: function () {
    // клонирует блок
    const cloneScreensBlock = getScreenClass[0].cloneNode(true); // создаем переменную, которая явл. клоном блока
    getScreenClass[getScreenClass.length - 1].after(cloneScreensBlock); // после последнего блока вставляем новый
  },

  // запускаем метод addScreens, который пушит в screens значения
  start: function () {
    appData.addScreens();
    //appData.asking();
    //appData.addPrices();
    //appData.ucFirst(appData.title.trim());
    //appData.getFullPrice();
    //appData.getServicePercentPrices();
    //appData.logger();
  },

  ucFirst: function (str) {
    // преобразует первый символ в заглавный
    appData.title = str[0].toUpperCase() + str.slice(1).toLowerCase();
  },

  getRollBackMessage: function (price) {
    // дает информацию о скидке
    if (price >= 30000) {
      return "Даем скидку в 10%";
    } else if (price >= 15000 && price < 30000) {
      return "Даем скидку в 5%";
    } else if (price < 15000 && price >= 0) {
      return "Скидка не предусмотрена";
    } else if (price <= 0) {
      return "Что-то пошло не так";
    }
  },

  getFullPrice: function () {
    // считает полную стоимость всех работ
    appData.fullPrice = appData.screenPrice + appData.allServicePrices;
  },

  getServicePercentPrices: function () {
    // считает стоимость всех работ с учётом отката посреднику
    appData.servicePrecentPrice =
      appData.fullPrice -
      Math.floor((appData.fullPrice / 100) * appData.rollback);
  },

  isString: function (str) {
    // проверка на строку
    return isNaN(str);
  },

  logger: function () {
    // выводит в консоль методы объекта appData
    console.log(appData.services);
    console.log(appData.fullPrice);
    console.log(appData.servicePrecentPrice);
    console.log(appData.screens);

    for (let key in appData) {
      console.log("Свойство/метод " + key + " " + "Значение: " + appData[key]);
    }
  },
};

//Блок объявления функций

//Функциональный блок

appData.init(); // запуск метода init

// мусорный блок
