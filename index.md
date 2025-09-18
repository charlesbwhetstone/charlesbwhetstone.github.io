---
layout: splash
title: "hello world"
excerpt: "Welcome to my site. My name is Charles Whetstone, but you can call me Viper. I'm a Forensic Engineer with a background in eDiscovery."
header:
  overlay_color: "#000"
  overlay_filter: "0.8"
  overlay_image: /assets/images/index-header.jpg
  actions:
    - label: "Get to Know Me"
      url: "/about/"
      btn_class: "btn--primary"
intro: 
  - excerpt: "Welcome to my site. My name is Charles Whetstone, but you can call me Viper. I'm a Forensic Engineer with a background in eDiscovery."
navigation_sections:
  - image_path: /assets/images/index-aboutme.JPG
    alt: "About Me"
    title: "About Me"
    url: "/about/"
  - image_path: /assets/images/index-blog.JPG
    alt: "Blog"
    title: "Blog"
    url: "/blog/"
  - image_path: /assets/images/index-dataprojects.JPG
    alt: "Data Projects"
    title: "Data Projects"
    url: "/projects/"
  - image_path: /assets/images/index-musicandbeyond.JPG
    alt: "Music and Beyond"
    title: "Music and Beyond"
    url: "/music/"
  - image_path: /assets/images/index-electriccrust.JPG
    alt: "Articles"
    title: "Articles"
    url: "/articles/"
---

<style>
.intro .archive__item-excerpt {
  text-align: left !important;
}
.navigation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
}
.nav-card {
  text-align: center;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.3);
  transition: transform 0.3s ease;
}
.nav-card:hover {
  transform: translateY(-5px);
}
.nav-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.nav-card h3 {
  margin: 1rem 0;
  color: #fff;
}
.nav-card a {
  text-decoration: none;
  color: inherit;
}
</style>

{% include feature_row id="intro" type="center" %}

<div class="navigation-grid">
{% for item in page.navigation_sections %}
  <div class="nav-card">
    <a href="{{ item.url | relative_url }}">
      <img src="{{ item.image_path | relative_url }}" alt="{{ item.alt }}">
      <h3>{{ item.title }}</h3>
    </a>
  </div>
{% endfor %}
</div>
