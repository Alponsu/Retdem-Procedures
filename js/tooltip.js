document.addEventListener('DOMContentLoaded', () => {
    const blogCards = document.querySelectorAll('.blog-card, .spotlight-card');

    blogCards.forEach(card => {
        const title = card.querySelector('h3');
        if (title) {
            // Function to check for truncation and add/remove tooltip
            const updateTooltip = () => {
                // Check if the element is overflowing
                if (title.offsetWidth < title.scrollWidth) {
                    title.setAttribute('title', title.textContent.trim());
                } else {
                    title.removeAttribute('title');
                }
            };

            // Initial check
            updateTooltip();

            // Re-check on window resize
            window.addEventListener('resize', updateTooltip);
        }
    });
});
