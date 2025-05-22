//****** TEMPLATE SCRIPT ******

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
    hamburger.innerHTML = nav.classList.contains('active') ?
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});


// Close mobile menu when clicking a nav link
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

var hasClickedWeb = false; 

const setWeb = () => {
    document.querySelector('.portfolio-filter').children[1].click();
    hasClickedWeb = true;
}




// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            if (targetElement.style.opacity == 0) targetElement.style.opacity = 1;
            window.scrollTo({
                top: targetElement.offsetTop - 5,
                behavior: 'smooth'
            });
        }
    });
});


// Portfolio Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', (evnt) => {
        clickedButton = evnt.target;

        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        clickedButton.classList.add('active');

        // Filter items
        const filter = clickedButton.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category').includes(filter)) { //item.getAttribute('data-category') === filter
                item.style.display = 'block';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            } else {
                item.style.display = 'none';
            }
        });
    });
});


// Back to Top Button
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


emailjs.init({
    publicKey: "pGdrVaeIUVjomQOCy",
});


// Form Submission
//const contactForm = document.getElementById('contactForm');
const contactForm = document.querySelector('#contactForm');


contactForm.addEventListener('submit', function (fF) {
    fF.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = submitBtn.querySelector('.spinner');

    // Disable button and show spinner
    submitBtn.disabled = true;
    btnText.textContent = 'Sending...';
    spinner.classList.remove('hidden');

    const templateParams = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('title').value,
        message: document.getElementById('message').value
    }

    if (emailjs) {
        emailjs.send("code-port-conatct-1", "port-contact-temp-123", templateParams)
            .then(() => {
                alert('Email sent! Thank you for your message! I will get back to you soon.');

                // Re-enable button and reset.
                submitBtn.disabled = false;
                btnText.textContent = 'Send Message';
                spinner.classList.add('hidden');
                contactForm.reset();
            })
            .catch(err => {
                console.error('Error:', err);
                alert('Something went wrong. Please try again later.');

                // Re-enable button and reset.
                submitBtn.disabled = false;
                btnText.textContent = 'Send Message';
                spinner.classList.add('hidden');
            });
    } else console.log("An error occured! Please check your networ connection.");
});

const scrollAnimateItems = '.skills-container, .portfolio-grid, .services-grid, .testimonials-grid, .contact-container, .about-container';

// Set initial state for animation
document.querySelectorAll(scrollAnimateItems).forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});


//const elements = document.querySelectorAll('.skill-category, .portfolio-item, .services-grid, .testimonial-card, .contact-container, .about-container');
const elements = document.querySelectorAll(scrollAnimateItems);



// Animate elements when scrolling
const animateOnScroll = () => {
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;

        if (elementPosition < screenPosition && element.style.opacity == '0') {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

const scrollAmount = 320; // Card width (px).
var containerGap = 20; // + container gap (px).

document.querySelectorAll('.scroll-buttons').forEach((scrollContainer, index) => {
    var thatContainer = scrollContainer.nextElementSibling; //Gets its hori scroll container.
    var finalScroll = scrollAmount + containerGap; 

    //Get a container scroll left button.
    scrollContainer.children[0].addEventListener('click', () => {
        if(index == 1){
            containerGap = 5;
            finalScroll = scrollAmount + containerGap; 
        }
        thatContainer.scrollBy({ left: -finalScroll, behavior: 'smooth' }); // Scroll left.
    });

    //Get a container scroll right button.
    scrollContainer.children[1].addEventListener('click', () => {
        if(index == 1){
            containerGap = 5;
            finalScroll = scrollAmount + containerGap; 
        }
        thatContainer.scrollBy({ left: finalScroll, behavior: 'smooth' }); // Scroll right.
    });
});

const imagesName = [
    "skill-frontend.jpg",
    "skill-backend.jpg",
    "skill-mobile.jpg",
    "skill-nocode.jpg",
    "skill-game.jpg",
    "skill-blockchain.jpg",
    "skill-excel.jpg",
    "skill-embedded.jpg",
    "skill-others.jpg",
]

document.querySelectorAll('.skill-category').forEach((aSkillCat, index) => {
    aSkillCat.style.backgroundColor = "rgba(15, 52, 96, 0.7)";  // Set background color.
    aSkillCat.style.backgroundImage = `url(img/${imagesName[index]})`; // Set background image.
    aSkillCat.style.backgroundBlendMode = 'overlay'; //Combines both.

    aSkillCat.addEventListener('mouseenter', (skillInt1) => {
        const skillCatInstance = skillInt1.target;

        skillCatInstance.style.transform = 'translateY(-10px)';
        skillCatInstance.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        skillCatInstance.style.backgroundColor = "rgba(15, 52, 96, 1)"// Set background color.
    });

    aSkillCat.addEventListener('mouseleave', (skillInt2) => {
        const skillCatInstance = skillInt2.target;

        skillCatInstance.style.transform = 'translateY(0px)';
        skillCatInstance.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        skillCatInstance.style.backgroundColor = "rgba(15, 52, 96, 0.7)"// Set background color.
    });

});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);