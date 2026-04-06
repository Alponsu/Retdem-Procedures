// ========== Resources Tab Switching ==========
const resourceTabs = document.querySelectorAll('.resource-tab');
const resourceSections = document.querySelectorAll('[data-resource-type]');

if (resourceTabs.length && resourceSections.length) {
    resourceTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const filter = tab.getAttribute('data-filter');

            // Update active tab
            resourceTabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            // Filter resources
            resourceSections.forEach(section => {
                const type = section.getAttribute('data-resource-type');

                if (filter === 'all' || type === filter) {
                    section.style.display = 'grid';
                    section.style.animation = 'slideUp 0.6s ease-out';
                    requestAnimationFrame(() => {
                        section.style.opacity = '1';
                    });
                } else {
                    section.style.opacity = '0';
                    setTimeout(() => {
                        section.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}
