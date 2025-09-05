---
layout: home
author_profile: true
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  actions:
    - label: "Get to Know Me"
      url: "/about/"
      btn_class: "btn--primary"
    - label: "Rocket Pizza"
      url: "/pizza-game/"
      btn_class: "btn--info"
excerpt: "Data Scientist & Forensics Engineer passionate about turning data into insights and building meaningful connections"
feature_row:
  - title: "About Me"
    excerpt: "Discover my j        // Spawn enemies with increasing difficulty - UFO back in lineup
        c        // Rocket ship body        // UFO body (custom drawn) - larger
        this.ctx.fillStyle = '#e74c3c';
        this.ctx.fillRect(-35, -30, 60, 60);
        this.ctx.fillStyle = '#c0392b';
        this.ctx.fillRect(-30, -25, 50, 50);
        
        // Rocket nose cone
        this.ctx.fillStyle = '#f39c12';
        this.ctx.fillRect(-20, -35, 30, 15);
        
        // Rocket fins
        this.ctx.fillStyle = '#34495e';
        this.ctx.fillRect(-40, 15, 15, 20);
        this.ctx.fillRect(35, 15, 15, 20);
        
        // Rocket thruster
        this.ctx.fillStyle = '#3498db';
        this.ctx.fillRect(-15, 25, 20, 10);
        
        // Draw rocket with text symbols that work better
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = 'bold 30px Arial';
        this.ctx.fillText('▲', -12, -10);  // Triangle for rocket tiparger
        this.ctx.fillStyle = '#e74c3c';
        this.ctx.fillRect(-35, -30, 60, 60);
        this.ctx.fillStyle = '#c0392b';
        this.ctx.fillRect(-30, -25, 50, 50);
        
        // Rocket nose cone
        this.ctx.fillStyle = '#f39c12';
        this.ctx.fillRect(-20, -35, 30, 15);
        
        // Rocket fins
        this.ctx.fillStyle = '#34495e';
        this.ctx.fillRect(-40, 15, 15, 20);
        this.ctx.fillRect(35, 15, 15, 20);
        
        // Rocket thruster
        this.ctx.fillStyle = '#3498db';
        this.ctx.fillRect(-15, 25, 20, 10);
        
        // Add rocket emoji on top - larger
        this.ctx.font = 'bold 50px Arial';  // Doubled from 25px
        this.ctx.fillText('🚀', -25, 10);Math.min(0.4 + (this.level * 0.1), 0.8);
        if (Math.random() < enemyChance) {
            const enemyTypes = [
                { emoji: '●', size: 40, health: 1, speed: 1, color: '#8e44ad' },        // Space invader (circle)
                { emoji: '◉', size: 45, health: 2, speed: 1.5, color: '#3498db' },      // UFO (double circle)
                { emoji: '✦', size: 35, health: 1, speed: 2.5, color: '#e74c3c' },     // Spider (star)
                { emoji: '🦂', size: 45, health: 2, speed: 1.2, color: '#f39c12' },    // Scorpion (should work)
                { emoji: '👽', size: 35, health: 1, speed: 2, color: '#2ecc71' },      // Alien (should work)
                { emoji: '🤖', size: 50, health: 3, speed: 0.8, color: '#34495e' }     // Robot (should work)
            ];
            const enemyType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];sions, hobbies, and what makes me tick beyond just the professional realm."
    url: "/about/"
    btn_label: "Learn More"
    btn_class: "btn--primary"
  - title: "Data Projects"
    excerpt: "Explore my data science and analytics projects including AI safety evaluation, voice coaching systems, and predictive modeling."
    url: "/projects/"
    btn_label: "View Projects"
    btn_class: "btn--primary"
  - title: "Pizza Game 🍕"
    excerpt: "Try my retro-style pizza delivery side-scroller game! A fun creative project showcasing interactive development skills."
    url: "/pizza-game/"
    btn_label: "Play Game"
    btn_class: "btn--success"
  - title: "Technical Articles"
    excerpt: "Read my latest insights on data science, machine learning, and technology trends on Medium."
    url: "/articles/"
    btn_label: "Read Articles"
    btn_class: "btn--info"
---

{% include feature_row %}

## Welcome to My Digital Playground! 🎮

