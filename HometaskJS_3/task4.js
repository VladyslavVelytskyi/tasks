let canvas = document.getElementById("field");
let tbody = document.getElementById("tbody");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//-----------------------------new code
function counter() {
    let counterCount = 1;
    return function() {
        return counterCount++;
    }
}
let ballCount = counter();
let squareCount = counter();
//-----------------------------

// classes -------------------------------------------------------------------------------------------------------------
class Shape {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.dx = Math.random();
        this.dy = 1 - this.dx;
        this.color = getColor();

        //for proper animation
        this.flagX = false;
        this.flagY = false;
    }
}

class Ball extends Shape {
    constructor() {
        super();
        this.r = getLength() / 2;  //for one scale
        this.sq = this.r * this.r * Math.PI;
    }

    draw() {
        let context = canvas.getContext("2d");
        context.beginPath();
        context.arc(this.x + this.r, this.y + this.r, this.r, 0, 2 * Math.PI, false);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }

    move(flagX, flagY) {
        let context = canvas.getContext("2d");
        context.beginPath();

        this.x += this.dx;
        this.y += this.dy;

        if( (this.x + this.r > canvas.width) ||
            (this.x - this.r < 0 && flagX === true) ) {
            this.dx = -this.dx;
            this.flagX = true;
        }

        if( (this.y + this.r >= canvas.height) ||
            (this.y - this.r < 0 && flagY === true) ) {
            this.dy = -this.dy;
            this.flagY = true;
        }

        context.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }

    //----------------------------new code
    getNum() {
        this.number = ballCount();
    }
    //----------------------------
}

class Square extends Shape {
    constructor() {
        super();
        this.a = getLength();
        this.sq = this.a * this.a;
    }

    draw() {
        let context = canvas.getContext("2d");
        context.beginPath();
        context.rect(this.x, this.y, this.a, this.a);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }

    move() {
        let context = canvas.getContext("2d");
        context.beginPath();

        this.x += this.dx;
        this.y += this.dy;

        if(this.x + this.a > canvas.width || this.x < 0) this.dx = -this.dx;
        if(this.y + this.a > canvas.height || this.y < 0) this.dy = -this.dy;

        context.rect(this.x, this.y, this.a, this.a);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }

    //------------------------------new code
    getNum() {
        this.number = squareCount();
    }
    //------------------------------
}



// draw animation and get collection of elements -----------------------------------------------------------------------

/* another way
let shapes = new Map;
let i = 1;
*/

//-----------------new code
let shapesArr = [];
//-----------------

function draw() {

    //-------------------------------------------------new code
    let a = Math.random() - 0.5;
    let figure;

    if (a > 0)  {
        figure = new Ball();
        figure.getNum();
        if (figure.number > 10) {
            figure = new Square();
            figure.getNum();
        }
    } else if (a <= 0) {
        figure = new Square();
        figure.getNum();
        if(figure.number > 10) {
            figure = new Ball();
            figure.getNum();
        }
    }
    figure.draw();
    shapesArr.push(figure);
    getTable(figure);
    if(shapesArr.length === 20) clearInterval(timerId);
    //-------------------------------------------------

    /* another way
    let ball = new Ball;
    ball.draw();
    let square = new Square;
    square.draw();

    getTable(ball, square);
    shapes.set([ball, square], i++);

    if(shapes.size === 10) clearInterval(timerId);
    */

}
draw();

let timerId = setInterval(draw, 5000);

setInterval( () => {
    let context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    //---------------------------------------------------------------new code
    for(let shape of shapesArr) shape.move(shape.flagX, shape.flagY);
    //---------------------------------------------------------------

    /* another way
    for(let key of shapes.keys()) {
        key[0].move(key[0].flagX, key[0].flagY);
        key[1].move();
    }*/

}, 5);



// support functions ---------------------------------------------------------------------------------------------------
function getColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return "rgb("+r+","+g+","+b+")"

    //alternate color pick
    //return "#" + Math.ceil(Math.random() * 16777215).toString(16);
}

function getLength() {
    return Math.floor(Math.random() * (120 - 20 + 1) + 20); //from 20px to 120px figure size
}



// table with elements -------------------------------------------------------------------------------------------------
function getTable(shape /*ball, square*/ ) {

    //-------------------------------------------------new code
    let tr = document.createElement("tr");
    let num = document.createElement("td");
    num.innerHTML = shapesArr.length;
    tr.appendChild(num);

    let name = document.createElement("td");
    if(shape.r) name.innerHTML = "ball_"+ shape.number;
    else name.innerHTML = "square_" + shape.number;
    tr.appendChild(name);

    addTableRow(shape, tr);
    tbody.appendChild(tr);
    //-------------------------------------------------

    /* another way
    let trBall = document.createElement("tr");
    let trSquare = document.createElement("tr");

    let num = document.createElement("td");
    num.innerHTML = i;
    num.rowSpan = 2;
    num.style.color = "black";
    trBall.appendChild(num);

    let ballName = document.createElement("td");
    ballName.innerHTML = "ball_" + i;
    trBall.appendChild(ballName);
    addTableRow(ball, trBall);
    tbody.appendChild(trBall);

    let squareName = document.createElement("td");
    squareName.innerHTML = "square_" + i;
    trSquare.appendChild(squareName);
    addTableRow(square, trSquare);
    tbody.appendChild(trSquare);
    */
}

function addTableRow(shape, tr) {
    let color = document.createElement("td");
    color.innerHTML = shape.color;
    let sq = document.createElement("td");
    sq.innerHTML = shape.sq.toFixed(2);
    tr.style.color = shape.color;
    tr.appendChild(color);
    tr.appendChild(sq);
}

document.getElementById("button").addEventListener("click", hideTable);
let table = document.getElementById("table");

function showTable() {
    table.classList.remove("table--hide");
    this.innerHTML = "hide";
    this.removeEventListener("click", showTable);
    this.addEventListener("click", hideTable);
}

function hideTable() {
    table.classList.add("table--hide");
    this.innerHTML = "show";
    this.removeEventListener("click", hideTable);
    this.addEventListener("click", showTable);
}
