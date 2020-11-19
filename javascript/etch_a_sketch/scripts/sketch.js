// GLOBAL VALUES
const dimension = document.getElementById('dimension');
const modeSwitch = document.getElementById('drawmode');
const warning = document.querySelector('.warning');
const canvas = document.getElementById('canvas');
const hideGrid = document.getElementById('hidegrid');
const clear = document.getElementById('clear');
const color = document.getElementById('color');
const draw = document.getElementById('draw');
const clickToDraw = document.getElementById('clicktodraw');
const shader = document.getElementById('shader');
const rainbow = document.getElementById('rainbow');
const eraser = document.getElementById('eraser');
let mouseDown = false;

// UI FUNCTIONS
function showModeSwitch() { 
    let regex = /Macintosh|Windows|Linux/;
    if (regex.test(navigator.userAgent)) { modeSwitch.style.display = 'block'; }
}
function toggleActive() { document.querySelector('.active').classList.remove('active'); this.classList.add('active'); }
const toggleMouseDown = () => mouseDown = !mouseDown;

// GRID FUNCTIONS
function generateGrid() {
    warning.textContent = '';
    if(dimension.value <= 100) { hideGrid.value = 'Hide grid'; }
    if (dimension.value > 0 && dimension.value <= 250) {
        canvas.innerHTML = '';
        document.documentElement.style.setProperty('--grid-dimension', dimension.value);
        for (i = 0; i < dimension.value * dimension.value; i++) {
            let div = document.createElement('div');
            canvas.appendChild(div);
            div.addEventListener('mouseover', fillSquare);
            div.addEventListener('mouseup', fillSquare);
            div.addEventListener('mouseup', erase);
            div.addEventListener('mousemove', erase);
        }
    } else {
       warning.textContent = 'Pick a value between 2 and 250';
    }
}

function toggleGridVisibility() {
    for (let div of canvas.childNodes) {
        if (dimension.value > 100) {
            div.classList.add('hidden');
        } else {
            div.classList.contains('hidden') ? div.classList.remove('hidden') : div.classList.add('hidden');
        }
    }
    if (dimension.value <= 100) {
        hideGrid.value == 'Hide grid' ? hideGrid.value = 'Show grid' : hideGrid.value = 'Hide grid';
    }
}

function drawGridControls() {
    if (dimension.value <= 100) {
        hideGrid.style.cssText = 'cursor: pointer; opacity: 1'; 
        hideGrid.value = 'Hide grid';
    } else {
        for (let div of canvas.childNodes) { div.classList.add('hidden') }
        hideGrid.style.cssText = 'cursor: not-allowed; opacity: 0.3'; 
        hideGrid.value = 'Grid hidden';
    }
}

// DRAWING FUNCTIONS
const fillSquare = function() {
    if (draw.classList.contains('active')) {
        if (!clickToDraw.checked || clickToDraw.checked && mouseDown) { this.style.backgroundColor = color.value; }
    }
    if (shader.classList.contains('active')) {
        if (!clickToDraw.checked || clickToDraw.checked && mouseDown) {
            if (this.style.backgroundColor == '') { this.style.backgroundColor = color.value; }
            this.style.opacity == '' ? this.style.opacity = 0.1 
                : this.style.opacity = (parseFloat(this.style.opacity)+0.1).toFixed(2);
        } 
    }
    if (rainbow.classList.contains('active')) {
        let r = Math.floor(Math.random()*256);
        let g = Math.floor(Math.random()*256);
        let b = Math.floor(Math.random()*256);
        if (!clickToDraw.checked || clickToDraw.checked && mouseDown) {
            this.style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
        } 
    }
}

const erase = function() {
    if (eraser.classList.contains('active') && mouseDown) {
        this.style.backgroundColor = '';
    } 
}

// EVENTLISTENERS 
canvas.addEventListener('mousedown', toggleMouseDown);
canvas.addEventListener('mouseup', toggleMouseDown);
hidegrid.addEventListener('click', toggleGridVisibility);
dimension.addEventListener('mouseup', generateGrid);
dimension.addEventListener('mouseup', drawGridControls);
dimension.addEventListener('keyup', generateGrid);
dimension.addEventListener('keyup', drawGridControls);
clear.addEventListener('click', generateGrid);
for (let button of document.querySelectorAll('#bottom-controls .greyable')) { button.addEventListener('click', toggleActive); }
