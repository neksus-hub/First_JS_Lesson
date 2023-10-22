"use strict";
const title = document.getElementsByTagName("h1")[0];

const startBtn = document.getElementsByClassName("handler_btn")[0];
const buttonPlus = document.querySelector(".screen-btn");
const resetBtn = document.getElementById("reset");

const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");

const getInput = document.querySelectorAll("input.total-input")[0];
const getInputCount = document.querySelectorAll("input.total-input")[1];
const getInputServicePrice = document.querySelectorAll("input.total-input")[2];
const getInputFullPrice = document.querySelectorAll("input.total-input")[3];
const getInputRollback = document.querySelectorAll("input.total-input")[4];

const getInputRange = document.querySelector("input[type=range]");
const rangeSpan = document.querySelector(".range-value");

const checkCMS = document.getElementById("cms-open");
const CMSVariants = document.querySelector(
  ".hidden-cms-variants>.main-controls__select>select"
);
const CMSVariantsBlock = document.querySelector(".hidden-cms-variants");
const OtherBlock = document.querySelector(
  ".hidden-cms-variants>.main-controls__input"
);

let numberScreens = document.querySelectorAll(
  ".screen>.main-controls__input>input"
)[0];

let getElement = document.querySelectorAll(".element")[0];
let getSelects = document.querySelectorAll(".views-select");
let getSpan = document.querySelector(".main-controls__range>.range-value");
let getScreenClass = document.querySelectorAll(".screen");

let counter = 0;
let numberOfScreens = 0;

const appData = {
  // Объект
  title: "",
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  fullPrice: 0,
  costIncludingInterest: 0,
  costIncludingInterestSecond: 0,
  servicePrecentPrice: 0,
  serviceNumberPrice: 0,
  numberOfScreens: 0,
  servicesPercent: {},
  servicesNumber: {},
  screensSecond: [],

  init: function () {
    // метод Inin запускает методы
    appData.addTitle(); // добавляет заголовок
    checkCMS.addEventListener("click", this.checkCmsOpen);
    startBtn.addEventListener("click", this.ifEmpty);
    buttonPlus.addEventListener("click", this.addScreenBlock); // по клику на кнопку "+" клонирует блок
  },

  ifEmpty: function () {
    getScreenClass.forEach((item) => {
      const input = item.querySelector(".main-controls__input>input");
      const select = item.querySelector("select");
      if (input.value === "" || select.value === "") {
        counter = 0;
      } else {
        counter = 1;
      }
      if (counter === 0) {
        startBtn.addEventListener("click", appData.ifEmpty);
        alert("Поля должны быть заполнены!");
      }
    });

    if (counter === 1) {
      appData.start();
    }
  },

  blockStart: function () {
    startBtn.style.display = "none";
    resetBtn.style.display = "flex";

    getScreenClass.forEach((item) => {
      const input = item.querySelector(".main-controls__input>input");
      const select = item.querySelector("select");

      input.disabled = true;
      select.disabled = true;

      resetBtn.addEventListener("click", (event) => {
        event.preventDefault();
        this.reset();
      });
    });
  },

  reset: function () {
    const totalInputs = document.querySelectorAll("input.total-input");

    startBtn.style.display = "flex";
    resetBtn.style.display = "none";

    getScreenClass.forEach((item) => {
      const input = item.querySelector(".main-controls__input>input");
      const select = item.querySelector("select");

      for (let i = 0; i <= getScreenClass.length - 1; i++) {
        if (i > 0) {
          getScreenClass[i].remove();
        }
      }

      input.value = "";
      select.value = "";

      input.disabled = false;
      select.disabled = false;
    });

    totalInputs.forEach((item) => {
      for (let i = 0; totalInputs.length - 1; i++) {
        totalInputs[i].value = "";
      }
    });
  },

  checkCmsOpen: function () {
    if (checkCMS.checked) {
      CMSVariantsBlock.style.display = "flex";
      appData.showOtherBlock();
    } else {
      CMSVariantsBlock.style.display = "none";
    }
    checkCMS.addEventListener("click", this.checkCmsOpen);
  },

  showOtherBlock: function () {
    CMSVariants.addEventListener("change", () => {
      if (CMSVariants.value === "other") {
        OtherBlock.style.display = "flex";
      } else {
        OtherBlock.style.display = "none";
      }
    });
  },

  addTitle: function () {
    // добавляет title во вкладку
    document.title = title.textContent;
  },

  addPrices: function () {
    for (let screen of this.screens) {
      this.screenPrice += +screen.price;
    }

    for (let key in this.servicesNumber) {
      this.serviceNumberPrice += +this.servicesNumber[key];
    }

    for (let key in this.servicesPercent) {
      this.servicePrecentPrice +=
        +this.screenPrice * (+this.servicesPercent[key] / 100);
    }

    this.fullPrice =
      +this.servicePrecentPrice + +this.serviceNumberPrice + +this.screenPrice;

    this.costIncludingInterest =
      this.fullPrice + (this.fullPrice / 100) * +getSpan.value;

    for (let i = 0; i <= this.screens.length - 1; i++) {
      this.numberOfScreens += +this.screens[i].count;
    }
  },

  addScreens: function () {
    getScreenClass = document.querySelectorAll(".screen"); // получает перед каждой итерацией блок с классом screen
    getScreenClass.forEach((screen, index) => {
      // перебирает этот блок
      const select = screen.querySelector("select"); // ищет в каждом новом блоке select и input
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent; // переменной selectName присваивается текстовое значение того options которой мы выбрали
      this.screens.push({
        // в массив screens передаются значения индекса, имени, стоимости выбранного экрана
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: +input.value,
      });
    });
  },

  addScreenBlock: function () {
    // клонирует блок
    const cloneScreensBlock = getScreenClass[0].cloneNode(true); // создаем переменную, которая явл. клоном блока
    getScreenClass[getScreenClass.length - 1].after(cloneScreensBlock); // после последнего блока вставляем новый
    getScreenClass = document.querySelectorAll(".screen");
    startBtn.addEventListener("click", this.ifEmpty);
  },

  addServices: function () {
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
        console.log(this.servicesNumber);
      }
    });
  },

  showInfo: function () {
    getInput.value = this.screenPrice;
    getInputCount.value = this.numberOfScreens;
    getInputServicePrice.value =
      this.serviceNumberPrice + this.servicePrecentPrice;
    getInputFullPrice.value = this.fullPrice;
    getInputRollback.value = +this.costIncludingInterest;
  },
  // запускаем метод addScreens, который пушит в screens значения
  start: function () {
    this.blockStart();
    this.addScreens();
    this.addServices();
    this.addPrices();
    this.showInfo();
  },
};

//Блок объявления функций

//Функциональный блок

rangeSpan.value = 0;

getInputRange.addEventListener("input", () => {
  rangeSpan.innerHTML = getInputRange.value + "%";
  rangeSpan.value = +getInputRange.value;
  getInputRollback.value = appData.costIncludingInterest =
    appData.fullPrice + (appData.fullPrice / 100) * +getInputRange.value;
  console.log(rangeSpan.value);
});

appData.init(); // запуск метода init
// мусорный блок
