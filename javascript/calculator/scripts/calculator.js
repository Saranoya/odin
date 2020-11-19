// GLOBAL VARIABLES
let numString = '', cTotal;

// CONSTANTS
const numStringDisplay = document.getElementById('numstring');
const result = document.getElementById('result');
const screenWidth = 22;
const isOp = /[\+\-\*\/]/;

// UI FUNCTIONS 
function signalClick() { this.classList.add('noshadow'); setTimeout(() => this.classList.remove('noshadow'), 100); }
const updateSolution = () => { if (cTotal != undefined) { result.innerText = cTotal.toString().slice(0,screenWidth/2); } }
const updateNumStringDisplay = () => numStringDisplay.innerText = numString.slice(0, screenWidth);

// CALCULATOR FUNCTIONS
const clear = () => { cTotal = 0; numString = ''; updateSolution(); updateNumStringDisplay(); }
function del() { numString = numString.slice(0,-1); updateNumStringDisplay(); }
function handleNumber() { numString += this.value; updateNumStringDisplay(); } 

const getOperator = () => numString.replace(/\-?[0-9\.]*([\+\-\*\/]?)\-?[0-9\.]*/g, '$1');

function getCurrentNumber() {
    let numbers = numString.split(isOp); 
    for (let i = 0; i < numbers.length-1; i++) {
        if (numbers[i] == '') { numbers[i+1] = '-' + numbers[i+1]; } 
    } return numbers[numbers.length-1]; 
}

function handleOperator() { 
    if (!isOp.test(numString[numString.length-1])) { 
        if (numString == '') { numString = '0'; } 
        !isOp.test(numString.slice(1,numString.length)) ? cTotal = parseFloat(numString) : operate();
        if (numString.includes('FAIL')) { numString = ''; setTimeout(clear, 1000); } 
        if (this.value != '=' && !cTotal.toString().includes('FAIL')) { numString += this.value; }
        updateSolution(); updateNumStringDisplay();
    }
}

function operate() {
    let operator = getOperator(), cNum = parseFloat(getCurrentNumber());
    operator == '+' ? cTotal += cNum
        : operator == '-' ? cTotal -= cNum
        : operator == '*' ? cTotal *= cNum
        : operator == '/' && cNum != 0 ? cTotal /= cNum 
        : cTotal = 'FAIL )\':';
    numString = cTotal.toString(); 
}

function handleMinus() {
    let cNum = getCurrentNumber(), operator = getOperator();
    if (cTotal !== undefined && cNum == cTotal.toString()) cNum = '';  
    cNum = cNum == '' ? '-' : cNum[0] == '-' ? cNum.slice(1,cNum.length) : '-' + cNum;
    numString = cTotal == undefined || cTotal == 0 ? cNum + operator : cTotal.toString() + operator + cNum;
    numString = numString.replace(/\+\-/, '-'); // +- = - 
    numString = numString.replace(/\-\-/, '+'); // -- = +
    updateNumStringDisplay();
}

function handleDecimal() {
    let cNum = getCurrentNumber();
    if (!cNum.includes('.')) {
        cNum == '' ? numString += '0.' : numString += '.';
    } updateNumStringDisplay();
}

// EVENT LISTENERS
for (let button of document.getElementById('buttons').childNodes) { button.addEventListener('click', signalClick); }
for (let button of document.querySelectorAll('.number')) { button.addEventListener('click', handleNumber); }
for (let button of document.querySelectorAll('.operator')) { button.addEventListener('click', handleOperator); }
document.getElementById('plusminus').addEventListener('click', handleMinus);
document.getElementById('decimal').addEventListener('click', handleDecimal);
document.getElementById('clear').addEventListener('click', clear);
document.getElementById('del').addEventListener('click', del);