I'm Charles Whetstone, a Data Scientist and Forensics Engineer who believes in the power of data to tell stories and create positive change. This portfolio is a window into both my professional work and personal passions.

Experience my pizza delivery game right here, or **[play fullscreen](/pizza-game/)** for the complete experience:

<style>
  .game-container {
    text-align: center;
    background: linear-gradient(45deg, #2c3e50, #34495e);
    padding: 20px;
    border-radius: 10px;
    margin: 20px 0;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  }
  .game-canvas {
    border: 3px solid #e74c3c;
    border-radius: 8px;
    background: #000;
    max-width: 100%;
    height: auto;
  }
  .game-controls {
    margin-top: 15px;
    color: #ecf0f1;
    font-size: 14px;
  }
  .play-fullscreen {
    margin-top: 15px;
  }
  .play-fullscreen a {
    background: linear-gradient(45deg, #e74c3c, #c0392b);
    color: white;
    padding: 12px 25px;
    text-decoration: none;
    border-radius: 25px;
    font-weight: bold;
    display: inline-block;
    transition: all 0.3s ease;
    box-shadow: 0 4px 10px rgba(231, 76, 60, 0.3);
  }
  .play-fullscreen a:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(231, 76, 60, 0.4);
  }
</style>

<div class="game-container">
  <canvas id="pizzaGame" class="game-canvas" width="800" height="400"></canvas>
  <div class="game-controls">
    <strong>Controls:</strong> WASD or Arrow Keys to move • Spacebar to shoot • Collect pizzas to deliver! 🍕<br>
    <small>Click on the game to focus it and prevent page scrolling</small>
  </div>
  <div class="play-fullscreen">
    <a href="/pizza-game/">🍕 Play Fullscreen Experience 🍕</a>
  </div>
</div>

<script>
// Pizza Game - Enhanced Version with Better UI
class PizzaGame {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.gameRunning = false;
        this.keys = {};
        this.score = 0;
        this.gameSpeed = 2;
        this.level = 1;
        this.enemiesDestroyed = 0;
        
        // Visual effects
        this.backgroundStars = [];
        this.soundEffects = [];
        
        // Game objects
        this.player = {
            x: 50,
            y: this.canvas.height / 2 - 50,
            width: 100,  // Doubled from 50
            height: 100, // Doubled from 50
            speed: 5,
            health: 3,
            maxHealth: 3
        };
        
        this.pizzas = [];
        this.enemies = [];
        this.bullets = [];
        this.particles = [];
        this.powerUps = [];
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.createBackgroundStars();
        this.start();
    }
    
    createBackgroundStars() {
        for (let i = 0; i < 100; i++) {
            this.backgroundStars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 0.5,
                speed: Math.random() * 0.5 + 0.1,
                twinkle: Math.random() * 100
            });
        }
    }
    
    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            // Prevent default behavior for game controls
            if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'ArrowDown' || 
                e.key === 'ArrowLeft' || e.key === 'ArrowRight' ||
                e.key.toLowerCase() === 'w' || e.key.toLowerCase() === 'a' || 
                e.key.toLowerCase() === 's' || e.key.toLowerCase() === 'd') {
                e.preventDefault();
            }
            
            this.keys[e.key.toLowerCase()] = true;
            this.keys[e.code] = true;
        });
        
        document.addEventListener('keyup', (e) => {
            // Prevent default behavior for game controls
            if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'ArrowDown' || 
                e.key === 'ArrowLeft' || e.key === 'ArrowRight' ||
                e.key.toLowerCase() === 'w' || e.key.toLowerCase() === 'a' || 
                e.key.toLowerCase() === 's' || e.key.toLowerCase() === 'd') {
                e.preventDefault();
            }
            
            this.keys[e.key.toLowerCase()] = false;
            this.keys[e.code] = false;
        });
        
        // Also prevent default on the canvas itself
        this.canvas.addEventListener('keydown', (e) => e.preventDefault());
        this.canvas.addEventListener('keyup', (e) => e.preventDefault());
        
        // Make canvas focusable so it can receive keyboard events
        this.canvas.setAttribute('tabindex', '0');
        
        // Focus the canvas when clicked so keyboard events work
        this.canvas.addEventListener('click', () => {
            this.canvas.focus();
        });
    }
    
    start() {
        this.gameRunning = true;
        this.gameLoop();
        this.spawnTimer();
    }
    
    gameLoop() {
        if (!this.gameRunning) return;
        
        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }
    
    update() {
        // Player movement
        if (this.keys['w'] || this.keys['ArrowUp']) {
            this.player.y = Math.max(0, this.player.y - this.player.speed);
        }
        if (this.keys['s'] || this.keys['ArrowDown']) {
            this.player.y = Math.min(this.canvas.height - this.player.height, 
                                   this.player.y + this.player.speed);
        }
        if (this.keys['a'] || this.keys['ArrowLeft']) {
            this.player.x = Math.max(0, this.player.x - this.player.speed);
        }
        if (this.keys['d'] || this.keys['ArrowRight']) {
            this.player.x = Math.min(this.canvas.width - this.player.width, 
                                   this.player.x + this.player.speed);
        }
        
        // Shooting
        if (this.keys[' '] || this.keys['Space']) {
            this.shoot();
        }
        
        // Update background stars
        this.updateBackgroundStars();
        
        // Update game objects
        this.updateBullets();
        this.updateEnemies();
        this.updatePizzas();
        this.updatePowerUps();
        this.updateParticles();
        this.updateSoundEffects();
        this.checkCollisions();
        
        // Level progression
        if (this.enemiesDestroyed > 0 && this.enemiesDestroyed % 10 === 0 && this.enemiesDestroyed / 10 > this.level - 1) {
            this.level++;
            this.gameSpeed = Math.min(this.gameSpeed + 0.5, 5);
            this.createSoundEffect(this.canvas.width / 2, this.canvas.height / 2, '🆙', 'LEVEL UP!');
        }
    }
    
    updateBackgroundStars() {
        this.backgroundStars.forEach(star => {
            star.x -= star.speed;
            star.twinkle += 2;
            if (star.x < 0) {
                star.x = this.canvas.width;
                star.y = Math.random() * this.canvas.height;
            }
        });
    }
    
    updateSoundEffects() {
        for (let i = this.soundEffects.length - 1; i >= 0; i--) {
            const effect = this.soundEffects[i];
            effect.life--;
            effect.y -= 2; // Float upward
            effect.scale += 0.02;
            
            if (effect.life <= 0) {
                this.soundEffects.splice(i, 1);
            }
        }
    }
    
    updatePowerUps() {
        for (let i = this.powerUps.length - 1; i >= 0; i--) {
            const powerUp = this.powerUps[i];
            powerUp.x -= this.gameSpeed;
            powerUp.rotation += 0.1;
            
            if (powerUp.x + powerUp.width < 0) {
                this.powerUps.splice(i, 1);
            }
        }
    }
    
    shoot() {
        const now = Date.now();
        if (!this.lastShot || now - this.lastShot > 200) {
            this.bullets.push({
                x: this.player.x + this.player.width,
                y: this.player.y + this.player.height / 2 - 2,
                width: 15,
                height: 8,
                speed: 8,
                type: 'energy'
            });
            this.createSoundEffect(this.player.x + this.player.width, this.player.y + this.player.height / 2, '💥', 'PEW!');
            this.lastShot = now;
        }
    }
    
    createSoundEffect(x, y, emoji, text) {
        this.soundEffects.push({
            x: x,
            y: y,
            emoji: emoji,
            text: text,
            life: 30,
            scale: 1
        });
    }
    
    updateBullets() {
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            const bullet = this.bullets[i];
            bullet.x += bullet.speed;
            
            if (bullet.x > this.canvas.width) {
                this.bullets.splice(i, 1);
            }
        }
    }
    
    updateEnemies() {
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            const enemy = this.enemies[i];
            enemy.x -= this.gameSpeed;
            
            if (enemy.x + enemy.width < 0) {
                this.enemies.splice(i, 1);
            }
        }
    }
    
    updatePizzas() {
        for (let i = this.pizzas.length - 1; i >= 0; i--) {
            const pizza = this.pizzas[i];
            pizza.x -= this.gameSpeed;
            
            if (pizza.x + pizza.width < 0) {
                this.pizzas.splice(i, 1);
            }
        }
    }
    
    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= 2;
            
            if (particle.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }
    
    checkCollisions() {
        // Bullet vs Enemy collisions
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            const bullet = this.bullets[i];
            for (let j = this.enemies.length - 1; j >= 0; j--) {
                const enemy = this.enemies[j];
                if (this.collision(bullet, enemy)) {
                    this.createExplosion(enemy.x + enemy.width/2, enemy.y + enemy.height/2);
                    this.createSoundEffect(enemy.x + enemy.width/2, enemy.y + enemy.height/2, '💥', 'BOOM!');
                    this.bullets.splice(i, 1);
                    
                    enemy.health--;
                    if (enemy.health <= 0) {
                        this.enemies.splice(j, 1);
                        this.enemiesDestroyed++;
                        this.score += 10;
                    }
                    break;
                }
            }
        }
        
        // Player vs Pizza collisions
        for (let i = this.pizzas.length - 1; i >= 0; i--) {
            const pizza = this.pizzas[i];
            if (this.collision(this.player, pizza)) {
                this.createPickupEffect(pizza.x + pizza.width/2, pizza.y + pizza.height/2);
                this.createSoundEffect(pizza.x + pizza.width/2, pizza.y + pizza.height/2, '✨', 'YUM!');
                this.pizzas.splice(i, 1);
                this.score += 50;
            }
        }
        
        // Player vs Power-up collisions
        for (let i = this.powerUps.length - 1; i >= 0; i--) {
            const powerUp = this.powerUps[i];
            if (this.collision(this.player, powerUp)) {
                this.createPickupEffect(powerUp.x + powerUp.width/2, powerUp.y + powerUp.height/2);
                this.createSoundEffect(powerUp.x + powerUp.width/2, powerUp.y + powerUp.height/2, '⚡', 'POWER!');
                this.powerUps.splice(i, 1);
                
                // Apply power-up effect
                if (powerUp.type === '●' && this.player.health < this.player.maxHealth) {
                    this.player.health++;
                } else if (powerUp.type === '⚡') {
                    this.player.speed = Math.min(this.player.speed + 1, 8);
                } else {
                    this.score += 25;
                }
            }
        }
        
        // Player vs Enemy collisions
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            const enemy = this.enemies[i];
            if (this.collision(this.player, enemy)) {
                this.createExplosion(this.player.x + this.player.width/2, 
                                   this.player.y + this.player.height/2);
                this.createSoundEffect(this.player.x + this.player.width/2, 
                                     this.player.y + this.player.height/2, '💢', 'OUCH!');
                this.player.health--;
                this.enemies.splice(i, 1);
                
                if (this.player.health <= 0) {
                    this.createSoundEffect(this.canvas.width / 2, this.canvas.height / 2, '💀', 'GAME OVER!');
                    // Reset for embedded version
                    this.player.health = this.player.maxHealth;
                    this.score = Math.max(0, this.score - 50);
                }
            }
        }
    }
    
    collision(obj1, obj2) {
        return obj1.x < obj2.x + obj2.width &&
               obj1.x + obj1.width > obj2.x &&
               obj1.y < obj2.y + obj2.height &&
               obj1.y + obj1.height > obj2.y;
    }
    
    createExplosion(x, y) {
        for (let i = 0; i < 8; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6,
                life: 60,
                type: 'explosion'
            });
        }
    }
    
    createPickupEffect(x, y) {
        for (let i = 0; i < 5; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                life: 40,
                type: 'pickup'
            });
        }
    }
    
    spawnTimer() {
        if (!this.gameRunning) return;
        
        // Spawn enemies with increasing difficulty - replaced UFO with spiders and scorpions
        const enemyChance = Math.min(0.4 + (this.level * 0.1), 0.8);
        if (Math.random() < enemyChance) {
            const enemyTypes = [
                { emoji: '👾', size: 40, health: 1, speed: 1 },
                { emoji: '�️', size: 35, health: 1, speed: 2.5 },
                { emoji: '🦂', size: 45, health: 2, speed: 1.2 },
                { emoji: '👽', size: 35, health: 1, speed: 2 },
                { emoji: '🤖', size: 50, health: 3, speed: 0.8 }
            ];
            const enemyType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
            
            this.enemies.push({
                x: this.canvas.width,
                y: Math.random() * (this.canvas.height - enemyType.size),
                width: enemyType.size,
                height: enemyType.size,
                emoji: enemyType.emoji,
                color: enemyType.color,
                health: enemyType.health,
                maxHealth: enemyType.health,
                speed: enemyType.speed
            });
        }
        
        // Spawn pizzas - doubled size
        if (Math.random() < 0.15) {
            this.pizzas.push({
                x: this.canvas.width,
                y: Math.random() * (this.canvas.height - 60),
                width: 60,  // Doubled from 30
                height: 60, // Doubled from 30
                rotation: 0
            });
        }
        
        // Spawn power-ups occasionally
        if (Math.random() < 0.05) {
            const powerUpTypes = ['●', '⚡', '♦', '★'];  // Using more reliable symbols
            this.powerUps.push({
                x: this.canvas.width,
                y: Math.random() * (this.canvas.height - 25),
                width: 25,
                height: 25,
                type: powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)],
                rotation: 0
            });
        }
        
        setTimeout(() => this.spawnTimer(), 800 - (this.level * 50));
    }
    
    draw() {
        // Create animated space background
        const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
        gradient.addColorStop(0, '#0f0f23');
        gradient.addColorStop(0.3, '#1e1e3f');
        gradient.addColorStop(0.7, '#2d1b69');
        gradient.addColorStop(1, '#1a1a2e');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw animated background stars
        this.backgroundStars.forEach(star => {
            this.ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + Math.sin(star.twinkle * 0.1) * 0.3})`;
            this.ctx.fillRect(star.x, star.y, star.size, star.size);
        });
        
        // Draw player rocket ship with custom graphics and health - doubled size
        this.ctx.save();
        this.ctx.translate(this.player.x + this.player.width/2, this.player.y + this.player.height/2);
        
        // UFO body (custom drawn) - larger
        this.ctx.fillStyle = '#3498db';
        this.ctx.fillRect(-40, -25, 70, 50);
        this.ctx.fillStyle = '#2980b9';
        this.ctx.fillRect(-35, -20, 60, 40);
        
        // UFO dome
        this.ctx.fillStyle = '#85c1e9';
        this.ctx.fillRect(-30, -30, 50, 25);
        
        // UFO lights
        this.ctx.fillStyle = '#f1c40f';
        this.ctx.fillRect(-25, -15, 8, 8);
        this.ctx.fillRect(0, -15, 8, 8);
        this.ctx.fillRect(25, -15, 8, 8);
        
        // Add UFO emoji on top - larger
        this.ctx.font = 'bold 50px Arial';  // Doubled from 25px
        this.ctx.fillText('�', -25, 10);
        
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
            
            // Add lightning emoji
            this.ctx.shadowBlur = 0;
            this.ctx.font = 'bold 16px Arial';
            this.ctx.fillText('⚡', -8, 5);
            
            this.ctx.restore();
        });
        
        // Draw enemies with variety and health indicators
        this.enemies.forEach(enemy => {
            this.ctx.save();
            this.ctx.translate(enemy.x + enemy.width/2, enemy.y + enemy.height/2);
            
            // Enemy glow effect using enemy color
            this.ctx.shadowColor = enemy.color || '#8e44ad';
            this.ctx.shadowBlur = 8;
            
            // Draw enemy with fallback - try emoji first, then colored shape
            this.ctx.font = `bold ${enemy.width - 5}px Arial`;
            this.ctx.fillStyle = enemy.color || '#8e44ad';
            
            // Draw background shape first
            this.ctx.fillRect(-enemy.width/2 + 5, -enemy.height/2 + 5, enemy.width - 10, enemy.height - 10);
            
            // Try to draw emoji on top
            this.ctx.fillStyle = '#000000';
            this.ctx.fillText(enemy.emoji, -enemy.width/2 + 2, enemy.height/2 - 5);
            
            this.ctx.shadowBlur = 0;
            this.ctx.restore();
            
            // Draw enemy health bar if damaged
            if (enemy.health < enemy.maxHealth) {
                this.drawEnemyHealthBar(enemy);
            }
        });
        
        // Draw pizzas with rotation animation - doubled size
        this.pizzas.forEach(pizza => {
            pizza.rotation += 0.1;
            this.ctx.save();
            this.ctx.translate(pizza.x + pizza.width/2, pizza.y + pizza.height/2);
            this.ctx.rotate(pizza.rotation);
            
            // Pizza with glow - larger
            this.ctx.shadowColor = '#f39c12';
            this.ctx.shadowBlur = 8;
            this.ctx.font = 'bold 50px Arial';  // Doubled from 25px
            this.ctx.fillText('🍕', -25, 15);   // Adjusted position for larger size
            
            this.ctx.restore();
        });
        
        // Draw power-ups with rotation
        this.powerUps.forEach(powerUp => {
            this.ctx.save();
            this.ctx.translate(powerUp.x + powerUp.width/2, powerUp.y + powerUp.height/2);
            this.ctx.rotate(powerUp.rotation);
            
            // Draw background circle first
            this.ctx.fillStyle = '#2ecc71';
            this.ctx.fillRect(-10, -10, 20, 20);
            
            this.ctx.shadowColor = '#2ecc71';
            this.ctx.shadowBlur = 8;
            this.ctx.font = 'bold 22px Arial';
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fillText(powerUp.type, -8, 7);
            
            this.ctx.restore();
        });
        
        // Draw particles with enhanced effects - simplified explosions
        this.particles.forEach(particle => {
            this.ctx.font = '12px Arial';
            this.ctx.globalAlpha = particle.life / 60;
            
            if (particle.type === 'explosion') {
                const explosionChars = ['💥', '🔥'];  // Simplified to only these two
                const char = explosionChars[Math.floor(particle.x + particle.y) % explosionChars.length];
                this.ctx.fillText(char, particle.x, particle.y);
            } else if (particle.type === 'pickup') {
                const pickupChars = ['⭐', '🌟', '✨', '💫'];
                const char = pickupChars[Math.floor(particle.x + particle.y) % pickupChars.length];
                this.ctx.fillText(char, particle.x, particle.y);
            } else {
                const defaultChars = ['✨', '💫', '⭐', '🌟'];
                const char = defaultChars[Math.floor(particle.x + particle.y) % defaultChars.length];
                this.ctx.fillText(char, particle.x, particle.y);
            }
        });
        this.ctx.globalAlpha = 1;
        
        // Draw sound effects
        this.soundEffects.forEach(effect => {
            this.ctx.save();
            this.ctx.translate(effect.x, effect.y);
            this.ctx.scale(effect.scale, effect.scale);
            this.ctx.globalAlpha = effect.life / 30;
            
            this.ctx.font = 'bold 16px Arial';
            this.ctx.fillStyle = '#ffff00';
            this.ctx.strokeStyle = '#000000';
            this.ctx.lineWidth = 2;
            this.ctx.strokeText(effect.text, -20, 0);
            this.ctx.fillText(effect.text, -20, 0);
            
            this.ctx.font = 'bold 20px Arial';
            this.ctx.fillText(effect.emoji, -10, -20);
            
            this.ctx.restore();
        });
        
        // Enhanced UI
        this.drawUI();
    }
    
    drawHealthBar() {
        const barWidth = 100;
        const barHeight = 8;
        const x = 10;
        const y = 50;
        
        // Background
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(x - 2, y - 2, barWidth + 4, barHeight + 4);
        
        // Health bar
        const healthPercent = this.player.health / this.player.maxHealth;
        this.ctx.fillStyle = healthPercent > 0.5 ? '#2ecc71' : healthPercent > 0.25 ? '#f39c12' : '#e74c3c';
        this.ctx.fillRect(x, y, barWidth * healthPercent, barHeight);
        
        // Border
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(x, y, barWidth, barHeight);
        
        // Label
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = 'bold 12px Arial';
        this.ctx.fillText('💗 Health', x, y - 5);
    }
    
    drawEnemyHealthBar(enemy) {
        const barWidth = enemy.width;
        const barHeight = 4;
        const x = enemy.x;
        const y = enemy.y - 8;
        
        const healthPercent = enemy.health / enemy.maxHealth;
        this.ctx.fillStyle = '#e74c3c';
        this.ctx.fillRect(x, y, barWidth * healthPercent, barHeight);
        
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(x, y, barWidth, barHeight);
    }
    
    drawUI() {
        // Enhanced score display
        this.ctx.fillStyle = '#ffffff';
        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = 3;
        this.ctx.font = 'bold 28px Arial';
        
        const scoreText = `Score: ${this.score}`;
        this.ctx.strokeText(scoreText, 10, 30);
        this.ctx.fillText(scoreText, 10, 30);
        
        // Level display
        this.ctx.font = 'bold 20px Arial';
        const levelText = `Level: ${this.level}`;
        this.ctx.strokeText(levelText, this.canvas.width - 120, 30);
        this.ctx.fillText(levelText, this.canvas.width - 120, 30);
        
        // Game title with emoji - updated for rocket ship theme
        this.ctx.fillStyle = '#ffdd59';
        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = 2;
        this.ctx.font = 'bold 18px Arial';
        const titleText = '� Rocket Pizza Delivery 🍕';
        this.ctx.strokeText(titleText, 10, this.canvas.height - 10);
        this.ctx.fillText(titleText, 10, this.canvas.height - 10);
        
        // Speed indicator
        if (this.player.speed > 5) {
            this.ctx.fillStyle = '#3498db';
            this.ctx.font = 'bold 14px Arial';
            this.ctx.fillText('⚡ SPEED BOOST!', this.canvas.width - 150, this.canvas.height - 10);
        }
    }
}

// Start the game when page loads
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('pizzaGame')) {
        new PizzaGame('pizzaGame');
    }
});
</script>

## Recent Updates

Stay tuned for new projects and articles as I continue to explore the intersection of data science, technology, and life's adventures.

<!-- Medium RSS Feed Integration -->
<div id="medium-articles" class="recent-articles">
  <h3>Latest Articles</h3>
  <div id="medium-feed"></div>
</div>

<script>
async function loadMediumArticles() {
    try {
        const rssUrl = 'https://medium.com/feed/@groundcontrolcharles';
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`);
        const data = await response.json();
        
        const feedContainer = document.getElementById('medium-feed');
        
        if (data.items && data.items.length > 0) {
            feedContainer.innerHTML = data.items.slice(0, 3).map(article => `
                <div class="article-preview">
                    <h4><a href="${article.link}" target="_blank">${article.title}</a></h4>
                    <p class="article-date">${new Date(article.pubDate).toLocaleDateString()}</p>
                    <p>${article.description.replace(/<[^>]*>/g, '').substring(0, 150)}...</p>
                </div>
            `).join('');
        } else {
            feedContainer.innerHTML = '<p>Articles coming soon...</p>';
        }
    } catch (error) {
        console.error('Error loading Medium articles:', error);
        document.getElementById('medium-feed').innerHTML = '<p>Articles coming soon...</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadMediumArticles);
</script>

<style>
/* Game Styles */
.game-container {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 15px;
    padding: 20px;
    margin: 2em 0;
    box-shadow: 0 8px 32px rgba(0,0,0,0.1);
    border: 1px solid rgba(255,255,255,0.1);
}

.game-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    flex-wrap: wrap;
}

.game-header h3 {
    color: white;
    margin: 0;
    font-size: 1.5em;
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
    padding: 8px 12px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.9em;
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
    border-radius: 10px;
    background: #f0f8ff;
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
}

.game-instructions {
    margin-top: 10px;
    padding: 10px;
    background: rgba(0,0,0,0.2);
    border-radius: 8px;
}

.game-instructions p {
    color: white;
    margin: 0;
    font-size: 0.9em;
}

/* Medium Articles Styles */
.recent-articles {
    margin-top: 2em;
    padding: 1em;
    background: var(--background-color);
    border-radius: 8px;
}

.article-preview {
    margin-bottom: 1.5em;
    padding-bottom: 1em;
    border-bottom: 1px solid var(--border-color);
}

.article-preview:last-child {
    border-bottom: none;
}

.article-date {
    font-size: 0.9em;
    color: var(--muted-text-color);
    margin: 0.5em 0;
}

/* Responsive design */
@media (max-width: 768px) {
    .game-container {
        padding: 15px;
    }
    
    .game-header {
        flex-direction: column;
        gap: 10px;
    }
    
    .game-controls {
        justify-content: center;
    }
    
    #gameCanvas {
        width: 100%;
        max-width: 400px;
        height: 200px;
    }
}
</style>
