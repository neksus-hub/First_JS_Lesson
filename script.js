"use strict";

const appData = {
  title: "",
  screens: "",
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  fullPrice: 0,
  servicePrecentPrice: 0,
  allServicePrices: 0,
  service1: 0,
  service2: 0,
  nameProject: "",

  asking: function () {
    appData.title = prompt("Как называется Ваш проект?", "Калькулятор верстки");
    appData.screens = prompt(
      "Какие экраны нужно разработать?",
      "Простые, сложные"
    );
    appData.screenPrice = prompt("Сколько будет стоить данная работа?", 20000);

    do {
      appData.screenPrice = prompt(
        "Сколько будет стоить данная работа?",
        20000
      );
    } while (!appData.isNumber(appData.screenPrice));

    appData.screenPrice = parseInt(appData.screenPrice);

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },

  start: function () {
    appData.asking();
    appData.allServicePrices = appData.gallServicePrices();
    appData.fullPrice = appData.getFullPrice();
    appData.servicePrecentPrice = appData.getServicePercentPrices();
    appData.screens = appData.screens.toLowerCase();
    appData.logger();
  },

  ucFirst: function (str) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
  },

  gallServicePrices: function () {
    let sum = 0;
    let sumPrice = 0;
    for (let i = 0; i < 2; i++) {
      if (i === 0) {
        appData.service1 = prompt("Какой дополнительный тип услуги нужен?");
      } else if (i === 1) {
        appData.service2 = prompt("Какой дополнительный тип услуги нужен?");
      }

      sum = prompt("Сколько это будет стоить?");

      while (!appData.isNumber(sum)) {
        sum = prompt("Сколько это будет стоить?");
      }

      sumPrice += parseInt(sum);
    }
    return sumPrice;
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
    return appData.screenPrice + appData.allServicePrices;
  },

  getServicePercentPrices: function () {
    return (
      appData.fullPrice -
      Math.floor((appData.fullPrice / 100) * appData.rollback)
    );
  },
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num) && num > 0;
  },
  logger: function () {
    console.log(appData.allServicePrices);
    console.log(appData.fullPrice);
    console.log(appData.servicePrecentPrice);

    for (let key in appData) {
      console.log("Свойство/метод " + key + " " + "Значение: " + appData[key]);
    }
  },
};

//Блок объявления функций

//Функциональный блок

appData.start();

// мусорный блок
