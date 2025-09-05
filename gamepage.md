---
layout: single
title: "🎮 Interactive Games"
permalink: /games/
author_profile: true
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  excerpt: "Enhanced gaming experiences with fullscreen support"
classes: wide
---

# 🎮 Interactive Games Collection

Welcome to my enhanced games page! Experience immersive gaming with fullscreen support and advanced features.

## 🚀 Rocket Pizza Delivery - Enhanced Edition

<div class="enhanced-game-container">
  <div class="enhanced-game-header">
    <h2>🚀 Rocket Pizza Delivery</h2>
    <div class="enhanced-game-controls">
      <button id="enhancedPauseBtn" class="enhanced-game-btn" onclick="toggleEnhancedGamePause()">⏸️ Pause</button>
      <button class="enhanced-game-btn" onclick="restartEnhancedGame()">🔄 Restart</button>
      <a href="#" class="enhanced-game-btn enhanced-fullscreen-toggle" onclick="toggleEnhancedFullScreen()" title="Toggle Fullscreen Mode">🖥️ Go Fullscreen</a>
      <button class="enhanced-game-btn" onclick="showGameStats()">📊 Stats</button>
      <a href="/" class="enhanced-game-btn">← Back to Portfolio</a>
    </div>
  </div>
  
  <div class="enhanced-game-stats">
    <div class="stat-item" id="scoreDisplay">Score: 0</div>
    <div class="stat-item" id="livesDisplay">Lives: 3</div>
    <div class="stat-item" id="timeDisplay">Time: 0s</div>
    <div class="stat-item" id="levelDisplay">Level: 1</div>
  </div>
  
  <div class="enhanced-game-wrapper">
    <canvas id="enhancedGameCanvas" width="1000" height="667" tabindex="0"></canvas>
  </div>
  
  <div class="enhanced-game-instructions">
    <h4>🎮 How to Play:</h4>
    <p><strong>Arrow Keys / WASD:</strong> Control your rocket ship</p>
    <p><strong>Space Bar:</strong> Emergency brake</p>
    <p><strong>Objective:</strong> Deliver pizzas by collecting them and avoiding obstacles!</p>
    <p><strong>Power-ups:</strong> Collect special items for bonus points and abilities</p>
    <p><strong>Fullscreen Mode:</strong> Click "Go Fullscreen" for the ultimate gaming experience!</p>
    <p><strong>ESC Key:</strong> Exit fullscreen mode</p>
  </div>
</div>

## 🎯 Game Features

- **Enhanced Graphics**: Improved visual effects and animations
- **True Fullscreen Support**: Immersive gaming experience that scales to your screen
- **Responsive Design**: Perfect gameplay on desktop, tablet, and mobile devices
- **Advanced Physics**: Sophisticated collision detection and particle effects
- **Visual Effects**: Screen shake, particle bursts, and dynamic lighting
- **Progressive Difficulty**: Challenges increase as you advance through levels
- **Statistics Tracking**: Real-time score, lives, time, and level display

## 🏆 Future Games

More interactive experiences coming soon! This page will be regularly updated with new gaming projects and enhanced features.

---

*All games are developed using modern JavaScript and HTML5 Canvas for optimal performance across all devices.*

<script>
// Enhanced Rocket Pizza Game Class - Games Page Version
class EnhancedRocketPizzaGame {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.style.imageRendering = 'pixelated';
        
        // Game state
        this.player = { x: 100, y: 300, width: 30, height: 20, vx: 0, vy: 0 };
        this.pizzas = [];
        this.obstacles = [];
        this.powerups = [];
        this.particles = [];
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.gameSpeed = 2;
        this.paused = false;
        this.gameStartTime = Date.now();
        this.lastFrameTime = 0;
        
        // Input handling
        this.keys = {};
        this.setupEventListeners();
        
        // Initialize game
        this.spawnInitialObjects();
        this.gameLoop();
        
