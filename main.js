const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.number');
const clear = document.querySelector('.clear');
const operatorButtons = document.querySelectorAll('.firstLine');
const dot = document.querySelector('.dot');
const equal = document.querySelector('.equal');

let result1 = 0;
let result2 = 0;
let result = 0;
display.textContent = 0;
let numbers = [];
let n = 0;
for (let i = 0; i < 100; i++) {
    numbers[i] = [];
}
let operators = [];

Array.from(numberButtons).forEach(item => {
    item.addEventListener('click', () => {
        if (display.textContent.startsWith('0')) display.textContent = '';
        display.textContent += item.textContent;
        numbers[n].push(parseInt(item.id));
    })
});

Array.from(operatorButtons).forEach(item => {
    item.addEventListener('click', () => {
        if (display.textContent.startsWith('0')) {
            return false;
        }
        display.textContent += item.textContent;
        operators.push(item.id);
        n++;
    })
})

clear.addEventListener('click', () => {
    display.textContent = 0;
    result = 0;
    result1 = 0;
    result2 = 0;
    numbers = [];
    for (let i = 0; i < 100; i++) {
        numbers[i] = [];
    }
    n = 0;
    operators = [];
})

equal.addEventListener('click', () => {
    handleResult();
    display.textContent = result;
})

function handleResult() {
    for (let i = 0; i < numbers.length; i++) {
        handleValidOperators();
        (i > 0) ? result1 = result : result1 = parseInt(numbers[i].join(''));
        if (numbers[i + 1]) { result2 = parseInt(numbers[i + 1].join('')) }
        else break;
        operator = operators[i];
        switch (operator) {
            case "+": result = result1 + result2; break;
            case "*": result = result1 * result2; break;
            case "/": result = result1 / result2; break;
            case "-": result = result1 - result2; break;
        }

    }
}

function handleValidOperators() {
    numbersValid = numbers.filter(item => item.length);
    if (operators.length >= numbersValid.length) {
        result = "ERROR";
        return false;
    }
}