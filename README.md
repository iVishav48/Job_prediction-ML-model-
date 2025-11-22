# ML Applicant Predictor

A complete machine learning project with backend API and frontend UI for predicting job applicant selection based on company, job title, education, experience, and skills.

## 🚀 Quick Start

### Step 1: Install Dependencies

```bash
pip install -r requirements.txt
```

**Recommended:** Use a virtual environment:

```bash
# Create virtual environment
python -m venv venv

# Activate it
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### Step 2: Train and Save Your Model

1. Open the Jupyter notebook:
```bash
jupyter notebook notebooks/project.ipynb
```

2. Run all cells to train your models

3. Save your trained model. Add this code at the end of your notebook:
```python
import joblib
import os

# Create models directory if it doesn't exist
os.makedirs('models', exist_ok=True)

# Save the classification model (or whichever model you want to use)
joblib.dump(rf_clf_pipeline, 'models/model.pkl')
print("✅ Model saved to models/model.pkl")
```

### Step 3: Start the Backend API

```bash
# From the project root directory
python api/api.py
```

Or using uvicorn directly:
```bash
uvicorn api.api:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at: `http://localhost:8000`

- API Docs: `http://localhost:8000/docs` (Swagger UI)
- Alternative Docs: `http://localhost:8000/redoc`

### Step 4: Open the Frontend

1. Simply open `frontend/index.html` in your web browser
2. Or use a local server:
```bash
# Using Python
cd frontend
python -m http.server 8080
# Then open http://localhost:8080
```

3. Fill in the form and click "Predict Selection"

## 📡 API Endpoints

### POST `/predict`

Predict applicant selection based on input features.

## 🎯 Features

- **Backend API**: FastAPI-based REST API with automatic documentation
- **Frontend UI**: Clean, modern web interface for predictions
- **Model Integration**: Seamless loading and prediction using scikit-learn pipelines
- **CORS Enabled**: Frontend can communicate with backend from any origin
- **Error Handling**: Comprehensive error messages and validation

## 🔧 Technical Details

### Model Requirements

The API expects a scikit-learn pipeline/model that:
- Accepts a pandas DataFrame with columns: `['Companies', 'Job_Title', 'Educational Degree', 'Experience_Years', 'Number of Skills']`
- Has a `.predict()` method
- Optionally has a `.predict_proba()` method for probability scores


Or use the interactive API docs at `http://localhost:8000/docs`

## 📦 Dependencies

- **FastAPI**: Modern, fast web framework for building APIs
- **Uvicorn**: ASGI server for running FastAPI
- **Pandas**: Data manipulation
- **Scikit-learn**: Machine learning
- **Joblib**: Model serialization
- **Pydantic**: Data validation

See `requirements.txt` for complete list with versions.