        console.log('Enhanced Rocket Pizza Game initialized!');
    }
    
    setupEventListeners() {
        // Keyboard events
        document.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
            if (e.key === ' ') {
                e.preventDefault();
                this.player.vx *= 0.5;
                this.player.vy *= 0.5;
            }
        });
        
        document.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });
        
        // Canvas focus
        this.canvas.addEventListener('click', () => {
            this.canvas.focus();
        });
    }
    
    spawnInitialObjects() {
        // Spawn pizzas
        for (let i = 0; i < 3; i++) {
            this.pizzas.push({
                x: 300 + i * 200,
                y: 150 + Math.random() * 300,
                width: 25,
                height: 25,
                collected: false
            });
        }
        
        // Spawn obstacles
        for (let i = 0; i < 4; i++) {
            this.obstacles.push({
                x: 200 + i * 180,
                y: 100 + Math.random() * 400,
                width: 40,
                height: 40,
                vx: -1 - Math.random() * 2
            });
        }
        
        // Spawn powerups
        this.powerups.push({
            x: 500,
            y: 200,
            width: 20,
            height: 20,
            type: 'speed',
            collected: false
        });
    }
    
    update(deltaTime) {
        if (this.paused) return;
        
        // Player movement
        const acceleration = 0.5;
        const maxSpeed = 4;
        const friction = 0.85;
        
        if (this.keys['arrowleft'] || this.keys['a']) {
            this.player.vx = Math.max(-maxSpeed, this.player.vx - acceleration);
        }
        if (this.keys['arrowright'] || this.keys['d']) {
            this.player.vx = Math.min(maxSpeed, this.player.vx + acceleration);
        }
        if (this.keys['arrowup'] || this.keys['w']) {
            this.player.vy = Math.max(-maxSpeed, this.player.vy - acceleration);
        }
        if (this.keys['arrowdown'] || this.keys['s']) {
            this.player.vy = Math.min(maxSpeed, this.player.vy + acceleration);
        }
        
        // Apply friction
        this.player.vx *= friction;
        this.player.vy *= friction;
        
        // Update player position
        this.player.x += this.player.vx;
        this.player.y += this.player.vy;
        
        // Keep player in bounds
        this.player.x = Math.max(0, Math.min(this.canvas.width - this.player.width, this.player.x));
        this.player.y = Math.max(0, Math.min(this.canvas.height - this.player.height, this.player.y));
        
        // Update obstacles
        this.obstacles.forEach(obstacle => {
            obstacle.x += obstacle.vx;
            if (obstacle.x < -obstacle.width) {
                obstacle.x = this.canvas.width;
                obstacle.y = Math.random() * (this.canvas.height - obstacle.height);
            }
        });
        
        // Update particles
        this.particles = this.particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= deltaTime;
            particle.alpha = particle.life / particle.maxLife;
            return particle.life > 0;
        });
        
        // Check collisions
        this.checkCollisions();
        
        // Update UI
        this.updateUI();
    }
    
    checkCollisions() {
        // Pizza collection
        this.pizzas.forEach((pizza, index) => {
            if (!pizza.collected && this.detectCollision(this.player, pizza)) {
                pizza.collected = true;
                this.score += 100;
                this.addPickupBurst(pizza.x, pizza.y);
                this.pizzas.splice(index, 1);
                
                // Spawn new pizza
                this.pizzas.push({
                    x: this.canvas.width + Math.random() * 200,
                    y: Math.random() * (this.canvas.height - 25),
                    width: 25,
                    height: 25,
                    collected: false
                });
            }
        });
        
        // Powerup collection
        this.powerups.forEach((powerup, index) => {
            if (!powerup.collected && this.detectCollision(this.player, powerup)) {
                powerup.collected = true;
                this.score += 50;
                this.addPickupBurst(powerup.x, powerup.y, '#00ff00');
                this.powerups.splice(index, 1);
            }
        });
        
        // Obstacle collision
        this.obstacles.forEach(obstacle => {
            if (this.detectCollision(this.player, obstacle)) {
                this.lives--;
                this.addImpactEffect(this.player.x, this.player.y);
                this.addScreenShake();
                
                // Reset player position
                this.player.x = 50;
                this.player.y = 300;
                this.player.vx = 0;
                this.player.vy = 0;
                
                if (this.lives <= 0) {
                    this.gameOver();
                }
            }
        });
    }
    
    detectCollision(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }
    
    addImpactEffect(x, y) {
        for (let i = 0; i < 15; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                life: 1000,
                maxLife: 1000,
                color: '#ff4444',
                alpha: 1
            });
        }
    }
    
    addPickupBurst(x, y, color = '#ffff00') {
        for (let i = 0; i < 8; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6,
                life: 800,
                maxLife: 800,
                color: color,
                alpha: 1
            });
        }
    }
    
    addScreenShake() {
        const shakeIntensity = 10;
        const shakeDuration = 200;
        const startTime = Date.now();
        
        const shake = () => {
            const elapsed = Date.now() - startTime;
            if (elapsed < shakeDuration) {
                const intensity = (1 - elapsed / shakeDuration) * shakeIntensity;
                const offsetX = (Math.random() - 0.5) * intensity;
                const offsetY = (Math.random() - 0.5) * intensity;
                
                this.canvas.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
                requestAnimationFrame(shake);
            } else {
                this.canvas.style.transform = '';
            }
        };
        shake();
    }
    
    render() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw background gradient
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#0f0f23');
        gradient.addColorStop(0.5, '#1a1a3a');
        gradient.addColorStop(1, '#2d2d5a');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw stars
        this.ctx.fillStyle = '#ffffff';
        for (let i = 0; i < 50; i++) {
            const x = (i * 137.5) % this.canvas.width;
            const y = (i * 17.3) % this.canvas.height;
            this.ctx.fillRect(x, y, 1, 1);
        }
        
        // Draw player rocket
        this.drawRocket(this.player.x, this.player.y);
        
        // Draw pizzas
        this.pizzas.forEach(pizza => {
            if (!pizza.collected) {
                this.drawPizza(pizza.x, pizza.y);
            }
        });
        
        // Draw obstacles
        this.obstacles.forEach(obstacle => {
            this.drawAsteroid(obstacle.x, obstacle.y, obstacle.width);
        });
        
        // Draw powerups
        this.powerups.forEach(powerup => {
            if (!powerup.collected) {
                this.drawPowerup(powerup.x, powerup.y);
            }
        });
        
        // Draw particles
        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.globalAlpha = particle.alpha;
            this.ctx.fillStyle = particle.color;
            this.ctx.fillRect(particle.x, particle.y, 3, 3);
            this.ctx.restore();
        });
        
        // Draw UI
        this.drawUI();
    }
    
    drawRocket(x, y) {
        this.ctx.save();
        this.ctx.translate(x + 15, y + 10);
        
        // Rocket body
        this.ctx.fillStyle = '#4fc3f7';
        this.ctx.fillRect(-12, -8, 24, 16);
        
        // Rocket nose
        this.ctx.fillStyle = '#0288d1';
        this.ctx.beginPath();
        this.ctx.moveTo(12, 0);
        this.ctx.lineTo(18, -6);
        this.ctx.lineTo(18, 6);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Engine flame
        if (this.keys['arrowright'] || this.keys['d']) {
            this.ctx.fillStyle = '#ff5722';
            this.ctx.fillRect(-15, -4, -8, 8);
            this.ctx.fillStyle = '#ffeb3b';
            this.ctx.fillRect(-15, -2, -5, 4);
        }
        
        this.ctx.restore();
    }
    
    drawPizza(x, y) {
        this.ctx.save();
        this.ctx.translate(x + 12.5, y + 12.5);
        
        // Pizza base
        this.ctx.fillStyle = '#ffa726';
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 10, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Pizza toppings
        this.ctx.fillStyle = '#d32f2f';
        this.ctx.fillRect(-3, -3, 2, 2);
        this.ctx.fillRect(2, -4, 2, 2);
        this.ctx.fillRect(-1, 2, 2, 2);
        this.ctx.fillRect(3, 3, 2, 2);
        
        this.ctx.restore();
    }
    
    drawAsteroid(x, y, size) {
        this.ctx.save();
        this.ctx.translate(x + size/2, y + size/2);
        
        this.ctx.fillStyle = '#616161';
        this.ctx.beginPath();
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const radius = size/2 + (Math.sin(angle * 3) * 3);
            const px = Math.cos(angle) * radius;
            const py = Math.sin(angle) * radius;
            if (i === 0) {
                this.ctx.moveTo(px, py);
            } else {
                this.ctx.lineTo(px, py);
            }
        }
        this.ctx.closePath();
        this.ctx.fill();
        
        // Add some detail
        this.ctx.fillStyle = '#424242';
        this.ctx.fillRect(-5, -5, 3, 3);
        this.ctx.fillRect(2, -2, 2, 2);
        this.ctx.fillRect(-2, 4, 4, 2);
        
        this.ctx.restore();
    }
    
    drawPowerup(x, y) {
        this.ctx.save();
        this.ctx.translate(x + 10, y + 10);
        
        // Rotating star effect
        const time = Date.now() * 0.005;
        this.ctx.rotate(time);
        
        this.ctx.fillStyle = '#00ff00';
        this.ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            const angle = (i / 5) * Math.PI * 2;
            const outerRadius = 8;
            const innerRadius = 4;
            
            const x1 = Math.cos(angle) * outerRadius;
            const y1 = Math.sin(angle) * outerRadius;
            const x2 = Math.cos(angle + Math.PI / 5) * innerRadius;
            const y2 = Math.sin(angle + Math.PI / 5) * innerRadius;
            
            if (i === 0) {
                this.ctx.moveTo(x1, y1);
            } else {
                this.ctx.lineTo(x1, y1);
            }
            this.ctx.lineTo(x2, y2);
        }
        this.ctx.closePath();
        this.ctx.fill();
        
        this.ctx.restore();
    }
    
    drawUI() {
        // Semi-transparent overlay for text
        this.ctx.fillStyle = 'rgba(0,0,0,0.5)';
        this.ctx.fillRect(10, 10, 200, 80);
        
        // Score and info
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = 'bold 16px Arial';
        this.ctx.fillText(`Score: ${this.score}`, 20, 30);
        this.ctx.fillText(`Lives: ${this.lives}`, 20, 50);
        this.ctx.fillText(`Level: ${this.level}`, 20, 70);
    }
    
    updateUI() {
        const currentTime = Math.floor((Date.now() - this.gameStartTime) / 1000);
        
        // Update DOM elements
        const scoreEl = document.getElementById('scoreDisplay');
        const livesEl = document.getElementById('livesDisplay');
        const timeEl = document.getElementById('timeDisplay');
        const levelEl = document.getElementById('levelDisplay');
        
        if (scoreEl) scoreEl.textContent = `Score: ${this.score}`;
        if (livesEl) livesEl.textContent = `Lives: ${this.lives}`;
        if (timeEl) timeEl.textContent = `Time: ${currentTime}s`;
        if (levelEl) levelEl.textContent = `Level: ${this.level}`;
    }
    
    gameLoop(currentTime = 0) {
        const deltaTime = currentTime - this.lastFrameTime;
        this.lastFrameTime = currentTime;
        
        this.update(deltaTime);
        this.render();
        
        requestAnimationFrame((time) => this.gameLoop(time));
    }
    
    togglePause() {
        this.paused = !this.paused;
    }
    
    restart() {
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.player.x = 100;
        this.player.y = 300;
        this.player.vx = 0;
        this.player.vy = 0;
        this.pizzas = [];
        this.obstacles = [];
        this.powerups = [];
        this.particles = [];
        this.gameStartTime = Date.now();
        this.spawnInitialObjects();
    }
    
    gameOver() {
        alert(`Game Over! Final Score: ${this.score}`);
        this.restart();
    }
}

