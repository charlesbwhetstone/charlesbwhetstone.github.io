---
permalink: /pizza-game/
title: "Pizza Delivery Adventure - Full Screen"
layout: single
classes: wide
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
---

<div class="fullscreen-game-container">
  <div class="game-header">
    <h1>Pizza Delivery Adventure</h1>
    <div class="game-controls">
      <button onclick="toggleGamePause()" class="game-btn" id="pauseBtn">Pause</button>
      <button onclick="restartGame()" class="game-btn">Restart</button>
      <button onclick="toggleFullscreen()" class="game-btn">Fullscreen</button>
      <a href="/" class="game-btn">← Back to Portfolio</a>
    </div>
  </div>
  
  <div class="game-wrapper">
    <canvas id="gameCanvas" width="1200" height="600"></canvas>
    <div class="game-instructions">
      <h3>How to Play:</h3>
      <p><strong>↑↓ Arrow Keys:</strong> Move your delivery bike up and down</p>
      <p><strong>SPACE:</strong> Boost speed (use wisely!)</p>
      <p><strong>Goal:</strong> Collect pizzas while avoiding obstacles</p>
      <p><strong>Scoring:</strong> Each pizza = 10 points. Speed boost increases challenge!</p>
    </div>
  </div>
</div>

<script>
// Same PizzaGame class as above, but optimized for fullscreen
class PizzaGame {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.gameRunning = false;
    this.paused = false;
    this.score = 0;
    this.speed = 3;
    this.highScore = localStorage.getItem('pizzaGameHighScore') || 0;
    
    // Player (pizza delivery person)
    this.player = {
      x: 80,
      y: 300,
      width: 50,
      height: 50,
      dy: 0,
      grounded: false
    };
    
    // Game objects
    this.obstacles = [];
    this.pizzas = [];
    this.particles = [];
    this.powerups = [];
    
    // Controls
    this.keys = {};
    
    this.init();
  }
  
  init() {
    // Event listeners
    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;
      if (e.code === 'Space') e.preventDefault();
    });
    
    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });
    
    // Start the game
    this.gameRunning = true;
    this.gameLoop();
  }
  
  update() {
    if (this.paused) return;
    
    // Player movement
    if (this.keys['ArrowUp'] && this.player.y > 0) {
      this.player.y -= 4;
    }
    if (this.keys['ArrowDown'] && this.player.y < this.canvas.height - this.player.height) {
      this.player.y += 4;
    }
    if (this.keys['Space']) {
      this.speed = Math.min(this.speed + 0.1, 8);
    } else {
      this.speed = Math.max(this.speed - 0.05, 3);
    }
    
    // Spawn obstacles (more challenging)
    if (Math.random() < 0.025) {
      this.obstacles.push({
        x: this.canvas.width,
        y: Math.random() * (this.canvas.height - 80) + 40,
        width: 40,
        height: 40,
        type: 'obstacle'
      });
    }
    
    // Spawn pizzas to collect
    if (Math.random() < 0.02) {
      this.pizzas.push({
        x: this.canvas.width,
        y: Math.random() * (this.canvas.height - 60) + 30,
        width: 30,
        height: 30
      });
    }
    
    // Spawn power-ups occasionally
    if (Math.random() < 0.005) {
      this.powerups.push({
        x: this.canvas.width,
        y: Math.random() * (this.canvas.height - 40) + 20,
        width: 35,
        height: 35,
        type: 'shield'
      });
    }
    
    // Update obstacles
    this.obstacles = this.obstacles.filter(obstacle => {
      obstacle.x -= this.speed;
      return obstacle.x + obstacle.width > 0;
    });
    
    // Update pizzas
    this.pizzas = this.pizzas.filter(pizza => {
      pizza.x -= this.speed;
      
      // Check pizza collection
      if (this.checkCollision(this.player, pizza)) {
        this.score += 10;
        this.createParticles(pizza.x, pizza.y, 'P', 'gold');
        return false;
      }
      
      return pizza.x + pizza.width > 0;
    });
    
    // Update powerups
    this.powerups = this.powerups.filter(powerup => {
      powerup.x -= this.speed;
      
      // Check powerup collection
      if (this.checkCollision(this.player, powerup)) {
        this.score += 25;
        this.createParticles(powerup.x, powerup.y, '⭐', 'cyan');
        return false;
      }
      
      return powerup.x + powerup.width > 0;
    });
    
    // Check obstacle collisions
    for (let obstacle of this.obstacles) {
      if (this.checkCollision(this.player, obstacle)) {
        this.gameOver();
        return;
      }
    }
    
    // Update particles
    this.particles = this.particles.filter(particle => {
      particle.x += particle.dx;
      particle.y += particle.dy;
      particle.life--;
      return particle.life > 0;
    });
  }
  
  render() {
    // Clear canvas with animated background
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    gradient.addColorStop(0, '#1e3c72');
    gradient.addColorStop(0.5, '#2a5298');
    gradient.addColorStop(1, '#87CEEB');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw moving clouds
    this.ctx.fillStyle = 'rgba(255,255,255,0.3)';
    for (let i = 0; i < 5; i++) {
      const x = ((Date.now() * 0.01) + i * 200) % (this.canvas.width + 100) - 50;
      this.ctx.fillText('☁️', x, 50 + i * 30);
    }
    
    // Draw player (enhanced)
    this.ctx.save();
    this.ctx.translate(this.player.x + this.player.width/2, this.player.y + this.player.height/2);
    this.ctx.fillStyle = '#FF6B35';
    this.ctx.fillRect(-this.player.width/2, -this.player.height/2, this.player.width, this.player.height);
    this.ctx.font = '30px Arial';
    this.ctx.fillText('🚲', -15, 10);
    this.ctx.restore();
    
    // Draw obstacles
    this.ctx.font = '35px Arial';
    this.obstacles.forEach(obstacle => {
      this.ctx.fillText('X', obstacle.x, obstacle.y + 30);
    });
    
    // Draw pizzas
    this.ctx.font = '25px Arial';
    this.pizzas.forEach(pizza => {
      this.ctx.fillText('P', pizza.x, pizza.y + 25);
    });
    
    // Draw powerups
    this.ctx.font = '30px Arial';
    this.powerups.forEach(powerup => {
      this.ctx.fillText('⭐', powerup.x, powerup.y + 25);
    });
    
    // Draw particles
    this.ctx.font = '20px Arial';
    this.particles.forEach(particle => {
      this.ctx.globalAlpha = particle.life / 40;
      this.ctx.fillStyle = particle.color || 'gold';
      this.ctx.fillText(particle.emoji, particle.x, particle.y);
    });
    this.ctx.globalAlpha = 1;
    
    // Draw enhanced UI
    this.ctx.fillStyle = 'white';
    this.ctx.font = 'bold 28px Arial';
    this.ctx.fillText(`Score: ${this.score}`, 20, 40);
    this.ctx.fillText(`Speed: ${this.speed.toFixed(1)}x`, 20, 75);
    this.ctx.fillText(`High Score: ${this.highScore}`, 20, 110);
    
    if (this.paused && !this.gameOver) {
      this.ctx.fillStyle = 'rgba(0,0,0,0.7)';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = 'white';
      this.ctx.font = 'bold 48px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('PAUSED', this.canvas.width/2, this.canvas.height/2);
      this.ctx.font = '24px Arial';
      this.ctx.fillText('Press Resume to continue', this.canvas.width/2, this.canvas.height/2 + 50);
      this.ctx.textAlign = 'left';
    }
  }
  
  checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
  }
  
  createParticles(x, y, emoji, color = 'gold') {
    for (let i = 0; i < 5; i++) {
      this.particles.push({
        x: x,
        y: y,
        dx: (Math.random() - 0.5) * 6,
        dy: (Math.random() - 0.5) * 6,
        life: 40,
        emoji: emoji,
        color: color
      });
    }
  }
  
  gameOver() {
    this.paused = true;
    this.gameOver = true;
    
    // Update high score
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('pizzaGameHighScore', this.highScore);
    }
    
    this.ctx.fillStyle = 'rgba(255,0,0,0.8)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'white';
    this.ctx.font = 'bold 48px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('GAME OVER!', this.canvas.width/2, this.canvas.height/2 - 50);
    this.ctx.font = '32px Arial';
    this.ctx.fillText(`Final Score: ${this.score}`, this.canvas.width/2, this.canvas.height/2);
    this.ctx.fillText(`High Score: ${this.highScore}`, this.canvas.width/2, this.canvas.height/2 + 40);
    this.ctx.font = '24px Arial';
    this.ctx.fillText('Click Restart to play again!', this.canvas.width/2, this.canvas.height/2 + 80);
    this.ctx.textAlign = 'left';
  }
  
  restart() {
    this.score = 0;
    this.speed = 3;
    this.player.x = 80;
    this.player.y = 300;
    this.obstacles = [];
    this.pizzas = [];
    this.particles = [];
    this.powerups = [];
    this.paused = false;
    this.gameOver = false;
  }
  
  togglePause() {
    if (!this.gameOver) {
      this.paused = !this.paused;
    }
  }
  
  gameLoop() {
    if (this.gameRunning) {
      this.update();
      this.render();
      requestAnimationFrame(() => this.gameLoop());
    }
  }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('gameCanvas')) {
    window.pizzaGame = new PizzaGame('gameCanvas');
  }
});

