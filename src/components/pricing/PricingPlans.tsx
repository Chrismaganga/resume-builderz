import React from 'react';
import { motion } from 'framer-motion';
import { Check, Crown, Zap, Star } from 'lucide-react';
import AnimatedCard from '../ui/AnimatedCard';
import AnimatedButton from '../ui/AnimatedButton';
import { getTheme } from '../../lib/themes';

const PricingPlans: React.FC = () => {
  const theme = getTheme('free-modern');
  
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        'Basic templates',
        'PDF download',
        'Local storage',
        'Basic customization'
      ],
      gradient: 'from-gray-400 to-gray-600',
      icon: <Star className="w-8 h-8" />,
      popular: false
    },
    {
      name: 'Pro',
      price: '$9.99',
      period: 'per month',
      description: 'For professionals who want more',
      features: [
        'All premium themes',
        '3D animations',
        'Advanced customization',
        'Cloud storage',
        'Priority support',
        'Export to multiple formats'
      ],
      gradient: 'from-blue-500 to-purple-600',
      icon: <Crown className="w-8 h-8" />,
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$29.99',
      period: 'per month',
      description: 'For teams and organizations',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Brand customization',
        'API access',
        'White-label solution',
        'Dedicated support'
      ],
      gradient: 'from-purple-500 to-pink-600',
      icon: <Zap className="w-8 h-8" />,
      popular: false
    }
  ];

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Choose Your Plan</h2>
          <p className="text-xl text-gray-600">Unlock the full potential of your resume</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <AnimatedCard
                theme={theme}
                glow={plan.popular}
                className={`h-full ${plan.popular ? 'ring-2 ring-yellow-400' : ''}`}
              >
                <div className="text-center space-y-6">
                  <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${plan.gradient} text-white`}>
                    {plan.icon}
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    <p className="text-gray-600">{plan.description}</p>
                  </div>
                  
                  <div>
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                  
                  <ul className="space-y-3 text-left">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (index * 0.1) + (featureIndex * 0.05) }}
                        className="flex items-center"
                      >
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <AnimatedButton
                    theme={theme}
                    variant={plan.popular ? 'primary' : 'secondary'}
                    size="lg"
                    glow={plan.popular}
                    className="w-full"
                  >
                    {plan.name === 'Free' ? 'Get Started' : 'Upgrade Now'}
                  </AnimatedButton>
                </div>
              </AnimatedCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
