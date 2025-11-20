'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'

interface FormData {
  Companies: string
  Job_Title: string
  Educational_Degree: string
  Experience_Years: number
  Number_of_Skills: number
}

interface PredictionResult {
  prediction: number
  probability: number | null
  message: string
  input: FormData
}

const API_URL = 'http://localhost:8000/predict'

const testInputs = [
  {
    name: 'Software Developer at Google',
    data: {
      Companies: 'Google',
      Job_Title: 'Software Developer',
      Educational_Degree: 'B.Tech',
      Experience_Years: 5,
      Number_of_Skills: 4,
    },
  },
  {
    name: 'Data Scientist at Microsoft',
    data: {
      Companies: 'Microsoft',
      Job_Title: 'Data Scientist',
      Educational_Degree: 'M.Tech',
      Experience_Years: 3,
      Number_of_Skills: 5,
    },
  },
  {
    name: 'ML Engineer at Amazon',
    data: {
      Companies: 'Amazon',
      Job_Title: 'ML Engineer',
      Educational_Degree: 'PhD',
      Experience_Years: 7,
      Number_of_Skills: 6,
    },
  },
]

export default function PredictorForm() {
  const [formData, setFormData] = useState<FormData>({
    Companies: '',
    Job_Title: '',
    Educational_Degree: '',
    Experience_Years: 5,
    Number_of_Skills: 4,
  })
  const [result, setResult] = useState<PredictionResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showModelDetails, setShowModelDetails] = useState(false)

  const companies = [
    'Google', 'Microsoft', 'Amazon', 'Adobe', 'Accenture', 'Capgemini',
    'Cognizant', 'Deloitte', 'Flipkart', 'HCL', 'Infosys', 'Ola', 'Paytm',
    'Reliance Jio', 'Swiggy', 'TCS', 'Tech Mahindra', 'Wipro', 'Zomato',
    "Byju's", 'HealthTechY', 'StartUpX',
  ]

  const jobTitles = [
    'Software Developer', 'Backend Engineer', 'Frontend Developer',
    'Data Scientist', 'Data Analyst', 'ML Engineer', 'Web Developer',
    'Business Analyst', 'Financial Analyst', 'Sales Executive',
    'Chartered Accountant',
  ]

  const degrees = [
    'B.Tech', 'M.Tech', 'BCA', 'MCA', 'MBA', 'B.Com', 'M.Com', 'PhD',
    'Chartered Accountant',
  ]

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError(null)
  }

  const handleTestInput = (testData: FormData) => {
    setFormData(testData)
    setError(null)
    setResult(null)
  }

  const validateForm = (): boolean => {
    if (!formData.Companies || !formData.Job_Title || !formData.Educational_Degree) {
      setError('Please fill in all required fields')
      return false
    }
    if (formData.Experience_Years < 0) {
      setError('Experience years must be 0 or greater')
      return false
    }
    if (formData.Number_of_Skills < 0) {
      setError('Number of skills must be 0 or greater')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setResult(null)

    if (!validateForm()) return

    setLoading(true)
    try {
      const response = await axios.post<PredictionResult>(API_URL, formData)
      setResult(response.data)
    } catch (err: any) {
      if (err.response?.data?.detail) {
        setError(err.response.data.detail)
      } else if (err.message.includes('Network Error') || err.code === 'ERR_NETWORK') {
        setError('Cannot connect to API. Please ensure the backend server is running on http://localhost:8000')
      } else {
        setError('An error occurred. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const exportResult = (format: 'json' | 'csv') => {
    if (!result) return

    if (format === 'json') {
      const dataStr = JSON.stringify(result, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'prediction-result.json'
      link.click()
    } else {
      const csv = `Prediction,Probability,Message\n${result.prediction},${result.probability || 'N/A'},${result.message}`
      const dataBlob = new Blob([csv], { type: 'text/csv' })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'prediction-result.csv'
      link.click()
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Test Inputs Dropdown */}
      <div className="mb-6">
        <label className="block text-steel mb-2 text-sm font-medium">Quick Test</label>
        <select
          className="w-full bg-charcoal/60 backdrop-blur-sm border border-electric/20 rounded-lg px-4 py-2 text-offwhite focus:outline-none focus:border-electric transition-all duration-120 ease-snap"
          onChange={(e) => {
            const selected = testInputs.find((t) => t.name === e.target.value)
            if (selected) handleTestInput(selected.data)
          }}
          value=""
        >
          <option value="">Select a test input...</option>
          {testInputs.map((test) => (
            <option key={test.name} value={test.name}>
              {test.name}
            </option>
          ))}
        </select>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Companies */}
        <div>
          <label htmlFor="companies" className="block text-steel mb-2 font-medium">
            Company <span className="text-electric">*</span>
          </label>
          <input
            type="text"
            id="companies"
            list="companies-list"
            value={formData.Companies}
            onChange={(e) => handleInputChange('Companies', e.target.value)}
            className="w-full bg-charcoal/60 backdrop-blur-sm border border-electric/20 rounded-lg px-4 py-3 text-offwhite focus:outline-none focus:border-electric transition-all duration-120 ease-snap"
            placeholder="Enter company name"
            required
          />
          <datalist id="companies-list">
            {companies.map((company) => (
              <option key={company} value={company} />
            ))}
          </datalist>
        </div>

        {/* Job Title */}
        <div>
          <label htmlFor="jobTitle" className="block text-steel mb-2 font-medium">
            Job Title <span className="text-electric">*</span>
          </label>
          <input
            type="text"
            id="jobTitle"
            list="jobTitles-list"
            value={formData.Job_Title}
            onChange={(e) => handleInputChange('Job_Title', e.target.value)}
            className="w-full bg-charcoal/60 backdrop-blur-sm border border-electric/20 rounded-lg px-4 py-3 text-offwhite focus:outline-none focus:border-electric transition-all duration-120 ease-snap"
            placeholder="Enter job title"
            required
          />
          <datalist id="jobTitles-list">
            {jobTitles.map((title) => (
              <option key={title} value={title} />
            ))}
          </datalist>
        </div>

        {/* Educational Degree */}
        <div>
          <label htmlFor="degree" className="block text-steel mb-2 font-medium">
            Educational Degree <span className="text-electric">*</span>
          </label>
          <select
            id="degree"
            value={formData.Educational_Degree}
            onChange={(e) => handleInputChange('Educational_Degree', e.target.value)}
            className="w-full bg-charcoal/60 backdrop-blur-sm border border-electric/20 rounded-lg px-4 py-3 text-offwhite focus:outline-none focus:border-electric transition-all duration-120 ease-snap"
            required
          >
            <option value="">Select degree</option>
            {degrees.map((degree) => (
              <option key={degree} value={degree}>
                {degree}
              </option>
            ))}
          </select>
        </div>

        {/* Experience Years */}
        <div>
          <label htmlFor="experience" className="block text-steel mb-2 font-medium">
            Experience Years <span className="text-electric">*</span>
          </label>
          <input
            type="number"
            id="experience"
            min="0"
            step="0.5"
            value={formData.Experience_Years}
            onChange={(e) => handleInputChange('Experience_Years', parseFloat(e.target.value) || 0)}
            className="w-full bg-charcoal/60 backdrop-blur-sm border border-electric/20 rounded-lg px-4 py-3 text-offwhite focus:outline-none focus:border-electric transition-all duration-120 ease-snap"
            placeholder="0"
            required
          />
        </div>

        {/* Number of Skills */}
        <div>
          <label htmlFor="skills" className="block text-steel mb-2 font-medium">
            Number of Skills <span className="text-electric">*</span>
          </label>
          <input
            type="number"
            id="skills"
            min="0"
            value={formData.Number_of_Skills}
            onChange={(e) => handleInputChange('Number_of_Skills', parseInt(e.target.value) || 0)}
            className="w-full bg-charcoal/60 backdrop-blur-sm border border-electric/20 rounded-lg px-4 py-3 text-offwhite focus:outline-none focus:border-electric transition-all duration-120 ease-snap"
            placeholder="0"
            required
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-400">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-electric hover:bg-blue-600 disabled:bg-steel disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-120 ease-snap button-press active:scale-95"
        >
          {loading ? 'Processing...' : 'Predict Selection'}
        </button>
      </form>

      {/* Result Card */}
      {result && (
        <motion.div 
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.12, ease: [0.2, 0.9, 0.2, 1] }}
          className="mt-8 bg-charcoal/60 backdrop-blur-sm border border-electric/20 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-electric">Prediction Result</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => exportResult('json')}
                className="px-4 py-2 bg-electric/20 hover:bg-electric/30 text-electric rounded-lg text-sm transition-colors duration-120 ease-snap active:scale-95"
              >
                Export JSON
              </button>
              <button
                onClick={() => exportResult('csv')}
                className="px-4 py-2 bg-electric/20 hover:bg-electric/30 text-electric rounded-lg text-sm transition-colors duration-120 ease-snap active:scale-95"
              >
                Export CSV
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-steel mb-1">Prediction</p>
              <p className={`text-2xl font-bold ${result.prediction === 1 ? 'text-green-400' : 'text-red-400'}`}>
                {result.message}
              </p>
            </div>
            {result.probability !== null && (
              <div>
                <p className="text-steel mb-2">Confidence: {(result.probability * 100).toFixed(1)}%</p>
                <div className="w-full bg-charcoal rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-electric to-blue-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${result.probability * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Model Details */}
      <div className="mt-8">
        <button
          onClick={() => setShowModelDetails(!showModelDetails)}
            className="w-full bg-charcoal/60 backdrop-blur-sm border border-electric/20 rounded-lg px-4 py-3 text-left flex items-center justify-between hover:border-electric/40 transition-colors duration-120 ease-snap active:scale-95"
        >
          <span className="font-semibold text-electric">Model Details</span>
          <span className="text-electric text-xl">{showModelDetails ? '−' : '+'}</span>
        </button>
        {showModelDetails && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.12, ease: [0.2, 0.9, 0.2, 1] }}
            className="mt-4 bg-charcoal/60 backdrop-blur-sm border border-electric/20 rounded-lg p-6 space-y-4"
          >
            <div>
              <h4 className="font-semibold text-electric mb-2">Model Type</h4>
              <p className="text-steel">Random Forest Classifier</p>
            </div>
            <div>
              <h4 className="font-semibold text-electric mb-2">Preprocessing</h4>
              <ul className="text-steel space-y-1">
                <li>• OneHotEncoder for categorical features</li>
                <li>• StandardScaler for numerical features</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-electric mb-2">Performance Metrics</h4>
              <div className="grid grid-cols-2 gap-4 text-steel">
                <div>Accuracy: <span className="text-electric font-semibold">90.3%</span></div>
                <div>Precision: <span className="text-electric font-semibold">0.90</span></div>
                <div>Recall: <span className="text-electric font-semibold">0.90</span></div>
                <div>F1-Score: <span className="text-electric font-semibold">0.90</span></div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

