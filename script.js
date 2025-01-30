        const dino = document.getElementById("dino");
        const cactus = document.getElementById("cactus");

        function jump() {
            if (dino.classList != "jump") {
                dino.classList.add("jump");
            

            setTimeout(function () {
                dino.classList.remove("jump");
            }, 300);
        }
        }

        let isAlive = setInterval(function () {
            //get current dino y position
            let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
            
            //get current cactus x position
            let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));   
            
            //detect collision
            if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140) {
                //collision         
                alert("Game Over!");
                console.log("Game Over!");
            }
        }, 10);

        function addCatusAnimation() {
            // check if the cactus has the class cactus-animation
            if (!cactus.classList.contains("cactus-animation")) {
                // remove the class cactus-animation
                cactus.classList.add("cactus-animation");
            }
        }

        document.addEventListener("keydown", function (event) {
            jump();
            addCatusAnimation();
        });