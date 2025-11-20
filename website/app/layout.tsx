import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import '../styles/globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins' 
})

export const metadata: Metadata = {
  title: 'JobPredictor - AI-Powered Applicant Selection Predictor',
  description: 'Predict whether an applicant will be selected for a job role using a trained Random Forest model. Try live predictions and inspect model confidence.',
  keywords: 'machine learning, AI, applicant selection, job prediction, job predictor',
  authors: [{ name: 'JobPredictor Team' }],
  openGraph: {
    title: 'JobPredictor - AI-Powered Applicant Selection Predictor',
    description: 'Predict applicant selection with AI-powered machine learning model',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${poppins.variable} font-sans`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

