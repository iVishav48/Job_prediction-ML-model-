import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-charcoal border-t border-electric/20 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-electric to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <span className="text-xl font-bold gradient-text">JobPredictor</span>
            </div>
            <p className="text-steel text-sm max-w-md">
              AI-powered applicant selection predictor using machine learning. 
              Fast, explainable, and ready to use.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-electric font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-steel hover:text-electric transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/model" className="text-steel hover:text-electric transition-colors text-sm">
                  Predict
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-steel hover:text-electric transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-electric font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-steel hover:text-electric transition-colors text-sm"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-steel hover:text-electric transition-colors text-sm"
                >
                  Documentation
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-electric/20 mt-8 pt-8 text-center text-steel text-sm">
          <p>&copy; {currentYear} JobPredictor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

