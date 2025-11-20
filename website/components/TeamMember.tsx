'use client'

import { motion } from 'framer-motion'

interface TeamMemberProps {
  member: {
    name: string
    role: string
    github: string
    linkedin: string
  }
  index: number
}

export default function TeamMember({ member, index }: TeamMemberProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.12, ease: [0.2, 0.9, 0.2, 1], delay: index * 0.05 }}
      className="bg-charcoal/60 backdrop-blur-sm border border-electric/20 rounded-xl p-6 text-center hover:border-electric/40 transition-all duration-120 ease-snap hover:scale-105 active:scale-95"
    >
      <h3 className="text-xl font-semibold mb-1 text-electric">{member.name}</h3>
      <p className="text-steel mb-4">{member.role}</p>
      <div className="flex justify-center space-x-4">
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
    </motion.div>
  )
}

