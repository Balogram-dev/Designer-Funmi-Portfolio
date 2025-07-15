// JavaScript for Seunfunmi Portfolio Website

document.addEventListener('DOMContentLoaded', function() {
    // ===============================================
    // THEME SWITCHER IMPLEMENTATION
    // ===============================================
    
    // Select DOM elements needed for theme switching
    const themeToggle = document.querySelector('.theme-switch');
    const themeCheckbox = document.querySelector('.theme-switch__checkbox');
    const body = document.body;

    // Validate that theme elements exist in the DOM
    if (!themeToggle || !themeCheckbox) {
        console.error('Theme switch elements not found in the DOM');
        return;
    }
  
    // Check for saved theme preference in localStorage or use default (dark)
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply the saved theme class to the body
    body.classList.add(`${savedTheme}-theme`);
    
    // Set the checkbox state based on the current theme
    // - Checked (true) = Light theme (sun icon)
    // - Unchecked (false) = Dark theme (moon icon)
    if (savedTheme === 'light') {
        themeCheckbox.checked = true; // Light theme (sun)
    } else {
        themeCheckbox.checked = false; // Dark theme (moon)
    }
    
    // Add event listener to the theme checkbox to toggle theme when changed
    themeCheckbox.addEventListener('change', toggleTheme);
    
    // Function to toggle between dark and light themes
    function toggleTheme() {
        // If currently in dark theme, switch to light theme
        if (body.classList.contains('dark-theme')) {
            body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light'); // Save preference
            themeCheckbox.checked = true; // Update checkbox to show sun
        } 
        // If currently in light theme, switch to dark theme
        else {
            body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark'); // Save preference
            themeCheckbox.checked = false; // Update checkbox to show moon
        }
    }
    
    // ===============================================
    // MOBILE MENU IMPLEMENTATION
    // ===============================================
    
    // Mobile Menu Toggle
    const createMobileMenu = () => {
        const nav = document.querySelector('nav');
        const navLinks = document.querySelector('.nav-links');
        
        // Create mobile menu toggle button
        const mobileMenuToggle = document.createElement('div');
        mobileMenuToggle.className = 'mobile-menu-toggle';
        mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        
        // Insert the toggle button before the theme toggle
        nav.insertBefore(mobileMenuToggle, document.querySelector('.theme-toggle'));
        
        // Toggle mobile menu
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Change icon based on menu state
            if (navLinks.classList.contains('active')) {
                mobileMenuToggle.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
        
        // Close menu when clicking on a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    };
    
    // Only create mobile menu for screens <= 768px
    if (window.innerWidth <= 768) {
        createMobileMenu();
    }
    
    // Re-evaluate on resize
    let mobileMenuCreated = window.innerWidth <= 768;
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768 && !mobileMenuCreated) {
            createMobileMenu();
            mobileMenuCreated = true;
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Skip if it's just '#'
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact button functionality
    const contactButtons = document.querySelectorAll('.contact-btn, .cta-button');
    contactButtons.forEach(button => {
        button.addEventListener('click', () => {
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                window.scrollTo({
                    top: contactSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight active nav link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // Simple carousel for process indicators
    const processIndicators = document.querySelectorAll('.process-indicator');
    const processSteps = document.querySelectorAll('.process-step');
    let currentStep = 0;
    
    // Initialize
    if (processIndicators.length > 0 && processSteps.length > 0) {
        processIndicators[0].classList.add('active');
        processSteps[0].classList.add('active');
        
        // Auto-advance every 5 seconds
        setInterval(() => {
            // Remove active class from current
            processIndicators[currentStep].classList.remove('active');
            processSteps[currentStep].classList.remove('active');
            
            // Advance to next (or loop back to first)
            currentStep = (currentStep + 1) % processIndicators.length;
            
            // Add active class to new current
            processIndicators[currentStep].classList.add('active');
            processSteps[currentStep].classList.add('active');
        }, 5000);
        
        // Click on indicators
        processIndicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                // Remove active class from current
                processIndicators[currentStep].classList.remove('active');
                processSteps[currentStep].classList.remove('active');
                
                // Set new current
                currentStep = index;
                
                // Add active class to new current
                processIndicators[currentStep].classList.add('active');
                processSteps[currentStep].classList.add('active');
            });
        });
    }
    
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }
});