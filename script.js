"use strict";
// Блок переменных

let title;
let screens;
let screenPrice;
let adaptive;

const rollback = 10;
let fullPrice;
let servicePrecentPrice;
let allServicePrices;
let firstSymbol;
let ucFirstSymbolTitle;
let service1;
let service2;

const appData = {
  title,
  screens,
  screenPrice,
  adaptive,
  corollback: 10,
  fullPrice,
  servicePrecentPrice,
  allServicePrices,
  firstSymbol,
  ucFirstSymbolTitle,
  service1,
  service2,
};

//Блок объявления функций

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function () {
  title = prompt("Как называется Ваш проект?", "Калькулятор верстки");
  screens = prompt("Какие экраны нужно разработать?", "Простые, сложные");
  screenPrice = prompt("Сколько будет стоить данная работа?", 20000);

  do {
    screenPrice = prompt("Сколько будет стоить данная работа?", 20000);
  } while (!isNumber(screenPrice));

  screenPrice = parseInt(screenPrice);

  adaptive = confirm("Нужен ли адаптив на сайте?");
};

const gallServicePrices = function () {
  let sum = 0;
  let sumPrice = 0;
  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      service1 = prompt("Какой дополнительный тип услуги нужен?");
    } else if (i === 1) {
      service2 = prompt("Какой дополнительный тип услуги нужен?");
    }

    sum = prompt("Сколько это будет стоить?");

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
  return screenPrice + allServicePrices;
}

function ucFirst(str) {
  if (!str) return str;
  let strTrim = str.trim();
  return strTrim[0].toUpperCase() + strTrim.slice(1);
}

function getServicePercentPrices() {
  return fullPrice - Math.floor((fullPrice / 100) * rollback);
}

//Функциональный блок
asking();

ucFirstSymbolTitle = ucFirst(title);
screens = screens.toLowerCase();
allServicePrices = gallServicePrices();
fullPrice = getFullPrice();
servicePrecentPrice = getServicePercentPrices();

// мусорный блок
