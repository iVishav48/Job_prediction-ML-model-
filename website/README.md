# JobPredictor - AI-Powered Applicant Selection Predictor

A modern, responsive web application for predicting applicant selection using a trained Random Forest machine learning model.

## 🚀 Features

- **Live Predictions**: Get instant predictions with confidence scores
- **Modern UI**: Dark theme with electric blue accents, fully responsive
- **Model Information**: Detailed model metrics and architecture
- **Team Showcase**: Meet the team behind the project
- **Contact Form**: Easy way to get in touch

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: FastAPI (Python)
- **ML Model**: Scikit-learn Random Forest Pipeline (saved as `model.pkl`)

## 📋 Prerequisites

- Node.js 18+ and npm
- Python 3.8+
- pip

## 🔧 Setup Instructions

### Backend Setup

1. **Navigate to project root**:
   ```bash
   cd D:\_ml
   ```

2. **Create virtual environment** (if not already created):
   ```bash
   python -m venv venv
   ```

3. **Activate virtual environment**:
   - Windows:
     ```bash
     venv\Scripts\activate
     ```
   - Mac/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

5. **Verify model file exists**:
   ```bash
   # Should be at: models/model.pkl
   dir models\model.pkl
   ```

6. **Start the backend server**:
   ```bash
   python api/api.py
   ```
   
   Or using uvicorn directly:
   ```bash
   uvicorn api.api:app --reload --port 8000
   ```

   You should see:
   ```
   ✅ Model loaded successfully from D:\_ml\models\model.pkl
   INFO:     Uvicorn running on http://0.0.0.0:8000
   ```

### Frontend Setup

1. **Navigate to website directory**:
   ```bash
   cd website
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open browser**:
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
_ml/
├── api/
│   └── api.py              # FastAPI backend
├── models/
│   └── model.pkl           # Trained ML model
├── website/                # Next.js frontend
│   ├── app/
│   │   ├── page.tsx        # Home page
│   │   ├── model/
│   │   │   └── page.tsx    # Predict page
│   │   ├── contact/
│   │   │   └── page.tsx    # Contact page
│   │   └── layout.tsx      # Root layout
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── PredictorForm.tsx
│   │   └── TeamMember.tsx
│   ├── styles/
│   │   └── globals.css
│   └── package.json
└── requirements.txt
```

## API Endpoints

### POST `/predict`
Make a prediction with applicant data.

**Request Body**:
```json
{
  "Companies": "Google",
  "Job_Title": "Software Developer",
  "Educational_Degree": "B.Tech",
  "Experience_Years": 5.0,
  "Number_of_Skills": 4
}
```

**Response**:
```json
{
  "prediction": 1,
  "probability": 0.85,
  "message": "✅ Likely to be Selected",
  "input": { ... }
}
```

### GET `/health`
Health check endpoint.

### GET `/model/info`
Get model information and metrics.

## 🧪 Testing the Model

1. **Start backend** (in one terminal):
   ```bash
   cd D:\_ml
   python api/api.py
   ```

2. **Start frontend** (in another terminal):
   ```bash
   cd D:\_ml\website
   npm run dev
   ```

3. **Test prediction**:
   - Navigate to `http://localhost:3000/model`
   - Fill in the form or use a test input
   - Click "Predict Selection"
   - View the result with confidence score

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to change the color scheme:
```js
colors: {
  charcoal: '#0b1221',
  electric: '#0ea5e9',
  steel: '#94a3b8',
  offwhite: '#e6eef8',
}
```

### Team Members
Update team information in:
- `app/page.tsx` (Home page team section)
- `app/contact/page.tsx` (Contact page team section)

### API URL
Update API URL in `components/PredictorForm.tsx`:
```ts
const API_URL = 'http://localhost:8000/predict'
```

## 🚢 Deployment

### Backend Deployment
- Deploy to services like Railway, Render, or Heroku
- Update CORS origins in `api/api.py` for production
- Set environment variables as needed

### Frontend Deployment
- Deploy to Vercel (recommended for Next.js):
  ```bash
  npm run build
  vercel deploy
  ```
- Or deploy to any static hosting service

## 📝 Notes

- For production, update CORS origins in `api/api.py` from `["*"]` to specific domains
- Update contact form endpoint in `app/contact/page.tsx` with your Formspree ID or backend endpoint
- Update GitHub and LinkedIn links in team member components

## 👥 Team

- **Harshvardhan Singh** - ML Engineer
- **Vishavjit Singh** - Data Scientist
- **Simratpal Singh** - Full Stack Developer

## 📄 License

This project is open source and available for personal and educational use.

## 🐛 Troubleshooting

### Backend not connecting
- Ensure backend is running on `http://localhost:8000`
- Check that model file exists at `models/model.pkl`
- Verify CORS is enabled in `api/api.py`

### Frontend build errors
- Delete `node_modules` and `.next` folder
- Run `npm install` again
- Check Node.js version (requires 18+)

### Model not loading
- Verify `models/model.pkl` exists
- Check file path in `api/api.py`
- Ensure joblib is installed: `pip install joblib`

