// ========== Blog: Article Reader + Filtering ==========
const articles = {
    'screening-program': {
        title: 'Community Health Screening Program',
        category: 'Health Initiatives',
        date: 'March 15, 2026',
        readTime: '8 min read',
        blocks: [
            { type: 'p', text: 'Our quarterly community health screening program brings basic health checks closer to families who may not have regular access to clinics. The goal is early identification of risk factors and connecting participants to follow-up care.' },
            { type: 'h3', text: 'What happens during a screening' },
            {
                type: 'ul',
                items: [
                    'Registration and brief health history',
                    'Blood pressure and pulse assessment',
                    'Blood glucose screening (where appropriate)',
                    'Health education and counseling',
                    'Referral guidance for follow-up care'
                ]
            },
            { type: 'p', text: 'In addition to measurements, we focus on education: explaining results in simple terms and offering practical next steps. The program is designed to be welcoming, respectful, and culturally sensitive.' },
            { type: 'p', text: 'Outcomes are tracked at a high level to improve future sessions (e.g., wait time, common concerns, and referral needs) while respecting privacy.' }
        ]
    },
    'first-aid-cpr': {
        title: 'First Aid & CPR Workshop',
        category: 'Training',
        date: 'March 10, 2026',
        readTime: '6 min read',
        blocks: [
            { type: 'p', text: 'This workshop is designed to build confidence in responding to common emergencies. Participants practice core skills with feedback so they can act quickly and safely when it matters.' },
            { type: 'h3', text: 'Core skills covered' },
            {
                type: 'ul',
                items: [
                    'Scene safety and calling for help',
                    'Hands-only CPR basics',
                    'Choking response for adults and children',
                    'Bleeding control and wound care',
                    'Recognizing warning signs (stroke, heart attack, shock)'
                ]
            },
            { type: 'p', text: 'We combine short demonstrations with hands-on stations to reinforce learning. By the end, learners understand how to prioritize actions: safety, assessment, and timely escalation.' }
        ]
    },
    'disaster-relief-preparedness': {
        title: 'Disaster Relief Preparedness',
        category: 'Community',
        date: 'March 5, 2026',
        readTime: '7 min read',
        blocks: [
            { type: 'p', text: 'Preparedness reduces harm. This article highlights how simulation-based training and community education improve readiness for storms, floods, and other emergencies.' },
            { type: 'h3', text: 'Preparedness priorities' },
            {
                type: 'ul',
                items: [
                    'Personal and family go-bags',
                    'Medication and documents planning',
                    'Basic first aid and hygiene practices',
                    'Safe water and food storage',
                    'Clear communication and evacuation plans'
                ]
            },
            { type: 'p', text: 'Students practice triage fundamentals, communication under stress, and teamwork. Community sessions focus on practical steps that can be implemented with limited resources.' }
        ]
    },
    'vaccination-campaign-2026': {
        title: 'Vaccination Campaign 2026',
        category: 'Health Initiatives',
        date: 'February 28, 2026',
        readTime: '9 min read',
        blocks: [
            { type: 'p', text: 'Vaccination campaigns are most effective when they are accessible, well-communicated, and integrated with local partners. This initiative focused on reaching underserved areas through coordinated outreach.' },
            { type: 'h3', text: 'How the campaign was organized' },
            {
                type: 'ul',
                items: [
                    'Partnership with local clinics and community leaders',
                    'Clear eligibility and consent workflow',
                    'Queue management to reduce waiting time',
                    'Post-vaccination observation and education',
                    'Follow-up reminders (as needed)'
                ]
            },
            { type: 'p', text: 'Alongside vaccinations, teams provided education on common concerns and helped participants understand what to expect after receiving a vaccine.' }
        ]
    },
    'care-outcomes-study': {
        title: 'Nursing Care Outcomes Study',
        category: 'Research',
        date: 'February 20, 2026',
        readTime: '10 min read',
        blocks: [
            { type: 'p', text: 'Evaluating outcomes helps improve care quality. This overview describes how programs can measure patient experience and basic health outcomes after community interventions.' },
            { type: 'h3', text: 'Typical outcome measures' },
            {
                type: 'ul',
                items: [
                    'Patient satisfaction and understanding',
                    'Follow-up completion rates',
                    'Health education retention',
                    'Process indicators (wait time, reach, coverage)',
                    'Referral appropriateness and access barriers'
                ]
            },
            { type: 'p', text: 'Findings are used to iterate: improving messaging, reducing friction in referrals, and strengthening partnerships. Data collection should be ethical, minimal, and privacy-conscious.' }
        ]
    },
    'communication-workshop': {
        title: 'Patient Care Communication Workshop',
        category: 'Training',
        date: 'February 15, 2026',
        readTime: '6 min read',
        blocks: [
            { type: 'p', text: 'Good communication improves trust, safety, and adherence. This workshop focuses on practical techniques nursing students can use in real community settings.' },
            { type: 'h3', text: 'Skills practiced' },
            {
                type: 'ul',
                items: [
                    'Active listening and empathy statements',
                    'Plain-language explanations',
                    'Teach-back for understanding',
                    'De-escalation and calm tone strategies',
                    'Respectful boundaries and confidentiality'
                ]
            },
            { type: 'p', text: 'Participants role-play scenarios and receive structured feedback. The goal is to communicate clearly while remaining compassionate and professional.' }
        ]
    }
};

