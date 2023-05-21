function getComputerChoice() { // function to get random Computer Choice
    let rpsChoices = ['Rock', 'Paper', 'Scissors']
    let computerChoice = rpsChoices[Math.floor(Math.random() * 3)]
    return computerChoice
  }
  
  function getResult(playerChoice, computerChoice) { // function to pit Player Choice against Computer Choice
      
    let score;
  
    if (playerChoice === computerChoice) {
      score = 0
  
  
    } else if (playerChoice === 'Rock' && computerChoice === 'Scissors') {
      score = 1
  
    } else if (playerChoice === "Paper" && computerChoice === "Rock") {
      score = 1
  
    } else if (playerChoice === "Scissors" && computerChoice === "Paper") {
      score = 1
  
    } else {
      score = -1
    }
  
    return score
  }
  
  
  function showResult(score, playerChoice, computerChoice) { // function to update the DOM with the result
    
  
    let result = document.getElementById('result')
    switch (score) {
      case -1:
        result.innerText = `You Lose!`
        break;
      case 0:
        result.innerText = `It's a Draw!`
        break;
      case 1:
        result.innerText = `You Win!`
        break;
    }
  
    let playerScore = document.getElementById('player-score')
    let hands = document.getElementById('hands')
    playerScore.innerText = `${Number(playerScore.innerText) + score}` // show the score(previous score + current score)
    hands.innerText = `👱 ${playerChoice} vs 🤖 ${computerChoice}` // emojis result
  }
  
  function onClickRPS(playerChoice) { //main function 
    const computerChoice = getComputerChoice()
    const score = getResult(playerChoice.value, computerChoice) //It stores the value of getResult in "score" variable
    showResult(score, playerChoice.value, computerChoice) // function call - to show the Result on the DOM  
  }
  
  function playGame() { // function to actively listen for a click

    let rpsButtons = document.querySelectorAll('.rpsButton')
    
    rpsButtons.forEach(rpsButton => {
      rpsButton.onclick = () => onClickRPS(rpsButton)
      /*
      Adds an on click event listener to each RPS button and every time you click it, it calls the onClickRPS function with the RPS button that was last clicked 
  
    -> loop through the buttons using a forEach loop
    -> Add a 'click' event listener to each button
    -> Call the onClickRPS function every time someone clicks
    -> Make sure to pass the currently selected rps button as an argument
      */
    })
  
    
    let endGameButton = document.getElementById('endGameButton') 
    endGameButton.onclick = () => endGame() // adds a click listener and to call the endGame function
  }
  
  function endGame() { // this function resets all the DOM
    let playerScore = document.getElementById('player-score')
    let hands = document.getElementById('hands')
    let result = document.getElementById('result')
    playerScore.innerText = ''
    hands.innerText = ''
    result.innerText = ''
  }
  
  playGame()