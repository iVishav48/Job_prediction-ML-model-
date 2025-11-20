'use client'

import { motion } from 'framer-motion'
import PredictorForm from '@/components/PredictorForm'

export default function ModelPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.12, ease: [0.2, 0.9, 0.2, 1] }}
        className="max-w-4xl mx-auto relative z-10"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Try the Model</span>
          </h1>
          <p className="text-steel text-lg max-w-2xl mx-auto mb-8">
            Enter applicant details below to get an instant prediction on selection probability.
            The model uses Random Forest classification with 90.3% accuracy.
          </p>
          <div className="relative max-w-2xl mx-auto rounded-xl overflow-hidden border border-electric/20 bg-charcoal/60 backdrop-blur-sm">
            <img 
              src="/pic/analyst-magnifying-business-graphs-office-workplace-analyst-magnifying-business-graphs-office-workplace-165628996.webp"
              alt="Data analysis and prediction"
              className="w-full h-64 object-cover opacity-70 gpu-accelerated"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
          </div>
        </div>

        <PredictorForm />
      </motion.div>
    </div>
  )
}

