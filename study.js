// Extract project ID from URL
const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('project');

function loadCaseStudy() {
    if (!projectId || !caseStudies || caseStudies.length === 0) {
        showError()
        return;
    }

    // Find the case study
    const caseStudy = caseStudies.find(project => project.id === projectId);

    if (!caseStudy) {
        showError()
        return;
    }

    // Hide loading, show content
    document.getElementById('loading').style.display = 'none';
    document.getElementById('case-hero').style.display = 'flex';
    document.getElementById('case-container').style.display = 'block';

    // Populate hero section
    document.getElementById('case-title').textContent = caseStudy.title;
    document.getElementById('case-subtitle').textContent = caseStudy.description;

    // Set hero background
    const caseHero = document.getElementById('case-hero');
    caseHero.style.setProperty('--hero-bg', `url('${caseStudy.heroImage}')`);

    // Populate meta information
    const caseMeta = document.getElementById('case-meta');
    caseMeta.innerHTML = `
         <div class="meta-item">
             <i class="fas fa-calendar"></i>
             <span>${caseStudy.date}</span>
         </div>
         <div class="meta-item">
             <i class="fas fa-tag"></i>
             <span>${caseStudy.category}</span>
         </div>
         <div class="meta-item">
             <i class="fas fa-user"></i>
             <span>${caseStudy.role}</span>
         </div>
     `;

    // Populate hero tech stack
    const heroTechStack = document.getElementById('hero-tech-stack');
    caseStudy.technologies.forEach(tech => {
        const tag = document.createElement('span');
        tag.className = 'tech-tag';
        tag.textContent = tech;
        heroTechStack.appendChild(tag);
    });

    // Populate tab content
    populateTabContent(caseStudy);

    // Initialize tab functionality
    initializeTabs();

    // Initialize navigation
    initializeNavigation();

    // Initialize back to top
    initializeBackToTop();

    // Prepare next project.
    prepareNextProject();
}

