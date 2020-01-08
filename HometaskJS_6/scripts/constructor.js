/* pizza-constructor events */

// show pizza constructor
pizzaConstructorButton.addEventListener("click", showPizzaConstructor);
function showPizzaConstructor() {
    headerConstructor.style.display = "block";
    headerBasket.style.display = "none";
    for(let i of headerMenu)
        i.style.display = "none";

    for(let i of catalog.children)
        i.style.display = "none";
    (catalog.firstElementChild.className === "pizza-constructor") ? catalog.firstElementChild.style.display = "block"
                                                                  : buildPizzaConstructor();
}

// build pizza constructor
function buildPizzaConstructor() {
    let div = document.createElement("div");
    div.setAttribute("id", "pizza-constructor") ;
    div.setAttribute("class", "pizza-constructor");

    let list = document.createElement("div");
    list.setAttribute("class", "pizza-constructor__list");
    let ingredients = getNewIngrediens();
    list.appendChild(ingredients);
    div.appendChild(list);

    let view = document.createElement("div");
    view.setAttribute("class", "pizza-constructor__view");
    div.appendChild(view);

    let properties = getNewProperties();
    properties.setAttribute("class", "pizza-constructor__properties");
    div.appendChild(properties);

    catalog.insertAdjacentElement("afterbegin", div);
}

function getNewIngrediens() {
    let ingredientsBlock = document.createElement("ul");
    for(let i of ingredients) {
        let li = document.createElement("li");
        li.innerHTML = i.name;
        let count = getCounter();
        li.appendChild(count);
        ingredientsBlock.appendChild(li);
    }
    return ingredientsBlock;
}

function getNewProperties() {
    let properiesBlock = document.createElement("div");
    let nameField = document.createElement("div");
    let caloriesField = document.createElement("div");
    let priceField = document.createElement("div");

    nameField.innerHTML = "Название: ";
    let name = document.createElement("input");
    nameField.appendChild(name);

    caloriesField.innerHTML = "Каллории на 100гр: ";
    let calories = document.createElement("span");
    calories.innerHTML = "279";
    caloriesField.appendChild(calories);

    priceField.innerHTML = "Цена: ";
    let price = document.createElement("span");
    price.innerHTML = "99.99";
    priceField.appendChild(price);

    let buttonCreate = document.createElement("button");
    buttonCreate.innerHTML = "Cоздать";
    buttonCreate.addEventListener("click", createNewPizza);

    properiesBlock.appendChild(nameField);
    properiesBlock.appendChild(caloriesField);
    properiesBlock.appendChild(priceField);
    properiesBlock.appendChild(buttonCreate);
    return properiesBlock;
}

// change ingredients in pizza constructor
function changeConstructorCounter(target, flag) {
    let block = document.getElementsByClassName("pizza-constructor__view")[0];
    let elem = target.parentElement.previousSibling.nodeValue;
    let properties = document.getElementsByClassName("pizza-constructor__properties")[0];

    let minPrice = 99.99;
    let price = +properties.children[2].lastElementChild.innerHTML;

    if(flag) {
        let image = document.createElement("img");
        image.style.transform = "rotate(" + (Math.random() * 346 + 15) + "deg)";
        for (let i of ingredients)
            if (i.name === elem) {
                image.setAttribute("src", i.img.substring(i.img.indexOf("img"), i.img.length - 1));
                image.setAttribute("data-name", i.name);
                price = getChangedPrice(price, i.name, flag);

                (i.name.indexOf("Соус") !== -1) ? block.insertAdjacentElement("afterBegin", image)
                                                : block.appendChild(image);
                break;
            }
    } else if (!flag)
        for(let i of [...block.children])
            if(i.getAttribute("data-name") === elem) {
                block.removeChild(i);
                price = getChangedPrice(price, i.getAttribute("data-name"), flag);
                break;
            }

    let ingredient = [];
    for(let i of [...block.children])
        ingredient.push(i.getAttribute("data-name"));

    properties.children[1].lastElementChild.innerHTML = getCalories(ingredient);
    properties.children[2].lastElementChild.innerHTML = (price <= minPrice) ? minPrice.toFixed(2)
                                                                            : price.toFixed(2);
}

// create new pizza and add it into pizza blocks
function createNewPizza() {
    let properties = document.getElementsByClassName("pizza-constructor__properties")[0];
    let calories = +properties.children[1].lastElementChild.innerHTML;
    let price = +properties.children[2].lastElementChild.innerHTML;
    let name = properties.children[0].lastElementChild.value;
    if(name === "")
        properties.children[0].lastElementChild.style.border = "2px solid red";
    else {
        properties.children[0].lastElementChild.style.border = "none";
        let block = document.getElementsByClassName("pizza-constructor__view")[0];
        let ingredients = [];
        for(let i of [...block.children])
            ingredients.push(i.getAttribute("data-name"));

        let obj = {
            name: name,
            ingredients: ingredients,
            calories: calories,
            price: price,
            minPrice: 99.99
        };
        obj.block = buildBlock(obj);

        pizza.push(obj);
        localStorage.setItem("newPizza", JSON.stringify(pizza));
        hidePizzaConstructor();
    }
}

function hidePizzaConstructor() {
    for(let i of catalog.children)
        if(i.getAttribute("class") === "pizza-block")
            i.style.display = "block";

    for(let i of headerMenu)
        i.style.display = "inline-block";
    headerConstructor.style.display = "none";
    headerBasket.style.display = "none";
    document.getElementById("pizza-constructor").style.display = "none";
}