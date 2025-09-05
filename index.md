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
    - label: "Play Pizza Game 🍕"
      url: "/pizza-game/"
      btn_class: "btn--info"
excerpt: "Data Scientist & Forensics Engineer passionate about turning data into insights and building meaningful connections"
feature_row:
  - title: "About Me"
    excerpt: "Discover my journey, passions, hobbies, and what makes me tick beyond just the professional realm."
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

I'm Charles Whetstone, a Data Scientist and Forensics Engineer who believes in the power of data to tell stories and create positive change. This portfolio showcases both my professional work and creative projects - like the space pizza delivery game below!

## Featured Project: 🚀 Rocket Pizza Delivery 🍕

Test your piloting skills in this retro-style space adventure! Navigate your rocket ship through enemy territory while collecting delicious pizzas. Built with HTML5 Canvas and pure JavaScript.

<div class="game-container">
  <div class="game-header">
    <h3>🚀 Rocket Pizza Delivery 🍕</h3>
    <div class="game-controls">
      <button onclick="toggleGamePause()" class="game-btn" id="pauseBtn">⏸️ Pause</button>
      <button onclick="restartGame()" class="game-btn">🔄 Restart</button>
      <a href="/pizza-game/" class="game-btn fullscreen-btn" target="_blank">🖥️ Play Full Screen</a>
    </div>
  </div>
  
  <div class="game-wrapper">
    <canvas id="gameCanvas" width="900" height="600"></canvas>
    <div class="game-instructions">
      <p><strong>Controls:</strong></p>
      <p>↑↓ Arrow keys: Move rocket up/down | SPACE: Shoot energy blasts | Click canvas to focus</p>
      <p><strong>Mission:</strong> Collect 🍕 pizzas, avoid/destroy red enemies, collect power-ups!</p>
    </div>
  </div>
</div>

<script>
// Rocket Pizza Delivery Game - Enhanced Version
class RocketPizzaGame {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {
      console.error('Canvas element not found!');
      return;
    }
    
    this.ctx = this.canvas.getContext('2d');
    if (!this.ctx) {
      console.error('Could not get 2D context!');
      return;
    }
    
    // Set canvas dimensions explicitly
    this.canvas.width = 900;
    this.canvas.height = 600;
    
    console.log(`Canvas initialized: ${this.canvas.width}x${this.canvas.height}`);
    
    // Game state
    this.gameRunning = false;
    this.paused = false;
    this.showGameOverScreen = false;
    this.gameOverTimer = 0;
    this.score = 0;
    this.level = 1;
    this.speed = 2;
    this.enemiesDestroyed = 0;
    
    // Player (rocket ship)
    this.player = {
      x: 80,
      y: 300,
      width: 100,
      height: 100,
      health: 3,
      maxHealth: 3,
      speed: 5,
      moving: false
    };
    
    // Game objects arrays
    this.bullets = [];
    this.enemies = [];
    this.pizzas = [];
    this.powerups = [];
    this.particles = [];
    this.soundEffects = [];
    this.stars = [];
    
    // Input handling
    this.keys = {};
    
