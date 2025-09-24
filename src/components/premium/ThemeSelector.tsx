import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Lock, Check, Sparkles } from 'lucide-react';
import { premiumThemes, type PremiumTheme } from '../../lib/themes';
import AnimatedCard from '../ui/AnimatedCard';
import AnimatedButton from '../ui/AnimatedButton';

interface ThemeSelectorProps {
  currentTheme: PremiumTheme;
  onThemeChange: (theme: PremiumTheme) => void;
  onUpgrade?: () => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onThemeChange,
  onUpgrade,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'free' | 'premium'>('all');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const filteredThemes = premiumThemes.filter(theme => {
    if (selectedCategory === 'free') return !theme.isPremium;
    if (selectedCategory === 'premium') return theme.isPremium;
    return true;
  });

  const handleThemeSelect = (theme: PremiumTheme) => {
    if (theme.isPremium && !currentTheme.isPremium) {
      setShowUpgradeModal(true);
      return;
    }
    onThemeChange(theme);
  };

  const handleUpgrade = () => {
    setShowUpgradeModal(false);
    onUpgrade?.();
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex space-x-2">
        {[
          { id: 'all', label: 'All Themes', count: premiumThemes.length },
          { id: 'free', label: 'Free', count: premiumThemes.filter(t => !t.isPremium).length },
          { id: 'premium', label: 'Premium', count: premiumThemes.filter(t => t.isPremium).length },
        ].map((category) => (
          <motion.button
            key={category.id}
            onClick={() => setSelectedCategory(category.id as any)}
            className={`
              px-4 py-2 rounded-lg font-medium transition-all duration-300
              ${selectedCategory === category.id
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.label} ({category.count})
          </motion.button>
        ))}
      </div>

      {/* Themes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredThemes.map((theme) => (
            <motion.div
              key={theme.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatedCard
                theme={theme}
                hover={true}
                glow={theme.effects.glow}
                glassmorphism={theme.effects.glassmorphism}
                className={`
                  cursor-pointer border-2 transition-all duration-300
                  ${currentTheme.id === theme.id
                    ? 'border-blue-500 ring-2 ring-blue-200'
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
                onClick={() => handleThemeSelect(theme)}
              >
                <div className="space-y-4">
                  {/* Theme Preview */}
                  <div
                    className="h-32 rounded-lg relative overflow-hidden"
                    style={{ background: theme.gradients.background }}
                  >
                    <div className="absolute inset-0 p-4">
                      <div
                        className="h-8 rounded mb-2"
                        style={{ background: theme.gradients.primary }}
                      />
                      <div
                        className="h-4 rounded mb-2 w-3/4"
                        style={{ background: theme.gradients.secondary }}
                      />
                      <div
                        className="h-3 rounded w-1/2"
                        style={{ background: theme.colors.accent }}
                      />
                    </div>
                    
                    {theme.isPremium && (
                      <div className="absolute top-2 right-2">
                        <Crown className="w-5 h-5 text-yellow-500" />
                      </div>
                    )}
                  </div>

                  {/* Theme Info */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">{theme.name}</h3>
                      {theme.isPremium && (
                        <span className="text-sm font-bold text-green-600">
                          ${theme.price}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600">{theme.description}</p>
                    
                    <div className="flex items-center space-x-2">
                      {theme.effects.glow && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                          Glow
                        </span>
                      )}
                      {theme.effects.glassmorphism && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                          Glass
                        </span>
                      )}
                      {theme.effects.blur && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          Blur
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex items-center justify-between">
                    {currentTheme.id === theme.id ? (
                      <div className="flex items-center text-green-600">
                        <Check className="w-4 h-4 mr-1" />
                        <span className="text-sm font-medium">Active</span>
                      </div>
                    ) : theme.isPremium ? (
                      <div className="flex items-center text-yellow-600">
                        <Lock className="w-4 h-4 mr-1" />
                        <span className="text-sm font-medium">Premium</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">Free</span>
                    )}
                    
                    <AnimatedButton
                      theme={theme}
                      variant="primary"
                      size="sm"
                      onClick={() => handleThemeSelect(theme)}
                      glow={theme.effects.glow}
                    >
                      {currentTheme.id === theme.id ? 'Active' : 'Select'}
                    </AnimatedButton>
                  </div>
                </div>
              </AnimatedCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Upgrade Modal */}
      <AnimatePresence>
        {showUpgradeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowUpgradeModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900">Upgrade to Premium</h2>
                <p className="text-gray-600">
                  Unlock premium themes with advanced animations, 3D effects, and exclusive designs.
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-700">
                    <Sparkles className="w-4 h-4 mr-2 text-purple-500" />
                    Access to all premium themes
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <Sparkles className="w-4 h-4 mr-2 text-purple-500" />
                    3D animations and effects
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <Sparkles className="w-4 h-4 mr-2 text-purple-500" />
                    Advanced customization options
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <AnimatedButton
                    theme={currentTheme}
                    variant="secondary"
                    onClick={() => setShowUpgradeModal(false)}
                  >
                    Maybe Later
                  </AnimatedButton>
                  <AnimatedButton
                    theme={currentTheme}
                    variant="primary"
                    onClick={handleUpgrade}
                    glow={true}
                  >
                    Upgrade Now
                  </AnimatedButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSelector;
