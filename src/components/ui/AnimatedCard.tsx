import React from 'react';
import { motion } from 'framer-motion';
import { animated, useSpring } from '@react-spring/web';
import type { PremiumTheme } from '../../lib/themes';

interface AnimatedCardProps {
  children: React.ReactNode;
  theme: PremiumTheme;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  glassmorphism?: boolean;
  onClick?: () => void;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  theme,
  className = '',
  hover = true,
  glow = false,
  glassmorphism = false,
  onClick,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const cardSpring = useSpring({
    transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0px) scale(1)',
    boxShadow: isHovered
      ? `0 20px 40px ${theme.colors.primary}20, 0 0 0 1px ${theme.colors.primary}30`
      : `0 4px 12px ${theme.colors.primary}10, 0 0 0 1px ${theme.colors.primary}20`,
    config: {
      tension: 300,
      friction: 30,
    },
  });

  const glowSpring = useSpring({
    opacity: isHovered && glow ? 1 : 0,
    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
    config: {
      tension: 200,
      friction: 20,
    },
  });

  const baseClasses = `
    relative overflow-hidden rounded-2xl transition-all duration-300
    ${glassmorphism ? 'backdrop-blur-md bg-white/10' : ''}
    ${theme.effects.shadow ? 'shadow-xl' : 'shadow-lg'}
    ${onClick ? 'cursor-pointer' : ''}
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: theme.animations.duration, ease: 'easeOut' }}
      className={`${baseClasses} ${className}`}
      onMouseEnter={() => hover && setIsHovered(true)}
      onMouseLeave={() => hover && setIsHovered(false)}
      onClick={onClick}
    >
      <animated.div
        style={{
          ...cardSpring,
          background: glassmorphism 
            ? `linear-gradient(135deg, ${theme.colors.surface}20, ${theme.colors.primary}10)`
            : theme.gradients.card,
        }}
        className="h-full w-full p-6"
      >
        {glow && (
          <animated.div
            style={{
              ...glowSpring,
              background: theme.gradients.primary,
              filter: 'blur(20px)',
            }}
            className="absolute inset-0 -z-10"
          />
        )}
        
        {children}
      </animated.div>
    </motion.div>
  );
};

export default AnimatedCard;
