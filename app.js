document.addEventListener('DOMContentLoaded', () => {
    
    // Header Scroll Effect
    const header = document.querySelector('.glass-nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once faded in if you don't want it to fade out again when scrolling up
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with the .observe-fade class
    const elementsToObserve = document.querySelectorAll('.observe-fade');
    elementsToObserve.forEach(el => {
        observer.observe(el);
    });

    // Mobile Menu Toggle (Simplified placeholder)
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    if(mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            alert('Mobile menu toggle functionality would go here in a production build.');
        });
    }

    // Dynamic Topic Cloud Delay (adds staggered entrance animation if needed)
    const topicBadges = document.querySelectorAll('.topic-badge');
    topicBadges.forEach((badge, index) => {
        // Adding a slight random stagger to hover transitions for a more organic feel
        badge.style.transitionDelay = `${(index % 3) * 0.05}s`;
    });

    // Pathway Tabs Logic
    const pathwayTabs = document.querySelectorAll('.pathway-tab');
    const pathwayWrappers = document.querySelectorAll('.pathway-wrapper');

    if (pathwayTabs.length > 0) {
        pathwayTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                pathwayTabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                tab.classList.add('active');

                const targetPathway = tab.getAttribute('data-pathway');

                // Hide all pathways, then show the target one
                pathwayWrappers.forEach(wrapper => {
                    wrapper.style.display = 'none';
                    wrapper.classList.remove('active-pathway');
                    
                    if (wrapper.id === `pathway-${targetPathway}`) {
                        wrapper.style.display = 'block';
                        // Small timeout to allow display:block to render before triggering animation class
                        setTimeout(() => {
                            wrapper.classList.add('active-pathway');
                        }, 10);
                    }
                });
            });
        });
    }

    /* ── Auth: listen for parent postMessage (when loaded in iframe) ── */
    window.addEventListener("message", function(e) {
        if (!e.data || e.data.type !== "thinkific-auth") return;
        if (!e.data.signedIn) return;

        document.querySelectorAll(".nav-actions").forEach(function(navActions) {
            navActions.innerHTML = "";

            var dashLink = document.createElement("a");
            dashLink.href = "https://www.theoeducation.com/enrollments";
            dashLink.className = "nav-link sign-in";
            dashLink.textContent = "My Dashboard";
            dashLink.target = "_top";
            dashLink.style.cssText = "color: rgba(255,255,255,0.85); text-decoration: none; font-size: 0.9rem;";
            navActions.appendChild(dashLink);

            var btn = document.createElement("a");
            btn.href = "https://www.theoeducation.com/enrollments";
            btn.className = "btn-primary btn-sm";
            btn.target = "_top";
            btn.textContent = e.data.firstName ? "Hi, " + e.data.firstName : "My Courses";
            navActions.appendChild(btn);
        });

        /* Hide "Sign In to Watch" links */
        document.querySelectorAll('a[href*="users/sign_in"], a[href*="sign_in"]').forEach(function(link) {
            if (!link.closest(".nav-actions")) link.style.display = "none";
        });
    });
});
