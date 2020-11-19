
// UI ELEMENTS
const status = document.getElementById('status');
const upNext = document.getElementById('up-next');
const canvas = document.getElementById('canvas').getContext('2d');
const bullets = document.getElementById('bullets');
const settingsToggle = document.getElementById('settings-switch');
const settings = document.getElementById('settings');

let spinner_colors = ['rgb(59, 89, 139)', 'rgb(59, 139, 99)', 'rgb(182, 94, 83)'];

// audio clips
const backToWorkAlarm = document.getElementById('back-to-work-alarm');
const breakAlarm = document.getElementById('break-alarm');
    
// buttons
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset'); 
const resetSettingsButton = document.getElementById('reset-settings');
    
// settings
const setFocus = document.getElementById('focus');
const setShortBreak = document.getElementById('short-break');
const setLongBreak = document.getElementById('long-break');
const setTotalPomodoros = document.getElementById('total-pomodoros');
const setLongBreakGoal = document.getElementById('pomodoro-goal');

// GLOBAL VARIABLES
let pomodoros = 0;
let timerValues = [setFocus.value*60, setShortBreak.value*60, setLongBreak.value*60];
let currentTimer = 0;
let currentTime = timerValues[currentTimer];
let pomodoroInProgress = false;
let timeRunning = false;

// FUNCTIONS
function signalClick () { this.classList.add ('clicked'); setTimeout(() => this.classList.remove('clicked'), 100); }

const toggleSettings = () => 
    settings.style.display == 'none' ? 
    settings.style.display = 'block' 
    : settings.style.display = 'none';

const secToTimer = seconds => `${parseInt(seconds/60)}:${parseInt(seconds%60)}`
    .replace(/^(\d{1}):(\d+)$/, '0$1:$2')
    .replace(/^(\d{2}):(\d{1})$/, '$1:0$2');

function generateBullets() {
    bullets.innerHTML = '';
    for (let i=0; i<setTotalPomodoros.value; i++) {
            let span = document.createElement('span');
            i < pomodoros ? span.innerText = '\u2022 ' : span.innerText = '\u25e6 ';
            if ((i+1)%setLongBreakGoal.value == 0 && i+1 < setTotalPomodoros.value) { 
                span.innerHTML += '<span style="color: white;"> | </span>'; 
            }
            if (pomodoroInProgress && i == pomodoros) { span.classList.add('highlighted'); }
            bullets.append(span);
        }
    }

function redraw() {
    canvas.clearRect(0, 0, 250, 250);
    // full circle
    canvas.beginPath();
    canvas.arc(125, 125, 100, 0, (2*Math.PI));
    canvas.strokeStyle = 'black';
    canvas.lineWidth = '10';
    canvas.stroke();
    // timer text
    canvas.font = '4em sans-serif';
    canvas.strokeStyle = 'white';
    canvas.lineWidth = '1'; 
    canvas.strokeText(secToTimer(currentTime), 50, 150, 200);
    // loading circle
    canvas.beginPath();
    canvas.arc(125, 125, 100, 1.5*Math.PI, (3.5-(2/timerValues[currentTimer])*currentTime)*Math.PI);
    canvas.strokeStyle = spinner_colors[currentTimer];
    canvas.lineWidth = '10';
    canvas.stroke();
}

function countDown() {
    let interval = setInterval(() => {
        currentTime--;  
        redraw();    
        if (currentTime == 0) { 
            clearInterval(interval);
            switchTimer(); 
        } else if (!timeRunning) { clearInterval(interval); }
    }, 1000);
}

function switchTimer() {
    if (currentTimer == 0) { // a pomodoro just finished
            breakAlarm.play();
            pomodoros++;
            pomodoroInProgress = false;
            pomodoros%setLongBreakGoal.value == 0 ? currentTimer = 2 : currentTimer = 1;
            status.innerText = `${timerValues[currentTimer]/60} minute break in progress`;
            upNext.innerText = `up next: ${setTotalPomodoros.value-pomodoros} more pomodoros to go`;
            if (setTotalPomodoros.value-pomodoros == 1) { upNext.innerText = 'up next: 1 more pomodoro to go'; }
    } else { // a break just finished
        backToWorkAlarm.play();
        pomodoroInProgress = true;
        currentTimer = 0;
        status.innerText = `pomodoro # ${pomodoros+1} of ${setTotalPomodoros.value} in progress`;
        (pomodoros+1)%setLongBreakGoal.value == 0 ? 
            upNext.innerText = `up next: ${timerValues[2]/60} minute break` 
            : upNext.innerText = `up next: ${timerValues[1]/60} minute break`;
        if (pomodoros+1 == setTotalPomodoros.value) { upNext.innerText = `up next: freedom!`; }
    }
    currentTime = timerValues[currentTimer];
    generateBullets();
    if (pomodoros == setTotalPomodoros.value) {
        status.innerText = `${setTotalPomodoros.value} of ${setTotalPomodoros.value} pomodoros completed`;
        upNext.innerText = `Congratulations! Go have some fun!`;
        pauseButton.style.display = 'none';
    } else {
        redraw(); countDown();
    }
}

