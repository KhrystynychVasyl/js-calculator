const display = document.querySelector('.display');
const displaySum = document.querySelector('.displaySum');

function repl(abs) {
    abs = abs.replace(/\+\+|\+\-|\-\+|\-\-/g, function(c) {
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
    return abs;
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
    if (display.value !== '') {
        displaySum.value = repl(displaySum.value + display.value + e.target.innerText);
        display.value = '';
    }
    else if (eval(display.value) == 0 && /\//.test(displaySum.value.charAt(displaySum.value.length - 1))) {
        divisionByZero();
    }
    else if (display.value === '' && displaySum.value !== '') {
        displaySum.value = displaySum.value.split('').filter((val, ind, arr) => ind < arr.length - 1).join('') + e.target.innerText;
    }

}

const firstCellMem = document.querySelector('.firstCell');
firstCellMem.addEventListener('click', firstCellMemPressed);

function firstCellMemPressed(e) {
    e.preventDefault();
}

const secondCellMem = document.querySelector('.secondCell');
secondCellMem.addEventListener('click', secondCellMemPressed);

function secondCellMemPressed(e) {
    e.preventDefault();
}

const thirdCellMem = document.querySelector('.thirdCell');
thirdCellMem.addEventListener('click', thirdCellMemPressed);

function thirdCellMemPressed(e) {
    e.preventDefault();
}

const fourthCellMem = document.querySelector('.fourthCell');
fourthCellMem.addEventListener('click', fourthCellMemPressed);

function fourthCellMemPressed(e) {
    e.preventDefault();
}

const fifthCellMem = document.querySelector('.fifthCell');
fifthCellMem.addEventListener('click', fifthCellMemPressed);

function fifthCellMemPressed(e) {
    e.preventDefault();
}

const setButton = {
    'firstCell': firstCellMem,
    'secondCell': secondCellMem,
    'thirdCell': thirdCellMem,
    'fourthCell': fourthCellMem,
    'fifthCell': fifthCellMem
};

function setMemValue(num) {
    var memCellCheck = document.querySelector('input[name = "cellNumber"]:checked').value;
    setButton[memCellCheck].innerText = num;
}

function getMemValue() {
    var memCellCheck = document.querySelector('input[name = "cellNumber"]:checked').value;
    return setButton[memCellCheck].innerText;
}

const memSubtract = document.querySelector('.memSubtract');
memSubtract.addEventListener('click', memSubtractPressed);

function memSubtractPressed(e) {
    e.preventDefault();
    if (eval(display.value) == 0 && /\//.test(displaySum.value.charAt(displaySum.value.length - 1))) {
        divisionByZero();
    }
    else if (display.value == '' && displaySum.value !== '') {
        let a = displaySum.value.split('').filter((val, ind, arr) => ind < arr.length - 1).join('');
        getMemValue() == 'Is Empty' ? setMemValue(0 - eval(a)) : setMemValue(getMemValue() - eval(a));
    }
    else if (display.value !== '') {
        let a = displaySum.value + display.value;
        getMemValue() == 'Is Empty' ? setMemValue(0 - eval(a)) : setMemValue(getMemValue() - eval(a));
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
        let a = displaySum.value.split('').filter((val, ind, arr) => ind < arr.length - 1).join('');
        getMemValue() == 'Is Empty' ? setMemValue(0 + eval(a)) : setMemValue(eval(getMemValue()) + eval(a));
    }
    else if (display.value !== '') {
        let a = displaySum.value + display.value;
        getMemValue() == 'Is Empty' ? setMemValue(0 + eval(a)) : setMemValue(eval(getMemValue()) + eval(a));
    }
}

const memSet = document.querySelector('.memSet');
memSet.addEventListener('click', memSetPressed);

function memSetPressed(e) {
    e.preventDefault();
    if (display.value == '' && displaySum.value !== '') {
        let a = displaySum.value.split('').filter((val, ind, arr) => ind < arr.length - 1).join('');
        setMemValue(eval(a));
    }
    else if (display.value !== '') {
        let a = repl(displaySum.value + display.value);
        setMemValue(eval(a));
    }
}

const memDisp = document.querySelector('.memDisp');
memDisp.addEventListener('click', memDispPressed);

function memDispPressed(e) {
    e.preventDefault();
    getMemValue() == 'Is Empty' ? '' : display.value = getMemValue();
}

const memClear = document.querySelector('.memClear');
memClear.addEventListener('click', memClearPressed);

function memClearPressed(e) {
    e.preventDefault();
    setMemValue('Is Empty');
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
    if (display.value !== '' && displaySum.value !== '') {
        displaySum.value = repl(displaySum.value + display.value);
        display.value = eval(displaySum.value);
        displaySum.value = '';
    }
    else if (eval(display.value) == 0 && /\//.test(displaySum.value.charAt(displaySum.value.length - 1))) {
        divisionByZero();
    }
    else if (display.value == '' && displaySum.value !== '') {
        displaySum.value = displaySum.value.split('').filter((val, ind, arr) => ind < arr.length - 1).join('');
        display.value = eval(displaySum.value);
        displaySum.value = '';
    }
}
