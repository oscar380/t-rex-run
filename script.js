const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const burger = document.getElementById("burger");
const scoreElement = document.getElementById('score');
const gameOverElement = document.createElement('div');
gameOverElement.id = 'game-over';
gameOverElement.style.display = 'none';
gameOverElement.textContent = 'Game Over!';
document.body.appendChild(gameOverElement);

let score = 0;
let cactusScored = false; // Flag to track if the cactus has been scored
let burgerScored = false; // Flag to track if the burger has been scored

function jump() {
    if (dino.classList != "jump") {
        dino.classList.add("jump");

        setTimeout(function () {
            dino.classList.remove("jump");
        }, 300);
    }
}

function updateScore(points) {
    score += points;
    scoreElement.textContent = `Score: ${score}`;
}

function addCatusAnimation() {
    // check if the cactus has the class cactus-animation
    if (!cactus.classList.contains("cactus-animation")) {
        cactus.classList.add("cactus-animation");
    }
}

function addBurgerAnimation() {
    // check if the burger has the class burger-animation
    if (!burger.classList.contains("burger-animation")) {
        burger.classList.add("burger-animation");
    }
}

document.addEventListener("keydown", function (event) {
    jump();
    addCatusAnimation();
    addBurgerAnimation();
});

function resetGame() {
    score = 0;
    scoreElement.textContent = `Score: ${score}`;
    cactusScored = false;
    burgerScored = false;
    gameOverElement.style.display = 'none';
    cactus.classList.remove("cactus-animation");
    burger.classList.remove("burger-animation");
    void cactus.offsetWidth; // Trigger reflow to restart animation
    void burger.offsetWidth; // Trigger reflow to restart animation
    cactus.classList.add("cactus-animation");
    burger.classList.add("burger-animation");
    isAlive = setInterval(checkCollision, 10);
}

function checkCollision() {
    //get current dino y position
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
    
    //get current cactus x position
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));   
    
    //get current burger x position
    let burgerLeft = parseInt(window.getComputedStyle(burger).getPropertyValue("left"));   
    
    //detect collision with cactus
    if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140) {
        //collision         
        gameOverElement.style.display = 'block';
        clearInterval(isAlive); // Stop the game loop
        cactus.classList.remove("cactus-animation"); // Stop cactus animation
        burger.classList.remove("burger-animation"); // Stop burger animation
        setTimeout(resetGame, 2000); // Restart the game after 2 seconds
    } else if (cactusLeft < 0 && !cactusScored) {
        // successfully jumped over cactus
        updateScore(1);
        cactusScored = true; // Set the flag to prevent multiple scoring
    } else if (cactusLeft >= 50) {
        // Reset the flag when the cactus reappears
        cactusScored = false;
    }

    //detect collision with burger
    if (burgerLeft < 50 && burgerLeft > 0 && dinoTop >= 140) {
        //collision         
        gameOverElement.style.display = 'block';
        clearInterval(isAlive); // Stop the game loop
        cactus.classList.remove("cactus-animation"); // Stop cactus animation
        burger.classList.remove("burger-animation"); // Stop burger animation
        setTimeout(resetGame, 2000); // Restart the game after 2 seconds
    } else if (burgerLeft < 0 && !burgerScored) {
        // successfully jumped over burger
        updateScore(2);
        burgerScored = true; // Set the flag to prevent multiple scoring
    } else if (burgerLeft >= 50) {
        // Reset the flag when the burger reappears
        burgerScored = false;
    }
}

let isAlive = setInterval(checkCollision, 10);