function start() {
    timeRunning = true;
    startButton.style.display = 'none';
    pauseButton.style.display = 'inline-block';
    resetButton.style.display = 'inline-block';
    pomodoroInProgress = true;
    status.innerText = `Pomodoro # ${pomodoros+1} of ${setTotalPomodoros.value} in progress`; 
    (pomodoros+1)%setLongBreakGoal.value == 0 ? 
        upNext.innerText = `Up next: ${setLongBreak.value} minute break` 
        : upNext.innerText = `Up next: ${setShortBreak.value} minute break`;
    if (pomodoros+1 == setTotalPomodoros.value) { upNext.innerText = `up next: freedom!`; }
    generateBullets();
    countDown();
}

function pause() {
    timeRunning = !timeRunning;
    !timeRunning ? currentTime++ : true ;
    if (!timeRunning) {
        pomodoroInProgress ? 
            status.innerText = `pomodoro # ${pomodoros+1} of ${setTotalPomodoros.value} paused` :
            status.innerText = `${timerValues[currentTimer]/60} minute break paused`;
    } else {
        pomodoroInProgress ?
            status.innerText = `pomodoro # ${pomodoros+1} of ${setTotalPomodoros.value} in progress`
            : status.innerText = `${timerValues[currentTimer]/60} minute break in progress`;
        countDown();
    }
    pauseButton.value == 'pause' ? pauseButton.value = 'resume' : pauseButton.value = 'pause';
}

function reset() {
    if (window.confirm("Are you sure you want to do this? All progress will be lost!")) {
        timeRunning = false; pomodoroInProgress = false;
        currentTimer = 0;
        currentTime = timerValues[0]+1;
        startButton.style.display = 'block';
        resetButton.style.display = 'none';
        pauseButton.style.display = 'none';
        pauseButton.value = 'pause'; 
        pomodoros = 0; 
        status.innerText = `no pomodoros completed today`;
        resetTitles();
        redraw();
    }
}

function resetTitles() {
    startButton.value = `start pomodoro # ${pomodoros+1} of ${setTotalPomodoros.value}`;
    if (pomodoroInProgress) {
        timeRunning ? status.innerText = `pomodoro # ${pomodoros+1} of ${setTotalPomodoros.value} in progress` 
            : status.innerText = `pomodoro # ${pomodoros+1} of ${setTotalPomodoros.value} paused`;
    } else { 
        upNext.innerText = `Up Next: ${setTotalPomodoros.value - pomodoros} pomodoros to go`;
    }
    generateBullets();
}

function resetTimers() {
    timerValues = [setFocus.value*60, setShortBreak.value*60, setLongBreak.value*60];
    currentTime = timerValues[currentTimer];
    if (pomodoroInProgress) {
        pomodoros%setLongBreakGoal.value == 0 ? 
            upNext.innerText = `up next: ${timerValues[1]/60} minute break` 
            : upNext.innerText = `up next: ${timerValues[2]/60} minute break`;
    } else {
        if (startButton.style.display == 'none') {
            pomodoros%setLongBreakGoal.value == 0 ? 
            status.innerText = `${timerValues[2]/60} minute break in progress` 
            : status.innerText = `${timerValues[1]/60} minute break in progress`;
        }    
    }
    redraw();
}

function resetSettings() {
    if (window.confirm("Are you sure you want to do this? Alongside the custom values you've set, all progress will be lost!")) {
        setFocus.value = 25;
        setShortBreak.value = 5;
        setLongBreak.value = 30;
        setTotalPomodoros.value = 8;
        setLongBreakGoal.value = 4;
        redraw();
    }
}
 
// EVENT LISTENERS
settingsToggle.addEventListener('click', toggleSettings);
resetSettingsButton.addEventListener('click', resetSettings);
startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
for (let button of document.querySelectorAll('input[type="button"]')) { button.addEventListener('click', signalClick); }
for (let select of document.querySelectorAll('.goal')) { select.addEventListener('mouseout', resetTitles); }
for (let select of document.querySelectorAll('.duration')) { select.addEventListener('mouseout', resetTimers); }

redraw();
generateBullets();
