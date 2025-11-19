# ML Applicant Predictor

A complete machine learning project with backend API and frontend UI for predicting job applicant selection based on company, job title, education, experience, and skills.

## 📁 Project Structure

```
ML-Applicant-Predictor/
├── api/
│   └── api.py              # FastAPI backend server
├── frontend/
│   └── index.html          # Frontend UI (HTML/JS)
├── models/
│   └── model.pkl           # Trained ML model (generate from notebook)
├── data/
│   ├── raw/                # Original dataset
│   └── processed/          # Processed data
├── notebooks/
│   └── project.ipynb       # Jupyter notebook for training
├── requirements.txt        # Python dependencies
├── .gitignore             # Git ignore file
└── README.md              # This file
```

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

**Request Body:**
```json
{
  "Companies": "Google",
  "Job_Title": "Software Developer",
  "Educational_Degree": "B.Tech",
  "Experience_Years": 5.0,
  "Number_of_Skills": 4
}
```

**Response:**
```json
{
  "prediction": 1,
  "probability": 0.85,
  "message": "✅ Likely to be Selected",
  "input": {
    "Companies": "Google",
    "Job_Title": "Software Developer",
    "Educational_Degree": "B.Tech",
    "Experience_Years": 5.0,
    "Number_of_Skills": 4
  }
}
```

### GET `/health`

Health check endpoint to verify API and model status.

### GET `/`

API information and available endpoints.

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

### Column Names

**Important:** The model pipeline expects these exact column names:
- `Companies` (string)
- `Job_Title` (string)
- `Educational Degree` (string) - note the space
- `Experience_Years` (float)
- `Number of Skills` (int) - note the space

The API automatically converts underscore-separated field names to space-separated column names.

## 📝 Development

### Running in Development Mode

Backend with auto-reload:
```bash
uvicorn api.api:app --reload
```

### Testing the API

Using curl:
```bash
curl -X POST "http://localhost:8000/predict" \
  -H "Content-Type: application/json" \
  -d '{
    "Companies": "Google",
    "Job_Title": "Software Developer",
    "Educational_Degree": "B.Tech",
    "Experience_Years": 5.0,
    "Number_of_Skills": 4
  }'
```

Or use the interactive API docs at `http://localhost:8000/docs`

## 📦 Dependencies

- **FastAPI**: Modern, fast web framework for building APIs
- **Uvicorn**: ASGI server for running FastAPI
- **Pandas**: Data manipulation
- **Scikit-learn**: Machine learning
- **Joblib**: Model serialization
- **Pydantic**: Data validation

See `requirements.txt` for complete list with versions.

## 🐛 Troubleshooting

### Model not found error
- Make sure you've saved your model to `models/model.pkl`
- Check that the file path is correct

### CORS errors
- The API has CORS enabled for all origins
- If issues persist, check that the backend is running on port 8000

### Port already in use
- Change the port in `api/api.py` or use:
```bash
uvicorn api.api:app --port 8001
```
- Update the API_URL in `frontend/index.html` accordingly

## 📄 License

This project is open source and available for personal and educational use.
