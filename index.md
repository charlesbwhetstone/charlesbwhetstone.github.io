---
layout: home
title: "The Truth Is Out There"
excerpt: "Forensic Engineer and forever a curious human who loves to gain insights from the blob of data as we know it and passionate about building meaningful connections while discovering the unknown. The truth is out there, afterall!"
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/header-bg.jpg
  actions:
    - label: "Get to Know Me"
      url: "/about/"
      btn_class: "btn--primary"
    - label: "Electric Crust Pizza Game"
      url: "/pizza-game/"
      btn_class: "btn--info"
feature_row:
  - title: "About Me"
    excerpt: "This is my digital ramblings, passions, hobbies, and what makes me a cool individual."
    url: "/about/"
    btn_label: "Learn More"
    btn_class: "btn--primary"
  - title: "Data Projects"
    excerpt: "Explore my data science and analytics projects including AI safety evaluation, voice coaching systems, and predictive modeling with my Spotify user data and more."
    url: "/projects/"
    btn_label: "View Projects"
    btn_class: "btn--primary"
  - title: "Blog & Updates"
    excerpt: "Read my latest thoughts, project updates, and personal insights on technology, life, and creative adventures."
    url: "/blog/"
    btn_label: "Read Blog"
    btn_class: "btn--info"
  - title: "Electric Crust Pizza Game"
    excerpt: "Try my electrifying pizza delivery game! A fun creative project showcasing interactive development skills."
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

## Welcome

Welcome to my site. My name is Charles Whetstone, and I'm a Forensic Engineer with a background in eDiscovery. This website is a somewhat organized collection of data that represents my interests and musings—from data science to music to glimpses of my family life.

## Latest Blog Posts

<div class="recent-posts">
{% for post in site.posts limit:2 %}
  <div class="post-preview">
    <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
    <p class="post-meta">{{ post.date | date: "%B %d, %Y" }}</p>
    <p>{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
    <a href="{{ post.url | relative_url }}" class="btn btn--primary">Read More</a>
  </div>
{% endfor %}
</div>

<p><a href="/blog/" class="btn btn--info">View All Blog Posts →</a></p>

## Featured Project: Electric Crust Pizza Delivery

Check out my electrifying pizza delivery game! Navigate through exciting challenges while collecting delicious pizzas that need to be delivered to a far away place. 

Built with HTML5 Canvas and pure JavaScript, this game showcases interactive development skills and creative problem-solving.

**[Play Electric Crust Pizza Delivery](/pizza-game/)**

## Recent Updates

Stay tuned for new projects and articles as I continue to explore planet Earth!

<!-- Fresh homepage recreation: Sep 13 2025 -->
