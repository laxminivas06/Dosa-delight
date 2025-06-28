import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin, Clock } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { mode } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home', 'About', 'Menu', 'Banquet', 'Bar', 'Gallery', 'Contact'];

  const navigateToPage = (page: string) => {
    window.location.hash = page.toLowerCase();
    setIsMobileMenuOpen(false);
  };

  // Updated color schemes based on theme mode to match footer styling
  const colorSchemes = {
    lovable: {
      bg: isScrolled ? 'bg-pink-900/95' : 'bg-pink-900/90',
      text: 'text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300',
      hover: 'hover:text-pink-300',
      mobileBg: 'bg-pink-800/95',
      border: 'border-pink-700',
      buttonHover: 'hover:bg-pink-700/50',
      iconColor: 'text-pink-300',
      logoText: 'font-bold',
      navItemActive: 'bg-pink-700/30',
      navItemHover: 'hover:bg-pink-700/50'
    },
    bold: {
      bg: isScrolled ? 'bg-gray-900/95' : 'bg-gray-900/90',
      text: 'text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500',
      hover: 'hover:text-orange-400',
      mobileBg: 'bg-gray-800/95',
      border: 'border-gray-700',
      buttonHover: 'hover:bg-gray-700/50',
      iconColor: 'text-orange-400',
      logoText: 'font-bold',
      navItemActive: 'bg-orange-700/30',
      navItemHover: 'hover:bg-orange-700/50'
    },
    default: {
      bg: isScrolled ? 'bg-white/95' : 'bg-white/90',
      text: 'text-gray-800',
      hover: 'hover:text-orange-600',
      mobileBg: 'bg-white/95',
      border: 'border-gray-200',
      buttonHover: 'hover:bg-orange-50',
      iconColor: 'text-orange-600',
      logoText: 'font-semibold',
      navItemActive: 'bg-orange-100',
      navItemHover: 'hover:bg-orange-100'
    }
  };

  const colors = colorSchemes[mode as keyof typeof colorSchemes] || colorSchemes.default;

  return (
    <div className="relative">
      {/* Main Header - Fixed */}
      <header className={`fixed top-0 left-0 right-0 w-full z-40 transition-all duration-500 backdrop-blur-md shadow-lg ${colors.bg}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo with Animation and Link */}
            <motion.a 
              href="#home" 
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.img
                src="https://i.postimg.cc/gJFh4T6Y/logo-final.png"
                alt="DosaDelight Logo"
                className="w-15 h-20 lg:w-24 lg:h-24"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 10000000000,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
              />
              <div>
                <h1 className={`text-xl ${colors.logoText} ${colors.text}`}>
                  Dosa Delight
                </h1>
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => navigateToPage(item)}
                  className={`font-medium transition-all duration-300 px-4 py-2 rounded-lg ${
                    window.location.hash === `#${item.toLowerCase()}` 
                      ? colors.navItemActive 
                      : colors.text
                  } ${colors.navItemHover} ${
                    mode === 'lovable' ? 'hover:animate-bounce' : ''
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>

            {/* Theme Toggle & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden p-2 rounded-lg transition-colors ${colors.iconColor} hover:bg-opacity-20 ${mode === 'lovable' ? 'hover:bg-pink-700' : mode === 'bold' ? 'hover:bg-orange-700' : 'hover:bg-orange-200'}`}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`md:hidden ${colors.mobileBg} backdrop-blur-md border-t ${colors.border} shadow-lg`}>
            <div className="container mx-auto px-4 py-4">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => navigateToPage(item)}
                  className={`block w-full text-left py-3 px-4 rounded-lg transition-colors mb-1 ${
                    window.location.hash === `#${item.toLowerCase()}`
                      ? `${colors.navItemActive} font-semibold ${colors.text}`
                      : `text-gray-300 ${colors.buttonHover}`
                  }`}
                >
                  {item}
                </button>
              ))}
              
              {/* Contact Info in Mobile Menu */}
              <div className={`mt-4 pt-4 border-t ${colors.border} space-y-3`}>
                <div className={`flex items-center space-x-2 py-2 px-4 ${colors.text}`}>
                  <MapPin className={`w-5 h-5 ${colors.iconColor}`} />
                  <span>48 station street, Harris park, NSW 2150</span>
                </div>
                <div className={`flex items-center space-x-2 py-2 px-4 ${colors.text}`}>
                  <Clock className={`w-5 h-5 ${colors.iconColor}`} />
                  <span>Open 11AM - 11PM</span>
                </div>
                <div className={`flex items-center space-x-2 py-2 px-4 ${colors.text}`}>
                  <Phone className={`w-5 h-5 ${colors.iconColor}`} />
                  <span>61 406 969 996</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-16" />
    </div>
  );
};

export default Header;