"use strict";
// Блок переменных
let title = "PROJECT";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 1613;
const rollback = 14;
let fullPrice = 100000;
let adaptive = true;

let service1;
let servicePrice1;
let service2;
let servicePrice2;
let servicePrecentPrice;

//Блок объявления функций

//Функциональный блок

title = prompt("Как называется Ваш проект?");
screens = prompt("Какие экраны нужно разработать?");
screenPrice = +prompt("Сколько будет стоить данная работа?");
adaptive = confirm("Нужен ли адаптив на сайте?");
service1 = prompt("Какой дополнительный тип услуги нужен?");
servicePrice1 = +prompt("Сколько это будет стоить?");
service2 = prompt("Какой дополнительный тип услуги нужен?");
servicePrice2 = +prompt("Сколько это будет стоить?");

screens = screens.toLowerCase();

fullPrice = screenPrice + servicePrice1 + servicePrice2;

servicePrecentPrice = fullPrice - Math.floor((fullPrice / 100) * rollback);

if (fullPrice > 30000) {
  console.log("Даем скидку в 10%");
} else if (fullPrice > 15000 && fullPrice < 30000) {
  console.log("Даем скидку в 5%");
} else if (fullPrice < 15000 && fullPrice > 0) {
  console.log("Скидка не предусмотрена");
} else if (fullPrice <= 0) {
  console.log("Что-то пошло не так");
}

// мусорный блок
console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens);
console.log(screens.length);
console.log(screens.split(","));
console.log(screenPrice);
console.log(
  "Стоимость экрана: " +
    screenPrice +
    "₽/" +
    Math.floor(screenPrice / 96.3) +
    "$/" +
    Math.floor(screenPrice / 2.62) +
    " гривен/" +
    Math.floor(screenPrice / 13.2) +
    " юаней"
);
console.log(rollback);
console.log(
  "Стоимость разработки сайта: " +
    fullPrice +
    "₽/" +
    Math.floor(fullPrice / 96.3) +
    "$/" +
    Math.floor(fullPrice / 2.62) +
    " гривен/" +
    Math.floor(fullPrice / 13.2) +
    " юаней"
);
console.log(Math.floor(fullPrice * (rollback / 100)));
console.log(service1);
console.log(servicePrice1);
console.log(title);
console.log(screens);
console.log(screenPrice);
console.log(adaptive);
console.log(service2);
console.log(servicePrice2);
console.log(fullPrice);
console.log(servicePrecentPrice);
