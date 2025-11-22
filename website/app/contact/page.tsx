'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm, ValidationError } from '@formspree/react'
import ImageGallery from '@/components/ImageGallery'

export default function ContactPage() {
  const [state, handleSubmit] = useForm("xeodkqqr")
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const galleryImages = [
    {
      id: '1',
      src: '/pic/canva-employer-interviewing-job-applicant--MAEJ7tOx3m4.webp',
      alt: 'Job interview process',
      title: 'Interview Process',
      description: 'Professional interview sessions with qualified candidates'
    },
    {
      id: '2',
      src: '/pic/360_F_294838891_i7clycnX5Ir5PlpDPCAJ3cMT16fe9O6h.webp',
      alt: 'Team collaboration',
      title: 'Team Collaboration',
      description: 'Working together to achieve hiring goals'
    },
    {
      id: '3',
      src: '/pic/business-people-marketing-strategy-analysis-concept-male-hands-typing-laptop-concept-young-people-work-mobile-devices-158619933.webp',
      alt: 'Data analysis',
      title: 'Data Analysis',
      description: 'Advanced analytics for better hiring decisions'
    }
  ]

  const teamMembers = [
    {
      name: 'Harshwardhan Singh',
      role: 'ML Engineer',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Vishavjit Singh',
      role: 'Full Stack Developer',
      github: 'https://github.com/iVishav48',
      linkedin: 'https://www.linkedin.com/in/vishavjit-singh-s0724/',
    },
    {
      name: 'Simratpal Singh',
      role: 'Data Scientist',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
  ]

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
            <span className="gradient-text">Contact Us</span>
          </h1>
          <p className="text-steel text-lg max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you. Get in touch with our team.
          </p>
        </div>

        <div className="space-y-12">
          {/* Contact Form */}
          <div className="max-w-4xl mx-auto">
            {state.succeeded ? (
              <div className="bg-green-500/10 border border-green-500/50 rounded-xl p-8 text-center">
                <div className="text-green-400 text-lg font-medium mb-2">Message sent successfully!</div>
                <p className="text-steel">We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-charcoal/50 border border-electric/20 rounded-xl p-6 space-y-6">
              <div>
                <label htmlFor="name" className="block text-steel mb-2 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-charcoal border border-electric/20 rounded-lg px-4 py-3 text-offwhite focus:outline-none focus:border-electric"
                  placeholder="Your name"
                />
              </div>
              

              <div>
                <label htmlFor="email" className="block text-steel mb-2 font-medium">
                  Email <span className="text-electric">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-charcoal border border-electric/20 rounded-lg px-4 py-3 text-offwhite focus:outline-none focus:border-electric"
                  placeholder="your.email@example.com"
                />
                <ValidationError 
                  prefix="Email" 
                  field="email"
                  errors={state.errors}
                  className="text-red-400 text-sm mt-1"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-steel mb-2 font-medium">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-charcoal border border-electric/20 rounded-lg px-4 py-3 text-offwhite focus:outline-none focus:border-electric"
                  placeholder="Message subject"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-steel mb-2 font-medium">
                  Message <span className="text-electric">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full bg-charcoal border border-electric/20 rounded-lg px-4 py-3 text-offwhite focus:outline-none focus:border-electric resize-none"
                  placeholder="Your message..."
                />
                <ValidationError 
                  prefix="Message" 
                  field="message"
                  errors={state.errors}
                  className="text-red-400 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={state.submitting}
                className="w-full bg-electric hover:bg-blue-600 disabled:bg-steel disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-120 ease-snap button-press active:scale-95"
              >
                {state.submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
            )}
          </div>

          {/* Team Info */}
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="bg-charcoal/60 backdrop-blur-sm border border-electric/20 rounded-xl p-6 relative overflow-hidden group cursor-pointer"
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(59, 130, 246, 0.2)' }}
              transition={{ duration: 0.3, ease: [0.2, 0.9, 0.2, 1] }}
            >
              <motion.img 
                src="/pic/new-staff-candidate-job-interview-corporate-business-manager-office-recruitment-process-concept-149787994.webp"
                alt="Team collaboration"
                className="absolute inset-0 object-cover opacity-10 gpu-accelerated transition-all duration-700 group-hover:opacity-20 group-hover:scale-110"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7, ease: [0.2, 0.9, 0.2, 1] }}
              />
              
              {/* Animated particles effect */}
              <motion.div 
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-electric rounded-full"
                    initial={{ 
                      x: Math.random() * 100, 
                      y: Math.random() * 100, 
                      opacity: 0 
                    }}
                    whileHover={{ 
                      x: Math.random() * 100, 
                      y: Math.random() * 100, 
                      opacity: [0, 1, 0] 
                    }}
                    transition={{ 
                      duration: 2 + Math.random(), 
                      repeat: Infinity, 
                      delay: Math.random() * 0.5,
                      ease: 'easeInOut'
                    }}
                  />
                ))}
              </motion.div>
              
              <motion.div 
                className="relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="text-xl font-semibold text-electric mb-4 group-hover:text-blue-400 transition-colors duration-300">Our Team</h3>
                <motion.div 
                  className="space-y-4"
                  initial={{ y: 20 }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  {teamMembers.map((member, index) => (
                    <motion.div 
                      key={member.name} 
                      className="border-b border-electric/20 pb-4 last:border-0 group/member hover:bg-electric/5 -mx-2 px-2 rounded-lg transition-all duration-300"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <h4 className="font-semibold text-offwhite mb-1 group-hover/member:text-electric transition-colors duration-300">{member.name}</h4>
                      <p className="text-steel text-sm mb-2 group-hover/member:text-offwhite transition-colors duration-300">{member.role}</p>
                      <div className="flex space-x-3">
                        <motion.a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-steel hover:text-electric transition-colors duration-120 ease-snap text-sm active:scale-95 hover:scale-105 inline-block"
                          aria-label={`${member.name}'s GitHub`}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          GitHub
                        </motion.a>
                        <motion.a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-steel hover:text-electric transition-colors duration-120 ease-snap text-sm active:scale-95 hover:scale-105 inline-block"
                          aria-label={`${member.name}'s LinkedIn`}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          LinkedIn
                        </motion.a>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

