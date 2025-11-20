'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import TeamMember from '@/components/TeamMember'

export default function Home() {
  const features = [
    {
      title: 'Data Collection',
      description: 'Comprehensive dataset with 1500+ applicant records across multiple companies and job roles.',
      icon: '📊',
    },
    {
      title: 'ML Model',
      description: 'Random Forest classifier with 90.3% accuracy, trained on real-world hiring data.',
      icon: '🤖',
    },
    {
      title: 'Live Prediction',
      description: 'Get instant predictions with confidence scores. Try it now with our interactive predictor.',
      icon: '⚡',
    },
  ]

  const stats = [
    { label: 'Training Examples', value: '1,500+' },
    { label: 'Model Accuracy', value: '90.3%' },
    { label: 'Companies', value: '22' },
    { label: 'Job Roles', value: '11' },
  ]

  const teamMembers = [
    {
      name: 'Harshvardhan Singh',
      role: 'ML Engineer',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Vishavjit Singh',
      role: 'Data Scientist',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Simratpal Singh',
      role: 'Full Stack Developer',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Applicant Selection Predictor</span>
            <br />
            <span className="text-offwhite">Fast, Explainable, and Ready to Use</span>
          </h1>
          <p className="text-steel text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Predict whether an applicant will be selected for a job role using a trained Random Forest model. 
            Try live predictions and inspect model confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/model"
              className="px-8 py-3 bg-electric hover:bg-blue-600 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 button-press"
            >
              Try the Model
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 border-2 border-electric text-electric hover:bg-electric/10 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 button-press"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>

        {/* Visual Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-br from-electric/20 to-blue-600/20 rounded-2xl p-8 border border-electric/30">
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-charcoal/50 rounded-lg p-4 border border-electric/20">
                  <div className="h-32 bg-gradient-to-br from-electric/30 to-blue-600/30 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          How It Works
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-charcoal/50 border border-electric/20 rounded-xl p-6 hover:border-electric/40 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-electric">{feature.title}</h3>
              <p className="text-steel">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-br from-electric/10 to-blue-600/10 rounded-2xl p-12 border border-electric/20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Model Performance</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-electric mb-2">{stat.value}</div>
                <div className="text-steel">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-4"
        >
          About Us
        </motion.h2>
        <p className="text-steel text-center mb-12 max-w-2xl mx-auto">
          Meet the team behind JobPredictor
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <TeamMember key={member.name} member={member} index={index} />
          ))}
        </div>
      </section>
    </div>
  )
}

