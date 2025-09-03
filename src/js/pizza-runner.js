// Pizza Runner Game
class PizzaRunnerGame {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas dimensions
        this.canvas.width = 800;
        this.canvas.height = 400;
        
        // Game State
        this.gameSpeed = 5;
        this.score = 0;
        this.isGameOver = false;
        this.gameRunning = false;
        
        // Player (Pizza Slice)
        this.pizza = {
            x: 50,
            y: this.canvas.height - 100,
            width: 50,
            height: 50,
            velocityY: 0,
            isJumping: false
        };
        
        // Obstacles (Trash Cans and Ovens)
        this.obstacles = [];
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                if (this.isGameOver) {
                    this.resetGame();
                } else if (!this.pizza.isJumping) {
                    this.pizza.velocityY = -15; // Jump strength
                    this.pizza.isJumping = true;
                }
            }
        });
    }
    
    start() {
        this.gameRunning = true;
        this.gameLoop();
    }
    
    stop() {
        this.gameRunning = false;
    }
    
    gameLoop() {
        if (!this.gameRunning) return;
        
        if (this.isGameOver) {
            this.drawGameOverScreen();
            return;
        }
        
        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }
    
    update() {
        // Update pizza position
        this.pizza.y += this.pizza.velocityY;
        this.pizza.velocityY += 0.5; // Gravity
        
        // Ground collision
        if (this.pizza.y >= this.canvas.height - this.pizza.height - 50) {
            this.pizza.y = this.canvas.height - this.pizza.height - 50;
            this.pizza.velocityY = 0;
            this.pizza.isJumping = false;
        }
        
        // Move and update obstacles
        this.obstacles.forEach((obstacle, index) => {
            obstacle.x -= this.gameSpeed;
            
            // Check for collision
            if (
                this.pizza.x < obstacle.x + obstacle.width &&
                this.pizza.x + this.pizza.width > obstacle.x &&
                this.pizza.y < obstacle.y + obstacle.height &&
                this.pizza.y + this.pizza.height > obstacle.y
            ) {
                this.isGameOver = true;
            }
            
            // Remove off-screen obstacles
            if (obstacle.x + obstacle.width < 0) {
                this.obstacles.splice(index, 1);
                this.score++;
                this.gameSpeed += 0.05; // Increase speed over time
            }
        });
        
        // Generate new obstacles
        if (Math.random() < 0.015) { // Adjust for obstacle frequency
            this.createObstacle();
        }
    }
    
    draw() {
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw the ground
        this.ctx.fillStyle = '#654321'; // Brown
        this.ctx.fillRect(0, this.canvas.height - 50, this.canvas.width, 50);
        
        // Draw pizza
        this.drawPizza();
        
        // Draw obstacles
        this.obstacles.forEach(obstacle => {
            this.drawObstacle(obstacle);
        });
        
        // Draw score
        this.ctx.fillStyle = '#333';
        this.ctx.font = '24px Arial';
        this.ctx.fillText('Score: ' + this.score, 10, 30);
    }
    
    drawPizza() {
        // Draw pizza slice shape with legs
        this.ctx.fillStyle = '#FFC107'; // Yellowish cheese color
        this.ctx.beginPath();
        this.ctx.moveTo(this.pizza.x, this.pizza.y);
        this.ctx.lineTo(this.pizza.x + this.pizza.width, this.pizza.y);
        this.ctx.lineTo(this.pizza.x + this.pizza.width / 2, this.pizza.y + this.pizza.height);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Draw pepperoni
        this.ctx.fillStyle = '#D32F2F'; // Red pepperoni
        this.ctx.beginPath();
        this.ctx.arc(this.pizza.x + 15, this.pizza.y + 15, 5, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(this.pizza.x + 35, this.pizza.y + 25, 5, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Draw legs
        this.ctx.fillStyle = '#654321';
        this.ctx.fillRect(this.pizza.x + 10, this.pizza.y + 45, 5, 15);
        this.ctx.fillRect(this.pizza.x + 35, this.pizza.y + 45, 5, 15);
    }
    
    createObstacle() {
        const types = ['trashcan', 'oven'];
        const type = types[Math.floor(Math.random() * types.length)];
        let obstacleWidth, obstacleHeight;
        
        if (type === 'trashcan') {
            obstacleWidth = 30;
            obstacleHeight = 50;
        } else { // oven
            obstacleWidth = 60;
            obstacleHeight = 70;
        }
        
        this.obstacles.push({
            x: this.canvas.width,
            y: this.canvas.height - 50 - obstacleHeight,
            width: obstacleWidth,
            height: obstacleHeight,
            type: type
        });
    }
    
    drawObstacle(obstacle) {
        if (obstacle.type === 'trashcan') {
            this.ctx.fillStyle = '#607D8B'; // Grayish blue
            this.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
            this.ctx.fillStyle = '#455A64'; // Darker gray
            this.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, 5); // Lid
        } else { // oven
            this.ctx.fillStyle = '#BDBDBD'; // Light gray
            this.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
            this.ctx.fillStyle = '#424242'; // Dark gray
            this.ctx.fillRect(obstacle.x + 5, obstacle.y + 5, obstacle.width - 10, obstacle.height - 15); // Glass door
            this.ctx.fillStyle = '#000';
            this.ctx.fillRect(obstacle.x + 10, obstacle.y + 15, 5, 5); // Knob
            this.ctx.fillRect(obstacle.x + 20, obstacle.y + 15, 5, 5);
        }
    }
    
    drawGameOverScreen() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '48px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Game Over', this.canvas.width / 2, this.canvas.height / 2 - 50);
        this.ctx.fillText('Score: ' + this.score, this.canvas.width / 2, this.canvas.height / 2 + 10);
        this.ctx.font = '24px Arial';
        this.ctx.fillText('Press spacebar to restart', this.canvas.width / 2, this.canvas.height / 2 + 60);
        this.ctx.textAlign = 'left';
    }
    
    resetGame() {
        this.isGameOver = false;
        this.gameSpeed = 5;
        this.score = 0;
        this.obstacles = [];
        this.pizza.y = this.canvas.height - 100;
        this.pizza.velocityY = 0;
        this.pizza.isJumping = false;
        this.gameLoop();
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the about section and the game canvas exists
    const gameCanvas = document.getElementById('pizzaRunnerCanvas');
    if (gameCanvas) {
        window.pizzaRunnerGame = new PizzaRunnerGame('pizzaRunnerCanvas');
        
        // Auto-start the game when the about section is visible
        const aboutSection = document.getElementById('about');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.target.id === 'about') {
                    if (!window.pizzaRunnerGame.gameRunning) {
                        window.pizzaRunnerGame.start();
                    }
                } else if (!entry.isIntersecting && entry.target.id === 'about') {
                    window.pizzaRunnerGame.stop();
                }
            });
        });
        
        if (aboutSection) {
            observer.observe(aboutSection);
        }
    }
});