---
title: "Charles Whetstone - Data Scientist & AI Engineer"
layout: single
author_profile: true
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/header-bg.jpg
  actions:
    - label: "View My Work"
      url: "/projects/"
    - label: "Read Articles"
      url: "/articles/"
excerpt: "Transforming data into actionable insights through machine learning, AI, and advanced analytics"
feature_row:
  - image_path: /assets/images/ai-safety-thumb.jpg
    alt: "AI Safety Evaluation"
    title: "AI Safety Research"
    excerpt: "Advanced evaluation frameworks for AI system safety and alignment"
    url: "/projects/ai-safety-evaluation/"
    btn_label: "Learn More"
    btn_class: "btn--primary"
  - image_path: /assets/images/voice-coach-thumb.jpg
    alt: "AI Voice Coach"
    title: "AI Voice Coach"
    excerpt: "Multimodal AI system for personalized voice and presentation coaching"
    url: "/projects/ai-voice-coach/"
    btn_label: "Learn More"
    btn_class: "btn--primary"
  - image_path: /assets/images/location-discovery-thumb.jpg
    alt: "Location Discovery"
    title: "Amazon Location Discovery"
    excerpt: "Geospatial analytics and location-based insights using AWS services"
    url: "/projects/amazon-location-discovery/"
    btn_label: "Learn More"
    btn_class: "btn--primary"
---

## Welcome to My Portfolio

I'm a Forensics Engineer with expertise in data analytics, eDiscovery, machine learning, deep learning, and AI. My work focuses on solving real-world problems and drive innovation. I am an AI enthusist and will often use it as a coding buddy to help me innovate and complete projects quicker. 

{% include feature_row %}

## Pizza Delivery Space Adventure 🚀

Test your skills in this fast-paced space shooter game! Deliver pizzas while avoiding obstacles and enemies.

<div class="game-container" style="text-align: center; margin: 30px auto; max-width: 1200px;">
  <canvas id="pizzaGame" width="900" height="600" style="border: 2px solid #333; background: linear-gradient(to bottom, #000428 0%, #004e92 100%); display: block; margin: 0 auto; max-width: 100%; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);"></canvas>
  
  <div style="margin: 15px 0; color: #666; font-size: 14px;">
    Use <strong>WASD</strong> or <strong>Arrow Keys</strong> to move • <strong>Space</strong> to shoot
  </div>
</div>

<style>
@media (min-width: 1200px) {
  .game-container {
    max-width: 1000px;
  }
  #pizzaGame {
    width: 900px;
    height: 600px;
  }
}

@media (max-width: 900px) {
  #pizzaGame {
    width: 100%;
    height: auto;
    max-height: 400px;
  }
}

@media (max-width: 600px) {
  #pizzaGame {
    max-height: 300px;
  }
}
</style>
<strong>Controls:</strong> Arrow Keys or WASD to move • Space to shoot • Mouse click to restart
</div>

