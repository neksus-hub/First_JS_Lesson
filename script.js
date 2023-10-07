"use strict";

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

  asking: function () {
    appData.title = prompt("Как называется Ваш проект?", "Калькулятор верстки");

    for (let i = 0; i < 2; i++) {
      let name = prompt("Какие типы экранов нужно разработать?");
      let price = 0;

      do {
        price = +prompt("Сколько будет стоить данная работа?");
      } while (!appData.isNumber(price));

      appData.screens.push({
        id: i,
        name: name,
        price: price,
      });
    }

    console.log(appData.screenPrice);

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");

    for (let i = 0; i < 2; i++) {
      let name = prompt("Какой дополнительный тип услуги нужен?");
      let sum = 0;

      do {
        sum = prompt("Сколько это будет стоить?");
      } while (!appData.isNumber(sum));

      appData.services[name] = +sum;
    }
  },

  start: function () {
    appData.asking();
    appData.ucFirst(appData.title.trim());
    appData.gallServicePrices();
    appData.getFullPrice();
    appData.getServicePercentPrices();
    appData.logger();
  },

  ucFirst: function (str) {
    appData.title = str[0].toUpperCase() + str.slice(1).toLowerCase();
  },

  gallServicePrices: function () {
    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
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

  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num) && num > 0;
  },

  logger: function () {
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

appData.start();

// мусорный блок
