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
    while (!isNaN(appData.title)) {
      appData.title = prompt(
        "Как называется Ваш проект?",
        "Калькулятор верстки"
      );
    }

    for (let i = 0; i < 2; i++) {
      let name = "";
      do {
        name = prompt("Какие типы экранов нужно разработать?");
      } while (!isNaN(name));

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

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");

    for (let i = 0; i < 2; i++) {
      let nameFirst = "";
      let nameSecond = "";
      let sum = 0;

      if (i === 0) {
        do {
          nameFirst = prompt("Какой дополнительный тип услуги нужен?");
        } while (!isNaN(nameFirst));
        do {
          sum = prompt("Сколько это будет стоить?");
        } while (!appData.isNumber(sum));
        appData.services[nameFirst] = +sum;
      } else if (i === 1) {
        do {
          nameSecond = prompt("Какой дополнительный тип услуги нужен?");
        } while (!isNaN(nameSecond));
        do {
          sum = prompt("Сколько это будет стоить?");
        } while (!appData.isNumber(sum));
        appData.services[nameSecond] = +sum;
      }

      appData.services[name] = +sum;
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

  start: function () {
    appData.asking();
    appData.addPrices();
    appData.ucFirst(appData.title.trim());
    appData.getFullPrice();
    appData.getServicePercentPrices();
    appData.logger();
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

  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num) && num > 0;
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

appData.start();

// мусорный блок
