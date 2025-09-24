import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Crown, Sparkles, Menu, X } from 'lucide-react'
import { useState } from 'react'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <motion.header 
      className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-200/50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-4 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">
                Resume Builder Pro
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="group relative px-4 py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors duration-300"
            >
              <span className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                <span>Build Resume</span>
              </span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 group-hover:w-full transition-all duration-300"></div>
            </Link>
            
            <Link
              to="/pricing"
              className="group relative px-4 py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors duration-300"
            >
              <span className="flex items-center space-x-2">
                <Crown className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span>Pricing</span>
              </span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 group-hover:w-full transition-all duration-300"></div>
            </Link>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/"
                className="btn-primary inline-flex items-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Get Started</span>
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-300"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMenuOpen ? 1 : 0, 
            height: isMenuOpen ? 'auto' : 0 
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-2 border-t border-gray-200">
            <Link
              to="/"
              className="block px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg font-medium transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>Build Resume</span>
              </span>
            </Link>
            
            <Link
              to="/pricing"
              className="block px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg font-medium transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="flex items-center space-x-2">
                <Crown className="w-4 h-4" />
                <span>Pricing</span>
              </span>
            </Link>

            <div className="px-4 pt-2">
              <Link
                to="/"
                className="btn-primary w-full justify-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Sparkles className="w-4 h-4" />
                <span>Get Started</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  )
}

export default Header
