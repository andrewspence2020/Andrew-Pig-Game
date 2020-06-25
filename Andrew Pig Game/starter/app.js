/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

Creater Andrew Spence

*/

var scores,roundScore, activePlayer, gamePlaying, dice1, dice2;

init();


 document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
      //1. Random number
      dice1 = Math.floor(Math.random() * 6) + 1;
      dice2 = Math.floor(Math.random() * 6) + 1;

      thisRoll1 = dice1;
      thisRoll2 = dice2;

     //2. Display the result
     document.getElementById('dice-1').style.display = 'block';
     document.getElementById('dice-2').style.display = 'block';
     document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
     document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
    
 
 
     //3. Update the round score IF the rolled number was NOT a 1 
 
     if(dice1 !== 1 && dice2 !==1) {
        //Add score
        roundScore += dice1 + dice2;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
 
     }else {
        //Next Player
        nextPlayer();
     }
      //Checks to see if a player rolled a six
      if(dice1 == 6 && dice2 == 6){
         lastRoll1 = 6;
         lastRoll2 = 6;
         count += 1;
      }else{
        lastRoll1 = 0;
        lastRoll2 = 0;
         count = 0;
      }
      
     if(thisRoll1 === 6 && thisRoll2 === 6 || lastRoll1 === 6 && lastRoll2 === 6 && count === 2){
         findingWhoRolledDoubleSixs();
         document.querySelector('#score-' + activePlayer).textContent = '0';
         nextPlayer();
         //do your stuff for 2 sixes in a row
         return;
      }

    }


 });


 document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
           // Add CURRENT score to  GLOBAL score
    scores[activePlayer] += roundScore;


    // Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    var input = document.querySelector('.final-score').value;
    var winningScore;
    
    // Undefined, 0, null or "" are Coerced to false
    //Anything else is coerced to true
    if(input){
        winningScore = input;

    }else{
        winningScore = 100;
    }


    // Check if player won the game   
    if (scores[activePlayer] >= winningScore){      
       document.querySelector('#name-' + activePlayer ).textContent = 'Winner!';
       document.getElementById('dice-1').style.display = 'none';
       document.getElementById('dice-2').style.display = 'none';
       document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
       document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');
       gamePlaying = false;

    }else {
      //Next player
      nextPlayer();
    }
       
}

 });
//Checks if the player rolls double sixes
 function findingWhoRolledDoubleSixs(){
   if(activePlayer === 0){
      alert('You Rolled Double Sixes Player 1'+ "\n" + "Sorry but your score resets");
   }else if(activePlayer){
      alert('You Rolled Double Sixes Player 2' + "\n" + "Sorry but your score resets");
   }
}

 function nextPlayer(){
           //Next player
           activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
           roundScore = 0;
    
           document.getElementById('current-0').textContent = '0';
           document.getElementById('current-1').textContent = '0';
    
    
           document.querySelector('.player-0-panel').classList.toggle('active');
           document.querySelector('.player-1-panel').classList.toggle('active');
    
    
          // document.querySelector('.player-0-panel').classList.remove('active');
           //document.querySelector('.player-1-panel').classList.add('active');
           document.getElementById('dice-1').style.display = 'none';
           document.getElementById('dice-2').style.display = 'none';
 }

 document.querySelector('.btn-new').addEventListener('click', init);

   




 function init() {
   scores = [0,0];
   roundScore = 0;
   activePlayer = 0;
   gamePlaying = true;

   document.getElementById('dice-1').style.display = 'none';
   document.getElementById('dice-2').style.display = 'none';

   document.getElementById('score-0').textContent = '0';
   document.getElementById('score-1').textContent = '0';
   document.getElementById('current-0').textContent = '0';
   document.getElementById('current-1').textContent = '0';
   document.getElementById('name-0').textContent = 'Player 1';
   document.getElementById('name-1').textContent = 'Player 2';
   document.querySelector('.player-0-panel').classList.remove('winner');
   document.querySelector('.player-1-panel').classList.remove('winner');
   document.querySelector('.player-0-panel').classList.remove('active');
   document.querySelector('.player-1-panel').classList.remove('active');
   document.querySelector('.player-0-panel').classList.add('active');
 }
 function functionAlert(msg, myYes) {
    var confirmBox = $("#confirm");
    confirmBox.find(".message").text(msg);
    confirmBox.find(".yes").unbind().click(function() {
       confirmBox.hide();
    });
    confirmBox.find(".yes").click(myYes);
    confirmBox.show();
 }


 



