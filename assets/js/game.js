window.onload = function(){
       
    var computerChoices = [
      "australia",
      "argentina",
      "austria",
      "india",
      "canada",
      "columbia",
      "china",
      "denmark",
      "egypt",
      "france",
      "germany",
      "iceland",
      "ireland",
      "japan",
      "malaysia",
      "mexico",
      "nepal",
      "poland",
      "portugal"
    ];
    var winAudio = new Audio("assets/audio/winAudio.wav");
    var lossAudio = new Audio("assets/audio/lossAudio.wav");

    var wins = 0;
    var losses = 0;
    

    var directionsText = document.getElementById("directions-text");
    var userChoiceText = document.getElementById("userChoice-text");
    var remainingGuessText = document.getElementById("remainingGuess-text");
    var winsText = document.getElementById("wins-text");
    var lossesText = document.getElementById("losses-text");
    var lastGuessText = document.getElementById("lastGuess-text");
    var computerGUess;
    var blankText = [];
    var remainingGuess = 12;
    var computerGuessArray = [];
    var unluckyGuess = [];
    var modal = document.getElementById("myModal");
    var modalClose = document.getElementsByClassName("close")[0];
    var gameStatus= document.getElementById("game-status");
    var correctWord= document.getElementById("correct-word");
    var modalOn = false;

    modalClose.onclick = function() { 
        modal.style.display = "none";
        modalOn = false;
      }


    function hangmanGame()
    {
        
      computerGuess = computerChoices[Math.floor(Math.random() * computerChoices.length)];
      for(i=0; i<computerGuess.length; i++)
          {
            var blankButton = document.createElement("BUTTON");
            blankButton.innerHTML = "-";
            blankButton.classList.add("blank");
            document.getElementById("blankAnswer-text").appendChild(blankButton);
          }
          
    }

    function checkGuess(guessLetter)
    {
      var condition;
      for(i=0; i<computerGuess.length; i++)
        {
          if (guessLetter == computerGuess[i].toUpperCase())
            {
              condition = true;
            }
        }
        if (condition)
          {
            var blankElement= document.getElementsByClassName("blank");
            for(i=0; i<computerGuess.length;i++)
            {
              if (guessLetter == computerGuess[i].toUpperCase())
                {
                  blankElement[i].innerHTML = guessLetter;  
                  blankText[i] = guessLetter;
                  unluckyGuess.push(guessLetter);
                }
            } 
          }
        else
          {
            unluckyGuess.push(guessLetter);
            
          }
    }

    function winLoss()
      {
        var j=0;
        for(i=0; i<computerGuess.length;i++)
          {
            if (computerGuess[i].toUpperCase() == blankText[i])
              {
                j++;
              }
          }
        if(j == computerGuess.length)
          {
             wins++;
             winAudio.play();
             modal.style.display = "block";
             modalOn = true;
             gameStatus.innerHTML = "YOU WON!!"
             correctWord.innerHTML = "It's " + computerGuess.toUpperCase();
             resetGame();
          }
          
       
        if(remainingGuess < 2)
          {
            losses++;
            lossAudio.play();
            modal.style.display = "block";
            modalOn = true;
            gameStatus.innerHTML = "YOU LOST!!"
            correctWord.innerHTML = "Correct Word: " + computerGuess.toUpperCase();
            resetGame();
          }
      }

      function resetGame()
        {
          blankText = [];
          remainingGuess = 13;
          unluckyGuess = [];
          document.getElementById("blankAnswer-text").innerHTML = "";
          document.getElementById("userChoice-text").innerHTML = "";
          hangmanGame();
          userGuess='';
        }


    hangmanGame()

    document.onkeyup = function(event) {
      if (!modalOn)
      {
        var charCode = event.keyCode;
        if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8)
        {
            var userGuess = String.fromCharCode(event.keyCode).toUpperCase();
            userChoiceText.textContent = userGuess;
            checkGuess(userGuess);
            winLoss()
            remainingGuess= remainingGuess-1;
            remainingGuessText.textContent = remainingGuess;
            winsText.textContent = wins;
            lossesText.textContent = losses;
            lastGuessText.textContent = unluckyGuess;
        }  
      }
         
        
        
       

    };
  
};