<script>
class PizzaGame {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.error(`Canvas with id "${canvasId}" not found!`);
            return;
        }
        
        this.ctx = this.canvas.getContext('2d');
        if (!this.ctx) {
            console.error('Failed to get 2D context from canvas!');
            return;
        }
        
        // Set canvas dimensions explicitly
        this.canvas.width = 900;
        this.canvas.height = 600;
        
        console.log(`Canvas initialized: ${this.canvas.width}x${this.canvas.height}`);
        
        // Game state
        this.player = {
            x: 50,
            y: this.canvas.height / 2 - 25,
            width: 50,
            height: 50,
            speed: 5,
            health: 3
        };
        
        this.bullets = [];
        this.enemies = [];
        this.powerUps = [];
        this.particles = [];
        this.effects = [];
        this.stars = [];
        
        this.score = 0;
        this.level = 1;
        this.gameRunning = true;
        this.gameOver = false;
        this.keys = {};
        
        // Speed boost
        this.speedBoost = false;
        this.speedBoostTimer = 0;
        
        // Initialize stars
        this.initStars();
        
        // Event listeners
        this.setupEventListeners();
        
        // Start game loop
        this.gameLoop();
    }
    
    initStars() {
        for (let i = 0; i < 100; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speed: Math.random() * 2 + 1
            });
        }
    }
    
    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
            if (e.code === 'Space') {
                e.preventDefault();
                if (this.gameRunning && !this.gameOver) {
                    this.shoot();
                }
            }
        });
        
        document.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
        
        this.canvas.addEventListener('click', (e) => {
            if (this.gameOver) {
                this.restartGame();
            }
        });
    }
    
    restartGame() {
        // Reset all game state
        this.player = {
            x: 50,
            y: this.canvas.height / 2 - 25,
            width: 50,
            height: 50,
            speed: 5,
            health: 3
        };
        
        this.bullets = [];
        this.enemies = [];
        this.powerUps = [];
        this.particles = [];
        this.effects = [];
        
        this.score = 0;
        this.level = 1;
        this.gameRunning = true;
        this.gameOver = false;
        this.speedBoost = false;
        this.speedBoostTimer = 0;
        
        // Reinitialize stars
        this.initStars();
    }
    
    shoot() {
        this.bullets.push({
            x: this.player.x + this.player.width,
            y: this.player.y + this.player.height / 2 - 5,
            width: 15,
            height: 10,
            speed: 8
        });
        
        // Add muzzle flash effect
        this.effects.push({
            x: this.player.x + this.player.width,
            y: this.player.y + this.player.height / 2,
            text: 'PEW!',
            emoji: '💥',
            timer: 15,
            maxTimer: 15
        });
    }
    
    update() {
        if (this.gameOver || !this.gameRunning) return;
        
        // Handle input
        const currentSpeed = this.speedBoost ? this.player.speed * 2 : this.player.speed;
        
        if (this.keys['ArrowUp'] || this.keys['KeyW']) {
            this.player.y = Math.max(0, this.player.y - currentSpeed);
        }
        if (this.keys['ArrowDown'] || this.keys['KeyS']) {
            this.player.y = Math.min(this.canvas.height - this.player.height, this.player.y + currentSpeed);
        }
        if (this.keys['ArrowLeft'] || this.keys['KeyA']) {
            this.player.x = Math.max(0, this.player.x - currentSpeed);
        }
        if (this.keys['ArrowRight'] || this.keys['KeyD']) {
            this.player.x = Math.min(this.canvas.width - this.player.width, this.player.x + currentSpeed);
        }
        
        // Update speed boost
        if (this.speedBoost) {
            this.speedBoostTimer--;
            if (this.speedBoostTimer <= 0) {
                this.speedBoost = false;
            }
        }
        
        // Update stars
        this.stars.forEach(star => {
            star.x -= star.speed;
            if (star.x < 0) {
                star.x = this.canvas.width;
                star.y = Math.random() * this.canvas.height;
            }
        });
        
        // Update bullets
        this.bullets = this.bullets.filter(bullet => {
            bullet.x += bullet.speed;
            return bullet.x < this.canvas.width;
        });
        
        // Spawn enemies
        if (Math.random() < 0.02 + (this.level * 0.005)) {
            const enemyTypes = ['👾', '🛸', '💀', '👻', '🦇'];
            this.enemies.push({
                x: this.canvas.width,
                y: Math.random() * (this.canvas.height - 40),
                width: 40,
                height: 40,
                speed: 2 + Math.random() * 2 + (this.level * 0.5),
                emoji: enemyTypes[Math.floor(Math.random() * enemyTypes.length)],
                health: 1 + Math.floor(this.level / 3)
            });
        }
        
        // Update enemies
        this.enemies = this.enemies.filter(enemy => {
            enemy.x -= enemy.speed;
            return enemy.x > -enemy.width && enemy.health > 0;
        });
        
        // Spawn power-ups occasionally
        if (Math.random() < 0.005) {
            const powerUpTypes = ['⚡', '💖', '🍕'];
            this.powerUps.push({
                x: this.canvas.width,
                y: Math.random() * (this.canvas.height - 30),
                width: 30,
                height: 30,
                speed: 3,
                type: powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)]
            });
        }
        
        // Update power-ups
        this.powerUps = this.powerUps.filter(powerUp => {
            powerUp.x -= powerUp.speed;
            return powerUp.x > -powerUp.width;
        });
        
        // Check collisions
        this.checkCollisions();
        
        // Update particles
        this.particles = this.particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life--;
            return particle.life > 0;
        });
        
        // Update effects
        this.effects = this.effects.filter(effect => {
            effect.timer--;
            return effect.timer > 0;
        });
        
        // Level progression
        if (this.score > this.level * 100) {
            this.level++;
            this.effects.push({
                x: this.canvas.width / 2,
                y: this.canvas.height / 2,
                text: `LEVEL ${this.level}!`,
                emoji: '🎉',
                timer: 60,
                maxTimer: 60
            });
        }
    }
    
    checkCollisions() {
        // Bullet-enemy collisions
        this.bullets.forEach((bullet, bulletIndex) => {
            this.enemies.forEach((enemy, enemyIndex) => {
                if (this.isColliding(bullet, enemy)) {
                    // Create explosion particles
                    this.createExplosion(enemy.x + enemy.width/2, enemy.y + enemy.height/2, '💥');
                    
                    enemy.health--;
                    this.bullets.splice(bulletIndex, 1);
                    
                    if (enemy.health <= 0) {
                        this.enemies.splice(enemyIndex, 1);
                        this.score += 10;
                    }
                }
            });
        });
        
        // Player-enemy collisions
        this.enemies.forEach((enemy, enemyIndex) => {
            if (this.isColliding(this.player, enemy)) {
                this.player.health--;
                this.enemies.splice(enemyIndex, 1);
                this.createExplosion(this.player.x + this.player.width/2, this.player.y + this.player.height/2, '💥');
                
                if (this.player.health <= 0) {
                    this.gameOver = true;
                }
            }
        });
        
        // Player-powerup collisions
        this.powerUps.forEach((powerUp, powerUpIndex) => {
            if (this.isColliding(this.player, powerUp)) {
                this.powerUps.splice(powerUpIndex, 1);
                
                switch (powerUp.type) {
                    case '⚡':
                        this.speedBoost = true;
                        this.speedBoostTimer = 300;
                        break;
                    case '💖':
                        this.player.health = Math.min(3, this.player.health + 1);
                        break;
                    case '🍕':
                        this.score += 50;
                        break;
                }
                
                this.effects.push({
                    x: powerUp.x,
                    y: powerUp.y,
                    text: 'POWER UP!',
                    emoji: powerUp.type,
                    timer: 30,
                    maxTimer: 30
                });
            }
        });
    }
    
    isColliding(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }
    
    createExplosion(x, y, emoji) {
        const chars = ['*', '+', '○', '●', '◇', '◆'];
        for (let i = 0; i < 8; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6,
                char: chars[Math.floor(Math.random() * chars.length)],
                life: 30 + Math.random() * 20,
                color: `hsl(${Math.random() * 360}, 70%, 60%)`
            });
        }
    }
    
    draw() {
        // Clear canvas
        this.ctx.fillStyle = 'rgba(0, 4, 40, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw stars with reduced opacity for less distraction
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        this.stars.forEach(star => {
            this.ctx.fillRect(star.x, star.y, star.size, star.size);
        });
        
        // Draw player rocket ship with custom graphics
        this.ctx.save();
        this.ctx.translate(this.player.x + this.player.width/2, this.player.y + this.player.height/2);
        
        // Rocket ship body - main fuselage (facing right)
        this.ctx.fillStyle = '#e74c3c';
        this.ctx.fillRect(-25, -20, 50, 40);
        
        // Rocket nose cone (triangle pointing right)
        this.ctx.fillStyle = '#c0392b';
        this.ctx.beginPath();
        this.ctx.moveTo(35, 0);  // Point facing right
        this.ctx.lineTo(25, -12);
        this.ctx.lineTo(25, 12);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Rocket fins (on the back left side)
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.fillRect(-25, -25, 12, 15);  // Top fin
        this.ctx.fillRect(-25, 10, 12, 15);   // Bottom fin
        
        // Window (on the side)
        this.ctx.fillStyle = '#3498db';
        this.ctx.fillRect(-8, -8, 16, 16);
        
        // Flame from engines (coming from the back/left side)
        if (this.keys['ArrowUp'] || this.keys['KeyW'] || this.keys['ArrowDown'] || this.keys['KeyS'] || 
            this.keys['ArrowLeft'] || this.keys['KeyA'] || this.keys['ArrowRight'] || this.keys['KeyD']) {
            this.ctx.fillStyle = '#f39c12';
            this.ctx.fillRect(-35, -6, 12, 6);   // Top engine flame
            this.ctx.fillRect(-35, 0, 12, 6);    // Bottom engine flame
            this.ctx.fillStyle = '#e67e22';
            this.ctx.fillRect(-30, -4, 8, 3);    // Inner flame top
            this.ctx.fillRect(-30, 1, 8, 3);     // Inner flame bottom
        }
        
        this.ctx.restore();
        
        // Draw health bar
        this.drawHealthBar();
        
        // Draw bullets with enhanced effects
        this.bullets.forEach(bullet => {
            this.ctx.save();
            this.ctx.translate(bullet.x + bullet.width/2, bullet.y + bullet.height/2);
            
            // Energy bullet with glow effect
            this.ctx.shadowColor = '#f39c12';
            this.ctx.shadowBlur = 10;
            this.ctx.fillStyle = '#f39c12';
            this.ctx.fillRect(-7, -4, 14, 8);
            
            this.ctx.shadowBlur = 0;
            this.ctx.restore();
        });
        
        // Draw enemies with custom graphics (RED/ANGULAR = DANGEROUS!)
        this.enemies.forEach(enemy => {
            this.ctx.save();
            this.ctx.translate(enemy.x + enemy.width/2, enemy.y + enemy.height/2);
            
            // All enemies use red/dark threatening colors and angular shapes
            if (enemy.emoji === '👾') {
                // Alien invader - spiky red danger
                this.ctx.fillStyle = '#c0392b';
                this.ctx.fillRect(-15, -15, 30, 30);
                this.ctx.fillStyle = '#e74c3c';
                this.ctx.fillRect(-12, -12, 24, 24);
                // Spiky edges
                this.ctx.fillRect(-18, -5, 6, 10);
                this.ctx.fillRect(12, -5, 6, 10);
                this.ctx.fillRect(-5, -18, 10, 6);
                this.ctx.fillRect(-5, 12, 10, 6);
                // Angry red eyes
                this.ctx.fillStyle = '#8b0000';
                this.ctx.fillRect(-8, -8, 4, 4);
                this.ctx.fillRect(4, -8, 4, 4);
            } else if (enemy.emoji === '🛸') {
                // UFO - menacing red saucer
                this.ctx.fillStyle = '#8b0000';
                this.ctx.fillRect(-18, -8, 36, 16);
                this.ctx.fillStyle = '#c0392b';
                this.ctx.fillRect(-12, -12, 24, 8);
                // Threatening red lights
                this.ctx.fillStyle = '#ff0000';
                this.ctx.fillRect(-8, -4, 4, 4);
                this.ctx.fillRect(4, -4, 4, 4);
                // Sharp edges
                this.ctx.fillRect(-22, -2, 8, 4);
                this.ctx.fillRect(14, -2, 8, 4);
            } else {
                // Generic enemy - dark red angular threat
                this.ctx.fillStyle = '#8b0000';
                this.ctx.fillRect(-15, -15, 30, 30);
                // Spiky appearance
                this.ctx.fillStyle = '#c0392b';
                this.ctx.fillRect(-12, -8, 24, 16);
                this.ctx.fillRect(-8, -12, 16, 24);
            }
                this.ctx.fillStyle = '#d35400';
                this.ctx.fillRect(-8, -8, 16, 16);
            }
            
            this.ctx.restore();
        });
        
        // Draw power-ups with custom graphics (BRIGHT/ROUND = HELPFUL!)
        this.powerUps.forEach(powerUp => {
            this.ctx.save();
            this.ctx.translate(powerUp.x + powerUp.width/2, powerUp.y + powerUp.height/2);
            
            // All power-ups use bright colors and friendly round shapes
            if (powerUp.type === '⚡') {
                // Lightning bolt - bright yellow/gold with glow
                this.ctx.shadowColor = '#f1c40f';
                this.ctx.shadowBlur = 10;
                this.ctx.fillStyle = '#f1c40f';
                // Circular base
                this.ctx.fillRect(-12, -12, 24, 24);
                this.ctx.fillStyle = '#fff';
                // Lightning shape inside circle
                this.ctx.fillRect(-6, -10, 4, 6);
                this.ctx.fillRect(-2, -4, 6, 6);
                this.ctx.fillRect(-4, 2, 4, 6);
                this.ctx.shadowBlur = 0;
            } else if (powerUp.type === '💖') {
                // Heart - bright pink with white highlights
                this.ctx.shadowColor = '#e91e63';
                this.ctx.shadowBlur = 8;
                this.ctx.fillStyle = '#e91e63';
                // Heart shape with circles
                this.ctx.fillRect(-12, -8, 24, 16);
                this.ctx.fillRect(-8, -12, 8, 8);
                this.ctx.fillRect(0, -12, 8, 8);
                // White highlight
                this.ctx.fillStyle = '#fff';
                this.ctx.fillRect(-8, -8, 4, 4);
                this.ctx.shadowBlur = 0;
            } else {
                // Pizza slice - warm orange with friendly colors
                this.ctx.shadowColor = '#f39c12';
                this.ctx.shadowBlur = 8;
                this.ctx.fillStyle = '#f39c12';
                // Circular pizza base
                this.ctx.fillRect(-12, -12, 24, 24);
                this.ctx.fillStyle = '#e67e22';
                this.ctx.fillRect(-10, -10, 20, 20);
                // Colorful toppings
                this.ctx.fillStyle = '#c0392b';
                this.ctx.fillRect(-6, -6, 3, 3);
                this.ctx.fillRect(3, -3, 3, 3);
                this.ctx.fillStyle = '#27ae60';
                this.ctx.fillRect(-3, 2, 3, 3);
                this.ctx.shadowBlur = 0;
            }
                this.ctx.lineTo(10, 8);
                this.ctx.closePath();
                this.ctx.fill();
                this.ctx.fillStyle = '#e74c3c';
                this.ctx.fillRect(-4, -2, 3, 3);
                this.ctx.fillRect(1, 2, 3, 3);
            }
            
            this.ctx.restore();
        });
        
        // Draw particles
        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.fillStyle = particle.color;
            this.ctx.font = '12px Arial';
            this.ctx.fillText(particle.char, particle.x, particle.y);
            this.ctx.restore();
        });
        
        // Draw effects
        this.effects.forEach(effect => {
            this.ctx.save();
            this.ctx.translate(effect.x, effect.y);
            
            const alpha = effect.timer / effect.maxTimer;
            this.ctx.globalAlpha = alpha;
            
            this.ctx.fillStyle = '#f1c40f';
            this.ctx.font = 'bold 16px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(effect.text, -20, 0);
            
            this.ctx.restore();
        });
        
        // Draw health bar
        this.drawHealthBar();
        
        // Draw UI
        this.drawUI();
        
        // Draw game over screen
        if (this.gameOver) {
            this.drawGameOverScreen();
        }
    }
    
    drawHealthBar() {
        const x = 10;
        const y = this.canvas.height - 70;  // Move up more for larger bar
        
        // Background bar (larger)
        this.ctx.fillStyle = '#34495e';
        this.ctx.fillRect(x, y, 200, 30);  // Increased from 150x20 to 200x30
        
        // Health fill (larger)
        this.ctx.fillStyle = this.player.health > 1 ? '#27ae60' : '#e74c3c';
        this.ctx.fillRect(x + 3, y + 3, (194 * this.player.health) / 3, 24);  // Adjusted for new size
        
        // Health text (larger)
        this.ctx.fillStyle = '#ecf0f1';
        this.ctx.font = 'bold 16px Arial';  // Increased from 12px
        this.ctx.fillText('💗 Health', x, y - 8);
        
        // Health number indicator
        this.ctx.font = 'bold 14px Arial';
        this.ctx.fillText(`${this.player.health}/3`, x + 150, y + 20);
    }
    
    drawUI() {
        // Score
        this.ctx.fillStyle = '#ecf0f1';
        this.ctx.font = 'bold 18px Arial';
        const scoreText = `Score: ${this.score}`;
        this.ctx.fillText(scoreText, 10, 30);
        
        // Level
        this.ctx.fillStyle = '#f39c12';
        this.ctx.font = 'bold 16px Arial';
        const levelText = `Level ${this.level}`;
        this.ctx.fillText(levelText, this.canvas.width - 120, 30);
        
        // Title in bottom left
        this.ctx.fillStyle = '#95a5a6';
        this.ctx.font = '12px Arial';
        const titleText = 'Pizza Delivery Space Adventure';
        this.ctx.fillText(titleText, 10, this.canvas.height - 10);
        
        // Speed boost indicator
        if (this.speedBoost) {
            this.ctx.fillStyle = '#f1c40f';
            this.ctx.font = 'bold 14px Arial';
            this.ctx.fillText('SPEED BOOST!', this.canvas.width - 150, this.canvas.height - 10);
        }
    }
    
    drawGameOverScreen() {
        // Semi-transparent overlay
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Game Over text
        this.ctx.fillStyle = '#e74c3c';
        this.ctx.font = 'bold 48px Arial';
        this.ctx.textAlign = 'center';
        const gameOverText = 'GAME OVER';
        this.ctx.fillText(gameOverText, this.canvas.width/2, this.canvas.height/2 - 60);
        
        // Final score
        this.ctx.fillStyle = '#f39c12';
        this.ctx.font = 'bold 24px Arial';
        const finalScoreText = `Final Score: ${this.score}`;
        this.ctx.fillText(finalScoreText, this.canvas.width/2, this.canvas.height/2 - 10);
        
        // Level reached
        this.ctx.fillStyle = '#3498db';
        this.ctx.font = 'bold 20px Arial';
        const levelText = `Level Reached: ${this.level}`;
        this.ctx.fillText(levelText, this.canvas.width/2, this.canvas.height/2 + 30);
        
        // Restart instruction
        this.ctx.fillStyle = '#95a5a6';
        this.ctx.font = 'bold 18px Arial';
        const restartText = 'Click to Play Again';
        this.ctx.fillText(restartText, this.canvas.width/2, this.canvas.height/2 + 80);
        
        // Reset text alignment
        this.ctx.textAlign = 'left';
    }
    
    gameLoop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Initialize the game
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, checking for game canvas...');
    const canvas = document.getElementById('pizzaGame');
    if (canvas) {
        console.log('Canvas found, initializing game...');
        try {
            const game = new PizzaGame('pizzaGame');
            console.log('Game initialized successfully!');
        } catch (error) {
            console.error('Error initializing game:', error);
        }
    } else {
        console.error('Canvas element with id "pizzaGame" not found!');
    }
});
</script>

