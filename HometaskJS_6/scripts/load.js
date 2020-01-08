/* get main information when window onload */

// get main page elements
let buttonBlock = document.getElementById("button-block");
let buttonList = document.getElementById("button-list");
let nameBlock = document.getElementById("name-block");
let nameList = document.getElementById("name-list");
let catalog = document.getElementById("catalog");
let selectList = document.getElementById("sort-list");
let selectIngredients = document.getElementById("sort-ingredients");
let pizzaConstructorButton = document.getElementById("constructor");
let headerMenu = document.getElementsByClassName("g-header__menu");
let headerConstructor = document.getElementsByClassName("header__constructor")[0];
let headerBasket = document.getElementsByClassName("header__basket")[0];
let fullPrice = document.getElementById("fullPrice");
let pay = document.getElementById("pay");

// get minimal price for each pizza
for(let elem of pizza)
    elem.minPrice = elem.price;

// get previous pizza changes when window don't load at first
let oldPizza = pizza;
localStorage.setItem("oldPizza", JSON.stringify(oldPizza));
if(localStorage.getItem("newPizza")) {
    pizza = JSON.parse(localStorage.getItem("newPizza"));
}

// get previous basket changes
if(localStorage.getItem("basket")) {
    basket = JSON.parse(localStorage.getItem("basket"));
    document.getElementById("basket").lastElementChild.innerHTML = "" + basket.length;
}

