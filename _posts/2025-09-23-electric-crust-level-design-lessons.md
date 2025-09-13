---
layout: single
title: "Electric Crust Level Design: Lessons from Pizza Delivery"
date: 2025-09-23
categories: [gamedev, projects]
tags: [electric-crust, game-development, javascript, html5, level-design]
author_profile: true
read_time: true
share: true
related: true
excerpt: "Diving into the game design decisions behind Electric Crust Pizza Delivery and what I learned about player engagement."
---

Hey everyone,  

Today I wanted to share a closer look at **Electric Crust Pizza Delivery** — specifically the design decisions that shaped how the game plays and why certain choices mattered for keeping it engaging.

## The Core Challenge

The idea was simple: make a pizza delivery game that felt easy to pick up, but interesting enough to replay. The hardest part was figuring out how to make “drive from A to B” feel dynamic instead of repetitive.

### What Makes Delivery Work?

A few design lessons stood out along the way:

**Time Pressure That Motivates, Not Punishes**  
- The timer adds urgency, but it isn’t impossibly strict  
- Success doesn’t require perfection — close calls are where the fun happens  
- The tension builds without turning into frustration  

**Choices That Feel Worthwhile**  
- Take the longer safe route, or gamble on a shortcut?  
- The risk/reward tradeoff keeps each run from feeling the same  

**Difficulty That Builds Naturally**  
- New obstacles and mechanics roll out gradually  
- Players pick up skills over time instead of hitting a wall suddenly  

## Technical Design Decisions

### Canvas Over DOM
I started with HTML elements, but moving to Canvas gave smoother performance, better collision handling, and a more natural “game feel.”

### Collision Detection
```javascript
function checkCollision(player, obstacle) {
    return (player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y);
}