    // Initialize stars for background
    this.initStars();
    this.setupEventListeners();
    this.startGame();
  }
  
  initStars() {
    for (let i = 0; i < 50; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.1
      });
    }
  }
  
  setupEventListeners() {
    // Keyboard events
    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;
      // Prevent default behavior for game control keys
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space', 'KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(e.code)) {
        e.preventDefault();
      }
    });
    
    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });
    
    // Canvas click to focus (prevents page scrolling)
    this.canvas.addEventListener('click', () => {
      this.canvas.focus();
    });
    
    // Make canvas focusable
    this.canvas.setAttribute('tabindex', '0');
  }
  
  startGame() {
    console.log('Starting Rocket Pizza Delivery game...');
    this.gameRunning = true;
    this.gameLoop();
  }
  
  update() {
    if (this.paused || this.showGameOverScreen) {
      if (this.showGameOverScreen) {
        this.gameOverTimer--;
        if (this.gameOverTimer <= 0) {
          this.restart();
        }
      }
      return;
    }
    
    // Player movement
    this.player.moving = false;
    if ((this.keys['ArrowUp'] || this.keys['KeyW']) && this.player.y > 0) {
      this.player.y -= this.player.speed;
      this.player.moving = true;
    }
    if ((this.keys['ArrowDown'] || this.keys['KeyS']) && this.player.y < this.canvas.height - this.player.height) {
      this.player.y += this.player.speed;
      this.player.moving = true;
    }
    if ((this.keys['ArrowLeft'] || this.keys['KeyA']) && this.player.x > 0) {
      this.player.x -= this.player.speed;
      this.player.moving = true;
    }
    if ((this.keys['ArrowRight'] || this.keys['KeyD']) && this.player.x < this.canvas.width - this.player.width) {
      this.player.x += this.player.speed;
      this.player.moving = true;
    }
    
    // Shooting
    if (this.keys['Space']) {
      this.shoot();
    }
    
    // Update game speed based on level
    this.speed = 2 + (this.level * 0.5);
    
    // Spawn enemies with increasing difficulty
    const enemyChance = Math.min(0.02 + (this.level * 0.005), 0.04);
    if (Math.random() < enemyChance) {
      this.spawnEnemy();
    }
    
    // Spawn pizzas
    if (Math.random() < 0.015) {
      this.spawnPizza();
    }
    
    // Spawn power-ups
    if (Math.random() < 0.008) {
      this.spawnPowerup();
    }
    
    // Update all game objects
    this.updateBullets();
    this.updateEnemies();
    this.updatePizzas();
    this.updatePowerups();
    this.updateParticles();
    this.updateSoundEffects();
    this.updateStars();
    
    // Check collisions
    this.checkCollisions();
    
    // Level progression
    if (this.enemiesDestroyed > 0 && this.enemiesDestroyed % 10 === 0) {
      this.levelUp();
    }
  }
  
  shoot() {
    // Limit shooting rate
    const now = Date.now();
    if (!this.lastShot || now - this.lastShot > 200) {
      this.bullets.push({
        x: this.player.x + this.player.width,
        y: this.player.y + this.player.height / 2,
        width: 20,
        height: 8,
        speed: 8
      });
      this.addSoundEffect(this.player.x + this.player.width, this.player.y + this.player.height / 2, 'PEW!', '#ffff00');
      this.lastShot = now;
    }
  }
  
  spawnEnemy() {
    const enemyTypes = [
      { name: 'invader', size: 40, health: 1, speed: 1, color: '#8b0000' },
      { name: 'ufo', size: 45, health: 2, speed: 1.5, color: '#c0392b' },
      { name: 'scout', size: 35, health: 1, speed: 2.5, color: '#8b0000' },
      { name: 'tank', size: 50, health: 3, speed: 0.8, color: '#8b0000' }
    ];
    
    const enemyType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
    this.enemies.push({
      ...enemyType,
      x: this.canvas.width,
      y: Math.random() * (this.canvas.height - enemyType.size - 40) + 20,
      width: enemyType.size,
      height: enemyType.size,
      maxHealth: enemyType.health
    });
  }
  
  spawnPizza() {
    this.pizzas.push({
      x: this.canvas.width,
      y: Math.random() * (this.canvas.height - 60) + 30,
      width: 60,
      height: 60,
      rotation: 0
    });
  }
  
  spawnPowerup() {
    const powerupTypes = ['speed', 'health', 'bonus'];
    const type = powerupTypes[Math.floor(Math.random() * powerupTypes.length)];
    
    this.powerups.push({
      type: type,
      x: this.canvas.width,
      y: Math.random() * (this.canvas.height - 40) + 20,
      width: 35,
      height: 35,
      rotation: 0
    });
  }
  
  updateBullets() {
    this.bullets = this.bullets.filter(bullet => {
      bullet.x += bullet.speed;
      return bullet.x < this.canvas.width + bullet.width;
    });
  }
  
  updateEnemies() {
    this.enemies = this.enemies.filter(enemy => {
      enemy.x -= this.speed * enemy.speed;
      return enemy.x + enemy.width > -50;
    });
  }
  
  updatePizzas() {
    this.pizzas = this.pizzas.filter(pizza => {
      pizza.x -= this.speed;
      pizza.rotation += 0.1;
      return pizza.x + pizza.width > -50;
    });
  }
  
  updatePowerups() {
    this.powerups = this.powerups.filter(powerup => {
      powerup.x -= this.speed;
      powerup.rotation += 0.08;
      return powerup.x + powerup.width > -50;
    });
  }
  
  updateParticles() {
    this.particles = this.particles.filter(particle => {
      particle.x += particle.dx;
      particle.y += particle.dy;
      particle.life--;
      particle.alpha = particle.life / particle.maxLife;
      return particle.life > 0;
    });
  }
  
  updateSoundEffects() {
    this.soundEffects = this.soundEffects.filter(effect => {
      effect.life--;
      effect.y -= 1;
      effect.alpha = effect.life / effect.maxLife;
      return effect.life > 0;
    });
  }
  
  updateStars() {
    this.stars.forEach(star => {
      star.x -= star.speed;
      if (star.x < -5) {
        star.x = this.canvas.width + 5;
        star.y = Math.random() * this.canvas.height;
      }
    });
  }
  
  checkCollisions() {
    // Bullets vs Enemies
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const bullet = this.bullets[i];
      for (let j = this.enemies.length - 1; j >= 0; j--) {
        const enemy = this.enemies[j];
        if (this.detectCollision(bullet, enemy, "tight")) {
          this.bullets.splice(i, 1);
          enemy.health--;
          
          if (enemy.health <= 0) {
            this.enemies.splice(j, 1);
            this.score += 10;
            this.enemiesDestroyed++;
            this.addExplosion(enemy.x + enemy.width/2, enemy.y + enemy.height/2);
            this.addSoundEffect(enemy.x, enemy.y, 'BOOM!', '#ff4444');
          }
          break;
        }
      }
    }
    
    // Player vs Enemies
    this.enemies.forEach((enemy, index) => {
      if (this.detectCollision(this.player, enemy, "loose")) {
        this.player.health--;
        this.enemies.splice(index, 1);
        this.addSoundEffect(this.player.x, this.player.y, 'OUCH!', '#ff0000');
        
        if (this.player.health <= 0) {
          this.gameOver();
        }
      }
    });
    
    // Player vs Pizzas
    this.pizzas.forEach((pizza, index) => {
      if (this.detectCollision(this.player, pizza, "circle")) {
        this.pizzas.splice(index, 1);
        this.score += 20;
        this.addSoundEffect(pizza.x, pizza.y, 'YUM!', '#ffa500');
        this.addPickupEffect(pizza.x + pizza.width/2, pizza.y + pizza.height/2);
      }
    });
    
    // Player vs Power-ups
    this.powerups.forEach((powerup, index) => {
      if (this.detectCollision(this.player, powerup, "circle")) {
        this.powerups.splice(index, 1);
        this.handlePowerup(powerup);
        this.addSoundEffect(powerup.x, powerup.y, 'POWER!', '#00ff00');
      }
    });
  }
  
  checkCollision(rect1, rect2, margin = 0) {
    const buffer = margin;
    return !(rect1.x + rect1.width - buffer < rect2.x + buffer ||
             rect2.x + rect2.width - buffer < rect1.x + buffer ||
             rect1.y + rect1.height - buffer < rect2.y + buffer ||
             rect2.y + rect2.height - buffer < rect1.y + buffer);
  }

  checkCircularCollision(obj1, obj2) {
    const centerX1 = obj1.x + obj1.width / 2;
    const centerY1 = obj1.y + obj1.height / 2;
    const centerX2 = obj2.x + obj2.width / 2;
    const centerY2 = obj2.y + obj2.height / 2;
    
    const distance = Math.sqrt(
      Math.pow(centerX2 - centerX1, 2) + Math.pow(centerY2 - centerY1, 2)
    );
    
    const combinedRadius = (obj1.width + obj1.height + obj2.width + obj2.height) / 8;
    return distance < combinedRadius;
  }

  detectCollision(objA, objB, type = "rectangle") {
    switch (type) {
      case "circle":
        return this.checkCircularCollision(objA, objB);
      case "loose":
        return this.checkCollision(objA, objB, -5);
      case "tight":
        return this.checkCollision(objA, objB, 5);
      default:


  detectCollision(objA, objB, type = "rectangle") {
    switch (type) {
      case "circle":
        return this.checkCircularCollision(objA, objB);
      case "loose":
        return this.checkCollision(objA, objB, -5);
      case "tight":
        return this.checkCollision(objA, objB, 5);
      default:
        return this.checkCollision(objA, objB);
    }
  }

  handleCollisionResponse(obj1, obj2, collisionType) {
    switch (collisionType) {
      case "bullet_enemy":
        const impactX = Math.max(obj1.x, obj2.x) + Math.min(obj1.width, obj2.width) / 2;
        const impactY = Math.max(obj1.y, obj2.y) + Math.min(obj1.height, obj2.height) / 2;
        this.addImpactEffect(impactX, impactY);
        break;
      case "player_enemy":
        this.addScreenShake();
        break;
      case "player_pickup":
        this.addPickupBurst(obj2.x + obj2.width/2, obj2.y + obj2.height/2);
        break;
    }
  }

  addImpactEffect(x, y) {
    for (let i = 0; i < 3; i++) {
      this.particles.push({
        x: x, y: y,
        dx: (Math.random() - 0.5) * 4,
        dy: (Math.random() - 0.5) * 4,
        life: 15, maxLife: 15,
        particle: "💥", alpha: 1
      });
    }
  }

  addPickupBurst(x, y) {
    for (let i = 0; i < 6; i++) {
      this.particles.push({
        x: x, y: y,
        dx: (Math.random() - 0.5) * 6,
        dy: (Math.random() - 0.5) * 6,
        life: 20, maxLife: 20,
        particle: "✨", alpha: 1
      });
    }
  }

  addScreenShake() {
    this.screenShake = { intensity: 5, duration: 10 };
  }  
  
  handlePowerup(powerup) {
    switch (powerup.type) {
      case 'health':
        this.player.health = Math.min(this.player.health + 1, this.player.maxHealth);
        break;
      case 'speed':
        this.player.speed = Math.min(this.player.speed + 1, 8);
        setTimeout(() => {
          this.player.speed = Math.max(this.player.speed - 1, 5);
        }, 5000);
        break;
      case 'bonus':
        this.score += 50;
        break;
    }
  }
  
  levelUp() {
    this.level++;
    this.addSoundEffect(this.canvas.width/2, this.canvas.height/2, 'LEVEL UP!', '#00ff00');
  }
  
  addExplosion(x, y) {
    const particles = ['💥', '🔥'];
    for (let i = 0; i < 8; i++) {
      this.particles.push({
        x: x,
        y: y,
        dx: (Math.random() - 0.5) * 8,
        dy: (Math.random() - 0.5) * 8,
        life: 30,
        maxLife: 30,
        particle: particles[Math.floor(Math.random() * particles.length)],
        alpha: 1
      });
    }
  }
  
  addPickupEffect(x, y) {
    const particles = ['✨', '⭐'];
    for (let i = 0; i < 5; i++) {
      this.particles.push({
        x: x,
        y: y,
        dx: (Math.random() - 0.5) * 4,
        dy: (Math.random() - 0.5) * 4,
        life: 25,
        maxLife: 25,
        particle: particles[Math.floor(Math.random() * particles.length)],
        alpha: 1
      });
    }
  }
  
  addSoundEffect(x, y, text, color) {
    this.soundEffects.push({
      x: x,
      y: y,
      text: text,
      color: color,
      life: 60,
      maxLife: 60,
      alpha: 1
    });
  }
  
  gameOver() {
    this.showGameOverScreen = true;
    this.gameOverTimer = 180; // 3 seconds at 60 FPS
    this.addSoundEffect(this.canvas.width/2, this.canvas.height/2, 'GAME OVER!', '#ff0000');
  }
  
  restart() {
    this.showGameOverScreen = false;
    this.gameOverTimer = 0;
    this.score = 0;
    this.level = 1;
    this.speed = 2;
    this.enemiesDestroyed = 0;
    this.player.health = this.player.maxHealth;
    this.player.speed = 5;
    this.player.x = 80;
    this.player.y = 300;
    
    // Clear all arrays
    this.bullets = [];
    this.enemies = [];
    this.pizzas = [];
    this.powerups = [];
    this.particles = [];
    this.soundEffects = [];
  }
  
  togglePause() {
    if (!this.showGameOverScreen) {
      this.paused = !this.paused;
    }
  }
  
  draw() {
    // Clear canvas with gradient background
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    gradient.addColorStop(0, '#0f0f23');
    gradient.addColorStop(0.5, '#1a1a3a');
    gradient.addColorStop(1, '#2d2d5a');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw stars (reduced opacity for less distraction)
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    this.stars.forEach(star => {
      this.ctx.fillRect(star.x, star.y, star.size, star.size);
    });
    
    // Draw player (rocket ship facing right)
    this.ctx.save();
    this.ctx.translate(this.player.x + this.player.width/2, this.player.y + this.player.height/2);
    
    // Rocket body (facing right)
    this.ctx.fillStyle = '#e74c3c';
    this.ctx.fillRect(-40, -30, 80, 60);
    this.ctx.fillStyle = '#c0392b';
    this.ctx.fillRect(-35, -25, 70, 50);
    
    // Rocket nose cone (pointing right)
    this.ctx.fillStyle = '#f39c12';
    this.ctx.beginPath();
    this.ctx.moveTo(40, 0);
    this.ctx.lineTo(25, -15);
    this.ctx.lineTo(25, 15);
    this.ctx.closePath();
    this.ctx.fill();
    
    // Rocket fins
    this.ctx.fillStyle = '#34495e';
    this.ctx.fillRect(-45, -35, 15, 20);
    this.ctx.fillRect(-45, 15, 15, 20);
    
    // Engine flames (when moving)
    if (this.player.moving) {
      this.ctx.fillStyle = '#ff6b35';
      this.ctx.fillRect(-55, -8, 15, 16);
      this.ctx.fillStyle = '#ffff00';
      this.ctx.fillRect(-65, -5, 10, 10);
    }
    
    this.ctx.restore();
    
    // Draw bullets
    this.bullets.forEach(bullet => {
      this.ctx.fillStyle = '#ff8c00';
      this.ctx.shadowColor = '#ffa500';
      this.ctx.shadowBlur = 10;
      this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
      this.ctx.shadowBlur = 0;
    });
    
    // Draw enemies (clearly red/threatening)
    this.enemies.forEach(enemy => {
      this.ctx.fillStyle = enemy.color;
      this.ctx.shadowColor = enemy.color;
      this.ctx.shadowBlur = 8;
      
      if (enemy.name === 'ufo') {
        // UFO shape
        this.ctx.fillRect(enemy.x, enemy.y + 10, enemy.width, enemy.height - 20);
        this.ctx.fillStyle = '#666';
        this.ctx.fillRect(enemy.x + 5, enemy.y, enemy.width - 10, enemy.height / 2);
      } else {
        // Regular enemy shape (angular/threatening)
        this.ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        // Add spiky details
        this.ctx.fillStyle = '#ff0000';
        this.ctx.fillRect(enemy.x + 5, enemy.y - 5, 5, 5);
        this.ctx.fillRect(enemy.x + enemy.width - 10, enemy.y - 5, 5, 5);
      }
      
      this.ctx.shadowBlur = 0;
      
      // Health bar for tougher enemies
      if (enemy.maxHealth > 1) {
        const healthBarWidth = enemy.width;
        const healthBarHeight = 4;
        this.ctx.fillStyle = '#ff0000';
        this.ctx.fillRect(enemy.x, enemy.y - 10, healthBarWidth, healthBarHeight);
        this.ctx.fillStyle = '#00ff00';
        this.ctx.fillRect(enemy.x, enemy.y - 10, (enemy.health / enemy.maxHealth) * healthBarWidth, healthBarHeight);
      }
    });
    
    // Draw pizzas (larger, rotating)
    this.pizzas.forEach(pizza => {
      this.ctx.save();
      this.ctx.translate(pizza.x + pizza.width/2, pizza.y + pizza.height/2);
      this.ctx.rotate(pizza.rotation);
      
      // Pizza base
      this.ctx.fillStyle = '#ffa500';
      this.ctx.shadowColor = '#ff8c00';
      this.ctx.shadowBlur = 8;
      this.ctx.beginPath();
      this.ctx.arc(0, 0, pizza.width/2, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Pizza toppings
      this.ctx.fillStyle = '#ff0000';
      this.ctx.fillRect(-8, -8, 4, 4);
      this.ctx.fillRect(8, 8, 4, 4);
      this.ctx.fillStyle = '#00ff00';
      this.ctx.fillRect(-8, 8, 4, 4);
      this.ctx.fillRect(8, -8, 4, 4);
      
      this.ctx.shadowBlur = 0;
      this.ctx.restore();
    });
    
    // Draw power-ups (bright, glowing, friendly)
    this.powerups.forEach(powerup => {
      this.ctx.save();
      this.ctx.translate(powerup.x + powerup.width/2, powerup.y + powerup.height/2);
      this.ctx.rotate(powerup.rotation);
      
      this.ctx.shadowBlur = 10;
      
      switch (powerup.type) {
        case 'speed':
          // Lightning bolt (bright yellow)
          this.ctx.fillStyle = '#ffff00';
          this.ctx.shadowColor = '#ffff00';
          this.ctx.fillRect(-8, -15, 6, 10);
          this.ctx.fillRect(-2, -5, 6, 10);
          this.ctx.fillRect(-8, 5, 6, 10);
          break;
        case 'health':
          // Heart (bright pink)
          this.ctx.fillStyle = '#ff1493';
          this.ctx.shadowColor = '#ff1493';
          this.ctx.beginPath();
          this.ctx.arc(-5, -5, 8, 0, Math.PI * 2);
          this.ctx.arc(5, -5, 8, 0, Math.PI * 2);
          this.ctx.arc(0, 5, 10, 0, Math.PI * 2);
          this.ctx.fill();
          break;
        case 'bonus':
          // Star (bright green)
          this.ctx.fillStyle = '#00ff00';
          this.ctx.shadowColor = '#00ff00';
          this.ctx.beginPath();
          for (let i = 0; i < 5; i++) {
            const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
            const x = Math.cos(angle) * 12;
            const y = Math.sin(angle) * 12;
            if (i === 0) this.ctx.moveTo(x, y);
            else this.ctx.lineTo(x, y);
          }
          this.ctx.closePath();
          this.ctx.fill();
          break;
      }
      
      this.ctx.shadowBlur = 0;
      this.ctx.restore();
    });
    
    // Draw particles
    this.particles.forEach(particle => {
      this.ctx.globalAlpha = particle.alpha;
      this.ctx.font = '20px Arial';
      this.ctx.fillText(particle.particle, particle.x, particle.y);
    });
    this.ctx.globalAlpha = 1;
    
    // Draw sound effects
    this.soundEffects.forEach(effect => {
      this.ctx.globalAlpha = effect.alpha;
      this.ctx.fillStyle = effect.color;
      this.ctx.font = 'bold 16px Arial';
      this.ctx.fillText(effect.text, effect.x, effect.y);
    });
    this.ctx.globalAlpha = 1;
    
    // Enhanced UI
    this.drawUI();
    
    // Game over screen
    if (this.showGameOverScreen) {
      this.drawGameOverScreen();
    }
    
    // Pause screen
    if (this.paused && !this.showGameOverScreen) {
      this.ctx.fillStyle = 'rgba(0,0,0,0.7)';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = 'white';
      this.ctx.font = 'bold 48px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('PAUSED', this.canvas.width/2, this.canvas.height/2);
      this.ctx.font = '24px Arial';
      this.ctx.fillText('Click Resume to continue', this.canvas.width/2, this.canvas.height/2 + 50);
      this.ctx.textAlign = 'left';
    }
  }
  
  drawUI() {
    // Health bar (larger and more visible)
    const healthBarWidth = 200;
    const healthBarHeight = 30;
    const healthBarX = 20;
    const healthBarY = 20;
    
    // Health bar background
    this.ctx.fillStyle = '#333';
    this.ctx.fillRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);
    
    // Health bar fill
    const healthPercentage = this.player.health / this.player.maxHealth;
    if (healthPercentage > 0.6) {
      this.ctx.fillStyle = '#00ff00';
    } else if (healthPercentage > 0.3) {
      this.ctx.fillStyle = '#ffff00';
    } else {
      this.ctx.fillStyle = '#ff0000';
    }
    this.ctx.fillRect(healthBarX, healthBarY, healthBarWidth * healthPercentage, healthBarHeight);
    
    // Health bar border
    this.ctx.strokeStyle = '#fff';
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);
    
    // Health text
    this.ctx.fillStyle = '#fff';
    this.ctx.font = 'bold 16px Arial';
    this.ctx.fillText(`Health: ${this.player.health}/${this.player.maxHealth}`, healthBarX + 5, healthBarY + 20);
    
    // Score and level
    this.ctx.fillStyle = '#fff';
    this.ctx.font = 'bold 24px Arial';
    this.ctx.strokeStyle = '#000';
    this.ctx.lineWidth = 2;
    this.ctx.strokeText(`Score: ${this.score}`, 20, 80);
    this.ctx.fillText(`Score: ${this.score}`, 20, 80);
    this.ctx.strokeText(`Level: ${this.level}`, 20, 110);
    this.ctx.fillText(`Level: ${this.level}`, 20, 110);
  }
  
  drawGameOverScreen() {
    this.ctx.fillStyle = 'rgba(0,0,0,0.8)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.ctx.fillStyle = '#ff0000';
    this.ctx.font = 'bold 48px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.strokeStyle = '#fff';
    this.ctx.lineWidth = 2;
    this.ctx.strokeText('GAME OVER!', this.canvas.width/2, this.canvas.height/2 - 50);
    this.ctx.fillText('GAME OVER!', this.canvas.width/2, this.canvas.height/2 - 50);
    
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '32px Arial';
    this.ctx.fillText(`Final Score: ${this.score}`, this.canvas.width/2, this.canvas.height/2);
    this.ctx.fillText(`Level Reached: ${this.level}`, this.canvas.width/2, this.canvas.height/2 + 40);
    
    const secondsLeft = Math.ceil(this.gameOverTimer / 60);
    this.ctx.font = '24px Arial';
    this.ctx.fillText(`Restarting in ${secondsLeft} seconds...`, this.canvas.width/2, this.canvas.height/2 + 80);
    
    this.ctx.font = '48px Arial';
    this.ctx.fillText('💀', this.canvas.width/2, this.canvas.height/2 + 130);
    
    this.ctx.textAlign = 'left';
  }
  
  gameLoop() {
    if (this.gameRunning) {
      this.update();
      this.draw();
      requestAnimationFrame(() => this.gameLoop());
    }
  }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing game...');
  if (document.getElementById('gameCanvas')) {
    try {
      window.rocketGame = new RocketPizzaGame('gameCanvas');
      console.log('Game initialized successfully!');
    } catch (error) {
      console.error('Game initialization failed:', error);
    }
  } else {
    console.error('gameCanvas element not found!');
  }
});

