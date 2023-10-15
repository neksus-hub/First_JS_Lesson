"use strict";
const title = document.getElementsByTagName("h1")[0];
const startBtn = document.getElementsByClassName("handler_btn")[0];
const buttonPlus = document.querySelector(".screen-btn");
const listItemsFirst = document.querySelectorAll(".other-items.percent");
const listItemsSecond = document.querySelectorAll(".other-items.number");
const getInput = document.querySelectorAll("input.total-input");
const getSpan = document.querySelector(".main-controls__range>.range-value");
let getScreenClass = document.querySelectorAll(".screen");

const appData = {
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
    appData.addTitle();
    startBtn.addEventListener("click", function () {
      appData.start();
    });
    buttonPlus.addEventListener("click", function () {
      appData.addScreenBlock();
    });
  },
  addTitle: function () {
    document.title = title.textContent;
  },

  asking: function () {
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
        appData.services[nameSecond] = +sum;
      }
    }
  },

  addPrices: function () {
    appData.screenPrice = appData.screens.reduce(function (sum, item) {
      return sum + item.price;
    }, 0);
    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
  },

  addScreens: function () {
    getScreenClass.forEach((screen, index) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;
      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
      });
      console.log(appData.screens);
    });
  },

  addScreenBlock: function () {},

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
    appData.title = str[0].toUpperCase() + str.slice(1).toLowerCase();
  },

  getRollBackMessage: function (price) {
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
    appData.fullPrice = appData.screenPrice + appData.allServicePrices;
  },

  getServicePercentPrices: function () {
    appData.servicePrecentPrice =
      appData.fullPrice -
      Math.floor((appData.fullPrice / 100) * appData.rollback);
  },

  isString: function (str) {
    return isNaN(str);
  },

  logger: function () {
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

appData.init();

// мусорный блок
