document.addEventListener("DOMContentLoaded", function () {
    const contentContainer = document.getElementById("content");

    // Add event listeners to navigation links
    const homeLink = document.getElementById("home-link");
    const gameLink = document.getElementById("game-link");
    const aboutLink = document.getElementById("about-link");

    homeLink.addEventListener("click", loadHomePage);
    gameLink.addEventListener("click", loadGamePage);
    aboutLink.addEventListener("click", loadAboutPage);

    function loadHomePage() {
        contentContainer.innerHTML = `
        <p>
            Welcome to the Doto.<br>
            You are the Green dot. Eat the Red dots to get bigger.<br>
            Use the arrow keys to move around.<br>
            Have fun!
        </p>
    `;
    }

    function loadGamePage() {
        contentContainer.innerHTML = `
            <div id='gameContainer'>
                <div>
                    <button id='startButton'>Start Game</button>
                </div>
                <canvas id='gameCanvas' width='400' height='400'></canvas>
            </div>
        `;

        const startButton = document.getElementById('startButton');
        startButton.addEventListener('click', startGame);
    }

    function loadAboutPage() {
        contentContainer.innerHTML = "<p>About the Snake Game: This game is a classic Snake implementation using HTML, CSS, and JavaScript.</p>";
    }

    function startGame() {
        const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");

        const boxSize = 20;
        let snake = [{ x: 10, y: 10 }];
        let direction = "right";
        let food = { x: 15, y: 15 };

        function draw() {
            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw the border
            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;
            ctx.strokeRect(0, 0, canvas.width, canvas.height);

            // Draw the snake
            snake.forEach(segment => {
                ctx.fillStyle = "green";
                ctx.fillRect(segment.x * boxSize, segment.y * boxSize, boxSize, boxSize);
            });

            // Draw the food
            ctx.fillStyle = "red";
            ctx.fillRect(food.x * boxSize, food.y * boxSize, boxSize, boxSize);
        }

        function move() {
            // Move the snake
            let head = { x: snake[0].x, y: snake[0].y };
            switch (direction) {
                case "up":
                    head.y--;
                    break;
                case "down":
                    head.y++;
                    break;
                case "left":
                    head.x--;
                    break;
                case "right":
                    head.x++;
                    break;
            }

            // Check for collisions with walls or itself
            if (
                head.x < 0 ||
                head.y < 0 ||
                head.x >= canvas.width / boxSize ||
                head.y >= canvas.height / boxSize ||
                collision(head, snake)
            ) {
                alert("Game Over!");
                resetGame();
                return;
            }

            // Check if the snake eats the food
            if (head.x === food.x && head.y === food.y) {
                // Generate a new food location
                food = {
                    x: Math.floor(Math.random() * (canvas.width / boxSize)),
                    y: Math.floor(Math.random() * (canvas.height / boxSize)),
                };
            } else {
                // Remove the tail segment if not eating
                snake.pop();
            }

            // Add the new head
            snake.unshift(head);
        }

        function collision(head, array) {
            // Check if the head collides with any segment of the snake
            return array.some(segment => segment.x === head.x && segment.y === head.y);
        }

        function resetGame() {
            snake = [{ x: 10, y: 10 }];
            direction = "right";
            food = { x: 15, y: 15 };
            location.reload(); // Reload the page
        }

        function changeDirection(e) {
            switch (e.key) {
                case "ArrowUp":
                    direction = "up";
                    break;
                case "ArrowDown":
                    direction = "down";
                    break;
                case "ArrowLeft":
                    direction = "left";
                    break;
                case "ArrowRight":
                    direction = "right";
                    break;
            }
        }

        // Set up keyboard controls
        document.addEventListener("keydown", changeDirection);

        // Game loop
        function gameLoop() {
            move();
            draw();
            setTimeout(gameLoop, 100); // Adjust speed by changing the timeout value
        }

        // Start the game loop
        gameLoop();
    }
});
