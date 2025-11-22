import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-charcoal border-t border-electric/40 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xl font-bold gradient-text">JobPredictor</span>
            </div>
            <p className="text-steel text-sm max-w-md">
              AI-powered applicant selection predictor using machine learning. 
              Fast, explainable, and ready to use.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:text-left text-center">
            <h3 className="text-electric font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-steel hover:text-electric transition-colors duration-120 ease-snap text-sm active:scale-95">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/model" className="text-steel hover:text-electric transition-colors duration-120 ease-snap text-sm active:scale-95">
                  Predict
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-steel hover:text-electric transition-colors duration-120 ease-snap text-sm active:scale-95">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
         </div>
        <div className="border-t border-electric/40 mt-8 pt-8 text-center text-steel text-sm">
          <p>&copy; {currentYear} JobPredictor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

