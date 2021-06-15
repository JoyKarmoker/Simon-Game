var buttonColours = ["red", "blue", "green", "yellow"]; //An array of the colors that are present
var gamePatteren = []; //An array to save the color the pattern of colors that computer hav chossen
var userClickedColour = []; //An array to store the color of buttons that user have clicked
var level = 0;
var hasStarted = false;
var userClickCount = 0;

function nextSequence(){
    var randomNumber =Math.random() * 4; //Generating a number from 0 to 3.999
    randomNumber = Math.floor(randomNumber); //Rounding it down to intiger from 0 to 3
    var randomChosenColour  = buttonColours[randomNumber]; //Choosing a random colour from buttonColours array
    gamePatteren.push(randomChosenColour); //Adding this colour to the pattern

    //Changing the level text
    level = level + 1;
    $("h1").text("Level " + level);

    //Playing the sound
    playSound(randomChosenColour);

    //Animating the button
    animatePress(randomChosenColour);
}

//adding event listener to every button
$( ".btn" ).click(function() {
    //Player Can only click if game has started
  if(hasStarted)
  {
    var userChosenColour =   $( this ).attr("id");
    userClickedColour.push(userChosenColour);
    //Playing the sound
    playSound(userChosenColour);
    //Animating the button
    animatePress(userChosenColour);

    //Check The Answer Against the randomChosenColour
    checkAnswer(userClickCount);
    userClickCount = userClickCount + 1;
}
});

//This function is called by the button color name and it playes the corresponding sound according to the color
function playSound(colorName){
  var audio = new Audio("sounds/" + colorName + ".mp3");
  audio.play();
}


//This function gets the button id and makes a animation by adding and removing pressed class
function animatePress(buttonID)
{
    //Adding the class pressed
    $("#"+buttonID).addClass("pressed");
    //Removing the pressed class after 1000 seconds
    setTimeout(function(){
    $("#"+buttonID).removeClass("pressed");
}, 1000)
}

//Key Press Button Detect
$(document).keypress(function(event) {
    var keycode = event.keyCode || event.which;
    if(keycode == '97' || keycode == '65') {
        //alert('You pressed  "a" key in somewhere');
        //Starting the game when a key is pressed and gamse is not startd
        if(hasStarted === false)
        {
          startGame();
        }

    }
});

//Start game
function startGame()
{
  //Hide The h2
  $("h2").hide();
  //Making the user click count to 0
  userClickCount = 0;
  //Changing the text of h1
  $("h1").text("Level 0");
  //As the game has started making hasStarted to true;
  hasStarted = true;
  nextSequence();

}

function checkAnswer(currentLevel)
{
    if(userClickedColour[currentLevel] == gamePatteren[currentLevel])
    {
      if(currentLevel === (gamePatteren.length - 1)) //if player pattern last input has matched the game pattern
      {
        //Making the has started false so player can not press button until new level starts
        hasStarted = false;
        win();
      }
    }

    else
    {
      loose();
    }
}

//This function will be called when a user wins a level
function win()
{
  //To Start a new level the choice of the player should be empty
  userClickedColour.splice(0, userClickedColour.length)
  //Start next level after 1000 mili seconds
  setTimeout(function(){
  StartNextLevel();
}, 1000)
}

//After Player Wins The Next Level Should Start
function StartNextLevel()
{
    userClickCount = 0; //Starting a new level player click is equal to 0
    hasStarted = true; //Making has started to true so that player can press the buttons
    nextSequence();
}

function loose()
{
  $("h1").text("You Lost, press A to restart");

  restart();
}

function restart()
{
  //Show The h2
  $("h2").show();
  hasStarted = false; //making this vaiable to false so that player can not press the key button and screen button

  //To restart the game the choice of the player should be empty
  userClickedColour.splice(0, userClickedColour.length);

  //Torestart a game gamePatteren(the pattern) should be empty
  gamePatteren.splice(0, gamePatteren.length);

  //To restart a game level should be 0
  level = 0;
}
