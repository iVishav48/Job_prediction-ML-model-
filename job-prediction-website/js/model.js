document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('prediction-form');
    const resultContainer = document.getElementById('prediction-result');
    
    // Form submission handler
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                gender: form.gender.value,
                ssc_percentage: parseFloat(form.ssc_percentage.value),
                ssc_board: form.ssc_board.value,
                hsc_percentage: parseFloat(form.hsc_percentage.value),
                hsc_board: form.hsc_board.value,
                hsc_subject: form.hsc_subject.value,
                degree_percentage: parseFloat(form.degree_percentage.value),
                degree_type: form.degree_type.value,
                work_experience: parseInt(form.work_experience.value),
                emp_test_percentage: parseFloat(form.emp_test_percentage.value),
                specialisation: form.specialisation.value,
                mba_percent: parseFloat(form.mba_percent.value)
            };
            
            // Basic validation
            if (Object.values(formData).some(value => value === '' || isNaN(value))) {
                alert('Please fill in all fields with valid values');
                return;
            }
            
            // Show loading state
            showLoading();
            
            // In a real app, you would send this data to your backend API
            // For now, we'll simulate an API call with a timeout
            setTimeout(() => {
                // This is where you would typically make an API call
                // const response = await fetch('/api/predict', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify(formData)
                // });
                // const result = await response.json();
                
                // For demo purposes, we'll use sample data
                const sampleResults = generateSamplePredictions(formData);
                displayResults(sampleResults);
            }, 1500);
        });
    }
    
    // Generate sample predictions based on form data
    function generateSamplePredictions(formData) {
        // This is a simplified example - in a real app, this would be handled by your ML model
        const baseScore = (
            formData.ssc_percentage * 0.1 +
            formData.hsc_percentage * 0.15 +
            formData.degree_percentage * 0.2 +
            formData.emp_test_percentage * 0.25 +
            formData.mba_percent * 0.3
        ) / 100;
        
        const predictions = [
            {
                title: 'Data Scientist',
                confidence: Math.min(95, Math.max(60, Math.round(baseScore * 85 + 20))),
                description: 'Analyze complex data to extract insights and build predictive models.',
                fit: getFitScore(baseScore, 0.7)
            },
            {
                title: 'Business Analyst',
                confidence: Math.min(90, Math.max(55, Math.round(baseScore * 80 + 15))),
                description: 'Interpret data and turn it into information for business decisions.',
                fit: getFitScore(baseScore, 0.6)
            },
            {
                title: 'Product Manager',
                confidence: Math.min(85, Math.max(50, Math.round(baseScore * 75 + 15))),
                description: 'Lead cross-functional teams to deliver successful products.',
                fit: getFitScore(baseScore, 0.55)
            },
            {
                title: 'Marketing Analyst',
                confidence: Math.min(80, Math.max(45, Math.round(baseScore * 70 + 10))),
                description: 'Analyze market data to guide marketing strategies.',
                fit: getFitScore(baseScore, 0.5)
            }
        ];
        
        // Sort by confidence (highest first)
        return predictions.sort((a, b) => b.confidence - a.confidence);
    }
    
    function getFitScore(baseScore, threshold) {
        const score = baseScore / threshold;
        if (score >= 0.9) return 'Excellent Fit';
        if (score >= 0.7) return 'Good Fit';
        if (score >= 0.5) return 'Moderate Fit';
        return 'Low Fit';
    }
    
    function showLoading() {
        resultContainer.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <p>Analyzing your profile and generating predictions...</p>
            </div>
        `;
    }
    
    // Initialize multi-select dropdown
    function initMultiSelect() {
        const multiselect = document.querySelector('.multiselect');
        if (!multiselect) return;
        
        const selectBox = multiselect.querySelector('.select-box');
        const optionsContainer = multiselect.querySelector('.options-container');
        const optionsList = multiselect.querySelector('.options-list');
        const searchInput = multiselect.querySelector('.skill-search');
        const selectedCount = multiselect.querySelector('.selected-count');
        const placeholder = multiselect.querySelector('.placeholder');
        const btnClear = multiselect.querySelector('.btn-clear');
        const btnDone = multiselect.querySelector('.btn-done');
        
        // Toggle dropdown
        selectBox.addEventListener('click', function(e) {
            e.stopPropagation();
            multiselect.classList.toggle('active');
            
            if (multiselect.classList.contains('active')) {
                searchInput.focus();
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!multiselect.contains(e.target)) {
                multiselect.classList.remove('active');
            }
        });
        
        // Search functionality
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const options = optionsList.querySelectorAll('.option');
            
            options.forEach(option => {
                const text = option.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    option.style.display = 'flex';
                } else {
                    option.style.display = 'none';
                }
            });
        });
        
        // Handle option selection
        optionsList.addEventListener('click', function(e) {
            const option = e.target.closest('.option');
            if (!option) return;
            
            const checkbox = option.querySelector('input[type="checkbox"]');
            if (!checkbox) return;
            
            // Toggle checkbox
            checkbox.checked = !checkbox.checked;
            
            // Update UI
            if (checkbox.checked) {
                option.classList.add('selected');
            } else {
                option.classList.remove('selected');
            }
            
            updateSelectedCount();
        });
        
        // Clear all selections
        if (btnClear) {
            btnClear.addEventListener('click', function(e) {
                e.stopPropagation();
                const checkboxes = optionsList.querySelectorAll('input[type="checkbox"]');
                checkboxes.forEach(checkbox => {
                    checkbox.checked = false;
                    checkbox.parentElement.classList.remove('selected');
                });
                updateSelectedCount();
            });
        }
        
        // Done button
        if (btnDone) {
            btnDone.addEventListener('click', function(e) {
                e.stopPropagation();
                multiselect.classList.remove('active');
            });
        }
        
        // Update selected count and display
        function updateSelectedCount() {
            const selectedCountNum = multiselect.querySelectorAll('input[type="checkbox"]:checked').length;
            selectedCount.textContent = `${selectedCountNum} selected`;
            
            // Show/hide placeholder based on selection
            if (selectedCountNum > 0) {
                placeholder.style.display = 'none';
                selectedCount.style.display = 'inline-block';
            } else {
                placeholder.style.display = 'inline';
                selectedCount.style.display = 'none';
            }
            
            // Update selected tags display
            updateSelectedTags();
        }
        
        // Update selected tags display
        function updateSelectedTags() {
            let tagsContainer = multiselect.querySelector('.selected-tags');
            if (!tagsContainer) {
                tagsContainer = document.createElement('div');
                tagsContainer.className = 'selected-tags';
                selectBox.parentNode.insertBefore(tagsContainer, selectBox.nextSibling);
            }
            
            const selectedOptions = [];
            multiselect.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
                const optionText = checkbox.parentElement.querySelector('.option-text').textContent;
                selectedOptions.push({
                    value: checkbox.value,
                    text: optionText
                });
            });
            
            // Update tags display
            tagsContainer.innerHTML = '';
            selectedOptions.forEach(option => {
                const tag = document.createElement('div');
                tag.className = 'tag';
                tag.innerHTML = `
                    ${option.text}
                    <span class="tag-remove" data-value="${option.value}">&times;</span>
                `;
                tagsContainer.appendChild(tag);
            });
            
            // Add event listeners to remove buttons
            tagsContainer.querySelectorAll('.tag-remove').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const value = this.getAttribute('data-value');
                    const checkbox = multiselect.querySelector(`input[type="checkbox"][value="${value}"]`);
                    if (checkbox) {
                        checkbox.checked = false;
                        checkbox.parentElement.classList.remove('selected');
                        updateSelectedCount();
                    }
                });
            });
        }
        
        // Initialize
        updateSelectedCount();
    }
    
    // Display prediction results
    function displayResults(predictions) {
        let resultsHTML = `
            <div class="results-header">
                <h3>Your Career Prediction Results</h3>
                <p>Based on your profile, here are the most suitable career paths for you:</p>
            </div>
            <div class="results-list">
        `;
        
        predictions.forEach((job, index) => {
            const confidenceWidth = Math.min(100, job.confidence * 1.1); // Scale for better visualization
            resultsHTML += `
                <div class="result-item" style="animation-delay: ${index * 0.1}s">
                    <div class="result-header">
                        <h4>${job.title}</h4>
                        <span class="confidence-tag" style="background-color: ${getConfidenceColor(job.confidence / 100)}">
                            ${job.confidence}% Match
                        </span>
                    </div>
                    <div class="confidence-bar">
                        <div class="confidence-level" style="width: ${confidenceWidth}%;
                            background: linear-gradient(90deg, ${getConfidenceGradient(job.confidence / 100)});">
                        </div>
                    </div>
                    <p class="fit"><strong>Fit:</strong> <span class="fit-${job.fit.toLowerCase().replace(' ', '-')}">${job.fit}</span></p>
                    <p class="description">${job.description}</p>
                    <div class="result-actions">
                        <button class="btn btn-sm btn-outline">View Details</button>
                        <button class="btn btn-sm btn-primary">Explore Career Path</button>
                    </div>
                </div>
            `;
        });
        
        resultsHTML += `
            </div>
            <div class="results-footer">
                <p class="disclaimer">
                    <i class="fas fa-info-circle"></i> 
                    These predictions are based on the information provided and current market trends. 
                    For personalized career advice, consider speaking with a career counselor.
                </p>
                <div class="action-buttons">
                    <button class="btn btn-secondary" onclick="window.location.href='contact.html'">
                        <i class="fas fa-comments"></i> Get Career Advice
                    </button>
                    <button class="btn btn-primary" onclick="window.location.href='index.html'">
                        <i class="fas fa-home"></i> Back to Home
                    </button>
                </div>
            </div>
        `;
        
        resultContainer.innerHTML = resultsHTML;
        
        // Add animation to result items
        const resultItems = document.querySelectorAll('.result-item');
        resultItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    }
    
    function getConfidenceColor(confidence) {
        if (confidence >= 0.8) return '#4CAF50'; // Green
        if (confidence >= 0.6) return '#8BC34A'; // Light Green
        if (confidence >= 0.4) return '#FFC107'; // Yellow
        return '#FF9800'; // Orange
    }
    
    function getConfidenceGradient(confidence) {
        if (confidence >= 0.8) return '#4CAF50, #66BB6A';
        if (confidence >= 0.6) return '#8BC34A, #9CCC65';
        if (confidence >= 0.4) return '#FFC107, #FFD54F';
        return '#FF9800, #FFA726';
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
    const inputs = document.querySelectorAll('input:not([type="checkbox"]), select, textarea');
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
