/* sort events */

// sort blocks
selectIngredients.addEventListener("change", sortIngredients);
function sortIngredients() {
    for(let div of catalog.children) {
        div.style.display = "none";
        let list = div.children[1].firstElementChild.firstChild.nodeValue;
        if(list.indexOf(this.value) !== -1)
            div.style.display = "inline-block";
    }
}

// sort list
selectList.addEventListener("change", sortList);
function sortList() {
    if(this.value === "by-name") {
        pizza.sort((a, b) => {
            let i = 0;
            while (a.name.toLowerCase().charCodeAt(i) === b.name.toLowerCase().charCodeAt(i))
                i++;
            return a.name.toLowerCase().charCodeAt(i) - b.name.toLowerCase().charCodeAt(i);
        });
    } else if(this.value === "by-price")
        pizza.sort((a, b) => a.price - b.price );

    showList();
}
