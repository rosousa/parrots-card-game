const memory_game = document.querySelector('.memory-game');
const imgArray = ['./assets/bobrossparrot.gif', './assets/explodyparrot.gif',
                 './assets/fiestaparrot.gif', './assets/metalparrot.gif', 
                 './assets/revertitparrot.gif', './assets/tripletsparrot.gif', 
                 './assets/unicornparrot.gif'];
let numberCards;
let numberMatchs;
let timerReset;
let restart;
let hasFlipped = false;
let lockMove = false;
let firstCard, secondCard;
let moves = 0;
let minutes = 0;
let seconds = 0;

function start(){
    const cardsBoard = [];
    moves = 0;
    memory_game.innerHTML = '';
    while(true){
        numberCards = prompt('Digite o número de cartas');
        
        if(numberCards % 2 === 0 && numberCards >= 4 && numberCards <= 14){
            break;
        } else {
            alert('Digite um número par entre 4 e 14!');
        }
    }
    numberMatchs = numberCards / 2;
    for(let i = 0; i < numberCards / 2; i++){
        cardsBoard.push(imgArray[i]);
        cardsBoard.push(imgArray[i]);
    }

    cardsBoard.sort(randomize);

    for(let i = 0; i < numberCards; i++){
        memory_game.innerHTML += `<div class="card">
                                    <img class="front-face" src="./assets/front.png" alt="front-face">
                                    <img class="back-face" src="${cardsBoard[i]}" alt="back-face">
                                    </div>`;
    }
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.addEventListener('click', flipCard));
    timerReset = setInterval(timer, 1000);
}

setTimeout(start, 500);

function flipCard(){
    if(lockMove){
        return;
    }
    if(this === firstCard){
        return;
    }
    this.classList.add('flip');
    if(!hasFlipped){
        hasFlipped = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    hasFlipped = false;
    checkForMatch();
}

function randomize(){
    return Math.random() - 0.5;
}

function checkForMatch(){
    if(firstCard.innerHTML === secondCard.innerHTML){
        countMoves();
        disableCards();
        checkForRestart();
        return;
    }
    countMoves();
    unflipCards();
}

function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetMoves();
}

function unflipCards(){
    lockMove = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetMoves();
    }, 1000);
}

function resetMoves(){
    hasFlipped = false;
    lockMove = false;
    firstCard = '';
    secondCard = '';
}

function countMoves(){
    moves++;
}

function checkForRestart(){
    numberMatchs--;
    if(numberMatchs === 0){
        setTimeout(() => {
            if(minutes > 0){
                alert(`Você ganhou em ${2 * moves} jogadas! E em ${minutes} minutos e ${seconds} segundos!`);
            } else {
                alert(`Você ganhou em ${2 * moves} jogadas! E em ${seconds} segundos!`);
            }
            restart = prompt('Gostaria de reiniciar o jogo?').toLowerCase();
            minutes = 0;
            seconds = 0;
            if(restart === 'sim'){
                setTimeout(start, 1000);
            } else if(restart === 'não') {
                alert('Vai jogar mesmo assim 🤗');
                setTimeout(start, 1000);
            } else {
                alert('🥺');
            }
        }, 1000);
        clearInterval(timerReset);
    }
}

function timer(){
    seconds++;
    if(seconds == 60){
        seconds = seconds % 60;
        minutes++;
    }  
    let timing = document.querySelector('.timer');
    timing.innerHTML = `<div class="counter">0${minutes}:${seconds < 10 ? `0` + seconds : seconds}</div>`;
}