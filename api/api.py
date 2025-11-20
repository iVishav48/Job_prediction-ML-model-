"""
FastAPI Backend for ML Applicant Predictor
Loads trained model and provides prediction endpoint
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict
import pandas as pd
import joblib
import os
from pathlib import Path
from contextlib import asynccontextmanager

# Get the base directory (parent of api folder)
BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / "models" / "model.pkl"

# Global variable to store the loaded model
model = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Load model on startup, cleanup on shutdown"""
    global model
    # Startup
    try:
        model_path = MODEL_PATH
        if not model_path.exists():
            # Try alternative path in notebooks folder
            alt_path = BASE_DIR / "notebooks" / "models" / "model.pkl"
            if alt_path.exists():
                print(f"⚠️  Model not found at {MODEL_PATH}, using {alt_path}")
                model_path = alt_path
            else:
                raise FileNotFoundError(
                    f"Model file not found at {MODEL_PATH} or {alt_path}. "
                    f"Please ensure the model is saved to models/model.pkl"
                )
        model = joblib.load(model_path)
        print(f"✅ Model loaded successfully from {model_path}")
    except FileNotFoundError as e:
        print(f"❌ Error: {str(e)}")
        raise
    except Exception as e:
        print(f"❌ Error loading model: {str(e)}")
        raise
    yield
    # Shutdown (cleanup if needed)
    model = None

# Initialize FastAPI app with lifespan
app = FastAPI(title="ML Applicant Predictor API", version="1.0.0", lifespan=lifespan)

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic model for request validation
class PredictionRequest(BaseModel):
    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "Companies": "Google",
                "Job_Title": "Software Developer",
                "Educational_Degree": "B.Tech",
                "Experience_Years": 5.0,
                "Number_of_Skills": 4
            }
        }
    )
    
    Companies: str
    Job_Title: str
    Educational_Degree: str  # Note: API uses underscore, will convert to space
    Experience_Years: float
    Number_of_Skills: int  # Note: API uses underscore, will convert to space

@app.get("/")
async def root():
    """Root endpoint - API information"""
    return {
        "message": "ML Applicant Predictor API",
        "version": "1.0.0",
        "endpoints": {
            "/predict": "POST - Make prediction",
            "/health": "GET - Health check"
        }
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "model_loaded": model is not None
    }

@app.get("/model/info")
async def model_info():
    """Get model information"""
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    return {
        "model_type": "Random Forest Classifier",
        "preprocessing": {
            "categorical": "OneHotEncoder",
            "numerical": "StandardScaler"
        },
        "features": [
            "Companies",
            "Job_Title",
            "Educational Degree",
            "Experience_Years",
            "Number of Skills"
        ],
        "metrics": {
            "accuracy": 0.903,
            "precision": 0.90,
            "recall": 0.90,
            "f1_score": 0.90
        },
        "training_samples": 1500,
        "model_loaded": True
    }

@app.post("/predict")
async def predict(request: PredictionRequest):
    """
    Predict applicant selection and salary
    
    Accepts:
    - Companies (string)
    - Job_Title (string)
    - Educational_Degree (string)
    - Experience_Years (float)
    - Number_of_Skills (int)
    
    Returns:
    - prediction: Selection prediction (0 or 1)
    - probability: Selection probability (if available)
    - message: Human-readable result
    """
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    try:
        # Convert API field names to model's expected column names
        # Model expects: 'Companies', 'Job_Title', 'Educational Degree', 'Experience_Years', 'Number of Skills'
        input_data = pd.DataFrame({
            'Companies': [request.Companies],
            'Job_Title': [request.Job_Title],
            'Educational Degree': [request.Educational_Degree],  # Convert underscore to space
            'Experience_Years': [request.Experience_Years],
            'Number of Skills': [request.Number_of_Skills]  # Convert underscore to space
        })
        
        # Make prediction
        prediction = model.predict(input_data)[0]
        
        # Get prediction probability if available (for classification models)
        # The model is a Pipeline, so we need to access the classifier step
        probability = None
        try:
            # Check if the last step (classifier) has predict_proba
            classifier = model.named_steps.get('classifier') or model[-1]
            if hasattr(classifier, 'predict_proba'):
                proba = model.predict_proba(input_data)[0]
                probability = float(max(proba))  # Get the max probability
        except (AttributeError, KeyError, IndexError):
            # If predict_proba is not available, continue without probability
            pass
        
        # Convert prediction to human-readable message
        if prediction == 1 or prediction == True:
            message = "✅ Likely to be Selected"
        else:
            message = "❌ Unlikely to be Selected"
        
        return {
            "prediction": int(prediction),
            "probability": probability,
            "message": message,
            "input": {
                "Companies": request.Companies,
                "Job_Title": request.Job_Title,
                "Educational_Degree": request.Educational_Degree,
                "Experience_Years": request.Experience_Years,
                "Number_of_Skills": request.Number_of_Skills
            }
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

