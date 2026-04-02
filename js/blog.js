// ========== Blog Filtering ===========
const filterBtns = document.querySelectorAll('.filter-btn');
const blogCards = document.querySelectorAll('.blog-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        blogCards.forEach(card => {
            const category = card.getAttribute('data-category');

            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                card.style.animation = 'slideUp 0.6s ease-out';
                setTimeout(() => {
                    card.style.opacity = '1';
                }, 10);
            } else {
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});