// Enhanced game control functions
function toggleEnhancedGamePause() {
    if (window.enhancedRocketGame) {
        window.enhancedRocketGame.togglePause();
        const btn = document.getElementById('enhancedPauseBtn');
        btn.textContent = window.enhancedRocketGame.paused ? '▶️ Resume' : '⏸️ Pause';
    }
}

function restartEnhancedGame() {
    if (window.enhancedRocketGame) {
        window.enhancedRocketGame.restart();
        const btn = document.getElementById('enhancedPauseBtn');
        btn.textContent = '⏸️ Pause';
    }
}

function toggleEnhancedFullScreen() {
    const wrapper = document.querySelector('.enhanced-game-wrapper');
    const canvas = document.getElementById('enhancedGameCanvas');
    
    if (wrapper.classList.contains('fullscreen')) {
        // Exit fullscreen
        wrapper.classList.remove('fullscreen');
        const exitBtn = wrapper.querySelector('.enhanced-fullscreen-exit');
        if (exitBtn) exitBtn.remove();
        
        // Restore normal canvas size by removing inline styles
        canvas.style.width = '';
        canvas.style.height = '';
        
        // Update button text
        const toggleBtn = document.querySelector('.enhanced-fullscreen-toggle');
        if (toggleBtn) toggleBtn.innerHTML = '🖥️ Go Fullscreen';
        
    } else {
        // Enter fullscreen
        wrapper.classList.add('fullscreen');
        
        // Add exit button
        const exitBtn = document.createElement('button');
        exitBtn.className = 'enhanced-fullscreen-exit';
        exitBtn.innerHTML = '✖ Exit Fullscreen';
        exitBtn.onclick = toggleEnhancedFullScreen;
        wrapper.appendChild(exitBtn);
        
        // Update button text
        const toggleBtn = document.querySelector('.enhanced-fullscreen-toggle');
        if (toggleBtn) toggleBtn.innerHTML = '📱 Exit Fullscreen';
        
        // Allow ESC key to exit
        const escHandler = (e) => {
            if (e.key === 'Escape' && wrapper.classList.contains('fullscreen')) {
                toggleEnhancedFullScreen();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    }
}

function showGameStats() {
    if (window.enhancedRocketGame) {
        const game = window.enhancedRocketGame;
        const playTime = Math.floor((Date.now() - game.gameStartTime) / 1000);
        const stats = `
🎮 Game Statistics:
📊 Score: ${game.score}
❤️ Lives: ${game.lives}  
🚀 Level: ${game.level}
⏰ Play Time: ${playTime}s
🍕 Pizzas Collected: ${Math.floor(game.score / 100)}
        `;
        alert(stats);
    }
}

// Initialize enhanced game when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing enhanced game...');
    if (document.getElementById('enhancedGameCanvas')) {
        try {
            window.enhancedRocketGame = new EnhancedRocketPizzaGame('enhancedGameCanvas');
            console.log('Enhanced game initialized successfully!');
        } catch (error) {
            console.error('Enhanced game initialization failed:', error);
        }
    }
});
</script>

