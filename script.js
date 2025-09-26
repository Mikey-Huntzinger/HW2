// Simple Slot Machine Game - JavaScript Logic

// Game variables - these store important information about our game
let playerMoney = 100; // Player starts with $100
const symbols = ['🍒', '⭐', '💎']; // Array of possible symbols
const payouts = {
    '🍒': 3, // Cherry pays 3x the bet
    '⭐': 5, // Star pays 5x the bet
    '💎': 10 // Diamond pays 10x the bet
};

// Get references to HTML elements so we can change them
const playerMoneyElement = document.getElementById('playerMoney');
const betAmountInput = document.getElementById('betAmount');
const spinButton = document.getElementById('spinButton');
const slot1 = document.getElementById('slot1');
const slot2 = document.getElementById('slot2');
const slot3 = document.getElementById('slot3');
const resultMessage = document.getElementById('resultMessage');
const winAmountElement = document.getElementById('winAmount');

// Function to update the money display on the screen
function updateMoneyDisplay() {
    playerMoneyElement.textContent = playerMoney;
}

// Function to generate a random symbol from our symbols array
function getRandomSymbol() {
    // Gets random number between 0-2
    const randomIndex = Math.floor(Math.random() * symbols.length);
    return symbols[randomIndex];
}

// Function to spin the slots and show spinning animation
function spinSlots() {
    // Add spinning animation to all slots
    slot1.classList.add('spinning');
    slot2.classList.add('spinning');
    slot3.classList.add('spinning');
    
    // After 1 second, stop spinning and show results
    setTimeout(function() {
        // Remove spinning animation
        slot1.classList.remove('spinning');
        slot2.classList.remove('spinning');
        slot3.classList.remove('spinning');
        
        // Generate random symbols for each slot
        const symbol1 = getRandomSymbol();
        const symbol2 = getRandomSymbol();
        const symbol3 = getRandomSymbol();
        
        // Update the slot displays with new symbols
        slot1.textContent = symbol1;
        slot2.textContent = symbol2;
        slot3.textContent = symbol3;
        
        // Check if player won and calculate payout
        checkWin(symbol1, symbol2, symbol3);
        
        // Re-enable the spin button
        spinButton.disabled = false;
        spinButton.textContent = 'SPIN!';
    }, 1000); // Wait 1000 milliseconds (1 second)
}

// Function to check if the player won and calculate winnings
function checkWin(symbol1, symbol2, symbol3) {
    const betAmount = parseInt(betAmountInput.value);
    
    // Check if all three symbols are the same
    if (symbol1 === symbol2 && symbol2 === symbol3) {
        // Player won! Calculate the payout
        const multiplier = payouts[symbol1]; // Get the multiplier for this symbol
        const winnings = betAmount * multiplier; // Calculate total winnings
        
        // Add winnings to player's money
        playerMoney += winnings;
        
        // Show win message
        resultMessage.textContent = `🎉 YOU WON! 🎉`;
        winAmountElement.textContent = `You won $${winnings}!`;
        
        // Update money display
        updateMoneyDisplay();
    } else {
        // Player lost
        resultMessage.textContent = 'Sorry, try again!';
        winAmountElement.textContent = `You lost $${betAmount}`;
    }
    
    // Check if player is out of money
    if (playerMoney <= 0) {
        resultMessage.textContent = 'Game Over! You\'re out of money!';
        spinButton.disabled = true;
        spinButton.textContent = 'NO MONEY';
    }
}

// Function to validate the bet amount before spinning
function validateBet() {
    const betAmount = betAmountInput.value;
    
    // Check if bet amount is valid
    if (!betAmount || betAmount <= 0) {
        alert('Please enter a valid bet amount!');
        return false;
    }
    
    // Check if player has enough money
    if (betAmount > playerMoney) {
        alert('You don\'t have enough money for that bet!');
        return false;
    }
    
    return true; // Bet is valid
}

// Main function that runs when player clicks the spin button
function playGame() {
    // First, validate the bet
    if (!validateBet()) {
        return; // Stop if bet is not valid
    }
    
    const betAmount = betAmountInput.value;
    
    // Subtract bet amount from player's money
    playerMoney -= betAmount;
    updateMoneyDisplay();
    
    // Disable spin button and change text during spinning
    spinButton.disabled = true;
    spinButton.textContent = 'SPINNING...';
    
    // Clear previous results
    resultMessage.textContent = 'Good luck!';
    winAmountElement.textContent = '';
    
    // Start the spinning animation and game logic
    spinSlots();
}

// Add event listener to spin button
// This means when someone clicks the button, run the playGame function
spinButton.addEventListener('click', playGame);

// Add event listener to bet input for Enter key
// This lets players press Enter to spin instead of clicking the button
betAmountInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        playGame();
    }
});

// Initialize the game when page loads
console.log('Slot machine game loaded! Good luck!');
