document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('prediction-form');
    const resultContainer = document.getElementById('prediction-result');
    
    // Sample job prediction data (in a real app, this would come from an API)
    const jobPredictions = [
        {
            title: 'Data Scientist',
            confidence: '85%',
            description: 'Analyze complex data to extract insights and build predictive models.'
        },
        {
            title: 'Machine Learning Engineer',
            confidence: '78%',
            description: 'Design and implement machine learning systems and algorithms.'
        },
        {
            title: 'Data Analyst',
            confidence: '72%',
            description: 'Interpret data and turn it into information for business decisions.'
        }
    ];
    
    // Form submission handler
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            resultContainer.innerHTML = `
                <div class="loading">
                    <div class="spinner"></div>
                    <p>Analyzing your profile...</p>
                </div>
            `;
            
            // Simulate API call with timeout
            setTimeout(() => {
                displayResults(jobPredictions);
            }, 1500);
        });
    }
    
    // Display prediction results
    function displayResults(predictions) {
        let resultsHTML = `
            <div class="results-header">
                <h3>Your Top Job Matches</h3>
                <p>Based on your profile, here are the most suitable job roles for you:</p>
            </div>
            <div class="results-list">
        `;
        
        predictions.forEach((job, index) => {
            resultsHTML += `
                <div class="result-item" style="animation-delay: ${index * 0.1}s">
                    <h4>${job.title} <span class="confidence">${job.confidence} Match</span></h4>
                    <p>${job.description}</p>
                </div>
            `;
        });
        
        resultsHTML += `
            </div>
            <div class="results-footer">
                <button class="btn btn-secondary" onclick="window.location.href='contact.html'">
                    Get Career Advice
                </button>
            </div>
        `;
        
        resultContainer.innerHTML = resultsHTML;
        
        // Add animation to result items
        const resultItems = document.querySelectorAll('.result-item');
        resultItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 100 * index);
        });
    }
    
    // Add animation to form elements
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(20px)';
        group.style.transition = `all 0.5s ease ${0.1 * index}s`;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(group);
    });
    
    // Add input focus effects
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        // Add focus class on focus
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        // Remove focus class on blur if empty
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on page load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
});

// Add custom select styling
document.addEventListener('DOMContentLoaded', function() {
    const selects = document.querySelectorAll('select');
    
    selects.forEach(select => {
        // Create custom select container
        const selectContainer = document.createElement('div');
        selectContainer.className = 'custom-select';
        
        // Hide original select
        select.style.display = 'none';
        
        // Create custom select element
        const customSelect = document.createElement('div');
        customSelect.className = 'select-selected';
        customSelect.textContent = select.options[0].text;
        
        // Create custom options container
        const customOptions = document.createElement('div');
        customOptions.className = 'select-items select-hide';
        
        // Add options to custom select
        Array.from(select.options).forEach(option => {
            const customOption = document.createElement('div');
            customOption.textContent = option.text;
            customOption.addEventListener('click', function() {
                select.selectedIndex = Array.from(select.options).indexOf(option);
                customSelect.textContent = option.text;
                customOptions.classList.add('select-hide');
                customSelect.classList.remove('select-arrow-active');
                
                // Trigger change event
                const event = new Event('change');
                select.dispatchEvent(event);
            });
            customOptions.appendChild(customOption);
        });
        
        // Toggle options on click
        customSelect.addEventListener('click', function(e) {
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle('select-hide');
            this.classList.toggle('select-arrow-active');
        });
        
        // Close when clicking outside
        document.addEventListener('click', closeAllSelect);
        
        // Add elements to DOM
        selectContainer.appendChild(select);
        selectContainer.appendChild(customSelect);
        selectContainer.appendChild(customOptions);
        select.parentNode.insertBefore(selectContainer, select);
    });
    
    function closeAllSelect(elmnt) {
        const selectItems = document.getElementsByClassName('select-items');
        const selectSelected = document.getElementsByClassName('select-selected');
        
        for (let i = 0; i < selectSelected.length; i++) {
            if (elmnt !== selectSelected[i] && elmnt !== selectItems[i]) {
                selectSelected[i].classList.remove('select-arrow-active');
                selectItems[i].classList.add('select-hide');
            }
        }
    }
});
