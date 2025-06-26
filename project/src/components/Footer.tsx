import React from 'react';
import { Heart, Phone, Mail, MapPin, Instagram } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const { mode } = useTheme();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.slice(1));
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className={`relative overflow-hidden ${
      mode === 'lovable'
        ? 'bg-gradient-to-br from-pink-900 via-purple-900 to-pink-800'
        : 'bg-gradient-to-br from-gray-900 via-orange-900 to-red-900'
    }`}>
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute animate-float ${
              mode === 'lovable' ? 'text-pink-300' : 'text-orange-300'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            {Math.random() > 0.5 ? '🌶️' : '✨'}
          </div>
        ))}
      </div>

      {/* Developer Credits */}
      <div className="relative z-10">
        <div className="flex justify-center pt-8">
          <div className={`p-4 sm:p-6 rounded-xl mx-4 ${
            mode === 'lovable'
              ? 'bg-pink-100/30 border-pink-700 backdrop-blur-sm'
              : 'bg-orange-100/30 border-orange-700 backdrop-blur-sm'
          }`}>
            <p className={`text-sm ${
              mode === 'lovable' ? 'text-pink-200' : 'text-orange-200'
            }`}>
              This Website was Developed by
            </p>
            <div className="flex justify-center mt-3">
              <a 
                href="https://nivaseditz.netlify.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`p-3 rounded-lg transition-all duration-300 hover:scale-105 ${
                  mode === 'lovable'
                    ? 'bg-pink-50/80 hover:bg-pink-100/80'
                    : 'bg-orange-50/80 hover:bg-orange-100/80'
                }`}
              >
                <img
                  src="https://i.postimg.cc/tRDy1sM7/Nivas.png"
                  className="h-20 w-20 sm:w-50 sm:h-50"
                  alt="Nivas Editz"
                />
              </a>
            </div>
            <p className={`text-xs mt-3 ${
              mode === 'lovable' ? 'text-pink-300' : 'text-orange-300'
            }`}>
              Tap on icon to view our Website
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex flex-col items-center md:items-start md:flex-row md:space-x-3 mb-6">
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: 'spring' }}
                className="mb-4 md:mb-8 flex flex-col items-center"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  mode === 'lovable'
                    ? 'bg-gradient-to-br from-pink-400 to-purple-500'
                    : 'bg-gradient-to-br from-orange-500 to-red-600'
                } animate-pulse mb-4`}></div>
                
                <motion.img
                  src="https://i.postimg.cc/W470Rm5s/Dosa.png"
                  alt="DosaDelight Logo"
                  className="w-48 h-48 sm:w-50 sm:h-50 md:w-64 md:h-64 lg:w-150 lg:h-150"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                />
                
                <h3 className="text-2xl font-bold text-white mt-4 md:mt-0 md:ml-4">DosaDelight</h3>
              </motion.div>
            </div>
            
            <p className="text-gray-300 text-base md:text-lg mb-6 leading-relaxed">
              Dosa Delight celebrates the rich flavors of South India with a strong foundation in Telugu culinary traditions. Known for our authentic Andhra-style dosas and bold chutneys, we blend time-honored recipes with a modern touch.
            </p>
            
            <div className="flex justify-center md:justify-start items-center space-x-2 text-gray-300">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
              <span>in India</span>
            </div>
          </div>

          {/* Quick Links with Testimonials */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className={`text-gray-300 hover:text-white transition-colors duration-300 hover:scale-105 transform ${
                      mode === 'lovable' ? 'hover:text-pink-300' : 'hover:text-orange-300'
                    }`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6">Get In Touch</h4>
            <div className="space-y-4">
              <a 
                href="tel:+61406969996" 
                className="flex items-center space-x-3 hover:text-white transition-colors duration-300"
              >
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300">+61 406 969 996</span>
              </a>
              
              <a 
                href="mailto:dosadelightarrispark@gmail.com" 
                className="flex items-center space-x-3 hover:text-white transition-colors duration-300"
              >
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300">dosadelightarrispark@gmail.com</span>
              </a>
              
              <a 
                href="https://www.google.com/maps/search/?api=1&query=GO6/31+LASSO+ROAD+GREGORY+HILLS+NSW+2557" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start space-x-3 hover:text-white transition-colors duration-300"
              >
                <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                <div className="text-gray-300">
                  <p>GO6/31, LASSO ROAD,</p>
                  <p>GREGORY HILLS, NSW, 2557</p>
                </div>
              </a>
            </div>

            <div className="mt-6">
              <h5 className="text-white font-medium mb-3">Follow Us</h5>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                      mode === 'lovable'
                        ? 'bg-pink-800 hover:bg-pink-700 text-pink-300'
                        : 'bg-orange-800 hover:bg-orange-700 text-orange-300'
                    }`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className={`border-t ${
          mode === 'lovable' ? 'border-pink-800' : 'border-orange-800'
        } pt-8`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white text-sm mb-4 md:mb-0 text-center md:text-left">
              © {currentYear} DosaDelight. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              <a href="#" className="text-white hover:underline transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white hover:underline transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-white hover:underline transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;