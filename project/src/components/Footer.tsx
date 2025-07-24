import React from 'react';
import { Heart, Phone, Mail, MapPin, Instagram } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const { mode } = useTheme();
  const currentYear = new Date().getFullYear();

  // Get current page from URL hash (e.g., #menu)
  const currentPage = window.location.hash.replace(/^#/, '') || 'home';

  const quickLinks = [
    { name: 'Home', page: 'home' },
    { name: 'Menu', page: 'menu' },
    { name: 'Bar', page: 'bar' },
    { name: 'Banquet', page: 'banquet' },
    { name: 'Gallery', page: 'gallery' },
    { name: 'Contact', page: 'contact' }
  ];

const navigateTo = (page: string) => {
  window.location.hash = page;
  window.scrollTo(0, 0);
};
  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' }
  ];

 

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
                  src="https://i.postimg.cc/gJFh4T6Y/logo-final.png"
            alt="DosaDelight Logo"
            className="w-48 h-55 sm:w-50 sm:h-57 md:w-64 md:h-71 lg:w-150 lg:h-157"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 1000909090909090,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                />
                
                <h3 className="text-2xl font-bold text-white mt-4 md:mt-0 md:ml-4">DosaDelight</h3>
              </motion.div>
            </div>
            
           <p className="text-gray-300 text-base md:text-lg mb-6 leading-relaxed">
  Dosa Delight is more than just a taste of Indian — it’s a celebration of India’s diverse culinary heritage. From soulful spiritual offerings to traditional delicacies across regions, we honor the essence of Indian cuisine in every dish, bringing the full spectrum of flavors from all corners of the country.
</p>
            
            <div className="flex justify-center md:justify-start items-center space-x-2 text-gray-300">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
              <span>in Australia</span>
            </div>
          </div>

        
<div className="mt-8 md:mt-0">
  <h4 className="text-white font-semibold text-lg mb-4 md:mb-6">Quick Links</h4>
  <ul className="grid grid-cols-2 gap-3 sm:flex sm:flex-col sm:gap-2">
    {quickLinks.map((link) => (
      <li key={link.name}>
        <button
          onClick={() => navigateTo(link.page)}
          className={`w-full text-left py-2 px-3 rounded-lg transition-all ${
            mode === 'lovable'
              ? 'hover:bg-pink-800/50'
              : 'hover:bg-orange-800/50'
          } ${
            currentPage === link.page 
              ? 'bg-white/10 font-bold' 
              : 'text-gray-300'
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
                <span className="text-gray-300">dosadelightharrispark@gmail.com</span>
              </a>
              
              <a 
                href="https://maps.app.goo.gl/WuBeYXojqjh3qdfHA" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start space-x-3 hover:text-white transition-colors duration-300"
              >
                <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                <div className="text-gray-300">
                  <p>48 station street, </p>
                  <p>Harris park, NSW 2150</p>
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