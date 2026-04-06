// ========== Vlog Filtering ===========
const filterBtns = document.querySelectorAll('.filter-btn');
const vlogCards = document.querySelectorAll('.vlog-card');
const categoryHeaders = document.querySelectorAll('.category-header');
const mainTitle = document.querySelector('.blog-main-title');
const readMoreBtns = document.querySelectorAll('.read-more-btn');
const grid1stSem = document.getElementById('1stSemGrid');
const grid2ndSem = document.getElementById('2ndSemGrid');
const blogTopRow = document.querySelector('.blog-top-row');
const topRowSpacer = document.getElementById('topRowSpacer');
const middleSpacer = document.getElementById('middleSpacer');
const blogDivider = document.querySelector('.blog-divider');
const vlogSpotlight = document.querySelector('.vlog-top-row');

function updateVlogDisplay(filter) {
    if (filter === 'all') {
        mainTitle.textContent = "All Videos";
        
        if (grid1stSem) grid1stSem.style.display = 'grid';
        if (grid2ndSem) grid2ndSem.style.display = 'grid';
        if (vlogSpotlight) vlogSpotlight.style.display = 'block';
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

        vlogCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (category === '1st Semester') {
                if (sem1Count < 4) {
                    showCard(card);
                    sem1Count++;
                } else {
                    hideCard(card);
                }
            } else if (category === '2nd Semester') {
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
        const categoryName = filter === '1st Semester' ? '1st Sem Videos' : '2nd Sem Videos';
        mainTitle.textContent = categoryName;

        if (filter === '1st Semester') {
            if (grid1stSem) grid1stSem.style.display = 'grid';
            if (grid2ndSem) grid2ndSem.style.display = 'none';
        } else if (filter === '2nd Semester') {
            if (grid1stSem) grid1stSem.style.display = 'none';
            if (grid2ndSem) grid2ndSem.style.display = 'grid';
        }
        
        if (vlogSpotlight) vlogSpotlight.style.display = 'none';
        if (topRowSpacer) topRowSpacer.style.display = 'none';
        if (middleSpacer) middleSpacer.style.display = 'none';
        if (blogDivider) blogDivider.style.display = 'none';

        // Hide headers
        categoryHeaders.forEach(header => {
            header.style.display = 'none';
        });

        vlogCards.forEach(card => {
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
        updateVlogDisplay(filter);
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
    updateVlogDisplay('all');
});

// ========== Video Modal ==========
const videoModal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const closeModal = document.getElementById('closeModal');
const featuredVideo = document.getElementById('featuredVideo');

// Click on vlog card to play in modal
vlogCards.forEach(card => {
    card.addEventListener('click', () => {
        const videoId = card.getAttribute('data-video-id');
        const title = card.querySelector('h3').textContent;
        const description = card.querySelector('p').textContent;

        if (featuredVideo) {
            featuredVideo.src = `https://www.youtube.com/embed/${videoId}`;
        }
        if (document.getElementById('featureTitle')) {
            document.getElementById('featureTitle').textContent = title;
        }
        if (document.getElementById('featureDescription')) {
            document.getElementById('featureDescription').textContent = description;
        }

        // Scroll to the top to see the featured video
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Close modal
if (closeModal) {
    closeModal.addEventListener('click', () => {
        if (videoModal) {
            videoModal.classList.remove('active');
        }
        if (modalVideo) {
            modalVideo.src = '';
        }
    });
}

// Close modal when clicking outside
if (videoModal) {
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            videoModal.classList.remove('active');
            if (modalVideo) {
                modalVideo.src = '';
            }
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal && videoModal.classList.contains('active')) {
        videoModal.classList.remove('active');
        if (modalVideo) {
            modalVideo.src = '';
        }
    }
});
