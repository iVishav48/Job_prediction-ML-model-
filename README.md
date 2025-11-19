# ML Project - Job Application Analysis

A machine learning project for analyzing job applications, predicting applicant selection, and salary estimation.

## How to Run
    
### Step 1: Install Dependencies

Open a terminal/command prompt in the project root directory and run:

```bash
pip install -r requirements.txt
```

**Note:** If you're using a virtual environment (recommended), activate it first:
```bash
# Create virtual environment (optional but recommended)
python -m venv venv

# Activate it
# On Windows:
venv\Scripts\activate

# On Mac/Linux:
source venv/bin/activate

# Then install dependencies
pip install -r requirements.txt
```

### Step 2: Launch Jupyter Notebook

From the project root directory, run:

```bash
jupyter notebook
```

This will open Jupyter in your web browser. Then navigate to:
- `notebooks/project.ipynb`

**OR** directly open the notebook:

```bash
jupyter notebook notebooks/project.ipynb
```

### Step 3: Run the Notebook

1. In Jupyter, click on `project.ipynb` to open it
2. Run cells sequentially by clicking "Run" or pressing `Shift + Enter`
3. The notebook will:
   - Load and clean the data from `data/raw/dataset.csv`
   - Perform exploratory data analysis
   - Train classification and regression models
   - Display an interactive widget for predictions

### Alternative: Using JupyterLab

If you prefer JupyterLab:

```bash
jupyter lab notebooks/project.ipynb
```

## Project Overview

This project includes:
- **Data Cleaning**: Handling missing values and outliers
- **Exploratory Data Analysis (EDA)**: Visualizations and insights
- **Classification Model**: Predicting applicant selection
- **Regression Model**: Predicting salary
- **Interactive Widget**: For making predictions

## Dependencies

See `requirements.txt` for the complete list of required packages.

