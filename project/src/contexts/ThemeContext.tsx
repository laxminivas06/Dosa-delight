import React, { createContext, useContext, useState, ReactNode } from 'react';

type ThemeMode = 'bold' | 'lovable';

interface ThemeContextType {
  mode: ThemeMode;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('bold');

  const toggleMode = () => {
    setMode(prev => prev === 'bold' ? 'lovable' : 'bold');
  };

  // Color schemes for both modes can be added here if needed in the future

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <div className={`min-h-screen transition-colors duration-300 ${
        mode === 'lovable' ? 
        'bg-gradient-to-br from-pink-50 to-purple-50' : 
        'bg-gradient-to-br from-gray-100 to-orange-50'
      }`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};