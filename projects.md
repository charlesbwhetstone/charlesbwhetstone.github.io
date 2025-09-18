---
permalink: /projects/
title: "Data Science Projects"
layout: single
classes: wide
author_profile: true
---

<style>
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}
.project-card {
  border: 1px solid #444;
  border-radius: 8px;
  overflow: hidden;
  background: #2a2a2a;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.4);
}
.project-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  background: linear-gradient(45deg, #333, #555);
}
.project-content {
  padding: 1.5rem;
}
.project-title {
  color: #fff;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
}
.project-excerpt {
  color: #ccc;
  margin-bottom: 1rem;
  line-height: 1.5;
}
.project-link {
  color: #7c4dff;
  text-decoration: none;
  font-weight: bold;
}
.project-link:hover {
  color: #9c64ff;
}
</style>

Here's a showcase of my data science and development projects. Each project demonstrates different aspects of data analysis, machine learning, and practical problem-solving.

<div class="projects-grid">
{% for project in site.projects %}
  {% unless project.title contains "iOS" or project.title contains "Android" or project.title contains "pizza" %}
  <div class="project-card">
    {% if project.header.teaser %}
      <img src="{{ project.header.teaser | relative_url }}" alt="{{ project.title }}" class="project-image">
    {% else %}
      <div class="project-image"></div>
    {% endif %}
    <div class="project-content">
      <h3 class="project-title">{{ project.title }}</h3>
      <p class="project-excerpt">{{ project.excerpt }}</p>
      <a href="{{ project.url | relative_url }}" class="project-link">View Project →</a>
    </div>
  </div>
  {% endunless %}
{% endfor %}
</div>

## Featured Creative Project

### Electric Crust Pizza Delivery Game
An electrifying interactive pizza delivery game built with HTML5 Canvas and JavaScript. Features power-ups, dynamic gameplay, and engaging visual effects.

**[Play Electric Crust Pizza Game](/pizza-game/)**
