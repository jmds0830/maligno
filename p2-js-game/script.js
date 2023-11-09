const player1CardsContainer = document.querySelector('.player1-cards');
const player2CardsContainer = document.querySelector('.player2-cards');
const player1Life = document.querySelector('.player1-LP');
const player2Life = document.querySelector('.player2-LP');
const player1EnergyDisplay = document.querySelector('.player1-energy');
const player2EnergyDisplay = document.querySelector('.player2-energy');
const homeButton = document.querySelector('.home-button');
const restartGameButton = document.querySelector('.restart-game-button');
const endTurnButton = document.querySelector('.end-turn-button');
const homescreen = document.querySelector('.home-screen');
const playerNameInput = document.querySelector('.input-player-name');

let player1LifePoints = 100;
let player2LifePoints = 100;
let player1Energy = 5;
let player2Energy = 5;

const totalCards = 3;

const cardContent = [
    { name: 'Kapre', atk: 18, energy: 5, image: 'resources/kapre.png' },
    { name: 'Engkanto', atk: 15, energy: 4, image: 'resources/engkanto.png' },
    { name: 'Tikbalang', atk: 13, energy: 3, image: 'resources/tikbalang.png' },
    { name: 'Aswang', atk: 10, energy: 3, image: 'resources/aswang.png' },
    { name: 'Sigbin', atk: 7, energy: 2, image: 'resources/sigbin.png' },
    { name: 'Dwende', atk: 5, energy: 2, image: 'resources/dwende.png' },
    { name: 'Tiyanak', atk: 3, energy: 1, image: 'resources/tiyanak.png' },
    { name: 'Trap Card 1', atk: 10, energy: 2, image: 'resources/kulam.png' },
    { name: 'Trap Card 2', atk: -5, energy: 2, image: 'resources/sumpa.png' },
    { name: 'Trap Card 3', atk: 0, energy: 2, image: 'resources/agimat.png' },
];

const back = { image: 'resources/back.png' };
const trap = { image: 'resources/trap.png' };

const introAudio = document.getElementById('intro-audio');
const gameAudio = document.getElementById('game-audio');
const clickAudio = document.getElementById('click-audio');
const cardSelect = document.getElementById('card-select');
const hoverAudio = document.getElementById('hover');
const player1Audio = document.getElementById('player1-audio');
const player2Audio = document.getElementById('player2-audio');
const winAudio = document.getElementById('win-audio')
const winAudio2 = document.getElementById('win-audio2')
const winAudio3 = document.getElementById('win-audio3')
const loseAudio = document.getElementById('lose-audio')
const loseAudio2 = document.getElementById('lose-audio2')
const buttonHover = document.getElementById('button-hover')


const okButton = document.querySelector('.ok-button');

okButton.addEventListener('click', function () {
    clickAudio.play();
    removeOpeningMessage();
});

function removeOpeningMessage() {
    const openingMessage = document.getElementById('opening-message-container');
    setTimeout(() => {
        openingMessage.style.display = 'none';
    }, 500);
    introAudio.play();
    gameAudio.pause();
};

okButton.addEventListener('mouseenter', function () {
    buttonHover.play();
});


playerNameInput.addEventListener('click', function () {
    clickAudio.play();
});


const startGameButton = document.querySelector('.start-button');
const howToPlay = document.querySelector('.how-to-play-button');
const popupWindow = document.querySelector('.popup-window');
const closeButton = document.querySelector('.close-button');

function startGame() {

    const container = document.querySelector('.game-container');
    const homescreen = document.querySelector('.home-screen');
    const playerNameInput = document.querySelector('.input-player-name');
    const player1Name = document.querySelector('.player1-name');

    const playerName = playerNameInput.value;

    introAudio.pause();

    if (playerName) {
        player1Name.textContent = playerName;
    };

    setTimeout(() => {
        container.style.display = 'block';
        homescreen.style.display = 'none';
    }, 500);

    player2CardsContainer.innerHTML = '';
    for (let i = 0; i < totalCards; i++) {
        const card = document.createElement('img');
        card.className = 'player2-card';
        card.src = 'resources/back.png';
        player2CardsContainer.appendChild(card);
    }
    showTurn();
    setTimeout(player1Turn, 500);

    clickAudio.play();
    gameAudio.play();
};

gameAudio.volume = 0.7;

startGameButton.addEventListener('click', startGame);

playerNameInput.addEventListener('click', function () {
    introAudio.play();
});


function showTurn() {

    const turn1 = document.querySelector('.player1-turn');
    const turn2 = document.querySelector('.enemy-turn');

    if (currentPlayer === 1) {
        turn1.style.display = 'block';
        turn2.style.display = 'none';
    } else {
        turn2.style.display = 'block';
        turn1.style.display = 'none';
    }
};

howToPlay.addEventListener('click', function () {
    setTimeout(() => {
        popupWindow.style.display = 'block';
    }, 300);
    clickAudio.play();

});

