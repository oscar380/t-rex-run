const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreElement = document.getElementById('score');
const gameOverElement = document.createElement('div');
gameOverElement.id = 'game-over';
gameOverElement.style.display = 'none';
gameOverElement.textContent = 'Game Over!';
document.body.appendChild(gameOverElement);

let score = 0;
let cactusScored = false; // Flag to track if the cactus has been scored

function jump() {
    if (dino.classList != "jump") {
        dino.classList.add("jump");

        setTimeout(function () {
            dino.classList.remove("jump");
        }, 300);
    }
}

function updateScore() {
    score++;
    scoreElement.textContent = `Score: ${score}`;
}

function addCatusAnimation() {
    // check if the cactus has the class cactus-animation
    if (!cactus.classList.contains("cactus-animation")) {
        cactus.classList.add("cactus-animation");
    }
}

document.addEventListener("keydown", function (event) {
    jump();
    addCatusAnimation();
});

function resetGame() {
    score = 0;
    scoreElement.textContent = `Score: ${score}`;
    cactusScored = false;
    gameOverElement.style.display = 'none';
    cactus.classList.remove("cactus-animation");
    void cactus.offsetWidth; // Trigger reflow to restart animation
    cactus.classList.add("cactus-animation");
    isAlive = setInterval(checkCollision, 10);
}

function checkCollision() {
    //get current dino y position
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
    
    //get current cactus x position
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));   
    
    //detect collision
    if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140) {
        //collision         
        gameOverElement.style.display = 'block';
        clearInterval(isAlive); // Stop the game loop
        cactus.classList.remove("cactus-animation"); // Stop cactus animation
        setTimeout(resetGame, 2000); // Restart the game after 2 seconds
    } else if (cactusLeft < 0 && !cactusScored) {
        // successfully jumped over cactus
        updateScore();
        cactusScored = true; // Set the flag to prevent multiple scoring
    } else if (cactusLeft >= 50) {
        // Reset the flag when the cactus reappears
        cactusScored = false;
    }
}

let isAlive = setInterval(checkCollision, 10);