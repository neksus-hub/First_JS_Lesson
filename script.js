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
    } while (!isNumber(appData.screenPrice));

    appData.screenPrice = parseInt(appData.screenPrice);

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },
};

//Блок объявления функций

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const gallServicePrices = function () {
  let sum = 0;
  let sumPrice = 0;
  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      appData.service1 = prompt("Какой дополнительный тип услуги нужен?");
    } else if (i === 1) {
      appData.service2 = prompt("Какой дополнительный тип услуги нужен?");
    }

    sum = prompt("СколькappData.о это будет стоить?");

    while (!isNumber(sum)) {
      sum = prompt("Сколько это будет стоить?");
    }

    sumPrice += parseInt(sum);
  }
  return sumPrice;
};

const getRollBackMessage = function (price) {
  if (price >= 30000) {
    return "Даем скидку в 10%";
  } else if (price >= 15000 && price < 30000) {
    return "Даем скидку в 5%";
  } else if (price < 15000 && price >= 0) {
    return "Скидка не предусмотрена";
  } else if (price <= 0) {
    return "Что-то пошло не так";
  }
};

function getFullPrice() {
  return appData.screenPrice + appData.allServicePrices;
}

function ucFirst(str) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

function getServicePercentPrices() {
  return (
    appData.fullPrice - Math.floor((appData.fullPrice / 100) * appData.rollback)
  );
}

//Функциональный блок
appData.asking();

appData.screens = appData.screens.toLowerCase();
appData.allServicePrices = gallServicePrices();
appData.fullPrice = getFullPrice();
appData.servicePrecentPrice = getServicePercentPrices();
appData.nameProject = ucFirst(appData.title.trim());

// мусорный блок
console.log(appData.nameProject);
console.log(appData.fullPrice);
console.log(appData.servicePrecentPrice);