closeButton.addEventListener('click', function () {
    setTimeout(() => {
        popupWindow.style.display = 'none';
    }, 300);
    clickAudio.play();
});


function assignRandomCardsToPlayer(cardsContainer, player) {
    cardsContainer.innerHTML = '';
    for (let i = 0; i < totalCards; i++) {
        const card = createRandomCard(player);
        cardsContainer.appendChild(card);
    }
}

let currentPlayer = 1;

function createRandomCard(player) {

    const card = document.createElement('img');
    card.className = `player${player}-card`;

    const randomIndex = Math.floor(Math.random() * cardContent.length);
    const cardData = cardContent[randomIndex];

    card.src = cardData.image;
    card.textContent = `${cardData.name} (ATK: ${cardData.atk}, Energy: ${cardData.energy})`;

    card.used = false;

    if (cardData.name.startsWith('Trap Card')) {

        card.src = trap.image;
        card.textContent = `${cardData.name} (ATK: ${cardData.atk}, Energy: ${cardData.energy})`;

        if (currentPlayer === 2) {
            card.src = cardData.image;
        } else {

            card.addEventListener('click', function () {
                if (!card.used) {
                    card.src = cardData.image;
                    card.textContent = `${cardData.name} (ATK: ${cardData.atk}, Energy: ${cardData.energy})`;

                    if (player === 1 && player1Energy >= cardData.energy) {
                        useCard(cardData.atk, player);
                        if (player === 1) {
                            player1Energy -= cardData.energy;
                            updateEnergyDisplay(player1EnergyDisplay, player1Energy);
                        }
                        cardSelect.play();
                        card.classList.add('contrast');
                        card.used = true;
                    }
                }
            });
        }

    } else {
        card.src = cardData.image;
        card.textContent = `${cardData.name} (ATK: ${cardData.atk}, Energy: ${cardData.energy})`;

        card.addEventListener('click', function () {
            if (currentPlayer === player) {
                if ((player === 1 && player1Energy >= cardData.energy) || (player === 2 && player2Energy >= cardData.energy)) {
                    if (!card.used) {
                        useCard(cardData.atk, player);
                        if (player === 1) {
                            player1Energy -= cardData.energy;
                            updateEnergyDisplay(player1EnergyDisplay, player1Energy);
                        } else {
                            player2Energy -= cardData.energy;
                            updateEnergyDisplay(player2EnergyDisplay, player2Energy);
                        }
                        cardSelect.play();
                        card.classList.add('contrast');
                        card.used = true;
                    }
                }
            }
        });
    }

    card.addEventListener('mouseenter', function () {
        if (currentPlayer === 1) {
            hoverAudio.currentTime = 0;
            hoverAudio.play();
            hoverAudio.volume = 0.5;
            gameAudio.play();
        }
    });

    return card;
}


function useCard(atk, player) {

    if (player === 1) {
        if (atk > 0) {
            player2LifePoints -= atk;
            player2Life.textContent = player2LifePoints;
        } else if (atk < 0) {
            player1LifePoints += atk;
            player1Life.textContent = player1LifePoints;
        } else if (atk === 0) {
            player1LifePoints += 5;
            player1Life.textContent = player1LifePoints;
        }
        updatePlayer1LifeBar();
        updatePlayer2LifeBar();
    } else if (player === 2) {
        if (atk > 0) {
            player1LifePoints -= atk;
            player1Life.textContent = player1LifePoints;
        } else if (atk < 0) {
            player2LifePoints += atk;
            player2Life.textContent = player2LifePoints;
        } else if (atk === 0) {
            player2LifePoints += 5;
            player2Life.textContent = player2LifePoints;
        }
        updatePlayer2LifeBar();
        updatePlayer1LifeBar();
    }
    checkGameOver();
}

function checkGameOver() {

    if (player1LifePoints <= 0) {
        player1LifePoints = 0;
        player1Life.textContent = player1LifePoints;
        updatePlayer1LifeBar();
        setTimeout(() => {
            showModal2();
        }, 1000);

    } else if (player2LifePoints <= 0) {
        player2LifePoints = 0;
        player2Life.textContent = player2LifePoints;
        updatePlayer2LifeBar();
        setTimeout(() => {
            showModal1();
        }, 1000);
    }
}


function showModal1() {
    const modal1 = document.getElementById('modal1');
    modal1.classList.remove('hide1');
    winAudio.play();
    winAudio2.play();
    winAudio3.play();
}
function hideModal1() {
    const modal1 = document.getElementById('modal1');
    modal1.classList.add('hide1');
}

function showModal2() {
    const modal2 = document.getElementById('modal2');
    modal2.classList.remove('hide2');
    loseAudio.play();
    loseAudio2.play();
}
function hideModal2() {
    const modal2 = document.getElementById('modal2');
    modal2.classList.add('hide2');
}


const restartGameButton1 = document.querySelector('#modal1 .modal-restart-button');
const restartGameButton2 = document.querySelector('#modal2 .modal-restart-button');

