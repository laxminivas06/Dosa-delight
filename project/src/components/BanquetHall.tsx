import React, { useState, useEffect } from 'react';
import { 
   
  CheckCircle, Crown, Utensils, Music, Camera, Sparkles, 
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

interface Event {
  type: string;
  icon: string;
  description: string;
  minGuests: number;
}

const BanquetHall: React.FC = () => {
  const { mode } = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const hallImages = [
    'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1395964/pexels-photo-1395964.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2306274/pexels-photo-2306274.jpeg?auto=compress&cs=tinysrgb&w=800'
  ];

  const eventTypes: Event[] = [
    {
      type: 'Corporate Events',
      icon: '🏢',
      description: 'Professional venues for conferences, seminars, and business gatherings',
      minGuests: 50
    },
    {
      type: 'Birthday Parties',
      icon: '🎂',
      description: 'Celebrate milestones with customized party arrangements',
      minGuests: 30
    },
    {
      type: 'Anniversaries',
      icon: '💕',
      description: 'Romantic settings for celebrating love and togetherness',
      minGuests: 50
    },
    {
      type: 'Receptions',
      icon: '🥂',
      description: 'Grand reception halls with premium dining experiences',
      minGuests: 150
    },
    {
      type: 'Cultural Events',
      icon: '🎭',
      description: 'Traditional venues perfect for cultural celebrations',
      minGuests: 75
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % hallImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData as any).toString(),
    })
      .then(() => {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          eventType: '',
          eventDate: '',
          guestCount: '',
          message: ''
        });
      })
      .catch(error => console.error('Error:', error));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100
      }
    }
  };

  const formVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100
      }
    }
  };

  return (
    <section id="banquet" className={`py-12 md:py-20 ${
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
               src="https://i.postimg.cc/VvgSZGPp/dd.png"
               alt="DosaDelight Logo"
              className="w-48 h-48 sm:w-50 sm:h-50 md:w-64 md:h-64 lg:w-150 lg:h-150" // Increased the size
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div 
            variants={itemVariants}
            className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 ${
              mode === 'lovable'
                ? 'bg-pink-100 text-pink-800'
                : 'bg-orange-100 text-orange-800'
            }`}
          >
            Banquet Hall
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 ${
              mode === 'lovable' ? 'text-gray-800' : 'text-gray-900'
            }`}
          >
            Celebrate Your{' '}
            <span className={`${
              mode === 'lovable'
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600'
                : 'text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600'
            }`}>
              Special Moments
            </span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className={`text-base md:text-lg max-w-3xl mx-auto ${
              mode === 'lovable' ? 'text-gray-600' : 'text-gray-700'
            }`}
          >
            Transform your celebrations into unforgettable memories with our elegant banquet halls, 
            premium services, and exquisite catering that will leave your guests amazed.
          </motion.p>
        </motion.div>

        {/* Hero Image Slider */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          className="relative mb-12 md:mb-16"
        >
          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl">
            {hallImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Banquet Hall ${index + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
            
            {/* Overlay Content */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <Crown className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 text-yellow-400" />
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2">Luxury Banquet Experience</h3>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl">Where Every Celebration Becomes Extraordinary</p>
              </div>
            </div>
          </div>

          {/* Image Indicators */}
          <div className="flex justify-center space-x-2 mt-4 md:mt-6">
            {hallImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex
                    ? mode === 'lovable'
                      ? 'bg-pink-500 scale-125'
                      : 'bg-orange-500 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Event Types */}
<div className="mb-12 md:mb-16">
  <h3 className={`text-2xl sm:text-3xl font-bold text-center mb-8 md:mb-12 ${
    mode === 'lovable' ? 'text-gray-800' : 'text-gray-900'
  }`}>
    Perfect for Every Occasion
  </h3>
  
  <div className="w-full">
    {/* Mobile horizontal scroll container (unchanged) */}
    <div className="flex lg:hidden overflow-x-auto pb-4 -mx-4 px-4">
      <div className="flex space-x-4">
        {eventTypes.map((event, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            className={`flex-shrink-0 w-[calc(100vw/1.5)] p-4 rounded-xl md:rounded-2xl transition-all duration-300 hover:shadow-lg cursor-pointer ${
              mode === 'lovable'
                ? 'bg-white border border-pink-100 hover:border-pink-300'
                : 'bg-white border border-orange-100 hover:border-orange-300'
            }`}
          >
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 text-center">{event.icon}</div>
            <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-2 text-center">
              {event.type}
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 text-center mb-3 sm:mb-4">{event.description}</p>
            <div className={`text-xs sm:text-sm text-center ${
              mode === 'lovable' ? 'text-pink-600' : 'text-orange-600'
            } font-medium`}>
              Min. {event.minGuests} guests
            </div>
          </motion.div>
        ))}
      </div>
    </div>
    
    {/* Desktop row (updated) */}
    <div className="hidden lg:flex justify-center gap-6 px-4">
      {eventTypes.map((event, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.03 }}
          className={`flex-1 max-w-xs xl:max-w-sm p-6 rounded-2xl transition-all duration-300 hover:shadow-lg cursor-pointer ${
            mode === 'lovable'
              ? 'bg-white border border-pink-100 hover:border-pink-300'
              : 'bg-white border border-orange-100 hover:border-orange-300'
          }`}
        >
          <div className="text-4xl xl:text-5xl mb-4 text-center">{event.icon}</div>
          <h4 className="text-xl xl:text-2xl font-semibold text-gray-800 mb-2 text-center">
            {event.type}
          </h4>
          <p className="text-sm xl:text-base text-gray-600 text-center mb-4">{event.description}</p>
          <div className={`text-sm xl:text-base text-center ${
            mode === 'lovable' ? 'text-pink-600' : 'text-orange-600'
          } font-medium`}>
            Min. {event.minGuests} guests
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</div>

       

        {/* Features Grid */}
        <div className="mb-12 md:mb-16">
          <h3 className={`text-2xl sm:text-3xl font-bold text-center mb-8 md:mb-12 ${
            mode === 'lovable' ? 'text-gray-800' : 'text-gray-900'
          }`}>
            Our Premium Features
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {[
              { icon: Utensils, title: 'Gourmet Catering', desc: 'Multi-cuisine options with live counters' },
              { icon: Music, title: 'Entertainment', desc: 'Professional DJ and live music setup' },
              { icon: Camera, title: 'Photography', desc: 'Professional photography and videography' },
              { icon: Sparkles, title: 'Decoration', desc: 'Themed decorations and floral arrangements' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className={`text-center p-4 sm:p-6 rounded-xl md:rounded-2xl transition-all duration-300 ${
                  mode === 'lovable'
                    ? 'bg-white shadow-sm hover:shadow-md border border-pink-100'
                    : 'bg-white shadow-sm hover:shadow-md border border-orange-100'
                }`}
              >
                <feature.icon className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-3 sm:mb-4 ${
                  mode === 'lovable' ? 'text-pink-600' : 'text-orange-600'
                }`} />
                <h4 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">{feature.title}</h4>
                <p className="text-xs sm:text-sm text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

       {/* Booking Form */}
