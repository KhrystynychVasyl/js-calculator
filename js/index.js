const display = document.querySelector('.display');
const displaySum = document.querySelector('.displaySum');

function repl(value) {
    value = value.replace(/\+\+|\+\-|\-\+|\-\-/g, function(c) {
        switch (c) {
            case "++":
                return "+";
            case "-+":
                return "-";
            case "+-":
                return "-";
            case "--":
                return "+";
        }
    })
    return value;
}

function deleteLastZeros(value) {
    while (value.slice(-1)=='0') value = value.slice(0,-1)
    return value;
}

function divisionByZero() {
    display.value = '';
    display.placeholder = 'division by zero';
    setTimeout(() => display.placeholder = 'enter the number', 1000);
    setTimeout(() => display.placeholder = 0, 2000);
}

const digits = document.querySelectorAll('.digits button');
digits.forEach(btn => btn.addEventListener('click', digitPressed));

function digitPressed(e) {
    e.preventDefault();
    display.value += e.target.innerText;
}

const dotButton = document.querySelector('.dotButton');
dotButton.addEventListener('click', dotButtonPressed);

function dotButtonPressed(e) {
    e.preventDefault();
    if (!/\./.test(display.value)) display.value += e.target.innerText;
}

const zeroButton = document.querySelector('.zeroButton');
zeroButton.addEventListener('click', zeroButtonPressed);

function zeroButtonPressed(e) {
    e.preventDefault();
    if (/0?\./.test(display.value)) display.value += e.target.innerText;
    if (display.value == '') display.value += e.target.innerText;
}

const plusMinus = document.querySelector('.plus-minus');
plusMinus.addEventListener('click', plusMinusPressed);

function plusMinusPressed(e) {
    e.preventDefault();
    if (/\-/.test(display.value.charAt(0))) display.value = display.value.slice(1);
    else if (!/\-/.test(display.value.charAt(0)) && display.value == '') display.value += '-';
    else if (display.value !== '') display.value = '-' + display.value;

}

const opers = document.querySelectorAll('.opers button');
opers.forEach(btn => btn.addEventListener('click', operPressed));

function operPressed(e) {
    e.preventDefault();
    if (eval(display.value) == 0 && /\//.test(displaySum.value.charAt(displaySum.value.length - 1))) {
        divisionByZero();

    }
    else if (display.value !== '') {
        displaySum.value = repl(displaySum.value + display.value + e.target.innerText);
        display.value = '';
    }
    else if (display.value === '' && displaySum.value !== '') {
        displaySum.value = displaySum.value.split('').filter((val, ind, arr) => ind < arr.length - 1).join('') + e.target.innerText;
    }

}

const firstCellMem = document.querySelector('.firstCell');
const secondCellMem = document.querySelector('.secondCell');
const thirdCellMem = document.querySelector('.thirdCell');
const fourthCellMem = document.querySelector('.fourthCell');
const fifthCellMem = document.querySelector('.fifthCell');

const setButton = {
    'firstCell': firstCellMem,
    'secondCell': secondCellMem,
    'thirdCell': thirdCellMem,
    'fourthCell': fourthCellMem,
    'fifthCell': fifthCellMem
};

function setMemValue(num) {
    var memCellCheck = document.querySelector('input[name = "cellNumber"]:checked').value;
    num !== '' ? setButton[memCellCheck].value = eval(num) : setButton[memCellCheck].value = num;
}

function getMemValue() {
    var memCellCheck = document.querySelector('input[name = "cellNumber"]:checked').value;
    return setButton[memCellCheck].value;
}

const memSubtract = document.querySelector('.memSubtract');
memSubtract.addEventListener('click', memSubtractPressed);

function memSubtractPressed(e) {
    e.preventDefault();
    if (eval(display.value) == 0 && /\//.test(displaySum.value.charAt(displaySum.value.length - 1))) {
        divisionByZero();
    }
    else if (display.value == '' && displaySum.value !== '') {
        let displaySumValue = displaySum.value.split('').filter((val, ind, arr) => ind < arr.length - 1).join('');
        getMemValue() == '' ? setMemValue(0 - eval(displaySumValue)) : setMemValue(getMemValue() - eval(displaySumValue));
    }
    else if (display.value !== '') {
        let displaySumValue = displaySum.value + display.value;
        getMemValue() == '' ? setMemValue(0 - eval(displaySumValue)) : setMemValue(getMemValue() - eval(displaySumValue));
    }
}

const memAdd = document.querySelector('.memAdd');
memAdd.addEventListener('click', memAddPressed);

function memAddPressed(e) {
    e.preventDefault();
    if (eval(display.value) == 0 && /\//.test(displaySum.value.charAt(displaySum.value.length - 1))) {
        divisionByZero();
    }
    else if (display.value == '' && displaySum.value !== '') {
        let displaySumValue = displaySum.value.split('').filter((val, ind, arr) => ind < arr.length - 1).join('');
        getMemValue() == '' ? setMemValue(0 + eval(displaySumValue)) : setMemValue(eval(getMemValue()) + eval(displaySumValue));
    }
    else if (display.value !== '') {
        let displaySumValue = displaySum.value + display.value;
        getMemValue() == '' ? setMemValue(0 + eval(displaySumValue)) : setMemValue(eval(getMemValue()) + eval(displaySumValue));
    }
}

const memSet = document.querySelector('.memSet');
memSet.addEventListener('click', memSetPressed);

function memSetPressed(e) {
    e.preventDefault();
    if (display.value == '' && displaySum.value !== '') {
        let displaySumValue = displaySum.value.split('').filter((val, ind, arr) => ind < arr.length - 1).join('');
        setMemValue(eval(displaySumValue));
    }
    else if (display.value !== '') {
        let displaySumValue = repl(displaySum.value + display.value);
        setMemValue(eval(displaySumValue));
    }
}

const memDisp = document.querySelector('.memDisp');
memDisp.addEventListener('click', memDispPressed);

function memDispPressed(e) {
    e.preventDefault();
    getMemValue() == '' ? '' : display.value = getMemValue();
}

const memClear = document.querySelector('.memClear');
memClear.addEventListener('click', memClearPressed);

function memClearPressed(e) {
    e.preventDefault();
    setMemValue('');
}

const dispClear = document.querySelector('.dispClear');
dispClear.addEventListener('click', dispClearPressed);

function dispClearPressed(e) {
    e.preventDefault();
    display.value = '';
    displaySum.value = '';
}

const dispClearLast = document.querySelector('.dispClearLast');
dispClearLast.addEventListener('click', dispClearLastPressed);

function dispClearLastPressed(e) {
    e.preventDefault();
    display.value = '';
}

document.querySelector('.equal').addEventListener('click', equalPressed);

function equalPressed(e) {
    e.preventDefault();
    if (eval(display.value) == 0 && /\//.test(displaySum.value.charAt(displaySum.value.length - 1))) {
        divisionByZero();
    }
    else if (display.value !== '' && displaySum.value !== '') {
        displaySum.value = repl(displaySum.value + display.value);
        display.value = deleteLastZeros(eval(displaySum.value).toFixed(6));
        displaySum.value = '';
    }
    else if (display.value == '' && displaySum.value !== '') {
        displaySum.value = displaySum.value.split('').filter((val, ind, arr) => ind < arr.length - 1).join('');
        display.value = deleteLastZeros(eval(displaySum.value).toFixed(6));
        displaySum.value = '';
    }
}
