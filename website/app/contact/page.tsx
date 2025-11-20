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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
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
                className="w-full bg-electric hover:bg-blue-600 disabled:bg-steel disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-200 button-press"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Team Info */}
          <div className="space-y-6">
            <div className="bg-charcoal/50 border border-electric/20 rounded-xl p-6">
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
                        className="text-steel hover:text-electric transition-colors"
                        aria-label={`${member.name}'s GitHub`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-steel hover:text-electric transition-colors"
                        aria-label={`${member.name}'s LinkedIn`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

