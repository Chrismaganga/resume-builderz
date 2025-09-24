import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Palette, Download, Star, Users, Zap } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const features = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Professional Templates",
      description: "Choose from 20+ professionally designed resume templates that are ATS-friendly and visually appealing."
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Customizable Design",
      description: "Customize colors, fonts, and layouts to match your personal brand and industry requirements."
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: "PDF Export",
      description: "Download your resume as a high-quality PDF that's ready to print or share with employers."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-time Preview",
      description: "See your changes instantly with our live preview feature. No more guessing how your resume will look."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 text-gray-900"
    >
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden px-4">
        <div className="absolute inset-0 z-0">
          {/* Background animations or 3D elements could go here */}
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight gradient-text mb-4"
          >
            Craft Your Perfect Resume, Effortlessly.
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto"
          >
            Build stunning, professional resumes in minutes with our intuitive builder and premium templates.
          </motion.p>
          <motion.button
            onClick={onGetStarted}
            className="btn-primary inline-flex items-center space-x-3 px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(59, 130, 246, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Get Started Now</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-white shadow-inner">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 gradient-text">Why Choose Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-4 sm:p-6 rounded-xl shadow-lg bg-gradient-to-br from-white to-blue-50 border border-blue-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white mb-3 sm:mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{feature.title}</h3>
              <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-blue-50">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 gradient-text">What Our Users Say</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card-premium p-6 sm:p-8"
          >
            <Users className="w-8 h-8 sm:w-10 sm:h-10 text-accent-500 mb-3 sm:mb-4" />
            <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">"This resume builder is a game-changer! I landed my dream job thanks to the professional templates and easy customization."</p>
            <p className="font-semibold text-gray-900">- Jane Doe, Senior Developer</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="card-premium p-6 sm:p-8"
          >
            <Star className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-500 mb-3 sm:mb-4" />
            <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">"The real-time preview saved me so much time. I could see exactly how my resume would look before downloading."</p>
            <p className="font-semibold text-gray-900">- John Smith, Product Manager</p>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 md:py-20 px-4 text-center bg-gradient-to-br from-primary-600 to-accent-600 text-white">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Ready to Build Your Future?</h2>
        <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8">Join thousands of professionals who trust our platform.</p>
        <motion.button
          onClick={onGetStarted}
          className="btn-secondary inline-flex items-center space-x-3 px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg bg-white text-primary-600 hover:bg-gray-100"
          whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(255, 255, 255, 0.3)" }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Start Building Now</span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.button>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-10 text-center text-gray-600 text-sm">
        <p>&copy; 2025 ResumeBuilder. All rights reserved.</p>
      </footer>
    </motion.div>
  );
};

export default LandingPage;
