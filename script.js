let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            // active navbar links
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    // sticky header
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);
}

// Add animation delay to navbar links
document.querySelectorAll('.navbar a').forEach((link, index) => {
    link.style.setProperty('--i', index + 1);
});

// Add animation delay to social media icons
document.querySelectorAll('.home-sci a').forEach((icon, index) => {
    icon.style.setProperty('--i', index + 1);
});

// Add animation delay to education content
document.querySelectorAll('.education-content').forEach((content, index) => {
    content.style.setProperty('--i', index + 1);
});

// Add animation delay to skills content
document.querySelectorAll('.skills-content').forEach((content, index) => {
    content.style.setProperty('--i', index + 1);
});

// Remove active class from navbar when a link is clicked
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});

// Add typing animation to text-animate
const textAnimate = document.querySelector('.text-animate h3');
if (textAnimate) {
    const text = textAnimate.textContent;
    textAnimate.innerHTML = '';
    
    for (let i = 0; i < text.length; i++) {
        textAnimate.innerHTML += `<span style="animation-delay: ${i * 0.1}s;">${text[i]}</span>`;
    }
}

// Add reveal animations on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-animate');
        }
    });
}, { threshold: 0.1 });

// Observe elements with animation
document.querySelectorAll('.heading, .about-content, .education-content, .skills-content, .contact form').forEach(el => {
    observer.observe(el);
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced Subtle Glow Effect
document.addEventListener('DOMContentLoaded', function() {
    // Create torch element
    const torch = document.createElement('div');
    torch.className = 'torch';
    document.body.appendChild(torch);
    
    // Torch state
    let torchActive = false;
    let moveTimeout;
    
    // Get torch button
    const torchButton = document.getElementById('torch-toggle');
    
    // Toggle torch on button click
    torchButton.addEventListener('click', function() {
        torchActive = !torchActive;
        
        if (torchActive) {
            // Activate enhanced glow mode
            document.body.classList.add('torch-mode');
            torch.classList.add('active');
            torchButton.classList.add('active');
            torchButton.querySelector('span').textContent = 'Glow On';
            
            // Add initial position to torch
            const initialX = window.innerWidth / 2;
            const initialY = window.innerHeight / 2;
            torch.style.left = initialX + 'px';
            torch.style.top = initialY + 'px';
        } else {
            // Deactivate glow mode
            document.body.classList.remove('torch-mode');
            torch.classList.remove('active');
            torch.classList.remove('moving');
            torchButton.classList.remove('active');
            torchButton.querySelector('span').textContent = 'Toggle Glow';
            
            // Remove glow class from all elements
            document.querySelectorAll('.glow-text').forEach(el => {
                el.classList.remove('glow-text');
            });
        }
    });
    
    // Track mouse movement with smooth following
    document.addEventListener('mousemove', function(e) {
        if (torchActive) {
            // Smoother movement with slight delay
            setTimeout(() => {
                torch.style.left = e.clientX + 'px';
                torch.style.top = e.clientY + 'px';
            }, 50); // Reduced delay for more responsive feel
            
            // Add moving class for enhanced glow
            torch.classList.add('moving');
            
            // Reset the timeout
            clearTimeout(moveTimeout);
            
            // Set a timeout to remove the moving class after mouse stops
            moveTimeout = setTimeout(function() {
                torch.classList.remove('moving');
            }, 200);
            
            // Add glow to elements near the cursor
            highlightNearbyElements(e.clientX, e.clientY);
        }
    });
});

// Clean Mobile Menu Implementation
document.addEventListener('DOMContentLoaded', function() {
    // Get menu icon and navbar
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.querySelector('.navbar');
    
    // Create overlay for mobile menu
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    
    // Move the quote button out of navbar for mobile
    const quoteButton = document.querySelector('.cta-btn-mobile');
    
    // Function to handle responsive adjustments
    function handleResponsive() {
        if (window.innerWidth <= 991) {
            // Mobile view
            if (!document.body.contains(quoteButton)) {
                document.querySelector('.header').appendChild(quoteButton);
            }
        } else {
            // Desktop view
            if (document.body.contains(quoteButton) && !navbar.contains(quoteButton)) {
                navbar.appendChild(quoteButton);
            }
        }
    }
    
    // Run on load
    handleResponsive();
    
    // Run on resize
    window.addEventListener('resize', handleResponsive);
    
    // Toggle menu
    menuIcon.addEventListener('click', function() {
        navbar.classList.toggle('active');
        overlay.classList.toggle('active');
        menuIcon.classList.toggle('bx-x');
        
        // Prevent scrolling when menu is open
        if (navbar.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.navbar a:not(.cta-btn-mobile)').forEach(link => {
        link.addEventListener('click', function() {
            navbar.classList.remove('active');
            menuIcon.classList.remove('bx-x');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target) && e.target !== menuIcon) {
            navbar.classList.remove('active');
            menuIcon.classList.remove('bx-x');
        }
    });
});