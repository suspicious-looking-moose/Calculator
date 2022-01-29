// Button List
const numberButtons = document.querySelectorAll('.number'); // Number Buttons
const operatorButtons = document.querySelectorAll('.operator-button'); // Operator Buttons
const eqaulsBtn = document.getElementById('='); // Equals Button
const decimalBtn = document.getElementById('.'); // Decimal Button
const clearBtn = document.getElementById('clear'); // Clear Button
const deleteBtn = document.getElementById('delete'); // Delete Button
const prevCalc = document.getElementById('screen-prev'); // Previous Calulation Display
const displayResult = document.getElementById('screen-output') // Main Calculator Output

// Keyboard Inputs


// Number Variables
let newNumber = "";
let firstNumber = "";
let secondNumber = "";
let result = "";
let decimalActive = false;

// Operator Choice/Check
let operatorCheck = null;

// Add event listeners to each Numpad button
numberButtons.forEach(element => {
    element.addEventListener('click', createNumber);
})

// Adds event listeners to each Operator button
operatorButtons.forEach(element => {
    element.addEventListener('click', activateOperator);
})

// Equals Button Event Listeners
eqaulsBtn.addEventListener('click', evaluate); 

// Clear Button Event Listeners
clearBtn.addEventListener('click', clearButton);

// Delete Button Event Listeners
deleteBtn.addEventListener('click', deleteButton);

// Decimal Input Event Listeners
decimalBtn.addEventListener('click', createNumber);

// Create Number String Function
function createNumber(button) {
    let value = button.target;
    value = button.target.id;

    newNumber = value;

    if (decimalActive === true && newNumber === ".") {return false;}
    if (newNumber === ".") {decimalActive = true;}

    if (!operatorCheck) {
        firstNumber = firstNumber + newNumber;
        newNumber = ""
        displayResult.textContent = firstNumber;
    }
    else {
        secondNumber = secondNumber + newNumber;
        newNumber = "";
        displayResult.textContent = secondNumber;
    }
}

// Activate Operator Choice Function
function activateOperator() {

    decimalActive = false;
    if (firstNumber&&secondNumber) {evaluate();}


    this.classList.add('operator-button-active');
    
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
        firstNumber = parseFloat(firstNumber);
        secondNumber = parseFloat(secondNumber);
        operatorButtons.forEach(element => {
            element.classList.remove('operator-button-active');
        })
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
    decimalActive = false;
    operatorCheck = null;
    operatorButtons.forEach(element => {
        element.classList.remove('operator-button-active');
    })
}

// Delete Button
function deleteButton() {

    if (!operatorCheck) {
        firstNumber = firstNumber.toString();
        firstNumber = firstNumber.slice(0, -1);

        if(!firstNumber) {
            return clearButton();
        }
    
        displayResult.textContent = firstNumber;
    }

    else {
        secondNumber = secondNumber.toString();
        secondNumber = secondNumber.slice(0, -1);
        if (!secondNumber) {
            secondNumber = 0;
            displayResult.textContent = secondNumber;
            return secondNumber;
        }
    
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

window.addEventListener('keydown', keyboardInput);

function keyboardInput(element) {

    if (element.key >= 0 && element.key <= 9 || element.key === ".") {
        createNumberFromKey(element);
    }
    else if (element.key === 'd') {
        deleteButton();
    }
    else if (element.key === 'c') {
        clearButton();
    }
    else if (element.key === '=') {
        evaluate();
    }
    else if (element.key === '/' || element.key === 'x' || element.key === '-' || element.key === '+') {
        activateOperatorKey(element);
    }
}

function createNumberFromKey(input) {
    let value = input.key;
    newNumber = value;

    if (decimalActive === true && newNumber === ".") {return false;}
    if (newNumber === ".") {decimalActive = true;}

    if (!operatorCheck) {
        firstNumber = firstNumber + newNumber;
        newNumber = ""
        displayResult.textContent = firstNumber;
    }
    else {
        secondNumber = secondNumber + newNumber;
        newNumber = "";
        displayResult.textContent = secondNumber;
    }
}

// Activate Operator Choice Function
function activateOperatorKey(element) {
    console.log(element);
    decimalActive = false;

    if (firstNumber&&secondNumber) {evaluate();}

    const opBtn = document.getElementById(`${element.key}`);
   
    console.log(opBtn);
    opBtn.classList.add('operator-button-active');
    
    switch (opBtn.id) {
        case '/':
            console.log("Changed operator to divide!");
            prevCalc.textContent = `${firstNumber}` + ` ${opBtn.id} `;
            operatorCheck = '÷';
            break;
        case 'x':
            console.log("Changed operator to Multiply!");
            prevCalc.textContent = `${firstNumber} ${opBtn.id} `;
            operatorCheck = '×';
            break;
        case '-':
            console.log("Changed operator to Subtract!");
            prevCalc.textContent = `${firstNumber}` + ` ${opBtn.id} `;
            operatorCheck = '-';
            break;
        case '+':
            console.log("Changed operator to Addition!");
            prevCalc.textContent = `${firstNumber}` + ` ${opBtn.id} `;
            operatorCheck = '+';
            break;
    }
}
