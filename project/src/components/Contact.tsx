import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle,MessageCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  const { mode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // In your Contact component
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
      setFormData({ name: '', email: '', phone: '', message: '' });
    })
    .catch(error => console.error('Error:', error));
};
const contactInfo = [
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+61 406 969 996'],
      action: 'tel:+61406969996'
    },
    {
      icon: MessageCircle, // WhatsApp icon (you might need to import this from lucide-react)
      title: 'WhatsApp Us',
      details: ['+61 406 969 996'],
      action: 'https://wa.me/61406969996?text=Hello%20DosaDelight,%20I%20would%20like%20to%20inquire%20about...'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['dosadelight45@gmail.com'],
      action: 'mailto:dosadelightarrispark@gmail.com'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['48 station street, Harris park, NSW 2150'],
      action: 'https://maps.app.goo.gl/F4JYisPix85r4hqe7'
    },
    {
      icon: Clock,
      title: 'Opening Hours',
      details: ['Mon - Sun: 11:00 AM - 11:00 PM'],
      action: null
    }
];
 

  // Animation variants (same as before)
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
        type: 'spring' as const,
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
    <section id="contact" className={`py-12 md:py-20 ${
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
            Get In Touch
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 ${
              mode === 'lovable' ? 'text-gray-800' : 'text-gray-900'
            }`}
          >
            We'd Love to{' '}
            <span className={`${
              mode === 'lovable'
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600'
                : 'text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600'
            }`}>
              Hear From You
            </span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className={`text-base sm:text-lg max-w-2xl mx-auto ${
              mode === 'lovable' ? 'text-gray-600' : 'text-gray-700'
            }`}
          >
            Have a question, suggestion, or just want to say hello? 
            Reach out to us and we'll get back to you as soon as possible.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Form */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={formVariants}
            className={`p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-lg ${
              mode === 'lovable'
                ? 'bg-white border-2 border-pink-100'
                : 'bg-white border-2 border-orange-100'
            }`}
          >
            <h3 className={`text-xl sm:text-2xl font-bold mb-6 ${
              mode === 'lovable' ? 'text-gray-800' : 'text-gray-900'
            }`}>
              Send us a Message
            </h3>

            {isSubmitted ? (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-8 sm:py-12"
              >
                <CheckCircle className={`w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-4 ${
                  mode === 'lovable' ? 'text-pink-500' : 'text-orange-500'
                }`} />
                <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                  Thank You!
                </h4>
                <p className="text-gray-600 text-sm sm:text-base">
                  Your message has been sent successfully. We'll get back to you soon!
                </p>
              </motion.div>
            ) : (
              <form 
                name="contact" 
                method="POST" 
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="space-y-4 sm:space-y-6"
              >
                <input type="hidden" name="form-name" value="contact" />
                <div hidden>
                  <label>
                    Don't fill this out if you're human: <input name="bot-field" />
                  </label>
                </div>
                
                {[
                  { name: 'name', label: 'Your Name *', type: 'text' },
                  { name: 'email', label: 'Email Address *', type: 'email' },
                  { name: 'phone', label: 'Phone Number', type: 'tel' },
                ].map((field) => (
                  <motion.div 
                    key={field.name}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="relative"
                  >
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField(field.name)}
                      onBlur={() => setFocusedField(null)}
                      required={field.label.includes('*')}
                      className={`w-full px-4 py-2 sm:py-3 border-2 rounded-lg sm:rounded-xl transition-all duration-200 peer ${
                        focusedField === field.name
                          ? mode === 'lovable'
                            ? 'border-pink-400 bg-pink-50'
                            : 'border-orange-400 bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      placeholder=" "
                    />
                    <label className={`absolute left-4 top-2 sm:top-3 transition-all duration-200 pointer-events-none text-sm sm:text-base ${
                      formData[field.name as keyof typeof formData] || focusedField === field.name
                        ? `-translate-y-6 sm:-translate-y-8 scale-90 ${
                            mode === 'lovable' ? 'text-pink-600' : 'text-orange-600'
                          }`
                        : 'text-gray-500'
                    }`}>
                      {field.label}
                    </label>
                  </motion.div>
                ))}

                {/* Message Field */}
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="relative"
                >
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    rows={4}
                    required
                    className={`w-full px-4 py-2 sm:py-3 border-2 rounded-lg sm:rounded-xl transition-all duration-200 resize-none ${
                      focusedField === 'message'
                        ? mode === 'lovable'
                          ? 'border-pink-400 bg-pink-50'
                          : 'border-orange-400 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    placeholder=" "
                  />
                  <label className={`absolute left-4 top-2 sm:top-3 transition-all duration-200 pointer-events-none text-sm sm:text-base ${
                    formData.message || focusedField === 'message'
                      ? `-translate-y-6 sm:-translate-y-8 scale-90 ${
                          mode === 'lovable' ? 'text-pink-600' : 'text-orange-600'
                        }`
                      : 'text-gray-500'
                  }`}>
                    Your Message *
                  </label>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 sm:py-4 rounded-lg sm:rounded-xl font-medium transition-all duration-300 ${
                    mode === 'lovable'
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white'
                      : 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white'
                  }`}
                >
                  <span className="flex items-center justify-center space-x-2">
                    <Send className="w-4 sm:w-5 h-4 sm:h-5" />
                    <span className="text-sm sm:text-base">Send Message</span>
                  </span>
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Contact Information (same as before) */}
          <div className="space-y-4 sm:space-y-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl transition-all duration-300 ${
                  mode === 'lovable'
                    ? 'bg-white shadow-sm sm:shadow-md border border-pink-100'
                    : 'bg-white shadow-sm sm:shadow-md border border-orange-100'
                }`}
              >
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl ${
                    mode === 'lovable'
                      ? 'bg-gradient-to-br from-pink-100 to-purple-100'
                      : 'bg-gradient-to-br from-orange-100 to-red-100'
                  }`}>
                    <info.icon className={`w-5 sm:w-6 h-5 sm:h-6 ${
                      mode === 'lovable' ? 'text-pink-600' : 'text-orange-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 text-sm sm:text-base mb-1 sm:mb-2">{info.title}</h4>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-gray-600 text-xs sm:text-sm mb-1">
                        {info.action && i === 0 ? (
                          <a 
                            href={info.action} 
                            className={`hover:underline ${
                              mode === 'lovable' ? 'hover:text-pink-600' : 'hover:text-orange-600'
                            }`}
                          >
                            {detail}
                          </a>
                        ) : (
                          detail
                        )}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Map */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              className="rounded-xl sm:rounded-2xl overflow-hidden shadow-md sm:shadow-lg"
            >
              <a 
                href="https://maps.app.goo.gl/F4JYisPix85r4hqe7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-48 sm:h-64 w-full flex items-center justify-center"
              >
                <div className={`h-full w-full flex items-center justify-center ${
                  mode === 'lovable'
                    ? 'bg-gradient-to-br from-pink-200 to-purple-200'
                    : 'bg-gradient-to-br from-orange-200 to-red-200'
                }`}>
                  <div className="text-center">
                    <MapPin className={`w-8 sm:w-12 h-8 sm:h-12 mx-auto mb-2 ${
                      mode === 'lovable' ? 'text-pink-600' : 'text-orange-600'
                    }`} />
                    <p className="text-gray-700 font-medium text-sm sm:text-base">View on Google Maps</p>
                    <p className="text-xs sm:text-sm text-gray-600">Click to open</p>
                  </div>
                </div>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;