function add(addend1, addend2) { return addend1 + addend2; }
function subtract(minuend, subtrahend) { return minuend - subtrahend; }
function multiply(factor1, factor2) { return factor1 * factor2; }
function divide(dividend, divisor) { return dividend / divisor; }
//how to make operator(num1, num2) return?
function operate(operator, num1, num2) {
    if (operator == 'add') return add(num1, num2); 
    if (operator == 'subtract') return subtract(num1, num2); 
    if (operator == 'multiply') return multiply(num1, num2); 
    if (operator == 'divide') return divide(num1, num2); 
}

let displayValue = 0;
let decimal = false;
let soft = true;
let num1 = NaN, num2 = NaN, operator = 'none';
const preview = document.querySelector(".preview");
const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        switch (button.className) {
            case 'modifier': clickModifier(button.id); break;
            case 'operation': clickOperation(button.id); break;
            case 'number': clickNumber(button.id); break;
        }
        displayValue = +(Math.round(displayValue + "e+8")  + "e-8");
        display.textContent = displayValue;
    });
})

function clickModifier(id) {
    console.log(num1);
    console.log(num2);
    console.log(operator);
    switch (id) {
        case 'clear': {
            display.textContent = '0';
            displayValue = 0;
            decimal = false;
            num1 = 0;
            break;
        }
        case 'delete': {
            if (display.textContent.slice(-1) == '.') decimal = false;
            display.textContent = display.textContent.slice(0, -1);
            displayValue = Math.floor(displayValue / 10);
            break;
        }
        case 'percent': {
            displayValue /= 100;
            display.textContent = displayValue;
            decimal = true;
            break;
        }
    }
}

function clickOperation(id) {
    console.log(num1);
    console.log(num2);
    console.log(operator);
    console.log('clicked ' + id);
    if (id == 'equals') clickEquals();
    else clickOperator(id);
}

function clickNumber(id) {
    console.log(num1);
    console.log(num2);
    console.log(operator);
    if (!decimal && id == '.') {
        display.textContent += id;
        decimal = true;
        displayValue = Number(display.textContent);
        console.log(displayValue);
    }
    else if (display.textContent.length < 9 && id != '.') {
        if (displayValue == '0' && !decimal) display.textContent = '';
        display.textContent += id;
        displayValue = Number(display.textContent);
        console.log(displayValue);
    }
}

function clickEquals() {
    console.log(num1);
    console.log(num2);
    console.log(operator);
    preview.textContent += displayValue;
    if (!isNaN(num1) && operator != 'none') {
        displayValue = operate(operator, num1, displayValue);
        display.textContent = displayValue;
        num1 = displayValue;
        displayValue = num1;
        num2 = NaN;
        operator == 'none';
        console.log('l');
    }
    
}

function clickOperator(id) {
    console.log(num1);
    console.log(num2);
    console.log(operator);
    console.log("dv" + displayValue);
    if (isNaN(num2)) {
        operator = id;
        num1 = displayValue;
        displayValue = 0;
        display.textContent = displayValue;
    }
    preview.textContent = `${num1} ${getOperator(operator)} `;
}

function getOperator(operator) {
    switch (operator) {
        case 'add' : return '+'; break;
        case 'subtract' : return '-'; break;
        case 'multiply' : return '*'; break;
        case 'divide' : return '÷'; break;
    }
}

//