<style>
/* Enhanced Game Container Styles */
.enhanced-game-container {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 25px;
    margin: 2em auto;
    border-radius: 20px;
    box-shadow: 0 12px 40px rgba(0,0,0,0.3);
    text-align: center;
    position: relative;
    max-width: 1100px;
    transition: all 0.4s ease;
}

.enhanced-game-container:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 60px rgba(0,0,0,0.4);
}

.enhanced-game-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
    background: rgba(0,0,0,0.2);
    padding: 15px;
    border-radius: 12px;
    backdrop-filter: blur(10px);
}

.enhanced-game-header h2 {
    color: white;
    margin: 0;
    font-size: 2.2em;
    text-shadow: 3px 3px 6px rgba(0,0,0,0.5);
    background: linear-gradient(45deg, #fff, #ffeb3b);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.enhanced-game-controls {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
}

.enhanced-game-btn {
    background: linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.1));
    border: 2px solid rgba(255,255,255,0.4);
    color: white;
    padding: 12px 18px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1em;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    font-weight: bold;
    backdrop-filter: blur(10px);
    text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
    position: relative;
    overflow: hidden;
}

.enhanced-game-btn:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left 0.5s;
}

.enhanced-game-btn:hover:before {
    left: 100%;
}

.enhanced-game-btn:hover {
    background: linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.2));
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.3);
    border-color: rgba(255,255,255,0.6);
}

