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

interface JobData {
  degrees: string[]
  experienceRange: { min: number; max: number }
  skillsRange: { min: number; max: number }
}

interface CompanyData {
  [jobTitle: string]: JobData
}

interface TrainingData {
  [company: string]: CompanyData
}

const API_URL = 'http://localhost:8000/predict'

// Training data mapping - represents actual data the model was trained on
const trainingData: TrainingData = {
  'Google': {
    'Software Developer': {
      degrees: ['B.Tech', 'M.Tech', 'PhD', 'MCA'],
      experienceRange: { min: 2, max: 12 },
      skillsRange: { min: 3, max: 10 }
    },
    'Data Scientist': {
      degrees: ['M.Tech', 'PhD', 'MCA', 'B.Tech'],
      experienceRange: { min: 3, max: 15 },
      skillsRange: { min: 5, max: 12 }
    },
    'Backend Engineer': {
      degrees: ['B.Tech', 'M.Tech', 'BCA', 'MCA'],
      experienceRange: { min: 1, max: 10 },
      skillsRange: { min: 4, max: 8 }
    },
    'Frontend Developer': {
      degrees: ['B.Tech', 'MCA', 'BCA'],
      experienceRange: { min: 1, max: 8 },
      skillsRange: { min: 3, max: 7 }
    },
    'ML Engineer': {
      degrees: ['M.Tech', 'PhD', 'B.Tech'],
      experienceRange: { min: 3, max: 12 },
      skillsRange: { min: 6, max: 12 }
    }
  },
  'Microsoft': {
    'Data Scientist': {
      degrees: ['M.Tech', 'PhD', 'MCA', 'B.Tech'],
      experienceRange: { min: 2, max: 15 },
      skillsRange: { min: 4, max: 12 }
    },
    'ML Engineer': {
      degrees: ['M.Tech', 'PhD', 'B.Tech'],
      experienceRange: { min: 3, max: 12 },
      skillsRange: { min: 6, max: 12 }
    },
    'Software Developer': {
      degrees: ['B.Tech', 'M.Tech', 'MCA', 'BCA'],
      experienceRange: { min: 2, max: 12 },
      skillsRange: { min: 3, max: 8 }
    },
    'Backend Engineer': {
      degrees: ['B.Tech', 'M.Tech', 'MCA'],
      experienceRange: { min: 2, max: 10 },
      skillsRange: { min: 4, max: 8 }
    },
    'Data Analyst': {
      degrees: ['B.Tech', 'MCA', 'MBA', 'B.Com'],
      experienceRange: { min: 1, max: 8 },
      skillsRange: { min: 3, max: 7 }
    }
  },
  'Amazon': {
    'ML Engineer': {
      degrees: ['M.Tech', 'PhD', 'B.Tech'],
      experienceRange: { min: 4, max: 12 },
      skillsRange: { min: 6, max: 12 }
    },
    'Data Analyst': {
      degrees: ['B.Tech', 'MCA', 'MBA', 'B.Com'],
      experienceRange: { min: 1, max: 8 },
      skillsRange: { min: 3, max: 7 }
    },
    'Software Developer': {
      degrees: ['B.Tech', 'M.Tech', 'BCA', 'MCA'],
      experienceRange: { min: 2, max: 10 },
      skillsRange: { min: 4, max: 8 }
    },
    'Backend Engineer': {
      degrees: ['B.Tech', 'M.Tech', 'MCA'],
      experienceRange: { min: 2, max: 9 },
      skillsRange: { min: 4, max: 7 }
    },
    'Frontend Developer': {
      degrees: ['B.Tech', 'MCA', 'BCA'],
      experienceRange: { min: 1, max: 7 },
      skillsRange: { min: 3, max: 6 }
    }
  },
  'Adobe': {
    'Software Developer': {
      degrees: ['B.Tech', 'M.Tech', 'MCA', 'BCA'],
      experienceRange: { min: 2, max: 10 },
      skillsRange: { min: 3, max: 7 }
    },
    'Frontend Developer': {
      degrees: ['B.Tech', 'MCA', 'BCA'],
      experienceRange: { min: 1, max: 8 },
      skillsRange: { min: 4, max: 7 }
    },
    'Backend Engineer': {
      degrees: ['B.Tech', 'M.Tech', 'MCA'],
      experienceRange: { min: 2, max: 9 },
      skillsRange: { min: 3, max: 6 }
    },
    'Data Analyst': {
      degrees: ['B.Tech', 'MCA', 'MBA'],
      experienceRange: { min: 1, max: 7 },
      skillsRange: { min: 3, max: 6 }
    }
  },
  'Accenture': {
    'Software Developer': {
      degrees: ['B.Tech', 'MCA', 'BCA'],
      experienceRange: { min: 1, max: 8 },
      skillsRange: { min: 3, max: 6 }
    },
    'Business Analyst': {
      degrees: ['MBA', 'B.Com', 'M.Com'],
      experienceRange: { min: 2, max: 10 },
      skillsRange: { min: 3, max: 6 }
    },
    'Data Analyst': {
      degrees: ['B.Tech', 'MCA', 'MBA'],
      experienceRange: { min: 1, max: 7 },
      skillsRange: { min: 3, max: 6 }
    },
    'Backend Engineer': {
      degrees: ['B.Tech', 'MCA'],
      experienceRange: { min: 2, max: 8 },
      skillsRange: { min: 3, max: 5 }
    }
  },
  'Capgemini': {
    'Software Developer': {
      degrees: ['B.Tech', 'MCA', 'BCA'],
      experienceRange: { min: 1, max: 7 },
      skillsRange: { min: 2, max: 5 }
    },
    'Data Analyst': {
      degrees: ['B.Tech', 'MCA', 'MBA'],
      experienceRange: { min: 1, max: 6 },
      skillsRange: { min: 2, max: 5 }
    },
    'Business Analyst': {
      degrees: ['MBA', 'B.Com'],
      experienceRange: { min: 2, max: 8 },
      skillsRange: { min: 3, max: 5 }
    }
  },
  'Cognizant': {
    'Software Developer': {
      degrees: ['B.Tech', 'MCA', 'BCA'],
      experienceRange: { min: 1, max: 7 },
      skillsRange: { min: 2, max: 5 }
    },
    'Data Analyst': {
      degrees: ['B.Tech', 'MCA', 'MBA'],
      experienceRange: { min: 1, max: 6 },
      skillsRange: { min: 2, max: 5 }
    },
    'Backend Engineer': {
      degrees: ['B.Tech', 'MCA'],
      experienceRange: { min: 2, max: 7 },
      skillsRange: { min: 3, max: 5 }
    }
  },
  'Deloitte': {
    'Business Analyst': {
      degrees: ['MBA', 'B.Com', 'M.Com'],
      experienceRange: { min: 2, max: 10 },
      skillsRange: { min: 3, max: 6 }
    },
    'Data Analyst': {
      degrees: ['B.Tech', 'MCA', 'MBA'],
      experienceRange: { min: 1, max: 7 },
      skillsRange: { min: 3, max: 6 }
    },
    'Financial Analyst': {
      degrees: ['MBA', 'B.Com', 'M.Com'],
      experienceRange: { min: 2, max: 8 },
      skillsRange: { min: 3, max: 5 }
    }
  },
  'Flipkart': {
    'Software Developer': {
      degrees: ['B.Tech', 'M.Tech', 'MCA'],
      experienceRange: { min: 2, max: 8 },
      skillsRange: { min: 4, max: 8 }
    },
    'Data Analyst': {
      degrees: ['B.Tech', 'MCA', 'MBA'],
      experienceRange: { min: 1, max: 6 },
      skillsRange: { min: 3, max: 6 }
    },
    'Backend Engineer': {
      degrees: ['B.Tech', 'M.Tech', 'MCA'],
      experienceRange: { min: 2, max: 7 },
      skillsRange: { min: 3, max: 6 }
    }
  },
  'HCL': {
    'Software Developer': {
      degrees: ['B.Tech', 'MCA', 'BCA'],
      experienceRange: { min: 1, max: 6 },
      skillsRange: { min: 2, max: 5 }
    },
    'Backend Engineer': {
      degrees: ['B.Tech', 'MCA'],
      experienceRange: { min: 2, max: 6 },
      skillsRange: { min: 3, max: 5 }
    },
    'Data Analyst': {
      degrees: ['B.Tech', 'MCA'],
      experienceRange: { min: 1, max: 5 },
      skillsRange: { min: 2, max: 4 }
    }
  },
  'Infosys': {
    'Software Developer': {
      degrees: ['B.Tech', 'MCA', 'BCA'],
      experienceRange: { min: 1, max: 7 },
      skillsRange: { min: 2, max: 5 }
    },
    'Frontend Developer': {
      degrees: ['B.Tech', 'MCA', 'BCA'],
      experienceRange: { min: 1, max: 6 },
      skillsRange: { min: 3, max: 6 }
    },
    'Data Analyst': {
      degrees: ['B.Tech', 'MCA', 'MBA'],
      experienceRange: { min: 2, max: 8 },
      skillsRange: { min: 3, max: 6 }
    },
    'Backend Engineer': {
      degrees: ['B.Tech', 'MCA'],
      experienceRange: { min: 2, max: 7 },
      skillsRange: { min: 3, max: 5 }
    }
  },
  'Ola': {
    'Software Developer': {
      degrees: ['B.Tech', 'MCA', 'BCA'],
      experienceRange: { min: 1, max: 6 },
      skillsRange: { min: 3, max: 6 }
    },
    'Data Analyst': {
      degrees: ['B.Tech', 'MCA', 'MBA'],
      experienceRange: { min: 1, max: 5 },
      skillsRange: { min: 2, max: 5 }
    },
    'Backend Engineer': {
      degrees: ['B.Tech', 'MCA'],
      experienceRange: { min: 2, max: 6 },
      skillsRange: { min: 3, max: 5 }
    }
  },
  'Paytm': {
    'Software Developer': {
      degrees: ['B.Tech', 'M.Tech', 'MCA'],
      experienceRange: { min: 2, max: 7 },
      skillsRange: { min: 4, max: 7 }
    },
    'Data Analyst': {
      degrees: ['B.Tech', 'MCA', 'MBA'],
      experienceRange: { min: 1, max: 6 },
      skillsRange: { min: 3, max: 6 }
    },
    'Backend Engineer': {
      degrees: ['B.Tech', 'M.Tech', 'MCA'],
      experienceRange: { min: 2, max: 7 },
      skillsRange: { min: 3, max: 6 }
    }
  },
  'Reliance Jio': {
    'Software Developer': {
      degrees: ['B.Tech', 'M.Tech', 'MCA'],
      experienceRange: { min: 2, max: 8 },
      skillsRange: { min: 3, max: 7 }
    },
    'Data Analyst': {
      degrees: ['B.Tech', 'MCA', 'MBA'],
      experienceRange: { min: 1, max: 6 },
      skillsRange: { min: 3, max: 6 }
    },
    'Backend Engineer': {
      degrees: ['B.Tech', 'M.Tech', 'MCA'],
      experienceRange: { min: 2, max: 8 },
      skillsRange: { min: 4, max: 7 }
    }
  },
  'Swiggy': {
    'Software Developer': {
      degrees: ['B.Tech', 'M.Tech', 'MCA'],
      experienceRange: { min: 2, max: 7 },
      skillsRange: { min: 4, max: 7 }
    },
    'Data Analyst': {
      degrees: ['B.Tech', 'MCA', 'MBA'],
      experienceRange: { min: 1, max: 5 },
      skillsRange: { min: 3, max: 6 }
    },
    'Backend Engineer': {
      degrees: ['B.Tech', 'M.Tech', 'MCA'],
      experienceRange: { min: 2, max: 7 },
      skillsRange: { min: 3, max: 6 }
    }
  },
  'TCS': {
    'Software Developer': {
      degrees: ['B.Tech', 'MCA', 'BCA'],
      experienceRange: { min: 1, max: 8 },
      skillsRange: { min: 2, max: 6 }
    },
    'Business Analyst': {
      degrees: ['MBA', 'B.Com', 'M.Com'],
      experienceRange: { min: 2, max: 10 },
      skillsRange: { min: 3, max: 6 }
    },
    'Web Developer': {
      degrees: ['B.Tech', 'MCA', 'BCA'],
      experienceRange: { min: 1, max: 6 },
      skillsRange: { min: 3, max: 5 }
    },
    'Data Analyst': {
      degrees: ['B.Tech', 'MCA', 'MBA'],
      experienceRange: { min: 1, max: 6 },
      skillsRange: { min: 2, max: 5 }
    }
  },
  'Tech Mahindra': {
    'Software Developer': {
      degrees: ['B.Tech', 'MCA', 'BCA'],
      experienceRange: { min: 1, max: 6 },
      skillsRange: { min: 2, max: 5 }
    },
    'Backend Engineer': {
      degrees: ['B.Tech', 'MCA'],
      experienceRange: { min: 2, max: 6 },
      skillsRange: { min: 3, max: 5 }
    },
    'Data Analyst': {
      degrees: ['B.Tech', 'MCA'],
      experienceRange: { min: 1, max: 5 },
      skillsRange: { min: 2, max: 4 }
    }
  },
  'Wipro': {
    'Software Developer': {
      degrees: ['B.Tech', 'MCA', 'BCA'],
      experienceRange: { min: 1, max: 6 },
      skillsRange: { min: 2, max: 5 }
    },
    'Backend Engineer': {
      degrees: ['B.Tech', 'MCA'],
      experienceRange: { min: 2, max: 7 },
      skillsRange: { min: 3, max: 5 }
    },
    'Web Developer': {
      degrees: ['B.Tech', 'MCA', 'BCA'],
      experienceRange: { min: 1, max: 5 },
      skillsRange: { min: 2, max: 4 }
    },
    'Data Analyst': {
      degrees: ['B.Tech', 'MCA'],
      experienceRange: { min: 1, max: 5 },
      skillsRange: { min: 2, max: 4 }
    }
  },
  "Byju's": {
    'Software Developer': {
      degrees: ['B.Tech', 'MCA', 'BCA'],
      experienceRange: { min: 1, max: 6 },
      skillsRange: { min: 2, max: 5 }
    },
    'Data Analyst': {
      degrees: ['B.Tech', 'MCA', 'MBA'],
      experienceRange: { min: 1, max: 5 },
      skillsRange: { min: 2, max: 4 }
    },
    'Backend Engineer': {
      degrees: ['B.Tech', 'MCA'],
      experienceRange: { min: 2, max: 6 },
      skillsRange: { min: 3, max: 5 }
    }
  },
  'HealthTechY': {
    'Software Developer': {
      degrees: ['B.Tech', 'M.Tech', 'MCA'],
      experienceRange: { min: 2, max: 7 },
      skillsRange: { min: 3, max: 6 }
    },
    'Data Analyst': {
      degrees: ['B.Tech', 'MCA', 'MBA'],
      experienceRange: { min: 1, max: 5 },
      skillsRange: { min: 2, max: 4 }
    },
    'Backend Engineer': {
      degrees: ['B.Tech', 'M.Tech', 'MCA'],
      experienceRange: { min: 2, max: 7 },
      skillsRange: { min: 3, max: 5 }
    }
  },
  'StartUpX': {
    'Software Developer': {
      degrees: ['B.Tech', 'MCA', 'BCA'],
      experienceRange: { min: 1, max: 5 },
      skillsRange: { min: 2, max: 4 }
    },
    'Data Analyst': {
      degrees: ['B.Tech', 'MCA'],
      experienceRange: { min: 1, max: 4 },
      skillsRange: { min: 2, max: 4 }
    },
    'Backend Engineer': {
      degrees: ['B.Tech', 'MCA'],
      experienceRange: { min: 1, max: 4 },
      skillsRange: { min: 2, max: 3 }
    },
    'Web Developer': {
      degrees: ['B.Tech', 'MCA', 'BCA'],
      experienceRange: { min: 1, max: 4 },
      skillsRange: { min: 2, max: 3 }
    }
  },
  'Zomato': {
    'Software Developer': {
      degrees: ['B.Tech', 'M.Tech', 'MCA'],
      experienceRange: { min: 2, max: 7 },
      skillsRange: { min: 4, max: 7 }
    },
    'Data Analyst': {
      degrees: ['B.Tech', 'MCA', 'MBA'],
      experienceRange: { min: 1, max: 5 },
      skillsRange: { min: 3, max: 6 }
    },
    'Backend Engineer': {
      degrees: ['B.Tech', 'M.Tech', 'MCA'],
      experienceRange: { min: 2, max: 7 },
      skillsRange: { min: 3, max: 6 }
    }
  }
}

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
    
    // Reset dependent fields when company or job title changes
    if (field === 'Companies' || field === 'Job_Title') {
      if (field === 'Companies') {
        setFormData((prev) => ({ 
          ...prev, 
          Companies: value as string,
          Job_Title: '',
          Educational_Degree: '',
          Experience_Years: 5,
          Number_of_Skills: 4
        }))
      } else if (field === 'Job_Title') {
        setFormData((prev) => ({ 
          ...prev, 
          Job_Title: value as string,
          Educational_Degree: '',
          Experience_Years: 5,
          Number_of_Skills: 4
        }))
      }
    }
  }

  const handleTestInput = (testData: FormData) => {
    setFormData(testData)
    setError(null)
    setResult(null)
  }

  // Get available options based on current selection
  const getAvailableJobTitles = () => {
    if (!formData.Companies) return jobTitles
    const companyData = trainingData[formData.Companies]
    return companyData ? Object.keys(companyData) : jobTitles
  }

  const getAvailableDegrees = () => {
    if (!formData.Companies || !formData.Job_Title) return degrees
    const companyData = trainingData[formData.Companies]
    if (!companyData) return degrees
    const jobData = companyData[formData.Job_Title]
    return jobData ? jobData.degrees : degrees
  }

  const getExperienceRange = () => {
    if (!formData.Companies || !formData.Job_Title) {
      return { min: 0, max: 20 }
    }
    const companyData = trainingData[formData.Companies]
    if (!companyData) return { min: 0, max: 20 }
    const jobData = companyData[formData.Job_Title]
    return jobData ? jobData.experienceRange : { min: 0, max: 20 }
  }

  const getSkillsRange = () => {
    if (!formData.Companies || !formData.Job_Title) {
      return { min: 0, max: 15 }
    }
    const companyData = trainingData[formData.Companies]
    if (!companyData) return { min: 0, max: 15 }
    const jobData = companyData[formData.Job_Title]
    return jobData ? jobData.skillsRange : { min: 0, max: 15 }
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

  return (
    <div className="max-w-4xl mx-auto">
      {/* Test Inputs Dropdown */}
      <div className="mb-6">
        <label className="block text-steel mb-2 text-sm font-medium">Quick Test</label>
          <select
            className="w-full bg-charcoal/60 backdrop-blur-sm border border-electric/40 rounded-lg px-4 py-2 text-offwhite focus:outline-none focus:border-electric transition-all duration-120 ease-snap"
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
          <select
            id="companies"
            value={formData.Companies}
            onChange={(e) => handleInputChange('Companies', e.target.value)}
            className="w-full bg-charcoal/60 backdrop-blur-sm border border-electric/40 rounded-lg px-4 py-3 text-offwhite focus:outline-none focus:border-electric transition-all duration-120 ease-snap"
            required
          >
            <option value="">Select company</option>
            {companies.map((company) => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
          </select>
          <p className="text-xs text-steel mt-1">Select a company to see available job titles</p>
        </div>

        {/* Job Title */}
        <div>
          <label htmlFor="jobTitle" className="block text-steel mb-2 font-medium">
            Job Title <span className="text-electric">*</span>
          </label>
          <select
            id="jobTitle"
            value={formData.Job_Title}
            onChange={(e) => handleInputChange('Job_Title', e.target.value)}
            className="w-full bg-charcoal/60 backdrop-blur-sm border border-electric/40 rounded-lg px-4 py-3 text-offwhite focus:outline-none focus:border-electric transition-all duration-120 ease-snap"
            disabled={!formData.Companies}
            required
          >
            <option value="">Select job title</option>
            {getAvailableJobTitles().map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
          <p className="text-xs text-steel mt-1">
            {formData.Companies ? 'Available positions for selected company' : 'Please select a company first'}
          </p>
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
            className="w-full bg-charcoal/60 backdrop-blur-sm border border-electric/40 rounded-lg px-4 py-3 text-offwhite focus:outline-none focus:border-electric transition-all duration-120 ease-snap"
            disabled={!formData.Companies || !formData.Job_Title}
            required
          >
            <option value="">Select degree</option>
            {getAvailableDegrees().map((degree) => (
              <option key={degree} value={degree}>
                {degree}
              </option>
            ))}
          </select>
          <p className="text-xs text-steel mt-1">
            {formData.Companies && formData.Job_Title 
              ? 'Degrees for this position' 
              : 'Select company and job title first'}
          </p>
        </div>

        {/* Experience Years */}
        <div>
          <label htmlFor="experience" className="block text-steel mb-2 font-medium">
            Experience Years <span className="text-electric">*</span>
          </label>
          <input
            type="number"
            id="experience"
            min={getExperienceRange().min}
            max={getExperienceRange().max}
            step="0.5"
            value={formData.Experience_Years}
            onChange={(e) => handleInputChange('Experience_Years', parseFloat(e.target.value) || 0)}
            className="w-full bg-charcoal/60 backdrop-blur-sm border border-electric/40 rounded-lg px-4 py-3 text-offwhite focus:outline-none focus:border-electric transition-all duration-120 ease-snap"
            placeholder={getExperienceRange().min.toString()}
            disabled={!formData.Companies || !formData.Job_Title}
            required
          />
          <p className="text-xs text-steel mt-1">
            {formData.Companies && formData.Job_Title 
              ? `Range: ${getExperienceRange().min} - ${getExperienceRange().max} years (based on training data)`
              : 'Select company and job title first'}
          </p>
        </div>

        {/* Number of Skills */}
        <div>
          <label htmlFor="skills" className="block text-steel mb-2 font-medium">
            Number of Skills <span className="text-electric">*</span>
          </label>
          <input
            type="number"
            id="skills"
            min={getSkillsRange().min}
            max={getSkillsRange().max}
            value={formData.Number_of_Skills}
            onChange={(e) => handleInputChange('Number_of_Skills', parseInt(e.target.value) || 0)}
            className="w-full bg-charcoal/60 backdrop-blur-sm border border-electric/40 rounded-lg px-4 py-3 text-offwhite focus:outline-none focus:border-electric transition-all duration-120 ease-snap"
            placeholder={getSkillsRange().min.toString()}
            disabled={!formData.Companies || !formData.Job_Title}
            required
          />
          <p className="text-xs text-steel mt-1">
            {formData.Companies && formData.Job_Title 
              ? `Range: ${getSkillsRange().min} - ${getSkillsRange().max} skills (based on training data)`
              : 'Select company and job title first'}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-electric hover:bg-accent-hover disabled:bg-steel/50 disabled:cursor-not-allowed text-offwhite font-semibold py-3 rounded-lg transition-all duration-120 ease-snap button-press active:scale-95"
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
          className="mt-8 bg-charcoal/60 backdrop-blur-sm border border-electric/40 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-electric">Prediction Result</h3>
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
                <div className="w-full bg-charcoal/60 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-electric to-accent-hover h-3 rounded-full transition-all duration-500"
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
            className="w-full bg-charcoal/60 backdrop-blur-sm border border-electric/40 rounded-lg px-4 py-3 text-left flex items-center justify-between hover:border-electric/60 transition-colors duration-120 ease-snap active:scale-95"
        >
          <span className="font-semibold text-electric">Model Details</span>
          <span className="text-electric text-xl">{showModelDetails ? '−' : '+'}</span>
        </button>
        {showModelDetails && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.12, ease: [0.2, 0.9, 0.2, 1] }}
            className="mt-4 bg-charcoal/60 backdrop-blur-sm border border-electric/40 rounded-lg p-6 space-y-4"
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

