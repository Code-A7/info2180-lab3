// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get references to game elements
    const board = document.getElementById('board');
    const squares = board.querySelectorAll('div');
    const statusDiv = document.getElementById('status');
    const newGameBtn = document.querySelector('.btn');
    
    // Initialize game state
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    
    // Winning combinations
    const winningCombinations = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Diagonal top-left to bottom-right
        [2, 4, 6]  // Diagonal top-right to bottom-left
    ];
    
    // Exercise 1: Layout the board - Add 'square' class to each div
    squares.forEach(function(square, index) {
        square.classList.add('square');
        square.dataset.index = index; // Add data attribute for easier tracking
    });
    
    // Exercise 2: Add click event listeners to squares
    squares.forEach(function(square, index) {
        square.addEventListener('click', function() {
            handleSquareClick(square, index);
        });
    });
    
    // Exercise 3: Add hover effects to all squares
    squares.forEach(function(square) {
        square.addEventListener('mouseenter', function() {
            if (square.textContent === '' && gameActive) {
                square.classList.add('hover');
            }
        });
        
        square.addEventListener('mouseleave', function() {
            square.classList.remove('hover');
        });
    });
    
    // Handle square click
    function handleSquareClick(square, index) {
        // Exercise 6: Disallow cheating - prevent changing filled squares
        if (gameState[index] !== '' || !gameActive) {
            return;
        }
        
        // Update game state
        gameState[index] = currentPlayer;
        square.textContent = currentPlayer;
        square.classList.add(currentPlayer);
        
        // Exercise 4: Check for winner
        checkWinner();
        
        // Switch player
        if (gameActive) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
    
    // Exercise 4: Check for winner
    function checkWinner() {
        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
            
            if (gameState[a] !== '' && 
                gameState[a] === gameState[b] && 
                gameState[a] === gameState[c]) {
                
                // We have a winner!
                gameActive = false;
                statusDiv.textContent = `Congratulations! ${gameState[a]} is the Winner!`;
                statusDiv.classList.add('you-won');
                return;
            }
        }
    }
    
    // Exercise 5: Restart the game
    newGameBtn.addEventListener('click', function() {
        // Reset game state
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        
        // Clear the board
        squares.forEach(function(square) {
            square.textContent = '';
            square.classList.remove('X', 'O');
        });
        
        // Reset status message
        statusDiv.textContent = 'Move your mouse over a square and click to play an X or an O.';
        statusDiv.classList.remove('you-won');
    });
});