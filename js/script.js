"use strict";
const title = document.getElementsByTagName("h1")[0];

const startBtn = document.getElementsByClassName("handler_btn")[0];
const buttonPlus = document.querySelector(".screen-btn");

const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");

const getInput = document.querySelectorAll("input.total-input")[0];
const getInputCount = document.querySelectorAll("input.total-input")[1];
const getInputServicePrice = document.querySelectorAll("input.total-input")[2];
const getInputFullPrice = document.querySelectorAll("input.total-input")[3];
const getInputRollback = document.querySelectorAll("input.total-input")[4];

const getInputRange = document.querySelector("input[type=range]");
const rangeSpan = document.querySelector(".range-value");

let numberScreens = document.querySelectorAll(
  ".screen>.main-controls__input>input"
)[0];

let getElement = document.querySelectorAll(".element")[0];
let getSelects = document.querySelectorAll(".views-select");
let getSpan = document.querySelector(".main-controls__range>.range-value");
let getScreenClass = document.querySelectorAll(".screen");

let counter = 0;
let numberOfScreens = 0;

const appData = {
  // Объект
  title: "",
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  fullPrice: 0,
  costIncludingInterest: 0,
  costIncludingInterestSecond: 0,
  servicePrecentPrice: 0,
  serviceNumberPrice: 0,
  numberOfScreens: 0,
  servicesPercent: {},
  servicesNumber: {},
  screensSecond: [],

  init: function () {
    // метод Inin запускает методы
    appData.addTitle(); // добавляет заголовок
    startBtn.addEventListener("click", appData.ifEmpty);
    buttonPlus.addEventListener("click", appData.addScreenBlock); // по клику на кнопку "+" клонирует блок
  },

  ifEmpty: function () {
    getScreenClass = document.querySelectorAll(".screen");

    getScreenClass.forEach(function (item) {
      const input = item.querySelector(".main-controls__input>input");
      const select = item.querySelector("select");

      if (input.value === "" || select === "") {
        counter = 0;
      } else {
        counter = 1;
      }
    });

    if (counter === 0) {
      startBtn.addEventListener("click", appData.ifEmpty);
      alert("Поля должны быть заполнены!");
    } else if (counter === 1) {
      appData.start();
    }
  },

  addTitle: function () {
    // добавляет title во вкладку
    document.title = title.textContent;
  },

  addPrices: function () {
    for (let screen of appData.screens) {
      appData.screenPrice += +screen.price;
    }

    for (let key in appData.servicesNumber) {
      appData.serviceNumberPrice += +appData.servicesNumber[key];
    }

    for (let key in appData.servicesPercent) {
      appData.servicePrecentPrice +=
        +appData.screenPrice * (+appData.servicesPercent[key] / 100);
    }

    appData.fullPrice =
      +appData.servicePrecentPrice +
      +appData.serviceNumberPrice +
      +appData.screenPrice;

    appData.costIncludingInterest =
      appData.fullPrice + (appData.fullPrice / 100) * +getSpan.value;

    for (let i = 0; i <= appData.screens.length - 1; i++) {
      appData.numberOfScreens += appData.screens[i].count;
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
        count: +input.value,
      });
    });
    console.log(appData.screens); // выводим массив в консоль
  },

  addScreenBlock: function () {
    // клонирует блок
    const cloneScreensBlock = getScreenClass[0].cloneNode(true); // создаем переменную, которая явл. клоном блока
    getScreenClass[getScreenClass.length - 1].after(cloneScreensBlock); // после последнего блока вставляем новый
  },

  addServices: function () {
    otherItemsPercent.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },

  showInfo: function () {
    getInput.value = appData.screenPrice;
    getInputCount.value = appData.numberOfScreens;
    getInputServicePrice.value =
      appData.serviceNumberPrice + appData.servicePrecentPrice;
    getInputFullPrice.value = appData.fullPrice;
    getInputRollback.value = +appData.costIncludingInterest;
  },
  // запускаем метод addScreens, который пушит в screens значения
  start: function () {
    appData.addScreens();
    appData.addServices();
    appData.addPrices();
    appData.showInfo();
    //appData.getServicePercentPrices();
    //appData.logger();
    console.log(appData);
  },

  ucFirst: function (str) {
    // преобразует первый символ в заглавный
    appData.title = str[0].toUpperCase() + str.slice(1).toLowerCase();
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
};

//  logger: function () {
//    // выводит в консоль методы объекта appData
//    console.log(appData.services);
//    console.log(appData.fullPrice);
//    console.log(appData.servicePrecentPrice);
//    console.log(appData.screens);
//
//    for (let key in appData) {
//      console.log("Свойство/метод " + key + " " + "Значение: " + appData[key]);
//    }
//  },
//};

//Блок объявления функций

//Функциональный блок
rangeSpan.value = 0;

getInputRange.addEventListener("input", function () {
  rangeSpan.innerHTML = getInputRange.value + "%";
  rangeSpan.value = +getInputRange.value;
  getInputRollback.value = appData.costIncludingInterest =
    appData.fullPrice + (appData.fullPrice / 100) * +getInputRange.value;
  console.log(rangeSpan.value);
});

appData.init(); // запуск метода init

// мусорный блок
