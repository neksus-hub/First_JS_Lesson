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
let RollBackMessage;
let nameProject;

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

const gallServicePrices = function (price1, price2) {
  return price1 + price2;
};

function getFullPrice(price1, price2) {
  return price1 + price2;
}

function ucFirst(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
}

function getServicePercentPrices() {
  return fullPrice - Math.floor((fullPrice / 100) * rollback);
}

//Функциональный блок

RollBackMessage = getRollBackMessage(fullPrice);
allServicePrices = gallServicePrices(servicePrice1, servicePrice2);
fullPrice = getFullPrice(screenPrice, allServicePrices);
servicePrecentPrice = getServicePercentPrices();
screens = screens.toLowerCase();
nameProject = ucFirst(title.trim());

// мусорный блок

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(nameProject);
console.log("Необходимо разработать " + screens + " экраны");
console.log(RollBackMessage);
console.log(
  "Итоговая сумма с учетом отката посреднику = " + servicePrecentPrice
);
