"use strict";
// Блок переменных

let title = prompt("Как называется Ваш проект?");
let screens = prompt("Какие экраны нужно разработать?");
let screenPrice = +prompt("Сколько будет стоить данная работа?");
let adaptive = confirm("Нужен ли адаптив на сайте?");

let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = +prompt("Сколько это будет стоить?");
let service2 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice2 = +prompt("Сколько это будет стоить?");
const rollback = 10;

let fullPrice = 100000;
let servicePrecentPrice;
let allServicePrices;
let firstSymbol;
let ucFirstSymbolTitle;

//Блок объявления функций

const getRollBackMessage = function (price) {
  if (price >= 30000) {
    return "Даем скидку в 10%";
  } else if (price > 15000 && price < 30000) {
    return "Даем скидку в 5%";
  } else if (price < 15000 && price > 0) {
    return "Скидка не предусмотрена";
  } else if (price <= 0) {
    return "Что-то пошло не так";
  }
};

const gallServicePrices = function () {
  return servicePrice1 + servicePrice2;
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

screens = screens.toLowerCase();
allServicePrices = gallServicePrices();
fullPrice = getFullPrice();
ucFirstSymbolTitle = ucFirst(title);
servicePrecentPrice = getServicePercentPrices();

// мусорный блок

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens);
console.log(allServicePrices);
console.log(getRollBackMessage(fullPrice));
console.log(servicePrecentPrice);
