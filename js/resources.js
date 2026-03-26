// ========== Resources Tab Switching ==========
const resourceTabs = document.querySelectorAll('.resource-tab');
const resourceSections = document.querySelectorAll('[data-resource-type]');

resourceTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const filter = tab.getAttribute('data-filter');
        
        // Update active tab
        resourceTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Filter resources
        resourceSections.forEach(section => {
            const type = section.getAttribute('data-resource-type');
            
            if (filter === 'all' || type === filter) {
                section.style.display = 'block';
                section.style.animation = 'slideUp 0.6s ease-out';
                setTimeout(() => {
                    section.style.opacity = '1';
                }, 10);
            } else {
                section.style.opacity = '0';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
    });
});
