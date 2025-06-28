import React, { useState, useEffect } from 'react';
import { Flame, Users, Clock, Heart, ChevronRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const { mode } = useTheme();
  const [currentImage, setCurrentImage] = useState(0);
  const [typedText, setTypedText] = useState('');
  
  const images = [
    'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://harispeax.wordpress.com/wp-content/uploads/2021/08/thali.png',
    'https://images.pexels.com/photos/8887011/pexels-photo-8887011.jpeg',
    'https://media.istockphoto.com/id/1333127675/photo/chicken-biryani-spicy-indian-malabar-biryani-hyderabadi-biryani-dum-biriyani-pulao-golden.jpg?s=612x612&w=0&k=20&c=cuof8o-8VkdKw2EuDV6XTOFjqQBobiff5ugsBwD4Erg='
  ];

  const fullText = "Crafting delight in every bite since Day One";

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(imageInterval);
  }, []);

  useEffect(() => {
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 100);
    return () => clearInterval(typeInterval);
  }, []);

  const features = [
     { 
      icon: Flame,  
      title: 'Live Tandoor Station', 
      desc: 'Watch chefs bake fluffy naan & kebabs in our clay oven',
      emoji: '🔥' 
    },
    { icon: Users, title: 'Family Recipes', desc: 'Grandmothers secret Andhra spices' },
    { icon: Clock, title: 'Fresh Daily', desc: 'Stone-ground batter every morning' },
    { icon: Heart, title: 'Made with Love', desc: 'Every dish tells a South Indian story' }
  ];

  const signatureSpices = [
    "Indian Red Chilli",
    "Dum ki Masala",
    "Indian Street Chaat Spice",
    "Multi Tiffin Spice Mix",
  ];

  return (
    <section id="about" className={`py-20 ${
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
          src="https://i.postimg.cc/gJFh4T6Y/logo-final.png"
            alt="DosaDelight Logo"
            className="w-48 h-55 sm:w-50 sm:h-57 md:w-64 md:h-71 lg:w-150 lg:h-157"
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
        
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Slider */}
          <div className="relative">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`DosaDelight ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    index === currentImage ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
              
              {/* Floating particles overlay */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute animate-float ${
                      mode === 'lovable' ? 'text-pink-300' : 'text-orange-300'
                    }`}
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${2 + Math.random()}s`
                    }}
                  >
                    ✨
                  </div>
                ))}
              </div>
            </div>




            {/* Image Indicators */}
            <div className="flex justify-center space-x-2 mt-4">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentImage
                      ? mode === 'lovable' 
                        ? 'bg-pink-500 scale-125' 
                        : 'bg-orange-500 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div>
            <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-6 ${
              mode === 'lovable' 
                ? 'bg-pink-100 text-pink-800' 
                : 'bg-orange-100 text-orange-800'
            }`}>
              Our Telugu Heritage
            </div>

            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
              mode === 'lovable' 
                ? 'text-gray-800' 
                : 'text-gray-900'
            }`}>
              Where Andhra Meets{' '}
              <span className={`${
                mode === 'lovable' 
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600' 
                  : 'text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600'
              }`}>
                Innovation
              </span>
            </h2>

            {/* Typewriter Quote */}
            <div className="mb-8">
              <blockquote className={`text-xl md:text-2xl italic ${
                mode === 'lovable' ? 'text-gray-700' : 'text-gray-600'
              }`}>
                "{typedText}
                <span className="animate-pulse">|</span>"
              </blockquote>
            </div>

            <div className={`text-lg leading-relaxed mb-8 ${
              mode === 'lovable' ? 'text-gray-600' : 'text-gray-700'
            }`}>
             
  <p className="mb-4 text-sm md:text-base">
    DosaDelight is a celebration of Indian culinary heritage, with a heart rooted in Indian traditions. What began as a modest venture has grown into a beloved destination for authentic Indian cuisine - from crispy dosas to rich curries and tandoori specialties - that blend age-old recipes with contemporary flair.
  </p>
  
  <p className="mb-4 text-sm md:text-base">
    Every dish we serve tells a story — our dosas crafted with batters fermented in traditional clay pots for unmatched depth of flavor, our biryanis layered with aromatic spices, and our curries simmered to perfection. We take pride in sourcing our ingredients with care: fiery Guntur chillies, fragrant curry leaves, stone-ground idli rava, and premium basmati rice come straight from trusted regional producers across India.
  </p>

  <p className="mb-4 text-sm md:text-base">
    Beyond our famous dosas, our menu reflects the rich diversity of Indian cuisine — from the tangy Gongura Dosa inspired by classic Andhra pickles to the melt-in-your-mouth Benne Dosa, from rich Mughlai curries to spicy Chettinad specialties. At DosaDelight, we bring the warmth of home-style cooking to every plate, offering a soulful experience that's both nostalgic and refreshingly new.
  </p>

  <p className="mb-4 text-sm md:text-base bg-amber-50 p-4 rounded-lg border-l-4 border-amber-200">
    Our elegant banquet halls provide the perfect setting for your special occasions. Whether it's weddings, corporate events, or family celebrations, we offer customizable spaces with authentic Indian decor, state-of-the-art facilities, and of course, our signature culinary excellence to make your event truly memorable.
  </p>

  <p className="text-sm md:text-base bg-blue-50 p-4 rounded-lg border-l-4 border-blue-200">
    Complete your experience at our premium bar, where we serve auspicious drinks and creative cocktails inspired by Indian traditions. Enjoy our signature masala-infused spirits, refreshing lassis with a modern twist, or choose from our selection of fine wines and beers that perfectly complement Indian flavors.
  </p>

            </div>

            {/* Signature Spices */}
            <div className={`p-6 rounded-xl mb-8 ${
              mode === 'lovable' 
                ? 'bg-pink-50 border border-pink-200' 
                : 'bg-orange-50 border border-orange-200'
            }`}>
              <h3 className="font-bold text-lg mb-3 flex items-center">
                <ChevronRight className={`mr-1 ${
                  mode === 'lovable' ? 'text-pink-600' : 'text-orange-600'
                }`} />
                Our Signature Telugu Spices
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {signatureSpices.map((spice, index) => (
                  <div key={index} className="flex items-center">
                    <span className={`inline-block w-1.5 h-1.5 rounded-full mr-2 ${
                      mode === 'lovable' ? 'bg-pink-500' : 'bg-orange-500'
                    }`}></span>
                    <span>{spice}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                    mode === 'lovable' 
                      ? 'bg-white shadow-md hover:shadow-lg border border-pink-100' 
                      : 'bg-white shadow-md hover:shadow-lg border border-orange-100'
                  }`}
                >
                  <feature.icon className={`w-8 h-8 mb-3 ${
                    mode === 'lovable' ? 'text-pink-600' : 'text-orange-600'
                  }`} />
                  <h4 className="font-semibold text-gray-800 mb-1">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;