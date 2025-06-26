import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type ThemeMode = 'bold' | 'lovable';

interface ThemeContextType {
  mode: ThemeMode;
  toggleMode: () => void;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme color configurations
const themeConfig = {
  bold: {
    primary: 'bg-orange-600',
    secondary: 'bg-red-600',
    background: 'bg-gradient-to-br from-gray-100 to-orange-50',
    text: 'text-gray-900',
    accent: 'text-orange-500',
  },
  lovable: {
    primary: 'bg-pink-600',
    secondary: 'bg-purple-600',
    background: 'bg-gradient-to-br from-pink-50 to-purple-50',
    text: 'text-gray-800',
    accent: 'text-pink-500',
  }
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
  defaultMode?: ThemeMode; // Optional prop to set default theme
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  defaultMode = 'bold' 
}) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    // Try to get saved theme from localStorage
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('themeMode') as ThemeMode | null;
      return savedTheme || defaultMode;
    }
    return defaultMode;
  });

  // Save theme preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('themeMode', mode);
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  const toggleMode = () => {
    setMode(prev => prev === 'bold' ? 'lovable' : 'bold');
  };

  // Get current theme colors
  const colors = themeConfig[mode];

  return (
    <ThemeContext.Provider value={{ mode, toggleMode, colors }}>
      <div className={`min-h-screen transition-colors duration-300 ${colors.background}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// Helper hook for easy access to theme colors
export const useThemeColors = () => {
  const { colors } = useTheme();
  return colors;
};