let message = 'Begin the game by picking your move from the images below.';
let round = 0, pWins = 0, cWins = 0;
const options = [
    '<img src = "./images/rps_paper.png"/>', 
    '<img src = "./images/rps_scissors.png"/>', 
    '<img src = "./images/rps_rock.png"/>' ];
const getText = string => string.replace(/.+\/rps_([a-z]+)\..+/, '$1');

function populateFields() {
    document.getElementById('round').textContent = round.toString();
    document.getElementById('playerWins').textContent = pWins.toString();
    document.getElementById('computerwins').textContent = cWins.toString();
    document.getElementById('message').textContent = message;
}

function displayChoices(pChoice, cChoice) {
    message = `You picked ${getText(options[pChoice])}. Computer picked ${getText(options[cChoice])}. `;
    const tBody = document.querySelector('tbody'), row = document.createElement('tr');
    for (i = 0; i < 2; i++) {
        const move = document.createElement('td');
        i%2 == 0 ? move.innerHTML = options[pChoice] : move.innerHTML = options[cChoice];
        row.appendChild(move);
    } tBody.appendChild(row);
}

function playRound() {
    let pChoice = parseInt(this.getAttribute('data-value')), cChoice = Math.floor(Math.random()*3);
    displayChoices(pChoice, cChoice);
    pChoice > cChoice || pChoice == 0 && cChoice == 2 ? message += 'You win this round. '
        : cChoice > pChoice || cChoice == 0 && pChoice == 2 ? message += 'Computer wins this round. ' 
        : message += 'Draw! ';
    message.includes('You win ') ? pWins++ : message.includes('Computer wins ') ? cWins++ : true; 
    if (pWins == 5 || cWins == 5) {
        cWins > pWins ? message += 'Computer wins the game.' : message += 'You win the game.'
        for (button of document.querySelectorAll('.button')) { button.removeEventListener('click', playRound); }
        document.querySelector('#reset').innerText = 'PLAY AGAIN?';
    }
    round++; 
    populateFields();
}

for (let button of document.querySelectorAll('.button')) { button.addEventListener('click', playRound); }
populateFields();