let buttonBlock = document.getElementById("button-block");
let buttonList = document.getElementById("button-list");
let nameBlock = document.getElementById("name-block");
let nameList = document.getElementById("name-list");
let catalog = document.getElementById("catalog");
let selectList = document.getElementById("sort-list");
let selectIngredients = document.getElementById("sort-ingredients");

let backgroundColors = ["(19, 109, 71)", "(32, 93, 158)", "(177, 63, 53)", "(113, 42, 48)"];

// prompt events -------------------------------------------------------------------------------------------------------

buttonBlock.addEventListener("mouseover", blockMouseOver);
buttonBlock.addEventListener("mouseout", blockMouseOut);

function blockMouseOver() {
    nameBlock.style.right = "0";
    nameBlock.style.opacity = "1";
}
function blockMouseOut() {
    nameBlock.style.right = "300px";
    nameBlock.style.opacity = "0";
}

buttonList.addEventListener("mouseover", listMouseOver);
buttonList.addEventListener("mouseout", listMouseOut);

function listMouseOver() {
    nameList.style.left = "0";
    nameList.style.opacity = "1";
}
function listMouseOut() {
    nameList.style.left = "300px";
    nameList.style.opacity = "0";
}



// sort block events----------------------------------------------------------------------------------------------------

buttonBlock.addEventListener("click", showBlock);

function showBlock() {
    hidePrompt(this);
    catalog.innerHTML = "";
    for(let i = 0; i < pizza.length; i++)
        buildBlock(pizza[i]);
}

selectIngredients.addEventListener("change", sortIngredients);

function sortIngredients() {
    catalog.innerHTML = "";
    for(let elem of pizza)
        for(let ingredient of elem.ingredients)
            if(this.value === ingredient)
                buildBlock(elem);
}

// build blocks --------------------------------------------------------------------------------------------------------

function buildBlock(pizza) {
    let block = document.createElement("div");
    block.classList.add("pizza-block");

    let h3 = document.createElement("h3");
    h3.innerHTML = pizza.name;
    block.appendChild(h3);

    block.style.backgroundImage = getBackground(pizza.ingredients);
    block.style.backgroundColor = getBackgroundColor(pizza);

    let properties = getPizzaProperties(pizza);
    block.appendChild(properties);

    catalog.appendChild(block);
}

function getPizzaProperties(elem) {
    let ul = document.createElement("ul");
    elem.calories = getCalories(elem.ingredients);

    for(let prop in elem) {
        let li = document.createElement("li");
        if(prop === "getChangedPrice")
            li.innerHTML = "Цена: " + elem[prop];
        else if(prop === "calories")
            li.innerHTML = "Калории: " + elem[prop];
        else if(prop === "ingredients")
            li.innerHTML = elem[prop].join(", ");
        else if(prop === "name")
            continue;
        ul.appendChild(li);
    }
    return ul;
}

function getCalories(elements) {
    let calories = 558;
    let weight = 200;
    for(let ing = 0; ing < elements.length; ing++)
        for(let ingredient = 0; ingredient < ingredients.length; ingredient++)
            if(elements[ing] === ingredients[ingredient].name) {
                calories += ingredients[ingredient].calories;
                if(elements[ing].indexOf("Coус") !== -1)
                    weight += 25;
                else
                    weight += 50;
            }
    return Math.round(calories * 100 / weight);
}

function getBackground(elem) {
    let background = "";
    for(let ing = 0; ing < elem.length; ing++)
        for(let ingredient = 0; ingredient < ingredients.length; ingredient++)
            if(elem[ing] === ingredients[ingredient].name)
                background += ingredients[ingredient].img + ", ";
    background += "url(img/base.svg)";
    return background;
}

function getBackgroundColor(elem) {
    let rgb = "rgb";
    if(elem.price > 170)
        rgb += backgroundColors[3];
    else if(elem.price > 150)
        rgb += backgroundColors[2];
    else if(elem.price > 130)
        rgb += backgroundColors[1];
    else if(elem.price > 110)
        rgb += backgroundColors[0];
    return rgb;
}



// sort list events ----------------------------------------------------------------------------------------------------

buttonList.addEventListener("click", showList);

function showList() {
    hidePrompt(this);
    catalog.innerHTML = "";
    let ul = document.createElement("ul");
    for(let i = 0; i < pizza.length; i++) {
        let li = document.createElement("li");
        let spanName = document.createElement("span");
        spanName.classList.add("pizza-name");
        spanName.innerHTML = pizza[i].name;
        li.appendChild(spanName);
        li.innerHTML += " цена: " + pizza[i].price;
        ul.appendChild(li);
    }
    catalog.appendChild(ul);
}

selectList.addEventListener("change", sortList);

function sortList() {
    if(this.value === "by-name") {
        pizza.sort((a, b) => {
            let i = 0;
            while (a.name.toLowerCase().charCodeAt(i) === b.name.toLowerCase().charCodeAt(i))
                i++;
            return a.name.toLowerCase().charCodeAt(i) - b.name.toLowerCase().charCodeAt(i);
        });
    }  else if(this.value === "by-getChangedPrice")
        pizza.sort((a, b) => { return a.price - b.price; });

    showList();
}



// select changes ------------------------------------------------------------------------------------------------------

function hidePrompt(elem) {
    document.getElementById("shadow").style.display = "none";

    let tablet = document.querySelector(".getChangedPrice-list__type");
    tablet.classList.remove("getChangedPrice-list__type--prompt");
    tablet.classList.add("getChangedPrice-list__type--menu");

    changeSelect(elem);
}

function changeSelect(elem) {
    let typeSort = document.getElementsByClassName("type__sort");

    if(elem === buttonBlock) {
        typeSort[0].classList.add("type__sort-ingredients");
        typeSort[0].classList.remove("type__sort-list");
        selectIngredients.previousElementSibling.style.display = "inline-block";
        selectList.previousElementSibling.style.display = "none";
        getSelectIngredients();
    } else if(elem === buttonList) {
        typeSort[0].classList.add("type__sort-list");
        typeSort[0].classList.remove("type__sort-ingredients");
        selectIngredients.previousElementSibling.style.display = "none";
        selectList.previousElementSibling.style.display = "inline-block";
    }
}

function getSelectIngredients() {
    for(let ingredient of ingredients) {
        let option = document.createElement("option");
        option.innerHTML = ingredient.name;
        selectIngredients.appendChild(option);
    }
}