restartGameButton1.addEventListener('click', function () {
    clickAudio.play()
    const modal1 = document.getElementById('modal1');
    setTimeout(() => {
        modal1.classList.add('hide1');
        restartGame();
    }, 500);
    gameAudio.currentTime = 0;
});

restartGameButton2.addEventListener('click', function () {
    clickAudio.play()
    const modal2 = document.getElementById('modal2');
    setTimeout(() => {
        modal2.classList.add('hide2');
        restartGame();
    }, 500);
    gameAudio.currentTime = 0;
});


function updatePlayer1LifeBar() {
    const player1LifeBar = document.querySelector('.player1-life-bar');
    player1LifeBar.value = player1LifePoints;
}

function updatePlayer2LifeBar() {
    const player2LifeBar = document.querySelector('.player2-life-bar');
    player2LifeBar.value = player2LifePoints;
}

function updateEnergyDisplay(energyDisplay, energy) {
    energyDisplay.textContent = energy;
}


function player1Turn() {
    currentPlayer = 1;
    player1Audio.play();
    assignRandomCardsToPlayer(player1CardsContainer, 1);
    endTurnButton.disabled = false;
    player1Energy = 5;
    updateEnergyDisplay(player1EnergyDisplay, player1Energy);
    showTurn();
}

function player2Turn() {
    currentPlayer = 2;
    endTurnButton.disabled = true;
    player2Audio.play();
    assignRandomCardsToPlayer(player2CardsContainer, 2);
    player2Energy = 5;
    updateEnergyDisplay(player2EnergyDisplay, player2Energy);
    setTimeout(startPlayer2Attack, 2000);
}


function startPlayer2Attack() {
    if (currentPlayer === 2) {
        const player2Cards = Array.from(player2CardsContainer.querySelectorAll('.player2-card'));
        let remainingEnergy = player2Energy;

        while (remainingEnergy > 0 && player2Cards.length > 0) {
            const randomIndex = Math.floor(Math.random() * player2Cards.length);
            const card = player2Cards[randomIndex];
            const cardData = card.textContent.match(/ATK: (-?\d+), Energy: (\d+)/);

            if (cardData) {
                const atk = parseInt(cardData[1]);
                const energyCost = parseInt(cardData[2]);

                if (energyCost <= remainingEnergy) {
                    useCard(atk, 2);
                    card.classList.add('contrast');
                    remainingEnergy -= energyCost;
                }

                player2Cards.splice(randomIndex, 1);
            }
        }
        cardSelect.play();
        updateEnergyDisplay(player2EnergyDisplay, player2Energy - remainingEnergy);
        setTimeout(player1Turn, 1000);
    }
}


endTurnButton.addEventListener('click', () => {
    clickAudio.play()
    if (currentPlayer === 1) {
        setTimeout(player2Turn, 500);
        setTimeout(showTurn, 500);
    }
    endTurnButton.disabled = true;
});

function restartGame() {
    player1LifePoints = 100;
    player2LifePoints = 100;
    player1Life.textContent = player1LifePoints;
    player2Life.textContent = player2LifePoints;
    updatePlayer1LifeBar();
    updatePlayer2LifeBar();

    player1Energy = 5;
    player2Energy = 5;
    updateEnergyDisplay(player1EnergyDisplay, player1Energy);
    updateEnergyDisplay(player2EnergyDisplay, player2Energy);

    player2CardsContainer.innerHTML = '';
    for (let i = 0; i < totalCards; i++) {
        const card = document.createElement('img');
        card.className = 'player2-card';
        card.src = 'resources/back.png';
        player2CardsContainer.appendChild(card);
    }

    setTimeout(player1Turn, 500);
}

restartGameButton.addEventListener('click', function () {
    clickAudio.play()
    restartGame();
});

homeButton.addEventListener('click', goToHome);

function goToHome() {
    clickAudio.play()
    setTimeout(() => {
        location.reload();
    }, 200);
};

startGameButton.addEventListener("mouseenter", function () {
    buttonHover.currentTime = 0;
    buttonHover.play();
});

howToPlay.addEventListener("mouseenter", function () {
    buttonHover.currentTime = 0;
    buttonHover.play();
});

closeButton.addEventListener("mouseenter", function () {
    buttonHover.currentTime = 0;
    buttonHover.play();
});

homeButton.addEventListener("mouseenter", function () {
    buttonHover.currentTime = 0;
    buttonHover.play();
});

restartGameButton.addEventListener("mouseenter", function () {
    buttonHover.currentTime = 0;
    buttonHover.play();
});

endTurnButton.addEventListener("mouseenter", function () {
    buttonHover.currentTime = 0;
    buttonHover.play();
});

restartGameButton1.addEventListener("mouseenter", function () {
    buttonHover.currentTime = 0;
    buttonHover.play();
});

restartGameButton2.addEventListener("mouseenter", function () {
    buttonHover.currentTime = 0;
    buttonHover.play();
});