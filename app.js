document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       THEME MANAGEMENT
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check saved theme or fallback to user system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    
    const initialTheme = savedTheme || (systemPrefersLight ? 'light' : 'dark');
    htmlElement.setAttribute('data-theme', initialTheme);

    // Toggle theme action
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    /* ==========================================================================
       MOBILE NAVIGATION MENU
       ========================================================================== */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu active state
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!event.target.closest('#nav-menu') && 
            !event.target.closest('#mobile-toggle') && 
            navMenu.classList.contains('active')) {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    /* ==========================================================================
       SCROLL EFFECTS & NAVIGATION HIGHLIGHTING
       ========================================================================== */
    const sections = document.querySelectorAll('.section');
    
    // Set active link in navbar during scroll
    const navScrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, {
        root: null,
        rootMargin: '-30% 0px -60% 0px' // Trigger when section occupies the middle portion of the screen
    });

    sections.forEach(section => {
        navScrollObserver.observe(section);
    });

    // Elements reveal animation on scroll
    const revealElements = document.querySelectorAll('.reveal-element');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Trigger once
            }
        });
    }, {
        root: null,
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    /* ==========================================================================
       CONTACT FORM INTERACTION
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const successModal = document.getElementById('form-success-modal');
    const closeSuccessBtn = document.getElementById('close-success-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Perform simple validation check
            const name = document.getElementById('form-name').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const message = document.getElementById('form-message').value.trim();

            if (name && email && message) {
                // Animate submit button state
                const submitBtn = contactForm.querySelector('.btn-submit');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.disabled = true;
                submitBtn.innerHTML = `<span>Sending...</span><div class="spinner"></div>`;

                // Simulate email delivery/server process
                setTimeout(() => {
                    // Show success modal
                    successModal.classList.remove('hidden');
                    
                    // Reset button and form fields
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    contactForm.reset();
                }, 1200);
            }
        });
    }

    if (closeSuccessBtn && successModal) {
        closeSuccessBtn.addEventListener('click', () => {
            successModal.classList.add('hidden');
        });
    }
});
