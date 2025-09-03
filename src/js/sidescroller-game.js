class SideScrollerGame {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        
        // Game settings
        this.gameWidth = this.canvas.width;
        this.gameHeight = this.canvas.height;
        this.gameSpeed = 2;
        this.score = 0;
        this.gameRunning = false;
        
        // Player settings
        this.player = {
            x: 50,
            y: this.gameHeight / 2 - 25,
            width: 30,
            height: 30,
            velY: 0,
            jumping: false,
            grounded: false,
            color: '#007acc'
        };
        
        // Game objects
        this.obstacles = [];
        this.particles = [];
        
        // Input handling
        this.keys = {};
        this.touchStartY = 0;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.resizeCanvas();
        this.gameLoop();
    }
    
    setupEventListeners() {
        // Keyboard events
        document.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
            if (e.code === 'Space' || e.code === 'ArrowUp') {
                e.preventDefault();
                this.jump();
            }
        });
        
        document.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
        
        // Touch events for mobile
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.touchStartY = e.touches[0].clientY;
            this.jump();
        });
        
        // Mouse events
        this.canvas.addEventListener('click', (e) => {
            e.preventDefault();
            this.jump();
        });
        
        // Resize handling
        window.addEventListener('resize', () => {
            this.resizeCanvas();
        });
    }
    
    resizeCanvas() {
        const container = this.canvas.parentElement;
        const containerWidth = container.clientWidth;
        const aspectRatio = 16 / 9;
        
        let canvasWidth = Math.min(containerWidth - 40, 800); // Max width 800px with 20px padding on each side
        let canvasHeight = canvasWidth / aspectRatio;
        
        // Ensure minimum height for mobile
        if (canvasHeight < 300) {
            canvasHeight = 300;
            canvasWidth = canvasHeight * aspectRatio;
        }
        
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.gameWidth = canvasWidth;
        this.gameHeight = canvasHeight;
        
        // Update player position relative to new canvas size
        this.player.y = this.gameHeight * 0.7; // Place player at 70% down from top
    }
    
    jump() {
        if (!this.gameRunning) {
            this.startGame();
            return;
        }
        
        if (this.player.grounded) {
            this.player.velY = -12;
            this.player.jumping = true;
            this.player.grounded = false;
        }
    }
    
    startGame() {
        this.gameRunning = true;
        this.score = 0;
        this.obstacles = [];
        this.particles = [];
        this.player.y = this.gameHeight * 0.7;
        this.player.velY = 0;
        this.player.grounded = true;
    }
    
    update() {
        if (!this.gameRunning) return;
        
        // Update player physics
        this.player.velY += 0.8; // gravity
        this.player.y += this.player.velY;
        
        // Ground collision
        const groundY = this.gameHeight * 0.8;
        if (this.player.y + this.player.height >= groundY) {
            this.player.y = groundY - this.player.height;
            this.player.velY = 0;
            this.player.jumping = false;
            this.player.grounded = true;
        }
        
        // Spawn obstacles
        if (Math.random() < 0.02) {
            this.obstacles.push({
                x: this.gameWidth,
                y: groundY - 40,
                width: 30,
                height: 40,
                color: '#ff4444'
            });
        }
        
        // Update obstacles
        for (let i = this.obstacles.length - 1; i >= 0; i--) {
            this.obstacles[i].x -= this.gameSpeed;
            
            // Remove off-screen obstacles
            if (this.obstacles[i].x + this.obstacles[i].width < 0) {
                this.obstacles.splice(i, 1);
                this.score += 10;
            }
        }
        
        // Collision detection
        for (let obstacle of this.obstacles) {
            if (this.player.x < obstacle.x + obstacle.width &&
                this.player.x + this.player.width > obstacle.x &&
                this.player.y < obstacle.y + obstacle.height &&
                this.player.y + this.player.height > obstacle.y) {
                this.gameOver();
                break;
            }
        }
        
        // Increase difficulty gradually
        this.gameSpeed = Math.min(2 + this.score / 500, 6);
    }
    
    draw() {
        // Clear canvas with gradient background
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.gameHeight);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(1, '#98FB98');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
        
        // Draw ground
        this.ctx.fillStyle = '#8B4513';
        this.ctx.fillRect(0, this.gameHeight * 0.8, this.gameWidth, this.gameHeight * 0.2);
        
        if (!this.gameRunning) {
            this.drawStartScreen();
            return;
        }
        
        // Draw player
        this.ctx.fillStyle = this.player.color;
        this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
        
        // Draw obstacles
        for (let obstacle of this.obstacles) {
            this.ctx.fillStyle = obstacle.color;
            this.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        }
        
        // Draw score
        this.ctx.fillStyle = '#333';
        this.ctx.font = '24px Arial';
        this.ctx.fillText(`Score: ${this.score}`, 20, 40);
        
        // Draw instructions
        this.ctx.fillStyle = '#666';
        this.ctx.font = '16px Arial';
        this.ctx.fillText('Jump: Space/Click/Tap', 20, this.gameHeight - 20);
    }
    
    drawStartScreen() {
        this.ctx.fillStyle = '#333';
        this.ctx.font = '32px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Side Scroller Demo', this.gameWidth / 2, this.gameHeight / 2 - 40);
        
        this.ctx.font = '18px Arial';
        this.ctx.fillText('Click, Tap, or Press Space to Start', this.gameWidth / 2, this.gameHeight / 2);
        this.ctx.fillText('Jump over red obstacles!', this.gameWidth / 2, this.gameHeight / 2 + 30);
        
        this.ctx.textAlign = 'left';
    }
    
    gameOver() {
        this.gameRunning = false;
        
        // Draw game over screen
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
        
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '32px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Game Over!', this.gameWidth / 2, this.gameHeight / 2 - 40);
        
        this.ctx.font = '18px Arial';
        this.ctx.fillText(`Final Score: ${this.score}`, this.gameWidth / 2, this.gameHeight / 2);
        this.ctx.fillText('Click to Play Again', this.gameWidth / 2, this.gameHeight / 2 + 40);
        
        this.ctx.textAlign = 'left';
    }
    
    gameLoop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait for the about section to be active or initialize after a short delay
    setTimeout(() => {
        const gameCanvas = document.getElementById('sidescroller-canvas');
        if (gameCanvas) {
            new SideScrollerGame('sidescroller-canvas');
        }
    }, 500);
});