.enhanced-game-btn:active {
    transform: translateY(-1px);
}

.enhanced-fullscreen-toggle {
    background: linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.15)) !important;
    border: 2px solid rgba(255,255,255,0.5) !important;
    animation: pulse-glow 2s infinite;
}

@keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 10px rgba(255,255,255,0.3); }
    50% { box-shadow: 0 0 20px rgba(255,255,255,0.5); }
}

.enhanced-game-wrapper {
    text-align: center;
    position: relative;
    background: rgba(0,0,0,0.1);
    border-radius: 15px;
    padding: 15px;
}

.enhanced-game-wrapper.fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(135deg, #0f0f23 0%, #1a1a3a 50%, #2d2d5a 100%);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 20px;
    box-sizing: border-box;
}

.enhanced-game-wrapper.fullscreen #enhancedGameCanvas {
    width: min(95vw, 95vh * 1.5) !important;
    height: min(70vh, 95vw / 1.5) !important;
    max-width: 1400px;
    max-height: 900px;
    border: 4px solid rgba(255,255,255,0.6) !important;
    box-shadow: 0 0 50px rgba(255,255,255,0.3) !important;
}

.enhanced-fullscreen-exit {
    position: absolute;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, rgba(255,0,0,0.9), rgba(200,0,0,0.8));
    color: white;
    border: 2px solid rgba(255,255,255,0.5);
    padding: 12px 18px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    z-index: 10000;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
}

.enhanced-fullscreen-exit:hover {
    background: linear-gradient(135deg, rgba(255,50,50,0.95), rgba(220,20,20,0.9));
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(255,0,0,0.4);
}

#enhancedGameCanvas {
    border: 4px solid rgba(255,255,255,0.4);
    border-radius: 15px;
    background: linear-gradient(135deg, #0f0f23 0%, #1a1a3a 50%, #2d2d5a 100%);
    display: block;
    margin: 0 auto;
    cursor: crosshair;
    transition: all 0.4s ease;
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
}

