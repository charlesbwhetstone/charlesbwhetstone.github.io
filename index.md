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
excerpt: "Data Scientist & Developer passionate about turning data into insights and building meaningful connections"
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

I'm Charles Whetstone, a Data Scientist and Developer who believes in the power of data to tell stories and create positive change. This portfolio is a window into both my professional work and personal passions.

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
</style>

# Site Author
author:
  name: "Charles Whetstone"
  bio: "Data Scientist & Developer"
  location: "San Francisco Bay Area" # Update this with your actual location
  links:
    - label: "GitHub"
      icon: "fab fa-fw fa-github"
      url: "https://github.com/charlesbwhetstone"
    - label: "LinkedIn"
      icon: "fab fa-fw fa-linkedin"
      url: "https://www.linkedin.com/in/charlesbwhetstone/"
    - label: "Medium"
      icon: "fab fa-fw fa-medium"
      url: "https://groundcontrolcharles.medium.com"
