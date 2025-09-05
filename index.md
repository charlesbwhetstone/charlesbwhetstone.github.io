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

I'm Charles Whetstone, a Data Scientist and Developer who believes in the power of data to tell stories and create positive change.

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
                </div>
            `).join('');
        }
    } catch (error) {
        console.log('Medium articles will load when available');
    }
}

document.addEventListener('DOMContentLoaded', loadMediumArticles);
</script>
