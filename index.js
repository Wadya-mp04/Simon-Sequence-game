var colors = ["red", "blue", "green", "yellow"];
var pattern = [];
var userPattern = [];
var lvl = 0;
   

function nextSequence() {
    userPattern = [];
    lvl ++;
    $("#level-title").text("Level " + lvl);

    var num = Math.random()*4;
    num = Math.floor(num);
    var chosenColor = colors[num];
    pattern.push(chosenColor);
    
   
    $("#" + chosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    var audio = new Audio("sounds/" + chosenColor + ".mp3");
    audio.play();
  }
  
  
$(".btn").on("click", function () {
    var userIn = $(this).attr("id");
    btnPressedAnim(userIn);
    playSound(userIn);
    userPattern.push(userIn);
    checkIn(lvl);
});
function btnPressedAnim(key){
    var activeButton = $("#" + key);
    activeButton.addClass("pressed");
    setTimeout(function(){
        activeButton.removeClass("pressed");
    },100);
}
function playSound(key){
    var audio = new Audio("sounds/" + key + ".mp3");
    audio.play();
}
$(document).keypress(function() {
    if (lvl===0) {
        userPattern = [];
        nextSequence();
    }
  });
function checkIn(lvl)
{
    var correct = true
   if (lvl===0)
   {
    gameOver();
    correct = false;
   }
   else{
    for(var i =0; i<userPattern.length;i++)
        {
         if(pattern[i]!=userPattern[i])
         {
             gameOver();
             correct = false;
         }
        }
       if(userPattern.length===pattern.length && correct) 
       {
        setTimeout(function () {
            nextSequence();
          }, 1000);
       }
   }
}
function gameOver(){
    userPattern = [];
    pattern = [];
    lvl=0;
    var audio = new Audio("sounds/wrong.mp3");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
}