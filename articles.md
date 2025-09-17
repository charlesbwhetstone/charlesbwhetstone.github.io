---
permalink: /articles/
title: "Technical Articles"
layout: single
author_profile: true
---

# Latest Articles & Insights

I regularly write about data science, machine learning, and technology trends.

## Featured Project

Check out my [Electric Crust Pizza Delivery game](/pizza-game/) - a creative showcase of interactive development skills combining HTML5 Canvas, JavaScript, and engaging gameplay mechanics!

---

<div id="medium-articles-page">
  <div id="loading">Loading articles...</div>
  <div id="articles-container"></div>
</div>

<script>
async function loadMediumArticles() {
    try {
        const rssUrl = 'https://medium.com/feed/@yourusername';
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`);
        const data = await response.json();
        
        const loadingDiv = document.getElementById('loading');
        const container = document.getElementById('articles-container');
        
        loadingDiv.style.display = 'none';
        
        if (data.items && data.items.length > 0) {
            container.innerHTML = data.items.map(article => `
                <div class="article-card">
                    <h3><a href="${article.link}" target="_blank">${article.title}</a></h3>
                    <p class="article-date">${new Date(article.pubDate).toLocaleDateString()}</p>
                    <div class="article-content">
                        ${article.description.replace(/<[^>]*>/g, '').substring(0, 300)}...
                    </div>
                    <a href="${article.link}" target="_blank">Read More →</a>
                </div>
            `).join('');
        } else {
            container.innerHTML = '<p>Articles coming soon!</p>';
        }
    } catch (error) {
        console.error('Error loading Medium articles:', error);
        document.getElementById('articles-container').innerHTML = '<p>Articles coming soon!</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadMediumArticles);
</script>
