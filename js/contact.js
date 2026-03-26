// ========== Contact Form Handling ==========
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            subscribe: formData.get('subscribe') ? true : false,
            timestamp: new Date().toISOString()
        };

        // Validate form
        if (!data.name || !data.email || !data.subject || !data.message) {
            showMessage('Please fill in all required fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
            
            contactForm.reset();
            
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
            submissions.push(data);
            localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
        }, 1000);
    });
}

// ========== Show Message Function ==========
function showMessage(message, type) {
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = 'form-message ' + type;
        
        setTimeout(() => {
            formMessage.className = 'form-message';
        }, 5000);
    }
}

// ========== FAQ Accordion ==========
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
        const faqItem = this.parentElement;
        const answer = faqItem.querySelector('.faq-answer');
        
        faqItem.classList.toggle('active');
        answer.classList.toggle('show');
    });
});