const filterBtns = document.querySelectorAll('.filter-btn');
const blogCards = document.querySelectorAll('.blog-card');
const blogGrid = document.getElementById('blogGrid');

const articleReaderSection = document.getElementById('article-reader');
const articleReader = document.getElementById('articleReader');
const articleTitle = document.getElementById('articleTitle');
const articleMeta = document.getElementById('articleMeta');
const articleBody = document.getElementById('articleBody');
const closeArticleBtn = document.getElementById('closeArticle');

function clearReader() {
    if (articleTitle) articleTitle.textContent = '';
    if (articleMeta) articleMeta.textContent = '';
    if (articleBody) articleBody.innerHTML = '';
}

function closeReader({ scrollToGrid = false } = {}) {
    if (!articleReaderSection) return;
    articleReaderSection.hidden = true;
    clearReader();

    if (scrollToGrid && blogGrid) {
        blogGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function renderBlocks(blocks) {
    if (!articleBody) return;
    articleBody.innerHTML = '';

    blocks.forEach(block => {
        if (block.type === 'p') {
            const p = document.createElement('p');
            p.textContent = block.text;
            articleBody.appendChild(p);
            return;
        }

        if (block.type === 'h3') {
            const h3 = document.createElement('h3');
            h3.textContent = block.text;
            articleBody.appendChild(h3);
            return;
        }

        if (block.type === 'ul') {
            const ul = document.createElement('ul');
            block.items.forEach(itemText => {
                const li = document.createElement('li');
                li.textContent = itemText;
                ul.appendChild(li);
            });
            articleBody.appendChild(ul);
        }
    });
}

function openArticle(articleId) {
    const article = articles[String(articleId)];
    if (!article || !articleReaderSection) return;

    if (articleTitle) articleTitle.textContent = article.title;
    if (articleMeta) articleMeta.textContent = `${article.category} • ${article.date} • ${article.readTime}`;
    renderBlocks(article.blocks);

    articleReaderSection.hidden = false;

    if (articleReader) {
        articleReader.focus({ preventScroll: true });
        articleReader.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

if (closeArticleBtn) {
    closeArticleBtn.addEventListener('click', () => {
        closeReader({ scrollToGrid: true });
    });
}

if (blogGrid) {
    blogGrid.addEventListener('click', (e) => {
        const link = e.target.closest('a.read-more');
        if (!link) return;

        const articleId = link.getAttribute('data-read-article');
        if (!articleId) return;

        e.preventDefault();
        openArticle(articleId);
    });
}

// ========== Blog Filtering ==========
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        closeReader();

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
