// ========== Vlog Filtering ==========
const vlogFilterBtns = document.querySelectorAll('.filter-btn');
const vlogCards = document.querySelectorAll('.vlog-card');

vlogFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        vlogFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        vlogCards.forEach(card => {
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
        const date = card.querySelector('.vlog-stats span:last-child').textContent;

        if (featuredVideo) {
            featuredVideo.src = `https://www.youtube.com/embed/${videoId}`;
        }
        if (document.getElementById('featureTitle')) {
            document.getElementById('featureTitle').textContent = title;
        }
        if (document.getElementById('featureDescription')) {
            document.getElementById('featureDescription').textContent = description;
        }
        if (document.getElementById('featureDate')) {
            document.getElementById('featureDate').textContent = date;
        }

        if (videoModal) {
            videoModal.classList.add('active');
            if (modalVideo) {
                modalVideo.src = `https://www.youtube.com/embed/${videoId}`;
            }
        }
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
