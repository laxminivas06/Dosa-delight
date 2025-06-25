import React from 'react';
import { Zap, Heart } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { mode, toggleMode } = useTheme();

  return (
    <button
      onClick={toggleMode}
      className={`relative w-16 h-8 rounded-full transition-all duration-300 ${
        mode === 'bold' 
          ? 'bg-gradient-to-r from-indigo-600 to-orange-800'  // Professional blue gradient
          : 'bg-gradient-to-r from-pink-400 to-purple-500' // Playful pink-purple gradient
      } shadow-lg hover:scale-105`}
    >
      <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 flex items-center justify-center ${
        mode === 'lovable' ? 'transform translate-x-8' : ''
      }`}>
        {mode === 'bold' ? (
          <Zap className="w-3 h-3 text-indigo-600" />  // Matching blue color
        ) : (
          <Heart className="w-3 h-3 text-pink-500" />
        )}
      </div>
      <div className="absolute inset-0 flex items-center justify-between px-2 text-xs font-medium text-white">
        <span className={mode === 'bold' ? 'opacity-100' : 'opacity-50'}>AI</span>
        <span className={mode === 'lovable' ? 'opacity-100' : 'opacity-50'}>♥</span>
      </div>
    </button>
  );
};

export default ThemeToggle;