document.addEventListener('DOMContentLoaded', function() {
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Show success message
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            
            // Simulate form submission
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Simulate API call
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3>Message Sent Successfully!</h3>
                    <p>Thank you for contacting us. We'll get back to you soon.</p>
                `;
                
                // Insert success message before the form
                contactForm.parentNode.insertBefore(successMessage, contactForm);
                
                // Hide form
                contactForm.style.display = 'none';
                
                // Reset button state
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    setTimeout(() => {
                        successMessage.remove();
                        contactForm.style.display = 'block';
                    }, 300);
                }, 5000);
            }, 1500);
        });
    }
    
    // FAQ Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggleIcon = item.querySelector('.toggle-icon');
        
        question.addEventListener('click', () => {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                    otherItem.querySelector('.toggle-icon').textContent = '+';
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                toggleIcon.textContent = '×';
            } else {
                answer.style.maxHeight = '0';
                toggleIcon.textContent = '+';
            }
        });
    });
    
    // Animate form elements on scroll
    const formGroups = document.querySelectorAll('.form-group');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    formGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(20px)';
        group.style.transition = `all 0.5s ease ${0.1 * index}s`;
        observer.observe(group);
    });
    
    // Animate team members on scroll
    const teamMembers = document.querySelectorAll('.team-member');
    const teamObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100 * index);
                teamObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    teamMembers.forEach((member, index) => {
        member.style.opacity = '0';
        member.style.transform = 'translateY(30px)';
        member.style.transition = `all 0.5s ease ${0.1 * index}s`;
        teamObserver.observe(member);
    });
    
    // Animate FAQ items on scroll
    const faqObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, 100 * index);
                faqObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    faqItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(' + (index % 2 === 0 ? '-' : '') + '20px)';
        item.style.transition = `all 0.5s ease ${0.1 * (index % 3)}s`;
        faqObserver.observe(item);
    });
});
