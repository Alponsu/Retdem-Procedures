document.documentElement.classList.add('js');

// ========== Navigation Menu Toggle ==========
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    function setMenuOpen(isOpen) {
        if (!navMenu || !hamburger) return;
        navMenu.classList.toggle('active', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
    }

    function toggleMenu() {
        if (!navMenu || !hamburger) return;
        setMenuOpen(!navMenu.classList.contains('active'));
    }

    if (hamburger && navMenu) {
        if (!hamburger.hasAttribute('aria-expanded')) {
            hamburger.setAttribute('aria-expanded', 'false');
        }

        hamburger.addEventListener('click', () => {
            toggleMenu();
        });

        hamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                setMenuOpen(false);
            });
        });

        // ========== Mobile Menu Close on Outside Click ==========
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                setMenuOpen(false);
            }
        });
    }
}

// ========== Active Nav Link ==========
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'home.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');

        const normalizedCurrent = (currentPage === 'index.html' || currentPage === '') ? 'home.html' : currentPage;
        const normalizedHref = (href === 'index.html') ? 'home.html' : href;

        if (normalizedHref === normalizedCurrent) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function initHeaderUI() {
    initNavigation();
    setActiveNavLink();
}

// If pages use injected partials, wait for them.
document.addEventListener('includes:loaded', () => {
    initHeaderUI();
});

// Fallback for pages without include loader.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeaderUI);
} else {
    initHeaderUI();
}

// ========== Scroll Animations ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe animated elements
document.querySelectorAll('.feature-card, .activity-card').forEach(el => {
    observer.observe(el);
});

// ========== Smooth Scroll ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// (Navigation outside-click handler moved into initNavigation so it
// binds after injected header elements exist.)
