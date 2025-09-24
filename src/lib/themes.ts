export interface PremiumTheme {
  id: string;
  name: string;
  description: string;
  isPremium: boolean;
  price?: number;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
  };
  gradients: {
    primary: string;
    secondary: string;
    background: string;
    card: string;
  };
  animations: {
    duration: number;
    easing: string;
  };
  effects: {
    blur: boolean;
    glow: boolean;
    shadow: boolean;
    glassmorphism: boolean;
  };
}

export const premiumThemes: PremiumTheme[] = [
  {
    id: 'cyberpunk',
    name: 'Cyberpunk Neon',
    description: 'Futuristic neon aesthetic with electric gradients',
    isPremium: true,
    price: 9.99,
    colors: {
      primary: '#00ff88',
      secondary: '#ff0080',
      accent: '#00d4ff',
      background: '#0a0a0a',
      surface: '#1a1a1a',
      text: '#ffffff',
      textSecondary: '#a0a0a0',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)',
      secondary: 'linear-gradient(135deg, #ff0080 0%, #ff6b35 100%)',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
      card: 'linear-gradient(135deg, rgba(0,255,136,0.1) 0%, rgba(0,212,255,0.1) 100%)',
    },
    animations: {
      duration: 0.3,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    effects: {
      blur: true,
      glow: true,
      shadow: true,
      glassmorphism: true,
    },
  },
  {
    id: 'aurora',
    name: 'Aurora Borealis',
    description: 'Northern lights inspired with flowing gradients',
    isPremium: true,
    price: 7.99,
    colors: {
      primary: '#00f5ff',
      secondary: '#ff00ff',
      accent: '#00ff00',
      background: '#000428',
      surface: '#004e92',
      text: '#ffffff',
      textSecondary: '#b8d4f0',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #00f5ff 0%, #ff00ff 50%, #00ff00 100%)',
      secondary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      background: 'linear-gradient(135deg, #000428 0%, #004e92 100%)',
      card: 'linear-gradient(135deg, rgba(0,245,255,0.2) 0%, rgba(255,0,255,0.2) 100%)',
    },
    animations: {
      duration: 0.5,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
    effects: {
      blur: true,
      glow: true,
      shadow: true,
      glassmorphism: false,
    },
  },
  {
    id: 'sunset',
    name: 'Sunset Vibes',
    description: 'Warm sunset colors with smooth transitions',
    isPremium: true,
    price: 5.99,
    colors: {
      primary: '#ff6b35',
      secondary: '#f7931e',
      accent: '#ffd23f',
      background: '#ff9a9e',
      surface: '#fecfef',
      text: '#2c3e50',
      textSecondary: '#7f8c8d',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
      secondary: 'linear-gradient(135deg, #ffd23f 0%, #ff6b35 100%)',
      background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      card: 'linear-gradient(135deg, rgba(255,107,53,0.1) 0%, rgba(247,147,30,0.1) 100%)',
    },
    animations: {
      duration: 0.4,
      easing: 'ease-in-out',
    },
    effects: {
      blur: false,
      glow: true,
      shadow: true,
      glassmorphism: false,
    },
  },
  {
    id: 'ocean',
    name: 'Ocean Depths',
    description: 'Deep ocean blues with wave-like animations',
    isPremium: true,
    price: 6.99,
    colors: {
      primary: '#00b4db',
      secondary: '#0083b0',
      accent: '#00d4aa',
      background: '#0f0f23',
      surface: '#1a1a2e',
      text: '#ffffff',
      textSecondary: '#a8dadc',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #00b4db 0%, #0083b0 100%)',
      secondary: 'linear-gradient(135deg, #00d4aa 0%, #00b4db 100%)',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      card: 'linear-gradient(135deg, rgba(0,180,219,0.1) 0%, rgba(0,131,176,0.1) 100%)',
    },
    animations: {
      duration: 0.6,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    effects: {
      blur: true,
      glow: true,
      shadow: true,
      glassmorphism: true,
    },
  },
  {
    id: 'free-modern',
    name: 'Modern Free',
    description: 'Clean modern design - Free tier',
    isPremium: false,
    colors: {
      primary: '#3b82f6',
      secondary: '#64748b',
      accent: '#06b6d4',
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#1e293b',
      textSecondary: '#64748b',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      secondary: 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      card: 'linear-gradient(135deg, rgba(59,130,246,0.05) 0%, rgba(6,182,212,0.05) 100%)',
    },
    animations: {
      duration: 0.2,
      easing: 'ease-out',
    },
    effects: {
      blur: false,
      glow: false,
      shadow: true,
      glassmorphism: false,
    },
  },
];

export const getTheme = (themeId: string): PremiumTheme => {
  return premiumThemes.find(theme => theme.id === themeId) || premiumThemes[premiumThemes.length - 1];
};

export const getFreeThemes = (): PremiumTheme[] => {
  return premiumThemes.filter(theme => !theme.isPremium);
};

export const getPremiumThemes = (): PremiumTheme[] => {
  return premiumThemes.filter(theme => theme.isPremium);
};