<motion.div 
  initial="hidden"
  animate="visible"
  variants={formVariants}
  className={`max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl ${
    mode === 'lovable'
      ? 'bg-white border border-pink-100'
      : 'bg-white border border-orange-100'
  }`}
>
  <h3 className={`text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 ${
    mode === 'lovable' ? 'text-gray-800' : 'text-gray-900'
  }`}>
    Book Your Event
  </h3>

  {isSubmitted ? (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="text-center py-8 sm:py-12"
    >
      <CheckCircle className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 ${
        mode === 'lovable' ? 'text-pink-500' : 'text-orange-500'
      }`} />
      <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">
        Booking Request Sent!
      </h4>
      <p className="text-sm sm:text-base text-gray-600">
        We'll contact you within 24 hours to confirm your booking details.
      </p>
    </motion.div>
  ) : (
    <form 
      name="banquet-booking" 
      method="POST" 
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="space-y-4 sm:space-y-6"
    >
      <input type="hidden" name="form-name" value="banquet-booking" />
      <div hidden>
        <label>
          Don't fill this out if you're human: <input name="bot-field" />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="relative"
        >
          <label htmlFor="name" className={`absolute left-4 top-2 sm:top-3 transition-all duration-200 pointer-events-none text-sm sm:text-base ${
            formData.name || focusedField === 'name'
              ? `-translate-y-6 sm:-translate-y-8 scale-90 ${
                  mode === 'lovable' ? 'text-pink-600' : 'text-orange-600'
                }`
              : 'text-gray-500'
          }`}>
            Your Name *
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField(null)}
            required
            className="w-full px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-lg md:rounded-xl focus:outline-none transition-all duration-200 peer"
            placeholder=" "
          />
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="relative"
        >
          <label htmlFor="email" className={`absolute left-4 top-2 sm:top-3 transition-all duration-200 pointer-events-none text-sm sm:text-base ${
            formData.email || focusedField === 'email'
              ? `-translate-y-6 sm:-translate-y-8 scale-90 ${
                  mode === 'lovable' ? 'text-pink-600' : 'text-orange-600'
                }`
              : 'text-gray-500'
          }`}>
            Email Address *
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            required
            className="w-full px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-lg md:rounded-xl focus:outline-none transition-all duration-200 peer"
            placeholder=" "
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="relative"
        >
          <label htmlFor="phone" className={`absolute left-4 top-2 sm:top-3 transition-all duration-200 pointer-events-none text-sm sm:text-base ${
            formData.phone || focusedField === 'phone'
              ? `-translate-y-6 sm:-translate-y-8 scale-90 ${
                  mode === 'lovable' ? 'text-pink-600' : 'text-orange-600'
                }`
              : 'text-gray-500'
          }`}>
            Phone Number *
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            onFocus={() => setFocusedField('phone')}
            onBlur={() => setFocusedField(null)}
            required
            className="w-full px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-lg md:rounded-xl focus:outline-none transition-all duration-200 peer"
            placeholder=" "
          />
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="relative"
        >
          <label htmlFor="eventType" className={`absolute left-4 top-2 sm:top-3 transition-all duration-200 pointer-events-none text-sm sm:text-base ${
            formData.eventType || focusedField === 'eventType'
              ? `-translate-y-6 sm:-translate-y-8 scale-90 ${
                  mode === 'lovable' ? 'text-pink-600' : 'text-orange-600'
                }`
              : 'text-gray-500'
          }`}>
            Event Type *
          </label>
          <select
            id="eventType"
            name="eventType"
            value={formData.eventType}
            onChange={handleInputChange}
            onFocus={() => setFocusedField('eventType')}
            onBlur={() => setFocusedField(null)}
            required
            className="w-full px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-lg md:rounded-xl focus:outline-none transition-all duration-200 peer appearance-none"
          >
            <option value=""></option>
            {eventTypes.map((event) => (
              <option key={event.type} value={event.type}>{event.type}</option>
            ))}
          </select>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="relative"
        >
          <label htmlFor="eventDate" className={`absolute left-4 top-2 sm:top-3 transition-all duration-200 pointer-events-none text-sm sm:text-base ${
            formData.eventDate || focusedField === 'eventDate'
              ? `-translate-y-6 sm:-translate-y-8 scale-90 ${
                  mode === 'lovable' ? 'text-pink-600' : 'text-orange-600'
                }`
              : 'text-gray-500'
          }`}>
            Event Date *
          </label>
          <input
            id="eventDate"
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleInputChange}
            onFocus={() => setFocusedField('eventDate')}
            onBlur={() => setFocusedField(null)}
            required
            className="w-full px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-lg md:rounded-xl focus:outline-none transition-all duration-200 peer"
          />
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="relative"
        >
          <label htmlFor="guestCount" className={`absolute left-4 top-2 sm:top-3 transition-all duration-200 pointer-events-none text-sm sm:text-base ${
            formData.guestCount || focusedField === 'guestCount'
              ? `-translate-y-6 sm:-translate-y-8 scale-90 ${
                  mode === 'lovable' ? 'text-pink-600' : 'text-orange-600'
                }`
              : 'text-gray-500'
          }`}>
            Number of Guests *
          </label>
          <input
            id="guestCount"
            type="number"
            name="guestCount"
            value={formData.guestCount}
            onChange={handleInputChange}
            onFocus={() => setFocusedField('guestCount')}
            onBlur={() => setFocusedField(null)}
            required
            className="w-full px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-lg md:rounded-xl focus:outline-none transition-all duration-200 peer"
            placeholder=" "
            min="30"
          />
        </motion.div>
      </div>

      <motion.div 
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="relative"
      >
        <label htmlFor="message" className={`absolute left-4 top-2 sm:top-3 transition-all duration-200 pointer-events-none text-sm sm:text-base ${
          formData.message || focusedField === 'message'
            ? `-translate-y-6 sm:-translate-y-8 scale-90 ${
                mode === 'lovable' ? 'text-pink-600' : 'text-orange-600'
              }`
            : 'text-gray-500'
        }`}>
          Special Requirements or Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          onFocus={() => setFocusedField('message')}
          onBlur={() => setFocusedField(null)}
          rows={3}
          className="w-full px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-lg md:rounded-xl focus:outline-none transition-all duration-200 peer resize-none"
          placeholder=" "
        />
      </motion.div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full py-3 sm:py-4 rounded-lg md:rounded-xl font-medium transition-all duration-300 ${
          mode === 'lovable'
            ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white'
            : 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white'
        }`}
      >
        Send Booking Request
      </motion.button>
    </form>
  )}
</motion.div>
         
      </div>
    </section>
  );
};

export default BanquetHall;