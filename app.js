/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


//document.querySelector('#current-'+ activePlayer).textContent = dice;

//let x = document.querySelector('#score-0').textContent;
//console.log(x);
//set initial values  to zero


//document.querySelector('btn-roll').addEventListener('click', btn); //btn is a callback function here cus event listener calls the function for us.
//can also use an anonymous function so nobody can access it 
let scores, roundScore, activePlayer, gamePlaying;
let diceOld;
let finalScore;
init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {

        //random number with scope limited to the anonymous function
        let dice = Math.floor((Math.random()) * 6) + 1;

        //display the result
        let diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        //update thr round score if dice is not 1
        if (diceOld === 6 && dice === 6){
            scores[activePlayer]=0;
            document.getElementById('score-'+activePlayer).textContent  = '0';
            nextPlayer();
        }
        else if (dice !== 1 ) {
            //add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //next palyer
            nextPlayer();

        }
        diceOld = dice; 
    }


});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {

        //add current score to global
        scores[activePlayer] += roundScore;

        //UI update
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //get final score
       // let finalScore = document.querySelector('.final-score').value;

        //check if player has won
        if (scores[activePlayer] >= finalScore) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }

});

//changing player turns
function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    //reset current scores to zero
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';

}

document.querySelector('.btn-new').addEventListener('click', init); //call back function init

//things that happen when the game is started!
function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    diceOld = 0;
    finalScore = document.querySelector('.final-score').value;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
}

/*
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/