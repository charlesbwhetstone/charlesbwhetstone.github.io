async function loadMediumArticles() {
    try {
        // Replace 'yourusername' with your actual Medium username
        const rssUrl = 'https://medium.com/feed/@yourusername';
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`);
        const data = await response.json();
        
        const articlesGrid = document.getElementById('medium-feed');
        
        if (!articlesGrid) return;
        
        if (data.items && data.items.length > 0) {
            articlesGrid.innerHTML = data.items.slice(0, 6).map(article => `
                <div class="article-card">
                    <h3><a href="${article.link}" target="_blank">${article.title}</a></h3>
                    <p><strong>Published:</strong> ${new Date(article.pubDate).toLocaleDateString()}</p>
                    <p>${article.description.replace(/<[^>]*>/g, '').substring(0, 150)}...</p>
                    <a href="${article.link}" target="_blank">Read More</a>
                </div>
            `).join('');
        } else {
            articlesGrid.innerHTML = `
                <div class="article-card">
                    <h3>No articles found</h3>
                    <p>Please update your Medium username in the RSS feed configuration.</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error loading Medium articles:', error);
        const articlesGrid = document.getElementById('medium-feed');
        if (articlesGrid) {
            articlesGrid.innerHTML = `
                <div class="article-card">
                    <h3>Articles Coming Soon</h3>
                    <p>Medium articles will be displayed here once the RSS feed is configured.</p>
                </div>
            `;
        }
    }
}

// Load articles when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for the DOM to be fully ready
    setTimeout(loadMediumArticles, 1000);
});