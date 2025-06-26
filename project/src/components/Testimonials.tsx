import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

interface Testimonial {
  name: string;
  location: string;
  rating: number;
  comment: string;
  
}

const Testimonials: React.FC = () => {
  const { mode } = useTheme();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [animatedRatings, setAnimatedRatings] = useState<{ [key: number]: number }>({});

  const testimonials: Testimonial[] = [
    {
      name: 'Priya Sharma',
      location: 'Melbourne',
      rating: 4.8,
      comment: 'The best dosas I\'ve ever had! The authentic flavors reminded me of my grandmother\'s cooking. The service was exceptional and the ambiance was perfect for a family dinner.'
 
    },
    {
      name: 'Rajesh',
      location: 'NSW,2147',
      rating: 4.2,
      comment: 'DosaDelight lives up to its name! Every bite was a delight. The Mysore Masala Dosa was crispy and flavorful. Will definitely visit again when I\'m in town.'
    },
    {
      name: 'Michelle',
      location: 'Sydney',
      rating: 5,
      comment: 'As a South Indian food enthusiast, I can confidently say this place serves authentic cuisine. The sambar and chutneys are made to perfection. Highly recommended!'
    },
    {
      name: 'Venkatesh',
      location: 'Sydney',
      rating: 4.4,
      comment: 'Great food and amazing presentation! The chicken biryani was aromatic and well-spiced. The only reason it\'s not 5 stars is the wait time, but it was worth it.'
    },
    {
      name: 'Andrew Smith',
      location: 'Melbourne',
      rating: 5,
      comment: 'The dosas are crispy and the coconut chutney is divine. This place feels like home.'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Animate star ratings when testimonial changes
    const rating = testimonials[currentTestimonial].rating;
    let count = 0;
    const animateStars = () => {
      if (count <= rating) {
        setAnimatedRatings({ [currentTestimonial]: count });
        count++;
        setTimeout(animateStars, 200);
      }
    };
    animateStars();
  }, [currentTestimonial]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
  };

  return (
    <section id="testimonials" className={`py-20 ${
      mode === 'lovable'
        ? 'bg-gradient-to-b from-purple-50 to-pink-50'
        : 'bg-gradient-to-b from-white to-gray-50'
    }`}>
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
            Testimonials
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              mode === 'lovable' ? 'text-gray-800' : 'text-gray-900'
            }`}
          >
            What Our{' '}
            <span className={`${
              mode === 'lovable'
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600'
                : 'text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600'
            }`}>
              Customers Say
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
            Don't just take our word for it. Here's what food lovers across India 
            are saying about their DosaDelight experience.
          </motion.p>
        </div>

        {/* Main Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`relative p-8 md:p-12 rounded-3xl shadow-2xl transition-all duration-500 ${
              mode === 'lovable'
                ? 'bg-white border-2 border-pink-100'
                : 'bg-white border-2 border-orange-100'
            }`}
          >
            {/* Quote Icon */}
            <Quote className={`w-12 h-12 mb-6 ${
              mode === 'lovable' ? 'text-pink-400' : 'text-orange-400'
            } opacity-50`} />

            {/* Testimonial Content */}
            <div className="mb-8">
              <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-6">
                "{testimonials[currentTestimonial].comment}"
              </p>

              {/* Animated Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Star
                      className={`w-6 h-6 transition-all duration-300 transform ${
                        index < (animatedRatings[currentTestimonial] || 0)
                          ? 'text-yellow-400 fill-current scale-110'
                          : 'text-gray-300'
                      } ${mode === 'lovable' ? 'hover:animate-bounce' : ''}`}
                    />
                  </motion.div>
                ))}
                <span className="ml-2 text-gray-600 font-medium">
                  ({testimonials[currentTestimonial].rating}/5)
                </span>
              </div>
            </div>

            {/* Customer Info */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                
                <div>
                  <h4 className="font-semibold text-gray-800 text-lg">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-gray-600">
                    {testimonials[currentTestimonial].location}
                  </p>
                 
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex space-x-2">
                <motion.button
                  onClick={prevTestimonial}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    mode === 'lovable'
                      ? 'bg-pink-100 hover:bg-pink-200 text-pink-600'
                      : 'bg-orange-100 hover:bg-orange-200 text-orange-600'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
                <motion.button
                  onClick={nextTestimonial}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    mode === 'lovable'
                      ? 'bg-pink-100 hover:bg-pink-200 text-pink-600'
                      : 'bg-orange-100 hover:bg-orange-200 text-orange-600'
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute top-4 right-4 opacity-10">
              <div className={`text-6xl ${
                mode === 'lovable' ? 'text-pink-300' : 'text-orange-300'
              }`}>
                🥞
              </div>
            </div>
          </motion.div>

          {/* Testimonial Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToTestimonial(index)}
                whileHover={{ scale: 1.2 }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? mode === 'lovable'
                      ? 'bg-pink-500 scale-125'
                      : 'bg-orange-500 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;