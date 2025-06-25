import React, { useEffect, useState } from 'react';
import { ChefHat, Clock, Star, ArrowRight, Mail } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const { mode } = useTheme();
  const [currentText, setCurrentText] = useState(0);
  
  const heroTexts = [
    "Authentic South Indian Flavors",
    "Crispy Dosas Made Fresh",
    "Spices That Tell Stories"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % heroTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const navigateToMenu = () => {
    window.location.hash = 'menu';
  };

  const navigateToContact = () => {
    window.location.hash = 'contact';
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className={`absolute inset-0 ${
        mode === 'lovable' 
          ? 'bg-gradient-to-br from-pink-100 via-purple-50 to-orange-100' 
          : 'bg-gradient-to-br from-orange-900 via-red-800 to-yellow-900'
      }`} />
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute animate-float ${
              mode === 'lovable' ? 'text-pink-300' : 'text-orange-300'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            {mode === 'lovable' ? '✨' : '🌶️'}
          </div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Logo Animation */}
        <motion.div
  initial={{ opacity: 0, y: -50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, type: 'spring' }}
  className="mb-8 flex justify-center"
>
  <motion.img
    src="https://i.postimg.cc/W470Rm5s/Dosa.png"
    alt="DosaDelight Logo"
    className="w-32 h-32 md:w-42 md:h-42" // Increased the size
    animate={{
      rotate: [0, 10, -10, 0],
      scale: [1, 1.1, 1]
    }}
    transition={{
      duration: 10000,
      repeat: Infinity,
      repeatType: 'reverse'
    }}
  />
</motion.div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Greeting */}
          <div className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full mb-8 ${
            mode === 'lovable' 
              ? 'bg-pink-100 text-pink-800' 
              : 'bg-orange-100 text-orange-800'
          } backdrop-blur-sm animate-bounce`}>
            <span className="text-2xl">🙏</span>
            <span className="font-medium">Vanakkam! Welcome to DosaDelight</span>
          </div>

          {/* Animated Title */}
          <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${
            mode === 'lovable' 
              ? 'text-gray-800' 
              : 'text-white'
          }`}>
            <span className="inline-block animate-pulse">Dosa</span>
            <span className={`inline-block ml-4 ${
              mode === 'lovable' 
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600' 
                : 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500'
            }`}>
              Delight
            </span>
          </h1>

          {/* Rotating Text */}
          <div className="h-12 mb-8">
            <p className={`text-xl md:text-2xl transition-all duration-500 ${
              mode === 'lovable' 
                ? 'text-gray-700' 
                : 'text-orange-100'
            }`}>
              {heroTexts[currentText]}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mb-12 max-w-2xl mx-auto">
            {[
              { icon: ChefHat, label: 'Expert Chefs', value: '5+' },
              { icon: Clock, label: 'Years Experience', value: '7+' },
              { icon: Star, label: 'Happy Customers', value: '1000+' }
            ].map((stat, index) => (
              <div key={index} className={`text-center p-4 rounded-xl ${
                mode === 'lovable' 
                  ? 'bg-white/70 backdrop-blur-sm' 
                  : 'bg-white/10 backdrop-blur-sm'
              } hover:scale-105 transition-transform duration-300`}>
                <stat.icon className={`w-8 h-8 mx-auto mb-2 ${
                  mode === 'lovable' ? 'text-pink-600' : 'text-orange-400'
                }`} />
                <div className={`text-2xl font-bold ${
                  mode === 'lovable' ? 'text-gray-800' : 'text-white'
                }`}>
                  {stat.value}
                </div>
                <div className={`text-sm ${
                  mode === 'lovable' ? 'text-gray-600' : 'text-orange-200'
                }`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={navigateToMenu}
              className={`group px-8 py-4 rounded-full font-medium transition-all duration-300 ${
                mode === 'lovable'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white'
                  : 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white'
              } hover:scale-105 hover:shadow-xl`}
            >
              <span className="flex items-center space-x-2">
                <span>Explore Menu</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            <button
              onClick={navigateToContact}
              className={`group px-8 py-4 rounded-full font-medium transition-all duration-300 ${
                mode === 'lovable'
                  ? 'bg-white text-pink-600 hover:bg-pink-50 border border-pink-200'
                  : 'bg-white/90 text-orange-600 hover:bg-orange-50 border border-orange-200'
              } hover:scale-105 hover:shadow-xl`}
            >
              <span className="flex items-center space-x-2">
                <span>Contact Us</span>
                <Mail className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;