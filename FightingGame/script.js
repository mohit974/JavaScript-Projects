let playButton = document.getElementById('play')
let resultDiv = document.getElementById('result')
let p1NameDiv = document.getElementById('p1Name')
let p2NameDiv = document.getElementById('p2Name')
let p1HealthDiv = document.getElementById('p1Health')
let p2HealthDiv = document.getElementById('p2Health')

const updateGame = (p1,p2,gameState) => {
  // Update the DOM with the names and the latest health of players
  p1NameDiv.innerText = p1.name
  p2NameDiv.innerText = p2.name
  p1HealthDiv.innerText = p1.health
  p2HealthDiv.innerText = p2.health
  
  // if either player health is less than or equal to zero then 1.) set .isOver to true and update DOM to declare winner
  if (p1.health <= 0 || p2.health <= 0) { 
    game.isOver = true;
    gameState = game.isOver
    result.innerText = game.declareWinner(game.isOver,p1,p2)
    return gameState
  } 
}
// Player Class
class Player {
  constructor(name, health, attackDamage) {
    this.name = name;
    this.health = health;
    this.attackDmg = attackDamage;
  }

  strike (player, enemy, attackDmg) { // strike method 
    
    let damageAmount = Math.ceil(Math.random() * attackDmg) // damage amount to be random number
    
    enemy.health -= damageAmount
    
    updateGame(p1,p2,gameState) // call the updateGame function to update the DOM
    
    return `${player.name} attacks ${enemy.name} for ${damageAmount}` 
  }
  
  heal (player) { // heal method
    
    let hpAmount = Math.ceil(Math.random() * 5) // heal amount to be random number between 1 and 5
    
    player.health += hpAmount
    
    updateGame(p1,p2,gameState) // call the updateGame function to update the DOM
    
    return `${player.name} heals for ${hpAmount} HP!`
  }
}

// Create the Game class with all it's attributes and methods to run a match 
class Game {
  constructor() {
    this.isOver = false;
  }

  declareWinner(isOver,p1, p2) {
    let message
    
    if (isOver == true && p1.health <= 0) {
      message = `${p2.name} WINS!`;
    }
    
    else if(isOver == true && p2.health <= 0) {
      message = `${p1.name} WINS!`
    } 
    console.log(isOver, p1.health, p2.health)
 
    document.getElementById('victory').play() // victory sound is played
   
    return message
  }

  // Reset the players health back to it's original state and isOver to FALSE 
  reset(p1,p2) {
    p1.health = 100
    p2.health = 100
    this.isOver = false
    resultDiv.innerText = ''
    updateGame(p1,p2)
  }
  
  // Simulates the whole match until one player runs out of health 
  play(p1, p2) {
    this.reset(p1, p2);
    
    while (!this.isOver) { // checks whether isOver == false
      p1.strike(p1,p2, p1.attackDmg)
      p2.heal(p2)
      p2.strike(p2,p1, p2.attackDmg);
      p1.heal(p1)
    }
    // Once isOver is TRUE run the declareWinner() method 
    return this.declareWinner(this.isOver,p1,p2);
  }

}

// Create 2 players using the player class 
let player1 = new Player('RYU', 100, 15)
let player2 = new Player('KEN', 100, 15)


// Save original Player Health in order to reset 
let p1 = player1
let p2 = player2



// Create the game object from the Game class 
let game = new Game();
//  Intialize the game by calling updateGame() 
updateGame(p1,p2)

// Save original Game Data 
let gameState = game.isOver


// Add a click listener to the simulate button that runs the play() method on click and pass in the players 
play.onclick = () => result.innerText = game.play(p1,p2);


// ** Player 1 Controls **
document.addEventListener('keydown', function(e) {
  
  if (e.key.toLowerCase() === "q" && p2.health > 0 && game.isOver == false ){ // it will listen to both "q" & "Q" cause of .toLowerCase()
    p1.strike(p1, p2, p1.attackDmg)
    
    document.getElementById('p1attack').play(); // play attack sound
  }
});

document.addEventListener('keydown', function(e) {
    
  if (e.key.toLowerCase() === "a" && p2.health > 0 ){ // it will listen to both "a" & "A" cause of .toLowerCase()
   p1.heal(p1)
    
   document.getElementById('p1heal').play(); // play heal sound
  }
});

// ** Player 2 Controls **
document.addEventListener('keydown', function(e) {
  
  if (e.key.toLowerCase() === "p" && p1.health > 0 && game.isOver == false ){ // it will listen to both "p" & "P" cause of .toLowerCase()
    p2.strike(p2, p1, p2.attackDmg)
    
    document.getElementById('p2attack').play(); // play attack sound
  }
});

document.addEventListener('keydown', function(e) {
 
  if (e.key.toLowerCase() === "l" && p2.health > 0 ){ // it will listen to both "l" & "L" cause of .toLowerCase()
    
   player2.heal(p2)
  document.getElementById('p2heal').play(); // play heal sound
  }
});