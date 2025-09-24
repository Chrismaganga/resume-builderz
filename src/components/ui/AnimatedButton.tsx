import React from 'react';
import { motion } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import type { PremiumTheme } from '../../lib/themes';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  theme: PremiumTheme;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  glow?: boolean;
  className?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  theme,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  glow = false,
  className = '',
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isPressed, setIsPressed] = React.useState(false);

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: theme.gradients.primary,
          color: theme.colors.text,
        };
      case 'secondary':
        return {
          background: theme.gradients.secondary,
          color: theme.colors.text,
        };
      case 'accent':
        return {
          background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.primary})`,
          color: theme.colors.text,
        };
      default:
        return {
          background: theme.gradients.primary,
          color: theme.colors.text,
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm';
      case 'md':
        return 'px-6 py-3 text-base';
      case 'lg':
        return 'px-8 py-4 text-lg';
      default:
        return 'px-6 py-3 text-base';
    }
  };

  const buttonSpring = useSpring({
    transform: isPressed 
      ? 'scale(0.95)' 
      : isHovered 
        ? 'scale(1.05)' 
        : 'scale(1)',
    boxShadow: isHovered
      ? `0 10px 30px ${theme.colors.primary}40, 0 0 0 1px ${theme.colors.primary}60`
      : `0 4px 15px ${theme.colors.primary}20, 0 0 0 1px ${theme.colors.primary}30`,
    config: {
      tension: 300,
      friction: 25,
    },
  });

  const glowSpring = useSpring({
    opacity: isHovered && glow ? 0.8 : 0,
    transform: isHovered ? 'scale(1.2)' : 'scale(1)',
    config: {
      tension: 200,
      friction: 20,
    },
  });

  const rippleSpring = useSpring({
    scale: isPressed ? 1 : 0,
    opacity: isPressed ? 0.6 : 0,
    config: {
      tension: 400,
      friction: 30,
    },
  });

  return (
    <motion.div
      className="relative inline-block"
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => !disabled && setIsHovered(false)}
      onMouseDown={() => !disabled && setIsPressed(true)}
      onMouseUp={() => !disabled && setIsPressed(false)}
    >
      <animated.button
        style={{
          ...buttonSpring,
          ...getVariantStyles(),
        }}
        className={`
          relative overflow-hidden rounded-xl font-semibold
          transition-all duration-300 ease-out
          ${getSizeStyles()}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${className}
        `}
        onClick={disabled || loading ? undefined : onClick}
        disabled={disabled || loading}
      >
        {glow && (
          <animated.div
            style={{
              ...glowSpring,
              background: theme.gradients.primary,
              filter: 'blur(15px)',
            }}
            className="absolute inset-0 -z-10"
          />
        )}

        <animated.div
          style={{
            ...rippleSpring,
            background: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '50%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100px',
            height: '100px',
            transform: 'translate(-50%, -50%)',
          }}
        />

        <motion.div
          className="relative z-10 flex items-center justify-center"
          animate={{
            opacity: loading ? 0.7 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          {loading && (
            <motion.div
              className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          )}
          {children}
        </motion.div>
      </animated.button>
    </motion.div>
  );
};

export default AnimatedButton;
