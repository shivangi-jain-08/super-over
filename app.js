//strike button
var strike = document.querySelector("#strike");
//reset button
var reset = document.querySelector('#reset');
//score team 1
var scoreTeam1 = document.querySelector('#score-1');
//score team 2
var scoreTeam2 = document.querySelector('#score-2')
//wicket team 1
var wicketTeam1 = document.querySelector('#wicket-1');
//wicket team 2
var wicketTeam2 = document.querySelector('#wicket-2');
//audio variables
var strikeAudio = new Audio("http://bit.ly/so-ball-hit");
var gameOverAudio = new Audio("http://bit.ly/so-crowd-cheer");

//Variables to keep track of game
var team1Score = 0;
var team2Score = 0;
var team1Wicket = 0;
var team2Wicket = 0;
var team1BallsFaced = 0;
var team2BallsFaced = 0;
var turn = 1;

var possibleOutcomes = [0, 1, 2, 3, 4, 5, 6, 'W'];

strike.addEventListener("click", strikeButtonClicked);

function strikeButtonClicked(){
 //audio
    strikeAudio.pause(); //pause the previous playing audio
    strikeAudio.currentTime = 0; //bring to time 0
    strikeAudio.play();

    //choosing random value
    var randomness = Math.random();
    var random1 = randomness * possibleOutcomes.length;
    var randomIndex = Math.floor(random1);
    var randomValue = possibleOutcomes[randomIndex];

    //India Batting
    if(turn==1){
        team1BallsFaced++;
        var ball = document.querySelector(`#team1-balls div:nth-child(${team1BallsFaced})`)
        ball.innerHTML = randomValue;

        // if random value is wicket add 1 to wicket variable else add the random value to scare of team 1
        if(randomValue=='W'){
            team1Wicket++;
        }else{
            team1Score += randomValue;
        }

        if(team1BallsFaced==6 || team1Wicket==2){
            turn = 2;
        }
    }

    // PAK Batting
    if(turn==2){
        team2BallsFaced++;
        var ball = document.querySelector(`#team2-balls div:nth-child(${team2BallsFaced})`)
        ball.innerHTML = randomValue;

        // if random value is wicket add 1 to wicket variable else add the random value to scare of team 2
        if(randomValue=='W'){
            team2Wicket++;
        }else{
            team2Score += randomValue;
        }

        if(team2Score>team1Score || team1Wicket==2 || team2BallsFaced==6){
            turn=3;
            setTimeout(()=>{
                gameOver();
            },10)
        }
        
    }
    updateScore()
}

// Updating the score
    function updateScore(){
        scoreTeam1.innerHTML = team1Score;
        wicketTeam1.innerHTML = team1Wicket;
        scoreTeam2.innerHTML = team2Score;
        wicketTeam2.innerHTML = team2Wicket;
    
    }

// When the game is over, deciding the winner
    function gameOver(){
        gameOverAudio.play();
        if(team1Score>team2Score){
            alert("INDIA WINS");
        }else if(team1Score<team2Score){
            alert("PAK WINS");
        }else{
            alert("It's a Tie")
        }

        document.querySelectorAll(".circle").forEach(empty=>{
            if(empty.innerHTML ==""){
                empty.innerHTML = "x";
                empty.style.backgroundColor = "grey";
            }
        })
    }

// Reset the page when reset button is clicked
    reset.addEventListener("click", resetFunction)
    
    function resetFunction(){
        window.location.reload()
    }
