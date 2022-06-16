const memory_game = document.querySelector('.memory-game');
const imgArray = ['./assets/bobrossparrot.gif', './assets/explodyparrot.gif',
                 './assets/fiestaparrot.gif', './assets/metalparrot.gif', 
                 './assets/revertitparrot.gif', './assets/tripletsparrot.gif', 
                 './assets/unicornparrot.gif'];
let hasFlipped = false;
let lockMove = false;
let firstCard, secondCard;
let moves = 0;

function start(){
    let numberCards;
    const cardsBoard = [];
    memory_game.innerHTML = '';

    while(true){
        numberCards = prompt('Digite o número de cartas');
        if(numberCards % 2 === 0 && numberCards >= 4 && numberCards <= 14){
            break;
        } else {
            alert('Digite um número par entre 4 e 14!');
        }
    }

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
}

start();

const cards = document.querySelectorAll('.card');

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

cards.forEach(card => card.addEventListener('click', flipCard));

function checkForMatch(){
    if(firstCard.innerHTML === secondCard.innerHTML){
        countMoves();
        disableCards();
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
    console.log(moves);
}