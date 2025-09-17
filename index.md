---
layout: home
title: "The Truth Is Out There"
---

# The Truth Is Out There

Welcome to my site. My name is Charles Whetstone, and I'm a Forensic Engineer with a background in eDiscovery. This website is a collection of my musings on various topics from data science to music and vinyl finds to random curiosities that catch my attention. Join me as I explore the unknown and share insights from this blob of data we call life.

[Get to Know Me](/about/){: .btn} [Electric Crust Pizza Game](/pizza-game/){: .btn}

## About Me

This is my digital ramblings, passions, hobbies, and what makes me a cool individual.

[Learn More](/about/)

## Data Projects

Explore my data science and analytics projects including AI safety evaluation, voice coaching systems, and predictive modeling with my Spotify user data and more.

[View Projects](/projects/)

## Blog & Updates

Read my latest thoughts, project updates, and personal insights on technology, life, and creative adventures.

[Read Blog](/blog/)

## Electric Crust Pizza Game

Try my electrifying pizza delivery game! A fun creative project showcasing interactive development skills.

[Play Game](/pizza-game/)

## Technical Articles

Read my latest insights on data science, machine learning, and technology trends on Medium.

[Read Articles](/articles/)

## Latest Blog Posts

{% for post in site.posts limit:2 %}
### [{{ post.title }}]({{ post.url | relative_url }})

{{ post.date | date: "%B %d, %Y" }}

{{ post.excerpt | strip_html | truncatewords: 30 }}

[Read More]({{ post.url | relative_url }})
{% endfor %}

[View All Blog Posts →](/blog/)

## Featured Project: Electric Crust Pizza Delivery

Check out my electrifying pizza delivery game! Navigate through exciting challenges while collecting delicious pizzas that need to be delivered to a far away place.

Built with HTML5 Canvas and pure JavaScript, this game showcases interactive development skills and creative problem-solving.

[Play Electric Crust Pizza Delivery](/pizza-game/)

## Recent Updates

Stay tuned for new projects and articles as I continue to explore planet Earth!
