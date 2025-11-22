'use client'

import { motion } from 'framer-motion'
import PredictorForm from '@/components/PredictorForm'

export default function ModelPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      {/* Hero Section with Background */}
      <div className="relative mb-16">
        {/* Background Image */}
        <div className="absolute inset-0 -mx-8 rounded-2xl overflow-hidden">
          <img
            src="/pic/analyst-magnifying-business-graphs-office-workplace-analyst-magnifying-business-graphs-office-workplace-165628996.webp"
            alt="Data analysis background"
            className="w-full h-full object-cover object-center opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/90 via-charcoal/80 to-charcoal/90" />
        </div>
        
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.12, ease: [0.2, 0.9, 0.2, 1] }}
          className="relative z-10 text-center py-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Try the Model</span>
          </h1>
          <p className="text-steel text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
            Enter applicant details below to get an instant prediction on selection probability.
            The model uses Random Forest classification with 90.3% accuracy.
          </p>
        </motion.div>
      </div>

        {/* Predictor Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.12, ease: [0.2, 0.9, 0.2, 1], delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <PredictorForm />
        </motion.div>
      
    </div>
  )
}

