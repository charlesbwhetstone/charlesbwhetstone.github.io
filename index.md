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
    <strong>Controls:</strong> WASD or Arrow Keys to move • Spacebar to shoot • Collect pizzas to deliver! 🍕
  </div>
  <div class="play-fullscreen">
    <a href="/pizza-game/">🍕 Play Fullscreen Experience 🍕</a>
  </div>
</div>

<script>
// Pizza Game - Embedded Version
class PizzaGame {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.gameRunning = false;
        this.keys = {};
        this.score = 0;
        this.gameSpeed = 2;
        
        // Game objects
        this.player = {
            x: 50,
            y: this.canvas.height / 2 - 25,
            width: 50,
            height: 50,
            speed: 5,
            color: '#e74c3c'
        };
        
        this.pizzas = [];
        this.enemies = [];
        this.bullets = [];
        this.particles = [];
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.start();
    }
    
    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
            this.keys[e.code] = true;
            if (e.key === ' ') e.preventDefault();
        });
        
        document.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
            this.keys[e.code] = false;
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
        
        // Update game objects
        this.updateBullets();
        this.updateEnemies();
        this.updatePizzas();
        this.updateParticles();
        this.checkCollisions();
    }
    
    shoot() {
        const now = Date.now();
        if (!this.lastShot || now - this.lastShot > 200) {
            this.bullets.push({
                x: this.player.x + this.player.width,
                y: this.player.y + this.player.height / 2 - 2,
                width: 10,
                height: 4,
                speed: 8,
                color: '#f39c12'
            });
            this.lastShot = now;
        }
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
                    this.bullets.splice(i, 1);
                    this.enemies.splice(j, 1);
                    this.score += 10;
                    break;
                }
            }
        }
        
        // Player vs Pizza collisions
        for (let i = this.pizzas.length - 1; i >= 0; i--) {
            const pizza = this.pizzas[i];
            if (this.collision(this.player, pizza)) {
                this.createPickupEffect(pizza.x + pizza.width/2, pizza.y + pizza.height/2);
                this.pizzas.splice(i, 1);
                this.score += 50;
            }
        }
        
        // Player vs Enemy collisions
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            const enemy = this.enemies[i];
            if (this.collision(this.player, enemy)) {
                this.createExplosion(this.player.x + this.player.width/2, 
                                   this.player.y + this.player.height/2);
                // In embedded version, just reset score instead of game over
                this.score = Math.max(0, this.score - 20);
                this.enemies.splice(i, 1);
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
                color: `hsl(${Math.random() * 60 + 15}, 100%, 60%)`
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
                color: '#f1c40f'
            });
        }
    }
    
    spawnTimer() {
        if (!this.gameRunning) return;
        
        // Spawn enemies
        if (Math.random() < 0.3) {
            this.enemies.push({
                x: this.canvas.width,
                y: Math.random() * (this.canvas.height - 40),
                width: 40,
                height: 40,
                color: '#8e44ad'
            });
        }
        
        // Spawn pizzas
        if (Math.random() < 0.15) {
            this.pizzas.push({
                x: this.canvas.width,
                y: Math.random() * (this.canvas.height - 30),
                width: 30,
                height: 30,
                color: '#e67e22'
            });
        }
        
        setTimeout(() => this.spawnTimer(), 1000);
    }
    
    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw player
        this.ctx.fillStyle = this.player.color;
        this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
        
        // Draw bullets
        this.bullets.forEach(bullet => {
            this.ctx.fillStyle = bullet.color;
            this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        });
        
        // Draw enemies
        this.enemies.forEach(enemy => {
            this.ctx.fillStyle = enemy.color;
            this.ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        });
        
        // Draw pizzas
        this.pizzas.forEach(pizza => {
            this.ctx.fillStyle = pizza.color;
            this.ctx.fillRect(pizza.x, pizza.y, pizza.width, pizza.height);
            // Pizza emoji effect
            this.ctx.fillStyle = '#fff';
            this.ctx.font = '20px Arial';
            this.ctx.fillText('🍕', pizza.x + 5, pizza.y + 22);
        });
        
        // Draw particles
        this.particles.forEach(particle => {
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = particle.life / 60;
            this.ctx.fillRect(particle.x - 2, particle.y - 2, 4, 4);
        });
        this.ctx.globalAlpha = 1;
        
        // Draw score
        this.ctx.fillStyle = '#ecf0f1';
        this.ctx.font = 'bold 24px Arial';
        this.ctx.fillText(`Score: ${this.score}`, 10, 30);
        
        // Draw title
        this.ctx.fillStyle = '#e74c3c';
        this.ctx.font = 'bold 16px Arial';
        this.ctx.fillText('Pizza Delivery Hero', 10, this.canvas.height - 10);
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
