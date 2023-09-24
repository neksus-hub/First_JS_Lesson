const title = "PROJECT";
console.log(typeof title);
let screens = "Простые, Сложные, Интерактивные";
console.log(screens);
console.log(screens.length);
screens = screens.toLowerCase();
console.log(screens.split(","));
const screenPrice = 1613;
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
const fullPrice = 100000;
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
const adaptive = true;
console.log(typeof adaptive);
