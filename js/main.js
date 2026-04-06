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

// ========== Dark Mode Toggle ==========
function setDarkMode(enabled) {
    document.documentElement.classList.toggle('dark-mode', enabled);
    localStorage.setItem('darkMode', String(enabled));
}

function getDarkModePref() {
    const storedPref = localStorage.getItem('darkMode');
    if (storedPref !== null) {
        return storedPref === 'true';
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function initDarkModeToggle() {
    const toggleBtn = document.getElementById('darkModeToggle');
    if (!toggleBtn) return;

    const icon = toggleBtn.querySelector('i');
    if (!icon) return;

    function updateIcon(isDarkMode) {
        icon.classList.toggle('fa-sun', isDarkMode);
        icon.classList.toggle('fa-moon', !isDarkMode);
        toggleBtn.setAttribute('aria-pressed', String(isDarkMode));
    }

    const isDarkMode = getDarkModePref();
    setDarkMode(isDarkMode);
    updateIcon(isDarkMode);

    toggleBtn.addEventListener('click', () => {
        const newDarkMode = !document.documentElement.classList.contains('dark-mode');
        setDarkMode(newDarkMode);
        updateIcon(newDarkMode);
    });
}

// ========== Scroll Animations ==========
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .activity-card, .article-content p, .highlight-box').forEach(el => {
        observer.observe(el);
    });
}

// ========== Smooth Scroll ==========
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ========== Main Initialization ==========
function initializePage() {
    initNavigation();
    setActiveNavLink();
    initDarkModeToggle();
    initScrollAnimations();
    initSmoothScroll();
}

// If pages use injected partials, wait for them.
document.addEventListener('includes:loaded', () => {
    initializePage();
});

// Fallback for pages without include loader.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    // If the document is already interactive or complete, and there's no 'includes:loaded' event fired,
    // we might need to call initializePage directly.
    // However, to avoid race conditions with partial loading, we rely on the includes.js to fire the event.
}

function copyLink(event) {
    event.preventDefault();
    navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Link copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy link: ', err);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const url = encodeURIComponent(window.location.href);
    
    const fbShare = document.querySelector('a[title="Share on Facebook"]');
    if (fbShare) {
        fbShare.href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    }

    const messengerShare = document.querySelector('a[title="Share on Messenger"]');
    if (messengerShare) {
        messengerShare.href = `fb-messenger://share/?link=${url}`;
    }
});
