---
permalink: /blog/
title: "Blog & Updates"
layout: single
author_profile: true
classes: wide
---

# Latest Blog Posts & Updates

Here I share updates on projects, thoughts on technology, life experiences, and whatever else comes to mind. Think of it as a more casual space compared to my technical articles.

## Browse by Topic
<div class="browse-options">
  <a href="/categories/" class="btn btn--primary">📁 Categories</a>
  <a href="/tags/" class="btn btn--info">🏷️ Tags</a>
  <a href="/year-archive/" class="btn btn--inverse">📅 Archive</a>
</div>

---

## Recent Posts

<!-- Debug: Show post count -->
<p><em>Found {{ site.posts.size }} total posts</em></p>

<!-- Posts will be listed here by Jekyll with pagination -->
<div class="blog-posts">
{% assign posts = site.posts %}
{% if posts.size > 0 %}
  {% for post in posts limit:5 %}
    <article class="blog-post">
      <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      <p class="post-meta">
        <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %d, %Y" }}</time>
        {% if post.categories.size > 0 %}
          • Categories: 
          {% for category in post.categories %}
            <a href="/categories/#{{ category | slugify }}" class="category-link">{{ category }}</a>{% unless forloop.last %}, {% endunless %}
          {% endfor %}
        {% endif %}
      </p>
      <div class="post-excerpt">
        {{ post.excerpt | strip_html | truncatewords: 50 }}
      </div>
      <div class="post-actions">
        <a href="{{ post.url | relative_url }}" class="btn btn--primary">Read More →</a>
        {% if post.tags.size > 0 %}
          <div class="post-tags">
            {% for tag in post.tags limit:3 %}
              <span class="tag">{{ tag }}</span>
            {% endfor %}
          </div>
        {% endif %}
      </div>
    </article>
    {% unless forloop.last %}<hr>{% endunless %}
  {% endfor %}
  
  {% if posts.size > 5 %}
    <div class="pagination-wrapper">
      <a href="/year-archive/" class="btn btn--large btn--info">View All Posts →</a>
    </div>
  {% endif %}
{% else %}
  ## Coming Soon!
  I'll be posting updates about my projects, thoughts on technology, and general life musings. Check back soon for the first posts!
{% endif %}
</div>

<style>
.browse-options {
  margin: 20px 0;
  text-align: center;
}
.browse-options .btn {
  margin: 5px;
}
.post-meta {
  color: #666;
  font-size: 0.9em;
  margin-bottom: 10px;
}
.category-link {
  color: #0066cc;
  text-decoration: none;
}
.category-link:hover {
  text-decoration: underline;
}
.post-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}
.post-tags {
  display: flex;
  gap: 5px;
}
.tag {
  background: #f0f0f0;
  color: #333;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.8em;
}
.pagination-wrapper {
  text-align: center;
  margin-top: 30px;
}
</style>
