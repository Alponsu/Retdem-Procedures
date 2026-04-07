// ========== Blog Filtering ===========
const filterBtns = document.querySelectorAll('.filter-btn');
const blogCards = document.querySelectorAll('.blog-card');
const categoryHeaders = document.querySelectorAll('.category-header');
const mainTitle = document.querySelector('.blog-main-title');
const readMoreBtns = document.querySelectorAll('.read-more-btn');
const grid1stSem = document.getElementById('1stSemGrid');
const grid2ndSem = document.getElementById('2ndSemGrid');
const blogTopRow = document.querySelector('.blog-top-row');
const topRowSpacer = document.getElementById('topRowSpacer');
const middleSpacer = document.getElementById('middleSpacer');
const blogDivider = document.querySelector('.blog-divider');

function updateBlogDisplay(filter) {
    if (filter === 'all') {
        mainTitle.textContent = "All Articles";

        if (grid1stSem) grid1stSem.style.display = 'grid';
        if (grid2ndSem) grid2ndSem.style.display = 'grid';
        if (blogTopRow) blogTopRow.style.display = 'flex';
        if (topRowSpacer) topRowSpacer.style.display = 'block';
        if (middleSpacer) middleSpacer.style.display = 'block';
        if (blogDivider) blogDivider.style.display = 'block';

        // Show headers
        categoryHeaders.forEach(header => {
            header.style.display = 'flex';
        });

        // Track counts
        let sem1Count = 0;
        let sem2Count = 0;

        blogCards.forEach(card => {
            const category = card.getAttribute('data-category');

            if (category === '1st-sem') {
                if (sem1Count < 4) {
                    showCard(card);
                    sem1Count++;
                } else {
                    hideCard(card);
                }
            } else if (category === '2nd-sem') {
                if (sem2Count < 4) {
                    showCard(card);
                    sem2Count++;
                } else {
                    hideCard(card);
                }
            } else {
                hideCard(card);
            }
        });
    } else {
        // Specific category filter
        const categoryName = filter === '1st-sem' ? '1st Sem RetDems' : '2nd Sem RetDems';
        mainTitle.textContent = categoryName;

        if (filter === '1st-sem') {
            if (grid1stSem) grid1stSem.style.display = 'grid';
            if (grid2ndSem) grid2ndSem.style.display = 'none';
        } else if (filter === '2nd-sem') {
            if (grid1stSem) grid1stSem.style.display = 'none';
            if (grid2ndSem) grid2ndSem.style.display = 'grid';
        }

        if (blogTopRow) blogTopRow.style.display = 'none';
        if (topRowSpacer) topRowSpacer.style.display = 'none';
        if (middleSpacer) middleSpacer.style.display = 'none';
        if (blogDivider) blogDivider.style.display = 'none';

        // Hide headers
        categoryHeaders.forEach(header => {
            header.style.display = 'none';
        });

        blogCards.forEach(card => {
            const category = card.getAttribute('data-category');

            if (category === filter) {
                showCard(card);
            } else {
                hideCard(card);
            }
        });
    }
}

function showCard(card) {
    card.style.display = 'block';
    card.style.animation = 'slideUp 0.6s ease-out';
    setTimeout(() => {
        card.style.opacity = '1';
    }, 10);
}

function hideCard(card) {
    card.style.opacity = '0';
    setTimeout(() => {
        card.style.display = 'none';
    }, 300);
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        updateBlogDisplay(filter);
        // Save the active filter to sessionStorage
        sessionStorage.setItem('activeBlogFilter', filter);
    });
});

readMoreBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetCategory = btn.getAttribute('data-target');
        const targetBtn = document.querySelector(`.filter-btn[data-filter="${targetCategory}"]`);
        if (targetBtn) {
            targetBtn.click();
            window.scrollTo({ top: document.querySelector('.blog-main-content').offsetTop - 50, behavior: 'smooth' });
        }
    });
});

// Initial display setup
document.addEventListener('DOMContentLoaded', () => {
    // Restore the active filter from sessionStorage if it exists
    const savedFilter = sessionStorage.getItem('activeBlogFilter');
    const initialFilter = savedFilter || 'all';
    
    // Set the active button
    const activeBtn = document.querySelector(`.filter-btn[data-filter="${initialFilter}"]`);
    if (activeBtn) {
        filterBtns.forEach(b => b.classList.remove('active'));
        activeBtn.classList.add('active');
    }
    
    updateBlogDisplay(initialFilter);
});
