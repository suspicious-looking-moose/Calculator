// Button List
const numberButtons = document.querySelectorAll('.number'); // Number Buttons
const operatorButtons = document.querySelectorAll('.operator-button'); // Operator Buttons
const eqaulsBtn = document.getElementById('='); // Equals Button
const clearBtn = document.getElementById('clear'); // Clear Button
const deleteBtn = document.getElementById('delete'); // Delete Button
const prevCalc = document.getElementById('screen-prev'); // Previous Calulation Display
const displayResult = document.getElementById('screen-output') // Main Calculator Output

// Number Variables
let newNumber = "";
let firstNumber = "";
let secondNumber = "";
let result = "";

// Operator Choice/Check
let operatorCheck = null;

// Add event listener to each Numpad button
numberButtons.forEach(element => {
    element.addEventListener('click', createNumber);
})

// Adds event listener to each Operator button
operatorButtons.forEach(element => {
    element.addEventListener('click', activateOperator);
})

// Equals Button Event Listener
eqaulsBtn.addEventListener('click', evaluate); 

// Clear Button Event Listener
clearBtn.addEventListener('click', clearButton);

// Delete Button Event Listener
deleteBtn.addEventListener('click', deleteButton);

// Create Number String Function
function createNumber(button) {
    let value = button.target.id;
    newNumber = newNumber + value;
    console.log(newNumber);

    if (!operatorCheck) {
        firstNumber = firstNumber + newNumber;
        firstNumber = parseInt(firstNumber);
        newNumber = ""
        displayResult.textContent = firstNumber;
    }
    else {
        secondNumber = secondNumber + newNumber;
        secondNumber = parseInt(secondNumber);
        newNumber = "";
        displayResult.textContent = secondNumber;
    }
}

// Activate Operator Choice Function
function activateOperator() {
    
    if (firstNumber&&secondNumber) {evaluate();}
    
    switch (this.id) {
        case '÷':
            console.log("Changed operator to divide!");
            prevCalc.textContent = `${firstNumber}` + ` ${this.id} `;
            operatorCheck = '÷';
            break;
        case '×':
            console.log("Changed operator to Multiply!");
            prevCalc.textContent = `${firstNumber} ${this.id} `;
            operatorCheck = '×';
            break;
        case '-':
            console.log("Changed operator to Subtract!");
            prevCalc.textContent = `${firstNumber}` + ` ${this.id} `;
            operatorCheck = '-';
            break;
        case '+':
            console.log("Changed operator to Addition!");
            prevCalc.textContent = `${firstNumber}` + ` ${this.id} `;
            operatorCheck = '+';
            break;
    }
}

// Evaluator Function
function evaluate() {
    if (secondNumber === 0 && operatorCheck === '÷') {
        displayResult.textContent = "Error.";
    }
    else if (firstNumber&&secondNumber) {
        result = operate(operatorCheck, firstNumber, secondNumber);
        result = roundResult(result);
        displayResult.textContent = result;
        prevCalc.textContent = `${firstNumber} ${operatorCheck} ${secondNumber} = `;

        firstNumber = result;
        secondNumber = "";
        return result;
    }
}

// Round Number Function
function roundResult(myNum) {
    return Math.round(myNum * 1000) / 1000;
  }

// Clear Button
function clearButton() {
    displayResult.textContent = 0;
    prevCalc.textContent = 0;
    firstNumber =  "";
    secondNumber = "";
    newNumber = "";
    operatorCheck = null;
}

// Delete Button
function deleteButton() {
    let deleteNum = document.getElementById('screen-output').textContent;
    deleteNum = deleteNum.slice(0, -1);
    console.log(deleteNum);
    
    if (!operatorCheck) {
        firstNumber = firstNumber.toString();
        firstNumber = firstNumber.slice(0, -1);
        firstNumber = parseInt(firstNumber);
        displayResult.textContent = firstNumber;
    }
    else {
        secondNumber = secondNumber.toString();
        secondNumber = secondNumber.slice(0, -1);
        secondNumber = parseInt(secondNumber);
        displayResult.textContent = secondNumber;
    }
}

// Operator Functions
function operate(funcChoice, a, b) {
    console.log("Evaluation function has been activated");
    switch (funcChoice) {
        case '÷':
            return divide(a, b);
        case '×':
            return multiply(a, b);
        case '-':
            return subtract(a, b);
        case '+':
            return add(a, b);
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}