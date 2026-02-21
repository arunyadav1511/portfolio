document.addEventListener('DOMContentLoaded', () => {

    // 1. Tab Switching Logic (SPA Style)
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    function switchTab(tabId, immediate = false) {
        // Remove active class from all links and contents
        tabLinks.forEach(link => link.classList.remove('active'));
        tabContents.forEach(content => {
            content.classList.remove('active');
            if (immediate) {
                content.style.transition = 'none';
            }
        });

        // Add active class to targeted tab
        const targetTab = document.getElementById(tabId);
        const targetLinks = document.querySelectorAll(`[data-tab="${tabId}"]`);
        
        if (targetTab) {
            targetTab.classList.add('active');
            targetLinks.forEach(l => l.classList.add('active'));
            
            // Re-enable transition after immediate switch
            if (immediate) {
                setTimeout(() => {
                    tabContents.forEach(c => c.style.transition = 'opacity 0.4s ease-in-out');
                }, 50);
            }
            
            // Update URL hash without jumping
            history.replaceState(null, null, `#${tabId}`);
            
            // Scroll to top on tab change for better UX
            if (!immediate) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        }
    }

    // Attach click events to all links with data-tab
    tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = link.getAttribute('data-tab');
            if (tabId) {
                switchTab(tabId);
                
                // Close mobile menu if open
                if (window.innerWidth <= 768 && navLinks) {
                    navLinks.classList.remove('mobile-active');
                    
                    // Reset icon
                    const icon = mobileMenu.querySelector('i');
                    if (icon) {
                        icon.classList.replace('fa-xmark', 'fa-bars');
                    }
                }
            }
        });
    });

    // Handle initial hash in URL if any - RUN IMMEDIATELY
    const initialHash = window.location.hash.substring(1);
    if (initialHash && document.getElementById(initialHash)) {
        switchTab(initialHash, true);
    } else {
        switchTab('home', true);
    }

    // 2. Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
            
            // Toggle icon
            const icon = mobileMenu.querySelector('i');
            if (navLinks.classList.contains('mobile-active')) {
                icon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        });
    }

    // 5. Contact Data Reveal & Copy Logic V3.2
    const revealMethods = document.querySelectorAll('.reveals-data');

    revealMethods.forEach(method => {
        const val = method.getAttribute('data-value');
        const dataSpan = method.querySelector('.method-data');
        const hintSpan = method.querySelector('.method-hint');

        // Initial state: show data on hover (handled by CSS, but we set the text here)
        dataSpan.innerText = val;

        method.addEventListener('click', () => {
            // Copy to clipboard
            navigator.clipboard.writeText(val).then(() => {
                const originalHint = hintSpan.innerText;
                const originalData = dataSpan.innerText;

                method.classList.add('copied');
                dataSpan.innerText = 'Copied!';
                hintSpan.innerText = 'Success';

                setTimeout(() => {
                    method.classList.remove('copied');
                    dataSpan.innerText = originalData;
                    hintSpan.innerText = originalHint;
                }, 2000);
            });
        });

        // Mobile touch support: first tap reveals, second tap (click) copies
        method.addEventListener('touchstart', (e) => {
            // On mobile, the hover state isn't as clean, so let's let the click handle it
        });
    });

    // 6. Scroll Reveal for new sections
    const observerOptions = {
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.edu-card, .project-card, .skill-group').forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

});