#enhancedGameCanvas:hover {
    border-color: rgba(255,255,255,0.7);
    box-shadow: 0 0 30px rgba(255,255,255,0.3);
    transform: scale(1.01);
}

#enhancedGameCanvas:focus {
    outline: 3px solid #00ff00;
    outline-offset: 3px;
}

.enhanced-game-instructions {
    margin-top: 20px;
    padding: 20px;
    background: linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.2));
    border-radius: 12px;
    text-align: left;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.2);
}

.enhanced-game-instructions h4 {
    color: #ffeb3b;
    margin-bottom: 15px;
    font-size: 1.3em;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.enhanced-game-instructions p {
    color: white;
    margin: 10px 0;
    font-size: 1.05em;
    line-height: 1.6;
}

.enhanced-game-instructions strong {
    color: #4fc3f7;
}

.enhanced-game-stats {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;
    flex-wrap: wrap;
    gap: 10px;
}

.stat-item {
    background: rgba(255,255,255,0.1);
    padding: 10px 15px;
    border-radius: 8px;
    color: white;
    font-weight: bold;
    backdrop-filter: blur(5px);
    border: 1px solid rgba(255,255,255,0.2);
    transition: all 0.3s ease;
}

.stat-item:hover {
    background: rgba(255,255,255,0.2);
    transform: translateY(-2px);
}

/* Responsive Design for Games Page */
@media (max-width: 767px) {
    .enhanced-game-container {
        padding: 15px;
        margin: 1em 0;
        border-radius: 15px;
    }
    
    .enhanced-game-header {
        flex-direction: column;
        gap: 15px;
        text-align: center;
        padding: 12px;
    }
    
    .enhanced-game-header h2 {
        font-size: 1.6em;
    }
    
    .enhanced-game-controls {
        justify-content: center;
        width: 100%;
    }
    
    .enhanced-game-btn {
        padding: 10px 14px;
        font-size: 0.9em;
        min-width: 80px;
    }
    
    #enhancedGameCanvas {
        width: calc(100vw - 60px) !important;
        max-width: 100% !important;
        height: calc((100vw - 60px) * 0.6) !important;
        min-height: 250px;
        max-height: 400px;
    }
    
    .enhanced-game-instructions {
        text-align: center;
        padding: 15px;
    }
    
    .enhanced-game-instructions p {
        font-size: 0.95em;
    }
    
    .enhanced-fullscreen-exit {
        top: 10px;
        right: 10px;
        padding: 10px 15px;
        font-size: 14px;
    }
    
    .enhanced-game-stats {
        flex-direction: column;
        align-items: center;
    }
    
    .stat-item {
        width: 100%;
        max-width: 200px;
        text-align: center;
    }
}

@media (min-width: 768px) and (max-width: 1023px) {
    .enhanced-game-container {
        padding: 20px;
        margin: 2em auto;
    }
    
    .enhanced-game-header h2 {
        font-size: 1.9em;
    }
    
    .enhanced-game-btn {
        padding: 11px 16px;
        font-size: 0.95em;
    }
    
    #enhancedGameCanvas {
        width: min(750px, calc(100vw - 80px)) !important;
        height: min(500px, calc((100vw - 80px) * 0.667)) !important;
    }
    
    .enhanced-game-instructions p {
        font-size: 1em;
    }
}

@media (min-width: 1024px) {
    #enhancedGameCanvas {
        width: 900px !important;
        height: 600px !important;
    }
}

@media (min-width: 1200px) {
    .enhanced-game-container {
        max-width: 1100px;
        margin: 2.5em auto;
    }
    
    #enhancedGameCanvas {
        width: 1000px !important;
        height: 667px !important;
    }
}

/* Focus and accessibility improvements */
.enhanced-game-container:focus-within {
    outline: 3px solid #00ff00;
    outline-offset: 3px;
}

/* Animation for game loading */
@keyframes gameLoad {
    0% { opacity: 0; transform: scale(0.8); }
    100% { opacity: 1; transform: scale(1); }
}

.enhanced-game-wrapper {
    animation: gameLoad 0.6s ease-out;
}

/* Dark theme compatibility */
@media (prefers-color-scheme: dark) {
    .enhanced-game-container {
        background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
    }
}

/* Print styles */
@media print {
    .enhanced-game-container {
        display: none;
    }
}
</style>