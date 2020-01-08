/* build pizza-blocks */
document.getElementById("menu").addEventListener("click", showMenu);
function showMenu() {
    for(let i of catalog.children) {
        i.style.display = "none";
        if(i.getAttribute("class") === "pizza-block")
            i.style.display = "block";
    }

    for(let i of headerMenu)
        i.style.display = "inline-block";
    headerConstructor.style.display = "none";
    headerBasket.style.display = "none";
}



// build blocks --------------------------------------------------------------------------------------------------------
function buildBlock(pizza) {
    let block = document.createElement("div");
    block.classList.add("pizza-block");

    let h3 = document.createElement("h3");
    h3.innerHTML = pizza.name;
    block.appendChild(h3);

    let properties = getPizzaProperties(pizza, true);
    block.appendChild(properties);

    let buttonBuy = document.createElement("button");
    buttonBuy.innerHTML = "Купить";
    block.appendChild(buttonBuy);

    block.style.backgroundImage = pizza.img;
    block.style.backgroundColor = getBackgroundColor(pizza);

    pizza.block = block;
    catalog.appendChild(block);

    return block;
}

let backgroundColors = ["(19, 109, 71)", "(32, 93, 158)", "(177, 63, 53)", "(113, 42, 48)"];
function getBackgroundColor(elem) {
    let rgb = "rgb";
    if(elem.price > 170)
        rgb += backgroundColors[3];
    else if(elem.price > 150)
        rgb += backgroundColors[2];
    else if(elem.price > 130)
        rgb += backgroundColors[1];
    else
        rgb += backgroundColors[0];
    return rgb;
}

function getPizzaProperties(elem, flag) {
    let ul = document.createElement("ul");
    elem.calories = getCalories(elem.ingredients);
    elem.img = getImage(elem.ingredients);

    for(let prop in elem) {
        let li = document.createElement("li");
        if(prop === "price")
            li.innerHTML = (elem[prop] <= elem.minPrice) ? "Цена: " + elem.minPrice.toFixed(2)
                                                         : "Цена: " + elem.price.toFixed(2);
        else if(prop === "calories")
            li.innerHTML = "Калории: " + elem[prop] + ", на 100гр";
        else if(prop === "ingredients") {
            if (flag)
                li.innerHTML = (elem[prop].length === 0) ? "<span>изменить</span>"
                                                         : elem[prop].join(", ") + ", <span>изменить</span>";
            else
                li.innerHTML = (elem[prop].length === 0) ? "" : elem[prop].join(", ");
        }
        else if(prop === "name" || prop === "img" || prop === "minPrice" || prop === "block")
            continue;
        ul.appendChild(li);
    }
    return ul;
}

function getCalories(elements) {
    let calories = 558;
    let weight = 200;
    for(let i = 0; i < elements.length; i++)
        for(let ingredient = 0; ingredient < ingredients.length; ingredient++)
            if(elements[i] === ingredients[ingredient].name) {
                calories += ingredients[ingredient].calories;
                weight += (elements[i].indexOf("Coус") !== -1) ? 25 : 50;
            }
    return Math.round(calories * 100 / weight);
}

