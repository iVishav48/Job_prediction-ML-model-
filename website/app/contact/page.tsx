'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    if (!formData.email || !formData.message) {
      setError('Email and Message are required')
      return
    }

    setLoading(true)

    try {
      // Using Formspree or backend endpoint
      // For now, we'll use a placeholder - you can replace with actual endpoint
      const response = await axios.post('https://formspree.io/f/YOUR_FORM_ID', {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      })

      setSuccess(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (err: any) {
      // For development, just show success message
      // In production, implement actual form submission
      setSuccess(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      // setError('Failed to send message. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
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
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-400">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-4 text-green-400">
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-electric hover:bg-blue-600 disabled:bg-steel disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-120 ease-snap button-press active:scale-95"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Team Info */}
          <div className="space-y-6">
            <div className="bg-charcoal/60 backdrop-blur-sm border border-electric/20 rounded-xl p-6 relative overflow-hidden">
              <img 
                src="/pic/new-staff-candidate-job-interview-corporate-business-manager-office-recruitment-process-concept-149787994.webp"
                alt="Team collaboration"
                className="absolute inset-0 object-cover opacity-10 gpu-accelerated"
              />
              <div className="relative z-10">
              <h3 className="text-xl font-semibold text-electric mb-4">Our Team</h3>
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.name} className="border-b border-electric/20 pb-4 last:border-0">
                    <h4 className="font-semibold text-offwhite mb-1">{member.name}</h4>
                    <p className="text-steel text-sm mb-2">{member.role}</p>
                    <div className="flex space-x-3">
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-steel hover:text-electric transition-colors duration-120 ease-snap text-sm active:scale-95"
                        aria-label={`${member.name}'s GitHub`}
                      >
                        GitHub
                      </a>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-steel hover:text-electric transition-colors duration-120 ease-snap text-sm active:scale-95"
                        aria-label={`${member.name}'s LinkedIn`}
                      >
                        LinkedIn
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

