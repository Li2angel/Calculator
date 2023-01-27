let currentNum = "";
let previousNum = "";
let operator = "";
const previousEntry = document.querySelector('[data-prevEntry]');
const currentEntry = document.querySelector('[data-currentEntry]');

const numButtons = document.querySelectorAll('[data-number]');
numButtons.forEach(numBtn => {
    numBtn.addEventListener('click', (e) => {
        handleNumber(e.target.textContent);
    });
});

const decimalPoint = document.querySelector('[data-decimal]');
decimalPoint.addEventListener('click', () => {
    addDecimal();
});

const operationButtons = document.querySelectorAll('[data-operation]');
operationButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        handleOperator(e.target.textContent);
    });
});


const equalButton = document.querySelector('[data-equal]');
equalButton.addEventListener('click', () => {
    if(currentNum !== "" && previousNum !== ""){
        compute();
    }
});


const delButton = document.querySelector('[data-del]');
delButton.addEventListener('click', handleDelete);


const clearButton = document.querySelector('[data-allClear]');
clearButton.addEventListener('click',clearCalc);


// this function handles the input
function handleNumber(number) {
    if(previousNum !== "" && currentNum !== "" && operator === ""){
        previousNum = "";
        currentEntry.textContent = currentNum;
    }
    if(currentNum.length <= 11){
        currentNum += number;
        currentEntry.textContent = currentNum;
    }
}


//this function rounds the number to a certain decimal places
function roundNumber(num) {
    return Math.round(num * 100000000) / 100000000;
}

// This function performs the basic Arithemetic operations on the inputs
function compute() {
    previousNum = Number(previousNum);
    currentNum = Number(currentNum);

    if(operator === "+"){
        previousNum += currentNum;
    } else if(operator === "-") {
        previousNum -= currentNum;
    } else if(operator === "x") {
        previousNum *= currentNum;
    } else if(operator === "÷") {
        if(currentNum <= 0){
            previousNum = "Math Error";
            displayResult();
            return;
        }
        previousNum /= currentNum;
    }
    previousNum = roundNumber(previousNum).toString();
    displayResult();
}


function checkOperator(text){
    operator = text;
    previousEntry.textContent = previousNum + " " + operator;
    currentEntry.textContent = "0";
    currentNum = "";
}

// this function handles the operator
function handleOperator(mathOperator) {
    if(previousNum === ""){
        previousNum = currentNum;
        checkOperator(mathOperator);
    } else if(currentNum === "") {
        checkOperator(mathOperator);
    }
    else {
        compute();
        operator = mathOperator;
        currentEntry.textContent = "0";
        previousEntry.textContent = previousNum + " " + operator;
    }
}

// This function helps in adding a decimal point to the screen
function addDecimal() {
    if(!currentNum.includes(".")) {
        currentNum += ".";
        currentEntry.textContent = currentNum;
    }
}

// function for deleting each character when backspace is pressed
function handleDelete() {
    if(currentNum !== "") {
        currentNum = currentNum.slice(0,-1);
        currentEntry.textContent = currentNum;
        if(currentNum === "") {
            currentEntry.textContent = "0";
        }
    }
    if(currentNum === "" && previousNum !== "" && operator === "") {
        previousNum = previousNum.slice(0,-1);
        currentEntry.textContent = previousNum;
    }
}

// function for handling entry via keyboard
function handleKeyPress(e) {
    e.preventDefault();
    if(e.key >= 0 && e.key <= 9){
        handleNumber(e.key);
    }
    if(e.key == 'Enter' || (e.key === "=" && currentNum !== "" && previousNum !== "")){
        compute();
    }
    if(e.key === "+" || e.key === "-") {
        handleOperator(e.key);
    }
    if(e.key === "*"){
        handleOperator("x");
    }
    if(e.key === "/"){
        handleOperator("÷");
    }
    if(e.key === "."){
        addDecimal();
    }
    if(e.key === "Backspace") {
        handleDelete();
    }
}

window.addEventListener("keydown", handleKeyPress);

// This function displays the output
function displayResult() {
    if(previousNum.length <= 11){
        currentEntry.textContent = previousNum;
    }
    else {
        currentEntry.textContent = previousNum.slice(0,11);
    }
    previousEntry.textContent = "";
    operator = "";
    currentNum = "";
}

// This Reset the calculator
function clearCalc(){
    currentNum = "";
    previousNum = "";
    operator = "";
    currentEntry.textContent = "0";
    previousEntry.textContent = "";
}