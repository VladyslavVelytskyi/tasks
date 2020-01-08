/* prompt events */

/* animation of prompt buttons ---------------------------------------------------------------------------------------*/
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



/* show menu in two variants -----------------------------------------------------------------------------------------*/

//like blocks
buttonBlock.addEventListener("click", showBlock);
function showBlock() {
    hidePrompt(this);
    catalog.innerHTML = "";
    for(let i = 0; i < pizza.length; i++)
        buildBlock(pizza[i]);
}

//like list
buttonList.addEventListener("click", showList);
function showList() {
    hidePrompt(this);
    catalog.innerHTML = "";
    let ul = document.createElement("ul");
    for(let i = 0; i < pizza.length; i++) {
        let spanName = document.createElement("span");
        spanName.classList.add("pizza-name");
        spanName.innerHTML = pizza[i].name;

        let li = document.createElement("li");
        li.appendChild(spanName);
        li.innerHTML += (pizza[i].price <= pizza[i].minPrice) ? "<br>Цена: " + pizza[i].minPrice.toFixed(2)
                                                              : "<br>Цена: " + pizza[i].price.toFixed(2);

        ul.appendChild(li);
    }
    catalog.appendChild(ul);
}



/* hide prompt -------------------------------------------------------------------------------------------------------*/
function hidePrompt(elem) {
    document.getElementById("shadow").style.display = "none";

    let tablet = document.querySelector(".price-list__type");
    tablet.classList.remove("price-list__type--prompt");
    tablet.classList.add("price-list__type--menu");

    changeSelect(elem);
}