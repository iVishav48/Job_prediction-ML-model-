'use client'

import { motion } from 'framer-motion'
import PredictorForm from '@/components/PredictorForm'

export default function ModelPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Try the Model</span>
          </h1>
          <p className="text-steel text-lg max-w-2xl mx-auto">
            Enter applicant details below to get an instant prediction on selection probability.
            The model uses Random Forest classification with 90.3% accuracy.
          </p>
        </div>

        <PredictorForm />
      </motion.div>
    </div>
  )
}

