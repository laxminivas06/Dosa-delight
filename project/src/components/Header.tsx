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

  const navItems = ['Home', 'About', 'Menu', 'Gallery', 'Contact'];

  const navigateToPage = (page: string) => {
    window.location.hash = page.toLowerCase();
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="relative">
      {/* Top Info Bar - Fixed */}
      <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-orange-600 to-red-600 text-white py-2 px-4 z-50">
        <div className="container mx-auto flex flex-wrap justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span className="hidden sm:inline">GO6/31, LASSO ROAD, GREGORY HILLS, NSW, 2557</span>
              <span className="sm:hidden">Sydney, Australia</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">Open 11AM - 11PM</span>
              <span className="sm:hidden">11AM-11PM</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline"> +61 420 774 951</span>
            <span className="sm:hidden">Call</span>
          </div>
        </div>
      </div>

      {/* Main Header - Fixed with top offset */}
      <header className={`fixed top-10 left-0 right-0 w-full z-40 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-white/90 backdrop-blur-sm shadow-md'
      }`}>
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
  src="https://i.postimg.cc/W470Rm5s/Dosa.png"
  alt="DosaDelight Logo"
  className="w-16 h-16 md:w-42 md:h-42"
  animate={{
    rotate: [0, 10, -10, 0],
    scale: [1, 1.1, 1]
  }}
  transition={{
    duration: 100000000,
    repeat: Infinity,
    repeatType: 'reverse'
  }}
/>
           
              <div>
                <h1 className={`font-bold text-xl text-gray-800 ${mode === 'lovable' ? 'font-playful' : ''}`}>
                  DosaDelight
                </h1>
                <p className="text-xs text-gray-600">
                  Vanakkam! Welcome
                </p>
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => navigateToPage(item)}
                  className={`font-medium transition-all duration-300 hover:scale-105 text-gray-700 hover:text-orange-600 ${
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
                className="md:hidden p-2 rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t shadow-lg">
            <div className="container mx-auto px-4 py-4">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => navigateToPage(item)}
                  className="block w-full text-left py-3 px-4 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-[104px]" />
    </div>
  );
};

export default Header;