// Game control functions
function toggleGamePause() {
  if (window.rocketGame) {
    window.rocketGame.togglePause();
    const btn = document.getElementById('pauseBtn');
    btn.textContent = window.rocketGame.paused ? '▶️ Resume' : '⏸️ Pause';
  }
}

function restartGame() {
  if (window.rocketGame) {
    window.rocketGame.restart();
    const btn = document.getElementById('pauseBtn');
    btn.textContent = '⏸️ Pause';
  }
}
</script>

## Recent Updates

Stay tuned for new projects and articles as I continue to explore the intersection of data science, technology, and life's adventures.

<!-- Medium RSS Feed Integration -->
<div id="medium-articles" class="recent-articles">
  <h3>Latest Articles</h3>
  <div id="medium-feed"></div>
</div>

<script>
async function fetchMediumArticles() {
    try {
        const rssUrl = 'https://medium.com/feed/@charleswhetstone';
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`);
        const data = await response.json();
        
        if (data.items && data.items.length > 0) {
            return data.items.slice(0, 3);
        }
    } catch (error) {
        console.log('Medium articles will load when available');
        return [];
    }
    return [];
}

function displayArticles(articles) {
    const feedContainer = document.getElementById('medium-feed');
    
    if (articles.length > 0) {
        feedContainer.innerHTML = articles.map(article => `
            <div class="article-preview">
                <h4><a href="${article.link}" target="_blank">${article.title}</a></h4>
                <p class="article-date">${new Date(article.pubDate).toLocaleDateString()}</p>
                <p>${article.description.replace(/<[^>]*>/g, '').substring(0, 150)}...</p>
            </div>
        `).join('');
    } else {
        feedContainer.innerHTML = '<p>Articles coming soon...</p>';
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    const articles = await fetchMediumArticles();
    displayArticles(articles);
});
</script>

<style>
/* Enhanced Game Styles */
.game-container {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 15px;
    padding: 20px;
    margin: 2em 0;
    box-shadow: 0 12px 40px rgba(0,0,0,0.15);
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
    font-size: 1.8em;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
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
    font-size: 0.9em;
    text-decoration: none;
    transition: all 0.3s ease;
    font-weight: bold;
}

.game-btn:hover {
    background: rgba(255,255,255,0.3);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.game-wrapper {
    text-align: center;
}

#gameCanvas {
    border: 3px solid rgba(255,255,255,0.3);
    border-radius: 12px;
    background: linear-gradient(135deg, #0f0f23 0%, #1a1a3a 50%, #2d2d5a 100%);
    display: block;
    margin: 0 auto;
    cursor: crosshair;
    transition: all 0.3s ease;
}

#gameCanvas:hover {
    border-color: rgba(255,255,255,0.5);
    box-shadow: 0 0 20px rgba(255,255,255,0.2);
}

#gameCanvas:focus {
    outline: 2px solid #00ff00;
    outline-offset: 2px;
}

.game-instructions {
    margin-top: 15px;
    padding: 15px;
    background: rgba(0,0,0,0.3);
    border-radius: 10px;
    text-align: left;
}

.game-instructions p {
    color: white;
    margin: 8px 0;
    font-size: 1em;
}

.game-instructions strong {
    color: #ffff00;
}

/* Recent Articles Styles */
.recent-articles {
    margin-top: 3em;
    padding: 2em;
    background: var(--background-color, rgba(255,255,255,0.1));
    border-radius: 12px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.1);
}

.recent-articles h3 {
    color: var(--text-color, #ffffff);
    margin-bottom: 1.5em;
    font-size: 1.5em;
}

.article-preview {
    margin-bottom: 2em;
    padding-bottom: 1.5em;
    border-bottom: 1px solid var(--border-color, rgba(255,255,255,0.2));
}

.article-preview:last-child {
    border-bottom: none;
}

.article-preview h4 a {
    color: var(--link-color, #64b5f6);
    text-decoration: none;
    transition: color 0.3s ease;
}

.article-preview h4 a:hover {
    color: var(--link-hover-color, #42a5f5);
}

.article-date {
    font-size: 0.9em;
    color: var(--muted-text-color, #cccccc);
    margin: 0.5em 0;
}

/* Responsive Design */
@media (min-width: 1200px) {
    #gameCanvas {
        width: 900px;
        height: 600px;
    }
}

@media (max-width: 1199px) and (min-width: 600px) {
    #gameCanvas {
        width: 100%;
        max-width: 800px;
        height: auto;
        aspect-ratio: 3/2;
    }
}

@media (max-width: 599px) {
    .game-container {
        padding: 15px;
        margin: 1em 0;
    }
    
    .game-header {
        flex-direction: column;
        gap: 10px;
    }
    
    .game-header h3 {
        font-size: 1.4em;
    }
    
    .game-controls {
        justify-content: center;
    }
    
    .game-btn {
        padding: 8px 12px;
        font-size: 0.8em;
    }
    
    #gameCanvas {
        width: 100%;
        max-width: 100%;
        height: 300px;
    }
    
    .game-instructions {
        text-align: center;
        padding: 12px;
    }
    
    .game-instructions p {
        font-size: 0.9em;
    }
}

/* Focus and interaction improvements */
.game-container:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 48px rgba(0,0,0,0.2);
}

/* Smooth animations */
* {
    box-sizing: border-box;
}

/* Dark theme compatibility */
@media (prefers-color-scheme: dark) {
    .recent-articles {
        background: rgba(30, 30, 30, 0.8);
        border-color: rgba(255,255,255,0.1);
    }
}
</style>
