# Portfolio Website

This portfolio website showcases my professional background, skills, and projects. It serves as a platform to present my work and share insights through articles.

## Project Structure

The project is organized as follows:

```
portfolio-website
├── src
│   ├── index.html         # Main entry point of the portfolio website
│   ├── about.html         # About me page
│   ├── resume.html        # Resume page
│   ├── projects.html      # Projects page
│   ├── articles.html      # Medium articles/RSS feed page
│   ├── css
│   │   └── styles.css     # CSS styles for the website
│   ├── js
│   │   ├── main.js        # Main JavaScript functionality
│   │   └── rss-feed.js    # Fetches and displays Medium articles
│   └── components
│       ├── header.html    # Header component
│       └── footer.html    # Footer component
├── assets
│   └── resume.pdf         # PDF version of the resume
├── projects
│   ├── project1
│   │   └── index.html     # Project 1 details
│   └── project2
│       └── index.html     # Project 2 details
├── package.json           # npm configuration file
└── README.md              # Project documentation
```

## Features

- **Home Page/About**: Provides an overview of my background and skills.
- **Resume**: Displays my professional experience and education.
- **Projects**: Lists my projects with links and descriptions.
- **Medium Articles/RSS**: Aggregates my articles from Medium.
- **Embedded Game**: A Galaga-style arcade shooter (to be developed).

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd portfolio-website
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Open `src/index.html` in your browser to view the website.

## License

This project is licensed under the MIT License.