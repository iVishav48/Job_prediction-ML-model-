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
    
    // Hide previous results and errors
    result.classList.remove('show', 'success', 'error');
    document.querySelectorAll('.error-message').forEach(el => {
        el.classList.remove('show');
        el.textContent = '';
    });

    // Get form values
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
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.detail || 'Prediction failed');
        }

        // Display result with animation
        setTimeout(() => {
            displayResult(data);
        }, 300);

    } catch (error) {
        console.error('Error:', error);
        showError(error.message || 'Failed to connect to API. Make sure the backend is running on http://localhost:8000');
    } finally {
        loading.classList.remove('show');
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Predict Selection';
    }
});

// Display prediction result
function displayResult(data) {
    const resultTitle = document.getElementById('resultTitle');
    const resultMessage = document.getElementById('resultMessage');
    const resultProbability = document.getElementById('resultProbability');
    const resultIcon = document.getElementById('resultIcon');

    resultTitle.textContent = 'Prediction Result';
    resultMessage.textContent = data.message || (data.prediction === 1 ? '✅ Likely to be Selected' : '❌ Unlikely to be Selected');
    
    // Set icon based on prediction
    if (data.prediction === 1) {
        resultIcon.innerHTML = '<svg class="result-icon success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 6L9 17l-5-5"/></svg>';
    } else {
        resultIcon.innerHTML = '<svg class="result-icon error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 6L6 18M6 6l12 12"/></svg>';
    }
    
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
    
    // Add confetti effect for success
    if (data.prediction === 1) {
        createConfetti();
    }
}

// Show error message
function showError(message) {
    result.classList.add('show', 'error');
    document.getElementById('resultTitle').textContent = 'Error';
    document.getElementById('resultMessage').textContent = message;
    document.getElementById('resultProbability').innerHTML = '';
    document.getElementById('resultIcon').innerHTML = '<svg class="result-icon error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>';
}

// Create confetti effect for success
function createConfetti() {
    const colors = ['#00ff88', '#00d4ff', '#ff6b6b', '#ffd93d', '#6bcf7f'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
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