// Game control functions
function toggleGamePause() {
  if (window.pizzaGame) {
    window.pizzaGame.togglePause();
    const btn = document.getElementById('pauseBtn');
    btn.textContent = window.pizzaGame.paused ? '▶️ Resume' : '⏸️ Pause';
  }
}

function restartGame() {
  if (window.pizzaGame) {
    window.pizzaGame.restart();
    const btn = document.getElementById('pauseBtn');
    btn.textContent = '⏸️ Pause';
  }
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}
</script>

<style>
.fullscreen-game-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  padding: 20px;
  margin: 1em 0;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
  min-height: 80vh;
}

.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.game-header h1 {
  color: white;
  margin: 0;
  font-size: 2em;
}

.game-controls {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.game-btn {
  background: rgba(255,255,255,0.2);
  border: 1px solid rgba(255,255,255,0.3);
  color: white;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1em;
  text-decoration: none;
  transition: all 0.3s ease;
}

.game-btn:hover {
  background: rgba(255,255,255,0.3);
  transform: translateY(-2px);
}

.game-wrapper {
  text-align: center;
}

#gameCanvas {
  border: 3px solid rgba(255,255,255,0.3);
  border-radius: 15px;
  background: linear-gradient(135deg, #f0f8ff 0%, #e6f3ff 100%);
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto 20px auto;
}

.game-instructions {
  background: rgba(0,0,0,0.3);
  border-radius: 10px;
  padding: 20px;
  color: white;
  text-align: left;
  max-width: 600px;
  margin: 0 auto;
}

.game-instructions h3 {
  color: #FFD700;
  margin-top: 0;
}

.game-instructions p {
  margin: 10px 0;
  font-size: 1.1em;
}

@media (max-width: 768px) {
  .fullscreen-game-container {
    padding: 15px;
  }
  
  .game-header {
    flex-direction: column;
    gap: 15px;
  }
  
  .game-header h1 {
    font-size: 1.5em;
  }
  
  .game-controls {
    justify-content: center;
  }
  
  #gameCanvas {
    width: 100%;
    max-width: 100%;
  }
}
</style>