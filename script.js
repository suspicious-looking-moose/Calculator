// Operator Functions
function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

// Operate  Function
function operate(func, a, b) {
    return func(a, b);
}

// Function to reset the screen and all values.
function clearButton() {
    let displayValue = 0;
    screenDisplay.textContent = displayValue;
    topLayerScreen = "";
    screenCalculation.textContent = "";
    firstOfPair = "";
    secondOfPair = "";
    operator = false;
    isOperatorActive  = false;
};

// Add event listener to each Numpad button
const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(element => {
    element.addEventListener('click', buildNumberString);
});

// Adds individual Event listeners
document.getElementById('clear').addEventListener('click', clearButton); // Clear Button
document.getElementById('=').addEventListener('click', equalsButtonFunction); // Equals Button

// Adds event listeners to Operator Buttons
const operatorButtons = document.querySelectorAll('.operator-button');
operatorButtons.forEach(element => {
    element.addEventListener('click', activateOperator);
})

// Variables for the Calc Screen
let screenCalculation = document.getElementById('screen-working');
let screenDisplay = document.getElementById('screen-output');

let topLayerScreen = " "
screenCalculation.textContent = topLayerScreen;

// Empty strings for each value to evaluate
let firstOfPair = "";
let secondOfPair = "";

// Variables to set if operator active and the choice
let operator = false;
let operatorChoice = "";
let isOperatorActive = false;

// Function to create a string of numbers
function buildNumberString(button) {
    let value = button.target.id;

    // Build first integer for evaluation
    if (!operator) { 

        firstOfPair = firstOfPair.concat(value); // Adds selected digit to Integer 1
        
        screenDisplay.textContent = firstOfPair; // Displays Integer 1 string to the  display.

        topLayerScreen = topLayerScreen.concat(value); // Adds digits to top screen calculation string
        screenCalculation.textContent = topLayerScreen; // Displays this
    }

    // Second integer for evaluation
    else if (operator) {
        secondOfPair = secondOfPair.concat(value);

        screenDisplay.textContent = secondOfPair;

        topLayerScreen = topLayerScreen.concat(value);
        screenCalculation.textContent = topLayerScreen;
        
    }
}

// Function that activates an operator
function activateOperator() {
    if (isOperatorActive) {
        equalsButtonFunction();
        topLayerScreen = topLayerScreen.replace("=", "");
        screenCalculation.textContent = topLayerScreen;
    }
    switch (this.id) {
        case '÷':
            isOperatorActive = true;
            operatorChoice = 'Divide';
            console.log("Changed operator to divide!");
            topLayerScreen = topLayerScreen.concat(" ÷ ");
            screenCalculation.textContent = topLayerScreen;
            break;
        case '×':
            isOperatorActive = true;
            operatorChoice = 'Multiply';
            console.log("Changed operator to Multiply!");
            topLayerScreen = topLayerScreen.concat(" × ");
            screenCalculation.textContent = topLayerScreen;    
            break;
        case '-':
            isOperatorActive = true;
            operatorChoice = 'Subtract';
            console.log("Changed operator to Subtract!");
            topLayerScreen = topLayerScreen.concat(" - ");
            screenCalculation.textContent = topLayerScreen;    
            break;
        case '+':
            isOperatorActive = true;
            operatorChoice = 'Addition';
            console.log("Changed operator to Addition!");
            topLayerScreen = topLayerScreen.concat(" + ");
            screenCalculation.textContent = topLayerScreen;    
            break;
    }

    screenDisplay.textContent = "";
    return operator = true;
}



function equalsButtonFunction() {

    topLayerScreen = topLayerScreen.concat(" = ");
    screenCalculation.textContent = topLayerScreen;
    
    firstOfPair = parseInt(firstOfPair);
    secondOfPair = parseInt(secondOfPair);

    switch (operatorChoice) {
        case 'Divide':
            screenDisplay.textContent = divide(firstOfPair, secondOfPair);
            firstOfPair = divide(firstOfPair, secondOfPair);
            secondOfPair = "";
            operatorChoice = null;
            break;
        case 'Multiply':
            screenDisplay.textContent = multiply(firstOfPair, secondOfPair);
            firstOfPair = multiply(firstOfPair, secondOfPair);
            secondOfPair = "";
            operatorChoice = null;
            break;
        case 'Subtract':
            screenDisplay.textContent = subtract(firstOfPair, secondOfPair);
            firstOfPair = subtract(firstOfPair, secondOfPair);
            secondOfPair = "";
            operatorChoice = null;
            break;
        case 'Addition':
            screenDisplay.textContent = add(firstOfPair, secondOfPair);
            firstOfPair = add(firstOfPair, secondOfPair);
            secondOfPair = "";
            operatorChoice = null;
            break;
    }
}
