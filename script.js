let title = "PROJECT";
console.log(typeof title);
let screens = "Простые, Сложные, Интерактивные";
console.log(screens);
console.log(screens.length);
screens = screens.toLowerCase();
console.log(screens.split(","));
let screenPrice = 1613;
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
const rollback = 14;
console.log(rollback);
let fullPrice = 100000;
console.log(typeof fullPrice);
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
let adaptive = true;
console.log(typeof adaptive);

title = prompt("Как называется Ваш проект?");
console.log(title);

screens = prompt("Какие экраны нужно разработать?");
console.log(screens);

screenPrice = +prompt("Сколько будет стоить данная работа?");
console.log(screenPrice);

adaptive = confirm("Нужен ли адаптив на сайте?");
console.log(adaptive);

let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = +prompt("Сколько это будет стоить?");
console.log(service1);
console.log(servicePrice1);

let service2 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice2 = +prompt("Сколько это будет стоить?");
console.log(service2);
console.log(servicePrice2);

fullPrice = screenPrice + servicePrice1 + servicePrice2;
console.log(fullPrice);

let servicePrecentPrice = fullPrice - Math.floor((fullPrice / 100) * rollback);
console.log(servicePrecentPrice);

if (fullPrice > 30000) {
  console.log("Даем скидку в 10%");
} else if (fullPrice > 15000 && fullPrice < 30000) {
  console.log("Даем скидку в 5%");
} else if (fullPrice < 15000 && fullPrice > 0) {
  console.log("Скидка не предусмотрена");
}