function getImage(elem) {
    let background = "";
    for(let i = 0; i < elem.length; i++)
        for(let ingredient = 0; ingredient < ingredients.length; ingredient++)
            if(elem[i] === ingredients[ingredient].name)
                background += ingredients[ingredient].img + ", ";
    return background + "url(img/base.svg)";
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



/* block events ------------------------------------------------------------------------------------------------------*/

// open menu ingredients for each pizza-block
catalog.addEventListener("click", openMenuIngredients, false);
function openMenuIngredients(event) {
    let target = event.target;
    if(target.tagName === "SPAN" && target.innerHTML === "изменить") {
        event.stopImmediatePropagation();

        let block = target.parentElement.parentElement.parentElement;
        if(block.lastElementChild.classList.contains("pizza-block__ingredients")) {
            if(block.lastElementChild.style.display === "block") {
                block.lastElementChild.style.display = "none";
                block.style.marginBottom = "20px";
            } else {
                block.lastElementChild.style.display = "block";
                block.style.marginBottom = "170px"
            }
        } else {
            let div = document.createElement("div");
            div.classList.add("pizza-block__ingredients");
            div.style.display = "block";

            let ingredient = block.children[1].firstElementChild.firstChild.nodeValue;
            let list = getIngredientsList(ingredient);
            div.appendChild(list);

            block.style.marginBottom = "170px";
            block.appendChild(div);
        }
    }
}

function getIngredientsList(elem) {
    let ul = document.createElement("ul");

    for(let ingredient of ingredients) {
        let li = document.createElement("li");
        li.innerHTML = ingredient.name;

        let count = getCounter();
        li.appendChild(count);

        if(elem)
            for(let i of elem.split(", "))
                if(i === ingredient.name)
                    li.lastElementChild.children[1].value = +li.lastElementChild.children[1].value + 1;

        ul.appendChild(li);
    }
    return ul;
}

function getCounter() {
    let div = document.createElement("div");
    let min = document.createElement("button");
    let max = document.createElement("button");
    let num = document.createElement("input");

    min.innerHTML = "-";
    num.value = "0";
    num.disabled = true;
    max.innerHTML = "+";

    div.classList.add("ingredient-list__counter");

    div.appendChild(min);
    div.appendChild(num);
    div.appendChild(max);
    return div;
}

// buy this pizza - put  it into basket
catalog.addEventListener("click", buyProduct, false);
function buyProduct(event) {
    let target = event.target;
    if(target.tagName === "BUTTON" && target.innerHTML === "Купить") {
        event.stopImmediatePropagation();

        let basket = [];
        if(localStorage.getItem("basket"))
            basket = JSON.parse(localStorage.getItem("basket"));

        for(let i of pizza)
            if(i.block === target.parentElement)
                basket.push(i);

        document.getElementById("basket").lastElementChild.innerHTML = "" + basket.length;

        localStorage.setItem("basket", JSON.stringify(basket));
    }
}

// change pizza's ingredients
catalog.addEventListener("click", checkIngredients, false);
function checkIngredients(event) {
    let target = event.target;
    if(target.tagName === "BUTTON") {
        if(target.innerHTML === "+") {
            target.previousElementSibling.value++;
            if(target.parentElement.parentElement.parentElement.parentElement.classList.contains("pizza-constructor__list"))
                changeConstructorCounter(target, true);
            else
                changeCounter(target, true);
        } else if(target.innerHTML === "-" && +target.nextElementSibling.value !== 0) {
            target.nextElementSibling.value--;
            if(target.parentElement.parentElement.parentElement.parentElement.classList.contains("pizza-constructor__list"))
                changeConstructorCounter(target, false);
            else
                changeCounter(target, false);
        }
    }
}

function changeCounter(elem, flag) {
    let block = elem.parentElement.parentElement.parentElement.parentElement.parentElement;
    for(let i of pizza) {
        if (i.block === block) {
            let ingredient = elem.parentElement.previousSibling.nodeValue;
            i.ingredients = getChangedIngredients(i.ingredients, ingredient, flag);

            let set = new Set;
            i.ingredients.forEach(x => set.add(x));

            block.children[1].children[0].innerHTML = (set.size === 0) ? "<span>изменить</span>"
                                                                       : [...set].join(", ") + ", <span>изменить</span>";

            i.calories = getCalories(i.ingredients);
            block.children[1].children[1].innerHTML = "Калории: " + i.calories + ", на 100гр";

            i.price = getChangedPrice(i.price, ingredient, flag);
            block.children[1].children[2].innerHTML = (i.price <= i.minPrice) ? "Цена: " + i.minPrice.toFixed(2)
                                                                              : "Цена: " + i.price.toFixed(2);

            i.img = getImage([...set]);
            block.style.backgroundImage = i.img;
            block.style.backgroundColor = getBackgroundColor(i);

            break;
        }
    }
}

function getChangedIngredients(ingredients, ingredient, flag) {
    if(flag)
        ingredient.indexOf("Соус") === -1 ? ingredients.unshift(ingredient)
                                          : ingredients.push(ingredient);
    else
        if(ingredients.indexOf(ingredient) >= 0)
            ingredients.splice(ingredients.indexOf(ingredient), 1);

    return ingredients;
}

function getChangedPrice(price, ingredient, flag) {
    for(let i of ingredients) {
        if(flag && i.name === ingredient)
            price += i.price;
        else if(flag === false && i.name === ingredient)
            price -= i.price;
    }
    return price;
}

// show pizza image
catalog.addEventListener("click", flipBlock);
function flipBlock(event) {
    let target = event.target.closest("DIV");
    if(target.classList.contains("pizza-block") || target.classList.contains("pizza-block--basket")) {
        event.stopPropagation();
        target.classList.toggle("block-animate--open");

        !target.classList.contains("block-animate--open") ? target.classList.add("block-animate--close")
                                                          : target.classList.remove("block-animate--close");
    }
}









