const memory_game = document.querySelector('.memory-game');
const imgArray = ['./assets/bobrossparrot.gif', './assets/explodyparrot.gif',
                 './assets/fiestaparrot.gif', './assets/metalparrot.gif', 
                 './assets/revertitparrot.gif', './assets/tripletsparrot.gif', 
                 './assets/unicornparrot.gif'];

function start(){
    const numberCards = prompt('Com quantas cartas gostaria de jogar?');
    const cardsBoard = [];
    memory_game.innerHTML = '';
    if(numberCards % 2 === 0 && numberCards >= 4 && numberCards <= 14){
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
    else {
        alert('Escolha um número de cartas correto!');
    }
}

start();

const cards = document.querySelectorAll('.card');

function flipCard(){
    this.classList.toggle('flip');
}

function randomize(){
    return Math.random() - 0.5;
}

cards.forEach(card => card.addEventListener('click', flipCard));