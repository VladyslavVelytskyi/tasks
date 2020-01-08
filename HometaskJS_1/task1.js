// task1 ---------------------------------------------------------------------------------------------------------------

function spiralArr(num) {
    //set array size
    let vertex = Math.round(Math.sqrt(num));
    let horizon = vertex;
    if (vertex * vertex < num)
        horizon = vertex + 1;

    let arr = [];
    arr.length = vertex;

    for (let i = 0; i < vertex; i++) {
        arr[i] = [];
        arr[i].length = horizon;
    }

    //set sequence of numbers
    let arrNum = [];
    for (let i = 0; i < num; i++) arrNum[i] = i + 1;

    //coordinate steps
    let quarter = 0;
    let round = 1;

    let yi = 0;
    let xi = 0;

    //create array
    for (let step = 0; step < arrNum.length; ) {

        if (quarter === 0) {
            for (let j = 0; j < arr[yi].length; j++) {
                if ( !arr[yi][j] )
                    arr[yi][j] = arrNum[step++];
            }
            ++quarter;

        } else if (quarter === 1) {
            for (let j = 0; j < vertex; j++) {
                if ( !arr[j][arr[j].length - round] )
                    arr[j][arr[j].length - round] = arrNum[step++];
            }
            ++quarter;

        } else if (quarter === 2) {
            for (let j = arr[vertex - round].length - round; j >= 0; j--) {
                if ( !arr[vertex - round][j] )
                    arr[vertex - round][j] = arrNum[step++];
            }
            ++quarter;

        } else if (quarter === 3) {
            for (let j = arr.length - round; j > 0; j--) {
                if ( !arr[j][xi] )
                    arr[j][xi] = arrNum[step++];
            }
            quarter = 0;
            ++yi;
            ++xi;
            ++round;
        }
    }

    //replace underfined on "-"
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] === undefined)
                arr[i][j] = "-";
        }
    }

    //
    return arr;
}
console.log(spiralArr(42));



//  task2 --------------------------------------------------------------------------------------------------------------

let roles = ["Городничий", "Аммос Федорович", "Почтмейстер"];
let textLines ="Почтмейстер. Объясните, господа, что, какой чиновник едет?\n" +
    "Городничий. А вы разве не слышали?\n" +
    "Почтмейстер. Слышал от Петра Ивановича Бобчинского. Он только что был у меня в почтовой конторе.\n" +
    "Городничий. Ну, что? Как вы думаете об этом?\n" +
    "Почтмейстер. А что думаю? война с турками будет.\n" +
    "Аммос Федорович. В одно слово! я сам то же думал.\n" +
    "Городничий. Да, оба пальцем в небо попали!\n" +
    "Почтмейстер. Право, война с турками. Это все француз гадит.\n" +
    "Городничий. Какая война с турками! Просто нам плохо будет, а не туркам. Это уже известно: у меня письмо.\n" +
    "Почтмейстер. А если так, то не будет войны с турками.\n" +
    "Городничий. Ну что же, как вы, Иван Кузьмич?\n" +
    "Почтмейстер. Да что я? Как вы, Антон Антонович?";


function checkTextLines(roles, textLines) {
    let finalText = "";

    //role order in text
    roles.sort(function (a, b) {
        return textLines.indexOf(a) - textLines.indexOf(b);
    });

    //make array of text strings
    textLines = textLines.split('\n');

    //create new text
    for(let i = 0; i < roles.length; i++) {
        let role = "";
        role = roles[i] + ":\n";

        for (let j = 0; j < textLines.length; j++) {
            if (textLines[j].indexOf(roles[i]) === 0) {
                textLines[j] = j + 1 + ")" + textLines[j].substr(roles[i].length + 1);
                role += "\n" + textLines[j] + "\n";
            }
        }
        finalText += role + "\n";
    }

    //
    return finalText;
}
console.log(checkTextLines(roles, textLines));



// app to task 1 -------------------------------------------------------------------------------------------------------

let container = document.getElementById("container");
let numberField = document.getElementById("numberField");
let createTab = document.getElementById("createTab");

//create table
createTab.addEventListener("click", createTable);
function createTable() {
    clearTable();
    let num = parseInt(numberField.value);
    if(isNaN(num))
        alert("Please, input a number");

    let arr = spiralArr(num);
    console.log(arr);

    let table = document.createElement("table");
    for(let i = 0; i < arr.length; i++) {
        let tr = document.createElement("tr");
        for(let j = 0; j < arr[i].length; j++) {
            let td = document.createElement("td");
            td.innerHTML = arr[i][j];
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    container.appendChild(table);
    container.style.display = "block";
}

//clear table
let clearTab = document.getElementById("clearTab");
clearTab.addEventListener("click", clearTable);
function clearTable() {
    container.innerHTML = "";
    container.style.display = "none";
}

//show the code
let viewCode = document.getElementById("viewCode");
viewCode.addEventListener("click", view);
function view() {
    document.getElementById("code").style.display = "block";
    this.value = "Hide code";
    viewCode.removeEventListener("click", view);
    viewCode.addEventListener("click", hide);
}
function hide() {
    document.getElementById("code").style.display = "none";
    this.value = "View code";
    viewCode.removeEventListener("click", hide);
    viewCode.addEventListener("click", view);
}




//app to task 2 --------------------------------------------------------------------------------------------------------

//create a list of persons
roles = [];
let add = document.getElementById("add");
let person = document.getElementById("person");

add.addEventListener("click", addPerson);
let personsList = document.getElementById("personsList");
function addPerson() {
    if(person.value !== "") {
        personsList.innerHTML = "";
        roles.push(person.value);
        for (let i = 0; i < roles.length; i++) {
            let person = document.createElement("li");
            person.innerHTML = roles[i];
            personsList.appendChild(person);
        }
    } else
        alert("Please, enter the character of the play");

    console.log(roles);
    person.value = "";
}

//create replicas list
let scenario = document.getElementById("scenario");
let createText = document.getElementById("createText");
let outputText = document.getElementById("outputText");

createText.addEventListener("click", createScenario);
function createScenario() {
    outputText.innerHTML = "";
    if(!roles.length) alert("Please, enter the character of the play");
    if(!scenario.value) alert("Please, enter the part of the play");

    let text = checkTextLines(roles, scenario.value);
    console.log(text);

    text = text.split("\n");
    console.log(text);
    for(let i = 0; i < text.length; i++) {
        let p = document.createElement("p");
        if(isNaN(+text[i][0]) && (text[i].length !== 0))
            p.innerHTML = "<hr>" + text[i];
        else p.innerHTML = text[i];
        outputText.appendChild(p);
    }
}

//show the code
let viewCode2 = document.getElementById("viewCode2");
viewCode2.addEventListener("click", view2);
function view2() {
    document.getElementById("code2").style.display = "block";
    this.value = "Hide code";
    viewCode2.removeEventListener("click", view2);
    viewCode2.addEventListener("click", hide2);
}
function hide2() {
    document.getElementById("code2").style.display = "none";
    this.value = "View code";
    viewCode2.removeEventListener("click", hide2);
    viewCode2.addEventListener("click", view2);
}