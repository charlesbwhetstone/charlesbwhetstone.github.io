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
  - title: "Technical Articles"
    excerpt: "Read my latest insights on data science, machine learning, and technology trends on Medium."
    url: "/articles/"
    btn_label: "Read Articles"
    btn_class: "btn--primary"
---

{% include feature_row %}

## Welcome to My World

I'm Charles Whetstone, a Data Scientist and Forensics Engineer who believes in the power of data to tell stories and create positive change. This portfolio is a window into both my professional work and personal passions.

## Featured Project: Pizza Side Scroller

I love building creative projects outside of data science! Here's a retro-style pizza delivery side scroller game I built. Try it out right here, or play it in full screen!

<div class="game-container">
  <div class="game-header">
    <h3>🍕 Pizza Delivery Adventure</h3>
    <div class="game-controls">
      <button onclick="toggleGamePause()" class="game-btn" id="pauseBtn">⏸️ Pause</button>
      <button onclick="restartGame()" class="game-btn">🔄 Restart</button>
      <a href="/pizza-game/" class="game-btn fullscreen-btn" target="_blank">🖥️ Play Full Screen</a>
    </div>
  </div>
  
  <div class="game-wrapper">
    <canvas id="gameCanvas" width="800" height="400"></canvas>
    <div class="game-instructions">
      <p><strong>Controls:</strong> ↑↓ Arrow keys to move, SPACE to boost, Deliver pizzas while avoiding obstacles!</p>
    </div>
  </div>
</div>

<script>
// Pizza Side Scroller Game
class PizzaGame {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.gameRunning = false;
    this.paused = false;
    this.score = 0;
    this.speed = 2;
    
    // Player (pizza delivery person)
    this.player = {
      x: 50,
      y: 200,
      width: 40,
      height: 40,
      dy: 0,
      grounded: false
    };
    
    // Game objects
    this.obstacles = [];
    this.pizzas = [];
    this.particles = [];
    
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
      this.player.y -= 3;
    }
    if (this.keys['ArrowDown'] && this.player.y < this.canvas.height - this.player.height) {
      this.player.y += 3;
    }
    if (this.keys['Space']) {
      this.speed = Math.min(this.speed + 0.1, 5);
    } else {
      this.speed = Math.max(this.speed - 0.05, 2);
    }
    
    // Spawn obstacles
    if (Math.random() < 0.02) {
      this.obstacles.push({
        x: this.canvas.width,
        y: Math.random() * (this.canvas.height - 60) + 30,
        width: 30,
        height: 30,
        type: 'obstacle'
      });
    }
    
    // Spawn pizzas to collect
    if (Math.random() < 0.015) {
      this.pizzas.push({
        x: this.canvas.width,
        y: Math.random() * (this.canvas.height - 40) + 20,
        width: 25,
        height: 25
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
        this.createParticles(pizza.x, pizza.y, '🍕');
        return false;
      }
      
      return pizza.x + pizza.width > 0;
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
    // Clear canvas with gradient background
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#98FB98');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw player (pizza delivery person)
    this.ctx.fillStyle = '#FF6B35';
    this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
    this.ctx.fillStyle = 'white';
    this.ctx.font = '20px Arial';
    this.ctx.fillText('🚲', this.player.x + 5, this.player.y + 25);
    
    // Draw obstacles
    this.ctx.fillStyle = '#8B4513';
    this.obstacles.forEach(obstacle => {
      this.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      this.ctx.fillText('🚧', obstacle.x, obstacle.y + 20);
    });
    
    // Draw pizzas
    this.pizzas.forEach(pizza => {
      this.ctx.fillText('🍕', pizza.x, pizza.y + 20);
    });
    
    // Draw particles
    this.ctx.font = '16px Arial';
    this.particles.forEach(particle => {
      this.ctx.globalAlpha = particle.life / 30;
      this.ctx.fillText(particle.emoji, particle.x, particle.y);
    });
    this.ctx.globalAlpha = 1;
    
    // Draw UI
    this.ctx.fillStyle = 'black';
    this.ctx.font = '20px Arial';
    this.ctx.fillText(`Score: ${this.score}`, 10, 30);
    this.ctx.fillText(`Speed: ${this.speed.toFixed(1)}x`, 10, 55);
    
    if (this.paused) {
      this.ctx.fillStyle = 'rgba(0,0,0,0.5)';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = 'white';
      this.ctx.font = '36px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('PAUSED', this.canvas.width/2, this.canvas.height/2);
      this.ctx.textAlign = 'left';
    }
  }
  
  checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
  }
  
  createParticles(x, y, emoji) {
    for (let i = 0; i < 3; i++) {
      this.particles.push({
        x: x,
        y: y,
        dx: (Math.random() - 0.5) * 4,
        dy: (Math.random() - 0.5) * 4,
        life: 30,
        emoji: emoji
      });
    }
  }
  
  gameOver() {
    this.paused = true;
    this.ctx.fillStyle = 'rgba(255,0,0,0.7)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'white';
    this.ctx.font = '36px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('GAME OVER!', this.canvas.width/2, this.canvas.height/2 - 20);
    this.ctx.fillText(`Final Score: ${this.score}`, this.canvas.width/2, this.canvas.height/2 + 20);
    this.ctx.textAlign = 'left';
  }
  
  restart() {
    this.score = 0;
    this.speed = 2;
    this.player.x = 50;
    this.player.y = 200;
    this.obstacles = [];
    this.pizzas = [];
    this.particles = [];
    this.paused = false;
  }
  
  togglePause() {
    this.paused = !this.paused;
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
