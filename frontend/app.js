// API Configuration
const API_URL = 'http://localhost:8000/predict';

// DOM Elements
const form = document.getElementById('predictionForm');
const loading = document.getElementById('loading');
const result = document.getElementById('result');
const submitBtn = document.getElementById('submitBtn');

// Form submission handler
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Hide previous results
    result.classList.remove('show', 'success', 'error');

    // Get form values - matching exact API field names
    const formData = {
        Companies: document.getElementById('companies').value,
        Job_Title: document.getElementById('jobTitle').value,
        Educational_Degree: document.getElementById('educationalDegree').value,
        Experience_Years: parseFloat(document.getElementById('experienceYears').value),
        Number_of_Skills: parseInt(document.getElementById('numberOfSkills').value)
    };

    // Validate form
    if (!formData.Companies || !formData.Job_Title || !formData.Educational_Degree) {
        showError('Please fill in all required fields');
        return;
    }

    // Show loading state
    loading.classList.add('show');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="btn-loader"></span> Processing...';

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            mode: 'cors'
        });

        // Check if response is ok first
        if (!response.ok) {
            let errorMessage = 'Prediction failed';
            try {
                const errorData = await response.json();
                errorMessage = errorData.detail || errorData.message || errorMessage;
            } catch (e) {
                errorMessage = `Server error: ${response.status} ${response.statusText}`;
            }
            throw new Error(errorMessage);
        }

        // Parse JSON only if response is ok
        const data = await response.json();

        // Display result
        displayResult(data);

    } catch (error) {
        console.error('Error:', error);
        
        // Handle network errors specifically
        let errorMessage = 'Failed to connect to API';
        if (error.name === 'TypeError' && (error.message.includes('fetch') || error.message.includes('Failed to fetch'))) {
            errorMessage = 'Cannot connect to API. Please ensure the backend server is running on http://localhost:8000';
        } else if (error.message) {
            errorMessage = error.message;
        }
        
        showError(errorMessage);
    } finally {
        loading.classList.remove('show');
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Predict Selection';
    }
});

// Display prediction result - only show what API returns
function displayResult(data) {
    const resultMessage = document.getElementById('resultMessage');
    const resultProbability = document.getElementById('resultProbability');
    const resultIcon = document.getElementById('resultIcon');

    // Show message from API (already formatted)
    resultMessage.textContent = data.message;
    
    // Set icon based on prediction
    if (data.prediction === 1) {
        resultIcon.innerHTML = '<svg class="result-icon success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 6L9 17l-5-5"/></svg>';
    } else {
        resultIcon.innerHTML = '<svg class="result-icon error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 6L6 18M6 6l12 12"/></svg>';
    }
    
    // Show probability only if available
    if (data.probability !== null && data.probability !== undefined) {
        const percentage = (data.probability * 100).toFixed(1);
        resultProbability.innerHTML = `
            <div class="probability-bar">
                <div class="probability-fill" style="width: ${percentage}%"></div>
            </div>
            <span class="probability-text">Confidence: ${percentage}%</span>
        `;
    } else {
        resultProbability.innerHTML = '';
    }

    result.classList.add('show', data.prediction === 1 ? 'success' : 'error');
}

// Show error message
function showError(message) {
    result.classList.add('show', 'error');
    document.getElementById('resultMessage').textContent = message;
    document.getElementById('resultProbability').innerHTML = '';
    document.getElementById('resultIcon').innerHTML = '<svg class="result-icon error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>';
}

// Add input focus animations
document.querySelectorAll('input, select').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });
});
