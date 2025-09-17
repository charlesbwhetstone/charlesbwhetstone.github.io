---
permalink: /articles/
title: "Technical Articles"
layout: single
author_profile: true
---

---
permalink: /articles/
title: "Technical Articles"
layout: single
author_profile: true
---

# Latest Articles & Insights

I regularly write about data science, machine learning, and technology trends on [Medium](https://groundcontrolcharles.medium.com/).

## Featured Articles

### [Spotify Odyssey: A Deep Dive into Personal Music Data](https://groundcontrolcharles.medium.com/spotify-odyssey-69362a837ed4)
An in-depth analysis of personal Spotify listening data, exploring patterns, trends, and insights that reveal the story behind our musical journey. This project demonstrates advanced data visualization and statistical analysis techniques applied to real-world personal data.

**Topics:** Data Analysis, Spotify API, Personal Analytics, Data Visualization

---

### [Mitigating Artificial Intelligence Bias in eDiscovery](https://groundcontrolcharles.medium.com/mitigating-artificial-intelligence-bias-in-ediscovery-4038ddd2b313)
A comprehensive examination of AI bias challenges in the eDiscovery field and practical strategies for forensic engineers to identify, understand, and mitigate these biases in legal technology applications.

**Topics:** AI Ethics, eDiscovery, Bias Mitigation, Legal Technology

---

## All Articles

<div id="medium-articles-page">
  <div id="loading">Loading additional articles...</div>
  <div id="articles-container"></div>
</div>

## Featured Project

Check out my [Electric Crust Pizza Delivery game](/pizza-game/) - a creative showcase of interactive development skills combining HTML5 Canvas, JavaScript, and engaging gameplay mechanics!

<script>
async function loadMediumArticles() {
    try {
        const rssUrl = 'https://medium.com/feed/@groundcontrolcharles';
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
            container.innerHTML = '<p>Additional articles loading...</p>';
        }
    } catch (error) {
        console.error('Error loading Medium articles:', error);
        document.getElementById('articles-container').innerHTML = '<p>Visit <a href="https://groundcontrolcharles.medium.com/" target="_blank">my Medium profile</a> for more articles!</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadMediumArticles);
</script>
