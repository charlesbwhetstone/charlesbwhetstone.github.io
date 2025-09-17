---
layout: splash
title: "The Truth Is Out There"
excerpt: "Welcome to my site. My name is Charles Whetstone, and I'm a Forensic Engineer with a background in eDiscovery."
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  actions:
    - label: "Get to Know Me"
      url: "/about/"
      btn_class: "btn--primary"
    - label: "Electric Crust Pizza Game"
      url: "/pizza-game/"
      btn_class: "btn--info"
intro: 
  - excerpt: "Welcome to my site. My name is Charles Whetstone, and I'm a Forensic Engineer with a background in eDiscovery. This website is a collection of my musings on various topics from data science to music and vinyl finds to random curiosities that catch my attention. Join me as I explore the unknown and share insights from this blob of data we call life."
feature_row:
  - title: "About Me"
    excerpt: "My digital ramblings, passions, hobbies, and what makes me a curious individual."
    url: "/about/"
    btn_label: "Learn More"
    btn_class: "btn--primary"
  - title: "Data Projects"
    excerpt: "Explore my data science and analytics projects including AI safety evaluation, voice coaching systems, and more."
    url: "/projects/"
    btn_label: "View Projects"
    btn_class: "btn--primary"
  - title: "Music & Beyond"
    excerpt: "Discover my musical interests, vinyl finds, and creative adventures beyond the data world."
    url: "/music/"
    btn_label: "Explore"
    btn_class: "btn--info"
  - title: "Electric Crust Pizza Game"
    excerpt: "Try my electrifying pizza delivery game! A fun creative project showcasing interactive development."
    url: "/pizza-game/"
    btn_label: "Play Game"
    btn_class: "btn--success"
---

{% include feature_row id="intro" type="center" %}

{% include feature_row %}

## Welcome to My Digital Universe

This website is a collection of my explorations across data science, music, technology, and the random curiosities that catch my attention. Join me as I navigate through this blob of data we call life!

### Latest from the Blog

<div class="recent-posts">
{% for post in site.posts limit:2 %}
  <div class="post-preview">
    <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
    <p class="post-meta">{{ post.date | date: "%B %d, %Y" }}</p>
    <p>{{ post.excerpt | strip_html | truncatewords: 25 }}</p>
    <a href="{{ post.url | relative_url }}" class="btn btn--primary">Read More</a>
  </div>
{% endfor %}
</div>

<p><a href="/blog/" class="btn btn--info">View All Blog Posts →</a></p>
