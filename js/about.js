// ========== Team Members Animation ==========
const teamCards = document.querySelectorAll('.team-card');

const teamObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

teamCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    teamObserver.observe(card);
});

// ========== Highlight Items Animation ==========
const highlightItems = document.querySelectorAll('.highlight-item');

const highlightObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

highlightItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    highlightObserver.observe(item);
});

// ========== Value Items Hover Animation ==========
const valueItems = document.querySelectorAll('.value-item');

valueItems.forEach(item => {
    item.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-4px)';
    });

    item.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});
