document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Navbar Functionality (Guideline 5 & Responsiveness) ---
    const burgerMenu = document.getElementById('burgerMenu');
    const navLinks = document.getElementById('navLinks');

    if (burgerMenu && navLinks) {
        burgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            burgerMenu.classList.toggle('toggle');
        });

        // Close nav when a link is clicked (for single-page navigation)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('nav-active')) {
                    navLinks.classList.remove('nav-active');
                    burgerMenu.classList.remove('toggle');
                }
            });
        });
    }

    // --- 2. Dark/Light Mode Toggle (Guideline 3) ---
    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;

    if (modeToggle && body) {
        // Set initial mode based on localStorage or system preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            body.classList.add(savedTheme + '-mode');
            // Update icon based on loaded theme
            if (savedTheme === 'dark') {
                modeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
            } else {
                modeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
            }
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            // System is dark mode
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            modeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
        }

        modeToggle.addEventListener('click', () => {
            if (body.classList.contains('dark-mode')) {
                body.classList.remove('dark-mode');
                body.classList.add('light-mode'); // Explicitly add light-mode if desired
                localStorage.setItem('theme', 'light');
                modeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
            } else {
                body.classList.remove('light-mode'); // Remove light-mode class if exists
                body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
                modeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
            }
        });
    }

    // --- 3. Features Section Tabs (features-services.mp4 - Feature 4) ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const tabIndicator = document.getElementById('tabIndicator');

    if (tabButtons.length > 0 && tabPanes.length > 0 && tabIndicator) {
        function updateTabIndicator(activeButton) {
            if (activeButton) {
                tabIndicator.style.width = activeButton.offsetWidth + 'px';
                tabIndicator.style.left = activeButton.offsetLeft + 'px';
            }
        }

        // Set initial indicator position
        const initialActiveTab = document.querySelector('.tab-button.active');
        if (initialActiveTab) {
            updateTabIndicator(initialActiveTab);
        }

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.dataset.tab;

                // Remove active class from all buttons and panes
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));

                // Add active class to clicked button and corresponding pane
                button.classList.add('active');
                document.getElementById(tabId).classList.add('active');

                // Update indicator position
                updateTabIndicator(button);
            });
        });
    }

    // --- 4. Portfolio Section (showcase work.mp4 - Feature 9) ---
    const portfolioItems = document.querySelectorAll('.portfolio-section .portfolio-item');
    const portfolioNavNumbers = document.querySelectorAll('.portfolio-nav-numbers .nav-num');
    let currentPortfolioIndex = 0;

    if (portfolioItems.length > 0 && portfolioNavNumbers.length > 0) {
        function showPortfolioItem(index) {
            portfolioItems.forEach((item, i) => {
                item.classList.remove('active');
                if (i < index) {
                    item.style.transform = 'translateX(-100%)';
                } else if (i > index) {
                    item.style.transform = 'translateX(100%)';
                }
                item.style.opacity = '0';
            });
            portfolioNavNumbers.forEach(num => num.classList.remove('active'));

            portfolioItems[index].classList.add('active');
            portfolioItems[index].style.transform = 'translateX(0)';
            portfolioItems[index].style.opacity = '1';
            portfolioNavNumbers[index].classList.add('active');

            currentPortfolioIndex = index;
        }

        // Initialize first portfolio item
        showPortfolioItem(0);

        portfolioNavNumbers.forEach(num => {
            num.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                showPortfolioItem(index);
            });
        });
    }

    // --- 5. Testimonials Section (testimonials.mp4 - Feature 11) ---
    const testimonialCards = document.querySelectorAll('.testimonials-section .testimonial-card');
    const prevTestimonialBtn = document.querySelector('.prev-testimonial');
    const nextTestimonialBtn = document.querySelector('.next-testimonial');
    let currentTestimonialIndex = 0;

    if (testimonialCards.length > 0 && prevTestimonialBtn && nextTestimonialBtn) {
        function showTestimonial(index) {
            testimonialCards.forEach((card, i) => {
                card.classList.remove('active');
                if (i < index) {
                    card.style.transform = 'translateX(-100%)';
                } else if (i > index) {
                    card.style.transform = 'translateX(100%)';
                }
                card.style.opacity = '0';
            });
            testimonialCards[index].classList.add('active');
            testimonialCards[index].style.transform = 'translateX(0)';
            testimonialCards[index].style.opacity = '1';
            currentTestimonialIndex = index;
        }

        // Initialize first testimonial
        showTestimonial(0);

        prevTestimonialBtn.addEventListener('click', () => {
            let newIndex = currentTestimonialIndex - 1;
            if (newIndex < 0) {
                newIndex = testimonialCards.length - 1; // Loop to last
            }
            showTestimonial(newIndex);
        });

        nextTestimonialBtn.addEventListener('click', () => {
            let newIndex = currentTestimonialIndex + 1;
            if (newIndex >= testimonialCards.length) {
                newIndex = 0; // Loop to first
            }
            showTestimonial(newIndex);
        });
    }


    // --- 6. Global Ripple Effect (Modified Feature 2) ---
  document.addEventListener('click', function (e) {
  const ripple = document.createElement('span');
  ripple.classList.add('ripple');
  ripple.style.left = e.pageX + 'px';
  ripple.style.top = e.pageY + 'px';
  ripple.style.width = ripple.style.height = '100px';
  document.body.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
});


    // --- 7. Parallax Animation (parallax animation.mp4 - Feature 8) ---
    const parallaxBg = document.querySelector('.parallax-bg');
    const revealedTexts = document.querySelectorAll('.parallax-content .revealed-text');

    if (parallaxBg) {
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            parallaxBg.style.transform = `translateY(${scrollY * 0.4}px)`; // Adjust 0.4 for speed
        });
    }

    // Intersection Observer for Text Reveal in Parallax section
    if (revealedTexts.length > 0) {
        const textRevealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Unobserve once visible
                }
            });
        }, {
            threshold: 0.5, // Trigger when 50% of the text is visible
            rootMargin: '0px 0px -50px 0px' // Offset to trigger slightly earlier
        });

        revealedTexts.forEach(text => {
            textRevealObserver.observe(text);
        });
    }

    // --- 8. "Scroll and Pop Up" for Service Cards (scroll and pop up.mp4 - Feature 6) ---
    const serviceCards = document.querySelectorAll('.service-card.scroll-reveal');
    const studyItems = document.querySelectorAll('.study-item.scroll-reveal');
    const experienceCards = document.querySelectorAll('.experience-card.scroll-reveal');

    const combinedScrollRevealElements = [...serviceCards, ...studyItems, ...experienceCards];

    if (combinedScrollRevealElements.length > 0) {
        const cardObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, {
            threshold: 0.3, // Trigger when 30% of the card is visible
            rootMargin: '0px'
        });

        combinedScrollRevealElements.forEach(element => {
            cardObserver.observe(element);
        });
    }

    // --- 9. "Striking" Button Effect (striking - any simple object can be used.mp4 - Feature 7) ---
    const strikingButton = document.getElementById('strikingButton');
    if (strikingButton) {
        strikingButton.addEventListener('click', () => {
            strikingButton.classList.add('clicked-effect');
            setTimeout(() => {
                strikingButton.classList.remove('clicked-effect');
            }, 500); // Remove after 0.5 seconds
        });
    }
}); // End DOMContentLoaded