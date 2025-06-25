import React, { useState, useEffect } from 'react';
import { X, Heart, Star } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Gallery: React.FC = () => {
  const { mode } = useTheme();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [imageLoaded, setImageLoaded] = useState<{ [key: number]: boolean }>({});
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const galleryImages = [
    {
      url: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Fresh Dosa Making',
      description: 'Our chefs preparing crispy dosas with perfection'
    },
    {
      url: 'https://images.pexels.com/photos/1095550/pexels-photo-1095550.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Spice Collection',
      description: 'Authentic spices sourced from across India'
    },
    {
      url: 'https://images.pexels.com/photos/2788792/pexels-photo-2788792.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Traditional Cooking',
      description: 'Time-honored cooking methods'
    },
    {
      url: 'https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Colorful Presentation',
      description: 'Every dish is a work of art'
    },
    {
      url: 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Fresh Ingredients',
      description: 'Only the finest ingredients make it to your plate'
    },
    {
      url: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Cozy Ambiance',
      description: 'Warm and welcoming dining experience'
    },
    {
      url: 'https://images.pexels.com/photos/1833349/pexels-photo-1833349.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Happy Customers',
      description: 'Smiles that make our day'
    },
    {
      url: 'https://images.pexels.com/photos/2696064/pexels-photo-2696064.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Cultural Heritage',
      description: 'Celebrating South Indian traditions'
    }
  ];

  const stats = [
    { 
      icon: Heart, 
      label: 'Happy Customers', 
      value: '1000+',
      animation: {
        hidden: { y: 20, opacity: 0 },
        visible: { 
          y: 0, 
          opacity: 1,
          transition: { duration: 0.5 }
        }
      }
    },
    { 
      icon: Star, 
      label: 'Reviews', 
      value: '4.2/5',
      animation: {
        hidden: { y: 20, opacity: 0 },
        visible: { 
          y: 0, 
          opacity: 1,
          transition: { duration: 0.5, delay: 0.1 }
        }
      }
    },
    { 
      label: 'Dishes Served', 
      value: '2,000+',
      animation: {
        hidden: { y: 20, opacity: 0 },
        visible: { 
          y: 0, 
          opacity: 1,
          transition: { duration: 0.5, delay: 0.2 }
        }
      }
    },
    { 
      label: 'Years of Service', 
      value: '7+',
      animation: {
        hidden: { y: 20, opacity: 0 },
        visible: { 
          y: 0, 
          opacity: 1,
          transition: { duration: 0.5, delay: 0.3 }
        }
      }
    }
  ];

  const handleImageLoad = (index: number) => {
    setImageLoaded(prev => ({ ...prev, [index]: true }));
  };

  return (
    
    <section id="gallery" className={`py-20 ${
      mode === 'lovable'
        ? 'bg-gradient-to-b from-pink-50 to-purple-50'
        : 'bg-gradient-to-b from-gray-50 to-white'
    }`}>

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
              
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 ${
              mode === 'lovable'
                ? 'bg-pink-100 text-pink-800'
                : 'bg-orange-100 text-orange-800'
            }`}
          >
            Gallery
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              mode === 'lovable' ? 'text-gray-800' : 'text-gray-900'
            }`}
          >
            A Visual{' '}
            <span className={`${
              mode === 'lovable'
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600'
                : 'text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600'
            }`}>
              Feast
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`text-lg max-w-2xl mx-auto ${
              mode === 'lovable' ? 'text-gray-600' : 'text-gray-700'
            }`}
          >
            Take a peek into our kitchen, witness the artistry of our chefs, 
            and see the joy on our customers' faces.
          </motion.p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              className="break-inside-avoid relative group cursor-pointer"
              onClick={() => setSelectedImage(index)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Loading Placeholder */}
              {!imageLoaded[index] && (
                <div className={`w-full h-64 rounded-xl ${
                  mode === 'lovable'
                    ? 'bg-gradient-to-br from-pink-200 to-purple-200'
                    : 'bg-gradient-to-br from-orange-200 to-red-200'
                } animate-pulse`} />
              )}
              
              <img
                src={image.url}
                alt={image.title}
                className={`w-full rounded-xl shadow-md transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl ${
                  imageLoaded[index] ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => handleImageLoad(index)}
                loading="lazy"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 rounded-xl flex items-end p-4">
                <div className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                  <p className="text-sm text-gray-200">{image.description}</p>
                </div>
              </div>

              {/* Sparkle Effect */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute ${
                      mode === 'lovable' ? 'text-pink-400' : 'text-orange-400'
                    }`}
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: Math.random() * 2
                    }}
                  >
                    ✨
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Modal */}
        {selectedImage !== null && (
          <motion.div 
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="relative max-w-4xl w-full max-h-full"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
            >
              {/* Close Button - Top Right */}
              <motion.button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-10 right-0 md:-top-12 text-white hover:text-gray-300 transition-colors"
                aria-label="Close image"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-8 h-8 md:w-10 md:h-10 p-1 bg-black/50 rounded-full" />
              </motion.button>
              
              {/* Image Container */}
              <div className="relative w-full h-full flex items-center justify-center">
                <motion.img
                  src={galleryImages[selectedImage].url}
                  alt={galleryImages[selectedImage].title}
                  className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                />
              </div>
              
              {/* Caption */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6 rounded-b-xl"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-white text-lg md:text-xl font-semibold mb-1 md:mb-2">
                  {galleryImages[selectedImage].title}
                </h3>
                <p className="text-gray-200 text-sm md:text-base">
                  {galleryImages[selectedImage].description}
                </p>
              </motion.div>

              {/* Mobile Close Button - Bottom Center */}
              <motion.div 
                className="md:hidden absolute bottom-4 left-0 right-0 flex justify-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.button
                  onClick={() => setSelectedImage(null)}
                  className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Tap to Close
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* Stats */}
        <div 
          ref={ref}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center"
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div 
                key={index}
                variants={stat.animation}
                initial="hidden"
                animate={controls}
                className="group"
              >
                <div className="relative">
                  {IconComponent && (
                    <motion.div
                      className={`absolute -top-8 left-1/2 transform -translate-x-1/2 ${
                        mode === 'lovable' ? 'text-pink-500' : 'text-orange-500'
                      }`}
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                    >
                      <IconComponent className="w-6 h-6" />
                    </motion.div>
                  )}
                  <motion.div 
                    className={`text-3xl font-bold mb-2 ${
                      mode === 'lovable' ? 'text-pink-600' : 'text-orange-600'
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {stat.value}
                  </motion.div>
                </div>
                <motion.div 
                  className={`text-sm ${
                    mode === 'lovable' ? 'text-gray-600' : 'text-gray-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {stat.label}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Gallery;