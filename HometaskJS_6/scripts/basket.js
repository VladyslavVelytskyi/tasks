/* basket events */

// show basket
document.getElementById("basket").addEventListener("click", showBasket);
function showBasket() {
    for (let i of headerMenu)
        i.style.display = "none";
    headerConstructor.style.display = "none";
    headerBasket.style.display = "block";

    for (let i of catalog.children) {
        i.style.display = "none";
        if (i.getAttribute("class") === "pizza-block--basket")
            i.style.display = "block";
    }

    let sum = parseFloat(fullPrice.innerHTML);

    let basket = JSON.parse(localStorage.getItem("basket"));
    if (basket !== null) {
        for (let i = 0; i < basket.length; i++) {
            if (!document.getElementsByClassName("pizza-block--basket")[i]) {
                let block = document.createElement("div");
                block.classList.add("pizza-block--basket");

                let h3 = document.createElement("h3");
                h3.innerHTML = basket[i].name;
                block.appendChild(h3);

                let properties = getPizzaProperties(basket[i], false);
                block.appendChild(properties);

                let buttonBuy = document.createElement("button");
                buttonBuy.innerHTML = "Удалить";
                block.appendChild(buttonBuy);

                block.style.backgroundImage = basket[i].img;
                block.style.backgroundColor = getBackgroundColor(basket[i]);

                catalog.appendChild(block);

                sum += basket[i].price;
            }
        }
    }
    fullPrice.innerHTML = sum.toFixed(2) + " грн";
}

// delete product in basket
catalog.addEventListener("click", deleteProduct, false);
function deleteProduct(event) {
    let target = event.target;
    if(target.tagName === "BUTTON" && target.innerHTML === "Удалить") {
        event.stopImmediatePropagation();

        let basket = JSON.parse(localStorage.getItem("basket"));
        for(let i = 0; i < basket.length; i++)
            if(document.getElementsByClassName("pizza-block--basket")[i] === target.parentElement) {
                fullPrice.innerHTML = (parseFloat(fullPrice.innerHTML) - basket[i].price).toFixed(2) + " грн";
                basket.splice(i, 1);
                catalog.removeChild(target.parentElement);
                break;
            }

        document.getElementById("basket").lastElementChild.innerHTML = "" + basket.length;
        localStorage.setItem("basket", JSON.stringify(basket));
    }
}

// buy product
pay.addEventListener("click", payForPizza);
function payForPizza() {
    let basket = [];
    localStorage.setItem("basket", JSON.stringify(basket));
    document.getElementById("basket").lastElementChild.innerHTML = "" + basket.length;

    fullPrice.innerHTML = "0.00 грн";

    while(document.getElementsByClassName("pizza-block--basket").length !== 0)
        document.getElementsByClassName("pizza-block--basket")[0].remove();
}