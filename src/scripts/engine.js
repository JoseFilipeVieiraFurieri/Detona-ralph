// variaveis  views e variaveis values ->views -> alteram elementos visuais do jogador, values -> calculos de fundo e actions -> são variaveis que na hora
// da declaração começa uma ação no codigo ( no caso do exemplo ea countdownTimerID que timinui o current Time)


const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        time: document.querySelector("#time"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives")
    },
    values : {
        timerId: null,
        gameVelocity: 1000,
        currentTime: 60,
        hitPosition: 0,
        result:0,
        lifes: 3,
    },
    actions: {
        countDownTimerID: setInterval(timeCount, 1000),
    }
}



// pega as variaveis dos quadrados pelo doc.query, e a do enemy. Mais os id da score, time e vidas. Isso pra manipular elas

// depois um função pra iniciar o programa e as demais


function timeCount() {
    state.values.currentTime--;
    state.view.time.textContent = state.values.currentTime;
    if (state.view.time.textContent <= 0) {
        clearInterval(state.actions.countDownTimerID);
        clearInterval(state.actions.timerId);
        let audio = playSound('yeah.mp3')
        audio.addEventListener('ended', () => {
            window.location.reload();
        })
        alert(`Gamer Over! Sua pontuação final é ${state.values.result}`);
    }
}

// o values esta guardando o setIntervalId na variavel countdownTimerID e automaticamente esta refletido na variavel view
// O timeCOunt e chamado automaticamente na declaração do countDOwnTimerID e começa a contagem e felete no tempo atual
// vc pode fazer a mesma coisa com o moveEnemy mas vou deixar as duas maneiras pra ficar ilustrativo

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy")
    })

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

// guardando a posição do quadrodo que o inimigo esta em uma variavel(hitposition)

function moveEnemy() {
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}


// não precisa chamar a função dentro do setInterval( ela mesma faz o call)
// como não e bom deixar numeros soltos o tempo da função foi armazenado como gameVelocity


// primeiro a função a remove todos os quadrados com enemy
// depois sorteia um numero aleatorio(randomNUmer) pra colocar a classe enemy em um quadradro(randomSquare) e nesse square adiciona atraves do classList.add() a classe
// enemy

// No entento desse  jeito o inimigo so ira mudar de quadrado se apertar f5. E ai que entra o setTimeout(func, a cada x tempo), que vai chamar a função
// a cada intervalo de tempo e armazena isso no timerId

function playSound(sample) {
    let audio = new Audio(`/src/audio/${sample}`);
    audio.volume = 0.2;
    audio.play();
    return audio;
}

// tive que retornar o audio para manipular ele

// audio ja dinamico


function addListenerHitbox() {
    state.view.squares.forEach((square) => {
        square.addEventListener('mousedown', () => {
            if ( square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound('hit.m4a');
            } else {
                state.values.lifes -= 1
                state.view.lives.textContent = state.values.lifes
                alert('Perdeu uma vida')
                if ( state.view.lives.textContent == 0) {
                    let audio = playSound('sonic.mp3');
                    audio.addEventListener('ended', function() {
                        window.location.reload();
                    });

                    alert('Suas Vidas acabaram!!! Game over');

                }
            };
        })
    })
}

// adicionando para cada quadrado um listener
//em cada listener adicionando um evento de clique se o id do quadrado que o user clicou for igual ao quadrado que esta o inimigo soma no result
// reflete o result no score
// torna a posição incial do hitpoint nulo para evitar que a pessoa fique clicando varias vezes no mesmo

// O widow.position.reload() serve pra quando o timer o timer ou as vidas acabarem ele faça o reload pra o jogo começar do zero


function initialize() {
  moveEnemy();
  addListenerHitbox();
};

initialize();

