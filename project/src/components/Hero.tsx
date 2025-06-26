import React, { useEffect, useState } from 'react';
import { ChefHat, Clock, Star, ArrowRight, Mail } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const { mode } = useTheme();
  const [currentText, setCurrentText] = useState(0);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  
  const heroTexts = [
    "Authentic South Indian Flavors",
    "Crispy Dosas Made Fresh",
    "Spices That Tell Stories"
  ];

  // Background images for each mode
  const lovableBgImages = [
    "https://t3.ftcdn.net/jpg/01/54/14/86/360_F_154148685_yvijeC6L2SFpvqFJ5H1lunPg40FzCAf1.jpg",
    "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?cs=srgb&dl=pexels-chanwalrus-958545.jpg&fm=jpg",
    "https://c4.wallpaperflare.com/wallpaper/869/719/717/cuisine-food-india-indian-wallpaper-preview.jpg"
  ];

  const defaultBgImages = [
    "https://images.alphacoders.com/862/862639.jpg",
    "https://img.freepik.com/premium-photo/traditional-indian-dish-chicken-tikka-masala-with-spicy-curry-meat-bowl-basmati-rice-bread-naan-yoghurt-raita-sauce-rustic-dark-background-top-view-close-up-indian-style-dinner-from_92134-969.jpg?semt=ais_hybrid&w=740",
    "https://images.all-free-download.com/images/graphiclarge/food_picture_01_hd_pictures_167558.jpg"
  ];

  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % heroTexts.length);
    }, 3000);

    const bgInterval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % (mode === 'lovable' ? lovableBgImages.length : defaultBgImages.length));
    }, 5000);

    return () => {
      clearInterval(textInterval);
      clearInterval(bgInterval);
    };
  }, [mode]);

  const navigateToMenu = () => {
    window.location.hash = 'menu';
  };

  const navigateToContact = () => {
    window.location.hash = 'contact';
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-0"></div>
        {mode === 'lovable' ? (
          <motion.img
            key={currentBgIndex}
            src={lovableBgImages[currentBgIndex]}
            alt="Background"
            className="w-full h-full object-cover absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 1 }}
          />
        ) : (
          <motion.img
            key={currentBgIndex}
            src={defaultBgImages[currentBgIndex]}
            alt="Background"
            className="w-full h-full object-cover absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 1 }}
          />
        )}
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 py-12 flex flex-col items-center justify-center">
        {/* Logo Animation - Updated with larger sizes */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="mb-4 sm:mb-6 md:mb-8 flex justify-center"
        >
          <motion.img
            src="https://i.postimg.cc/VvgSZGPp/dd.png"
            alt="DosaDelight Logo"
            className="w-48 h-48 sm:w-50 sm:h-50 md:w-64 md:h-64 lg:w-150 lg:h-150"
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

        {/* Main Content - Narrower Container */}
        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto">
          {/* Animated Title with White Background Container */}
          <motion.div 
            className={`px-4 py-3 sm:px-6 sm:py-4 rounded-2xl mb-4 sm:mb-6 backdrop-blur-sm ${
              mode === 'lovable' 
                ? 'bg-white/90' 
                : 'bg-white/90'
            }`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-center ${
              mode === 'lovable' 
                ? 'text-gray-800' 
                : 'text-gray-800'
            }`}>
              <span className="inline-block animate-pulse">Dosa</span>
              <span className={`inline-block ml-2 sm:ml-3 ${
                mode === 'lovable' 
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600' 
                  : 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500'
              }`}>
                Delight
              </span>
            </h1>
          </motion.div>

          {/* Rotating Text with White Background Container - Different Font */}
          <motion.div 
            className={`px-4 py-3 sm:px-6 sm:py-4 rounded-2xl mb-6 sm:mb-8 backdrop-blur-sm ${
              mode === 'lovable' 
                ? 'bg-white/90' 
                : 'bg-white/90'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="h-10 sm:h-12 flex items-center justify-center">
              <p className={`font-serif italic text-lg sm:text-xl md:text-2xl transition-all duration-500 text-center ${
                mode === 'lovable' 
                  ? 'text-gray-700' 
                  : 'text-gray-700'
              }`}>
                {heroTexts[currentText]}
              </p>
            </div>
          </motion.div>

          {/* Stats - Adjusted to match container width */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 sm:mb-8 mx-auto">
            {[
              { icon: ChefHat, label: 'Expert Chefs', value: '5+' },
              { icon: Clock, label: 'Years Exp.', value: '7+' },
              { icon: Star, label: 'Customers', value: '1000+' }
            ].map((stat, index) => (
              <div 
                key={index} 
                className={`text-center p-2 sm:p-3 rounded-xl ${
                  mode === 'lovable' 
                    ? 'bg-white/70 backdrop-blur-sm' 
                    : 'bg-white/70 backdrop-blur-sm'
                } hover:scale-105 transition-transform duration-300`}
              >
                <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mx-auto mb-1 ${
                  mode === 'lovable' ? 'text-pink-600' : 'text-orange-400'
                }`} />
                <div className={`text-lg sm:text-xl font-bold ${
                  mode === 'lovable' ? 'text-gray-800' : 'text-gray-800'
                }`}>
                  {stat.value}
                </div>
                <div className={`text-xs ${
                  mode === 'lovable' ? 'text-gray-600' : 'text-gray-600'
                }`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons - Adjusted for narrower container */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
            <motion.button
              onClick={navigateToMenu}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`group px-4 py-2 sm:px-6 sm:py-3 rounded-full font-medium transition-all duration-300 ${
                mode === 'lovable'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white'
                  : 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white'
              } shadow-md hover:shadow-lg`}
            >
              <span className="flex items-center justify-center space-x-1 sm:space-x-2">
                <span className="text-xs sm:text-sm">Explore Menu</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
            
            <motion.button
              onClick={navigateToContact}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`group px-4 py-2 sm:px-6 sm:py-3 rounded-full font-medium transition-all duration-300 ${
                mode === 'lovable'
                  ? 'bg-white text-pink-600 hover:bg-pink-50 border border-pink-200'
                  : 'bg-white/90 text-orange-600 hover:bg-orange-50 border border-orange-200'
              } shadow-md hover:shadow-lg`}
            >
              <span className="flex items-center justify-center space-x-1 sm:space-x-2">
                <span className="text-xs sm:text-sm">Contact Us</span>
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;