## Latest Articles from Medium

<div id="medium-articles" style="margin: 40px 0;">
  <h3>Recent Publications</h3>
  <div id="articles-container">
    <p>Loading latest articles...</p>
  </div>
</div>

<script>
// Fetch Medium articles
async function fetchMediumArticles() {
    try {
        const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/@charleswhetstone/feed');
        const data = await response.json();
        
        if (data.status === 'ok') {
            displayArticles(data.items.slice(0, 3)); // Show latest 3 articles
        }
    } catch (error) {
        console.error('Error fetching articles:', error);
        document.getElementById('articles-container').innerHTML = '<p>Unable to load articles at this time.</p>';
    }
}

function displayArticles(articles) {
    const container = document.getElementById('articles-container');
    
    const articlesHTML = articles.map(article => {
        const date = new Date(article.pubDate).toLocaleDateString();
        const description = article.description.replace(/<[^>]*>/g, '').substring(0, 150) + '...';
        
        return `
            <div style="border: 1px solid #333; border-radius: 8px; padding: 20px; margin: 15px 0; background: rgba(255,255,255,0.05);">
                <h4 style="margin-top: 0;"><a href="${article.link}" target="_blank" style="color: #4CAF50; text-decoration: none;">${article.title}</a></h4>
                <p style="color: #ccc; font-size: 14px; margin: 10px 0;">${date}</p>
                <p style="color: #aaa; line-height: 1.6;">${description}</p>
                <a href="${article.link}" target="_blank" style="color: #4CAF50; text-decoration: none; font-weight: bold;">Read More →</a>
            </div>
        `;
    }).join('');
    
    container.innerHTML = articlesHTML;
}

// Load articles when page loads
document.addEventListener('DOMContentLoaded', fetchMediumArticles);
</script>
