document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Check if this is a link to another page (contains .html)
            const href = this.getAttribute('href');
            if (href.includes('.html')) {
                // Allow normal navigation to other pages
                return;
            }
            
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const targetSection = document.querySelector(href);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });

    // CTA button functionality
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Navigate to projects section
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            document.querySelector('a[href="#projects"]').classList.add('active');
            document.querySelector('#projects').classList.add('active');
        });
    }

    // Load projects from your DataProjects folder
    loadProjects();
});

function loadProjects() {
    // This will need to be populated with your actual projects
    const projectsGrid = document.querySelector('.projects-grid');
    
    if (!projectsGrid) return;
    
    // Example project structure - update with your actual projects
    const projects = [
        {
            title: 'AI Safety Evaluation',
            description: 'Comprehensive analysis of AI safety findings and rankings with data visualization.',
            link: '../ai-safety-evaluation/'
        },
        {
            title: 'AI Voice Coach',
            description: 'Multimodal AI voice coaching application with Jupyter notebook implementation.',
            link: '../ai-voice-coach/'
        },
        {
            title: 'Amazon Location Discovery',
            description: 'Location-based discovery application using Amazon services.',
            link: '../amazon-location-discovery/'
        },
        {
            title: 'BigQuery AI Hackathon',
            description: 'Movie recommendation system using BigQuery and AI embeddings.',
            link: '../bigquery-ai-hackathon/'
        },
        {
            title: 'Employee Attrition Analysis',
            description: 'Statistical analysis of employee attrition patterns using R and machine learning.',
            link: '../employee-attrition/'
        }
    ];

    projectsGrid.innerHTML = projects.map(project => `
        <div class="project-card">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <a href="${project.link}" target="_blank">View Project</a>
        </div>
    `).join('');
}