// JavaScript for Seunfunmi Portfolio Website

document.addEventListener('DOMContentLoaded', function () {
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
        anchor.addEventListener('click', function (e) {
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


const slides = document.querySelectorAll('.process-slide');
const prevBtn = document.querySelector('.prev-slide');
const nextBtn = document.querySelector('.next-slide');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        slide.style.display = 'none';
        if (i === index) {
            slide.classList.add('active');
            slide.style.display = 'block';
        }
    });
}

nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
});

prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
});

// Initialize
showSlide(currentSlide);



 class TestimonialsSlider {
            constructor() {
                this.track = document.getElementById('testimonialsTrack');
                this.cards = this.track.querySelectorAll('.testimonial-card');
                this.currentIndex = 0;
                this.cardWidth = 574; // 550px + 24px gap
                this.isHovered = false;
                
                this.init();
            }

            init() {
                // Clone first few cards to create seamless loop
                this.cloneCards();
                
                // Start auto-sliding
                this.startAutoSlide();
                
                // Add hover pause functionality
                this.addHoverListeners();
                
                // Handle window resize
                this.handleResize();
            }

            cloneCards() {
                // Clone first 3 cards and append to the end for seamless looping
                for (let i = 0; i < 3; i++) {
                    const clone = this.cards[i].cloneNode(true);
                    this.track.appendChild(clone);
                }
            }

            startAutoSlide() {
                this.autoSlideInterval = setInterval(() => {
                    if (!this.isHovered) {
                        this.nextSlide();
                    }
                }, 3000); // Slide every 3 seconds
            }

            nextSlide() {
                this.currentIndex++;
                
                // Smooth transition
                this.track.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                this.track.style.transform = `translateX(-${this.currentIndex * this.cardWidth}px)`;
                
                // Reset to beginning when reaching cloned cards
                if (this.currentIndex >= this.cards.length) {
                    setTimeout(() => {
                        this.track.style.transition = 'none';
                        this.currentIndex = 0;
                        this.track.style.transform = 'translateX(0)';
                    }, 600);
                }
            }

            addHoverListeners() {
                const slider = document.querySelector('.testimonials-slider');
                
                slider.addEventListener('mouseenter', () => {
                    this.isHovered = true;
                });
                
                slider.addEventListener('mouseleave', () => {
                    this.isHovered = false;
                });
            }

            handleResize() {
                window.addEventListener('resize', () => {
                    // Recalculate card width on resize
                    const card = this.cards[0];
                    if (card) {
                        const cardStyle = window.getComputedStyle(card);
                        const cardWidthValue = parseInt(cardStyle.minWidth);
                        const gap = 24;
                        this.cardWidth = cardWidthValue + gap;
                        
                        // Reset position
                        this.track.style.transition = 'none';
                        this.track.style.transform = `translateX(-${this.currentIndex * this.cardWidth}px)`;
                    }
                });
            }

            // Public method to pause/resume
            pause() {
                clearInterval(this.autoSlideInterval);
            }

            resume() {
                this.startAutoSlide();
            }
        }

        // Initialize the slider when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new TestimonialsSlider();
        });

        // Pause when page is not visible (tab switching)
        document.addEventListener('visibilitychange', () => {
            const slider = window.testimonialsSlider;
            if (slider) {
                if (document.hidden) {
                    slider.pause();
                } else {
                    slider.resume();
                }
            }
        });