function populateTabContent(caseStudy) {
    // Overview Tab
    document.getElementById('overview-content').innerHTML = `
         <p>${caseStudy.overview || 'No overview available.'}</p>
     `;

    if (caseStudy.objectives) {
        const objectivesList = document.createElement('ul');
        caseStudy.objectives.forEach(obj => {
            const li = document.createElement('li');
            li.textContent = obj;
            objectivesList.appendChild(li);
        });
        document.getElementById('key-objectives').appendChild(objectivesList);
    }

    // Challenges Tab
    if (caseStudy.challenges) {
        document.getElementById('challenges-content').innerHTML = `
             <p>${caseStudy.challenges.description || 'No challenges description available.'}</p>
         `;

        if (caseStudy.challenges.constraints) {
            const constraintsList = document.createElement('ul');
            caseStudy.challenges.constraints.forEach(constraint => {
                const li = document.createElement('li');
                li.textContent = constraint;
                constraintsList.appendChild(li);
            });
            document.getElementById('technical-constraints').appendChild(constraintsList);
        }
    }

    // Solution Tab
    if (caseStudy.solution) {
        document.getElementById('solution-content').innerHTML = `
             <p>${caseStudy.solution.description || 'No solution description available.'}</p>
         `;

        // Solution tech stack
        const solutionTechStack = document.getElementById('solution-tech-stack');
        if (caseStudy.solution.techStack) {
            caseStudy.solution.techStack.forEach(tech => {
                const tag = document.createElement('span');
                tag.className = 'tech-tag';
                tag.textContent = tech;
                solutionTechStack.appendChild(tag);
            });
        }

        // Key features
        if (caseStudy.solution.features) {
            const featuresList = document.createElement('ul');
            caseStudy.solution.features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                featuresList.appendChild(li);
            });
            document.getElementById('key-features').appendChild(featuresList);
        }
    }

    // Results Tab
    if (caseStudy.results) {
        document.getElementById('results-content').innerHTML = `
             <p>${caseStudy.results.description || 'No results description available.'}</p>
         `;

        // Client feedback
        if (caseStudy.results.feedback) {
            document.getElementById('client-feedback').textContent = caseStudy.results.feedback;
        }

        // Lessons learned
        if (caseStudy.results.lessons) {
            const lessonsList = document.createElement('ul');
            caseStudy.results.lessons.forEach(lesson => {
                const li = document.createElement('li');
                li.textContent = lesson;
                lessonsList.appendChild(li);
            });
            document.getElementById('lessons-learned').appendChild(lessonsList);
        }
    }

    // Gallery Tab
    if (caseStudy.gallery) {
        const galleryContent = document.getElementById('gallery-content');
        caseStudy.gallery.forEach(image => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                 <img src="${image.url}" alt="${image.caption}">
             `;
            galleryContent.appendChild(galleryItem);
        });
    }

    // Project Links
    const projectLinks = document.getElementById('project-links');
    if (caseStudy.links) {
        caseStudy.links.forEach(link => {
            const linkElement = document.createElement('a');
            linkElement.href = link.url;
            linkElement.className = 'cta-button';
            linkElement.target = '_blank';
            linkElement.rel = 'noopener noreferrer';
            linkElement.innerHTML = `
                 <i class="${link.icon || 'fas fa-external-link-alt'}"></i> ${link.text}
             `;
            projectLinks.appendChild(linkElement);
        });
    }
}

function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

function initializeNavigation() {
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('active');
            hamburger.innerHTML = nav.classList.contains('active') ?
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }

    // Close mobile menu when clicking a nav link
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            if (hamburger) {
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
}

function initializeBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function prepareNextProject() {
    const currentProjectIndex = caseStudies.findIndex(current => current.id === projectId)

    if((currentProjectIndex + 1) == caseStudies.length) return

    const nextProjectId = caseStudies[currentProjectIndex + 1].id
    const heroNextBtn = document.getElementById('hero-next-btn')
    heroNextBtn.setAttribute('href', `study.html?project=${nextProjectId}`)

    //heroNextBtn.removeAttribute('disabled')
    heroNextBtn.classList.remove('disabled');
}

function showError() {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('error-message').style.display = 'block';
}

// Fallback case study data if JSON fails to load
if (!projectId) {
    // If no project ID, show error
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('error-message').style.display = 'block';
    }, 1500);
}




const caseStudies = [
    {
        "id": "laserfocusBR",
        "title": "Laserfocus (Beta Release)",
        "description": "A platform for bitcoiners to connect, collaborate and help focus on set goals.",
        "heroImage": "img/laserfocus_landing-page.JPG",
        "date": "June 2025 - Nov 2025",
        "category": "Web Development, Blockchain",
        "duration": "6 Months",
        "role": "Full-stack Developer & Code Reviewer",
        "technologies": ["Next JS", "TypeScript", "ShadCN", "Vercel", "Blink.sv", "Daily.io", "Supabase"],
        "overview": "Laserfocus is a community-driven platform designed to help Bitcoin enthusiasts stay focused on their goals through accountability partnerships, progress tracking, and collaborative tools. The beta release represents a complete rebuild from the initial alpha version, with improved architecture, enhanced security, and better user experience.",
        "objectives": [
            "Rebuild the platform with modern web technologies",
            "Implement real-time collaboration features",
            "Integrate Bitcoin Lightning payments",
            "Create a scalable and maintainable codebase",
            "Improve user onboarding and experience"
        ],
        "challenges": {
            "description": "The main challenges included migrating from a no-code platform to a full-stack solution while maintaining data integrity, implementing secure Bitcoin Lightning payments, and creating real-time collaboration features that work reliably across different time zones.",
            "constraints": [
                "Limited budget for third-party services",
                "Need for cross-platform compatibility",
                "Security requirements for financial transactions",
                "Real-time synchronization for collaboration features"
            ]
        },
        "solution": {
            "description": "We implemented a microservices architecture using Next.js for the frontend and Supabase for backend services. Real-time features were built using Daily.io for video calls and Supabase Realtime for data synchronization. Bitcoin Lightning integration was handled through Blink.sv for a seamless payment experience.",
            "techStack": ["Next.js 15", "TypeScript", "Tailwind CSS", "ShadCN UI", "Supabase", "Daily.io", "Blink.sv API", "Vercel"],
            "features": [
                "Real-time goal tracking and progress updates",
                "Bitcoin Lightning payment integration for premium features",
                "Video collaboration rooms for accountability partners",
                "Customizable goal setting and milestone tracking",
                "Community forums and discussion boards"
            ]
        },
        "results": {
            "description": "The beta release successfully migrated all existing users from the alpha version with zero data loss. User engagement increased by 65%, and premium feature adoption grew by 40% within the first month. The platform now handles 50+ concurrent users with minimal latency.",
            "feedback": "Delivered an exceptional rebuild that exceeded our expectations. Performance improvements and new features have significantly enhanced user satisfaction and platform stability.",
            "lessons": [
                "Proper planning of database migration is crucial",
                "Real-time features require careful consideration of scalability",
                "Bitcoin Lightning integration requires extensive testing",
                "Component libraries significantly speed up development"
            ]
        },
        "gallery": [
            {
                "url": "img/laserfocus_landing-page.JPG",
                "caption": "Landing page with clean design"
            },
            {
                "url": "img/laserfocus_cover.jpg",
                "caption": "Dashboard interface showing goal tracking"
            }
        ],
        "links": [
            {
                "text": "View Live Project",
                "url": "https://beta.laserfocus.pro",
                "icon": "fas fa-external-link-alt"
            },
            {
                "text": "GitHub Repository",
                "url": "#",
                "icon": "fab fa-github"
            }
        ]
    },
    {
        "id": "bitcoinDCA",
        "title": "Bitcoin DCA Calculator",
        "description": "An investment calculator for implementing DCA accumulation of bitcoin.",
        "heroImage": "img/work_dca_nuxt1.jpg",
        "date": "February 2025",
        "category": "Web Development, FinTech",
        "duration": "2 Weeks",
        "role": "Frontend Developer",
        "technologies": ["TypeScript", "NUXT JS", "Tailwind CSS", "Vercel"],
        "overview": "A responsive web application that helps Bitcoin investors calculate and visualize their Dollar-Cost Averaging (DCA) strategy. The tool allows users to input various parameters and see projected results over time.",
        "objectives": [
            "Create an intuitive DCA calculator interface",
            "Implement real-time calculations",
            "Provide visualizations of investment growth",
            "Make the tool mobile-responsive",
            "Ensure accurate financial calculations"
        ],
        "challenges": {
            "description": "The main challenge was implementing accurate financial calculations that account for Bitcoin's volatility while providing clear visualizations. Performance optimization was also important for handling complex calculations in real-time.",
            "constraints": [
                "Need for accurate financial calculations",
                "Real-time performance requirements",
                "Responsive design for all devices",
                "Clear data visualization of complex information"
            ]
        },
        "solution": {
            "description": "Built with Nuxt.js for server-side rendering and optimal performance. Implemented a custom calculation engine that processes user inputs in real-time and generates interactive charts using Chart.js. The responsive design ensures usability across all devices.",
            "techStack": ["Nuxt.js 3", "TypeScript", "Tailwind CSS", "Chart.js", "Vercel"],
            "features": [
                "Interactive DCA calculation with multiple parameters",
                "Real-time investment projections",
                "Historical Bitcoin price visualization",
                "Export functionality for calculation results",
                "Mobile-responsive design"
            ]
        },
        "results": {
            "description": "The calculator is available to over 10,000 Bitcoin investors since launch. User feedback indicates it has helps investors make more informed decisions about their DCA strategies. The tool has been featured in Bitcoin investment communities.",
            "feedback": "This tool simplified my DCA planning significantly. The visualizations make it easy to understand long-term projections.",
            "lessons": [
                "Financial calculators require extensive testing for accuracy",
                "Visualizations greatly enhance user understanding",
                "Server-side rendering improves initial load performance",
                "TypeScript prevents many runtime calculation errors"
            ]
        },
        "gallery": [
            {
                "url": "img/work_dca_nuxt1.jpg",
                "caption": "Main calculator interface"
            }
        ],
        "links": [
            {
                "text": "Try the Calculator",
                "url": "https://bitcoin-dca-calc-uizu.vercel.app/",
                "icon": "fas fa-calculator"
            },
            {
                "text": "View Source Code",
                "url": "#",
                "icon": "fab fa-github"
            }
        ]
    }
]

window.addEventListener('DOMContentLoaded', () => {
    loadCaseStudy()
    document.getElementById("allrights").setHTML(`© ${new Date().getFullYear().toString()} Okezie Obiefuna. All rights reserved.`);
});