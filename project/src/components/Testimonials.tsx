import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface Testimonial {
  name: string;
  location: string;
  rating: number;
  comment: string;
  avatar: string;
  date: string;
}

const Testimonials: React.FC = () => {
  const { mode } = useTheme();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [animatedRatings, setAnimatedRatings] = useState<{ [key: number]: number }>({});

  const testimonials: Testimonial[] = [
    {
      name: 'Priya Sharma',
      location: 'Mumbai',
      rating: 5,
      comment: 'The best dosas I\'ve ever had! The authentic flavors reminded me of my grandmother\'s cooking. The service was exceptional and the ambiance was perfect for a family dinner.',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      date: '2 days ago'
    },
    {
      name: 'Rajesh Kumar',
      location: 'Bangalore',
      rating: 5,
      comment: 'DosaDelight lives up to its name! Every bite was a delight. The Mysore Masala Dosa was crispy and flavorful. Will definitely visit again when I\'m in town.',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      date: '1 week ago'
    },
    {
      name: 'Meera Patel',
      location: 'Chennai',
      rating: 5,
      comment: 'As a South Indian food enthusiast, I can confidently say this place serves authentic cuisine. The sambar and chutneys are made to perfection. Highly recommended!',
      avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150',
      date: '3 days ago'
    },
    {
      name: 'Arjun Reddy',
      location: 'Hyderabad',
      rating: 4,
      comment: 'Great food and amazing presentation! The chicken biryani was aromatic and well-spiced. The only reason it\'s not 5 stars is the wait time, but it was worth it.',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
      date: '5 days ago'
    },
    {
      name: 'Lakshmi Iyer',
      location: 'Kerala',
      rating: 5,
      comment: 'The filter coffee here is exactly how my mother makes it! The dosas are crispy and the coconut chutney is divine. This place feels like home.',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150',
      date: '1 day ago'
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
    <section className={`py-20 ${
      mode === 'lovable'
        ? 'bg-gradient-to-b from-purple-50 to-pink-50'
        : 'bg-gradient-to-b from-white to-gray-50'
    }`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 ${
            mode === 'lovable'
              ? 'bg-pink-100 text-pink-800'
              : 'bg-orange-100 text-orange-800'
          }`}>
            Testimonials
          </div>
          
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
            mode === 'lovable' ? 'text-gray-800' : 'text-gray-900'
          }`}>
            What Our{' '}
            <span className={`${
              mode === 'lovable'
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600'
                : 'text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600'
            }`}>
              Customers Say
            </span>
          </h2>
          
          <p className={`text-lg max-w-2xl mx-auto ${
            mode === 'lovable' ? 'text-gray-600' : 'text-gray-700'
          }`}>
            Don't just take our word for it. Here's what food lovers across India 
            are saying about their DosaDelight experience.
          </p>
        </div>

        {/* Main Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div className={`relative p-8 md:p-12 rounded-3xl shadow-2xl transition-all duration-500 ${
            mode === 'lovable'
              ? 'bg-white border-2 border-pink-100'
              : 'bg-white border-2 border-orange-100'
          }`}>
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
                  <Star
                    key={index}
                    className={`w-6 h-6 transition-all duration-300 transform ${
                      index < (animatedRatings[currentTestimonial] || 0)
                        ? 'text-yellow-400 fill-current scale-110'
                        : 'text-gray-300'
                    } ${mode === 'lovable' ? 'hover:animate-bounce' : ''}`}
                  />
                ))}
                <span className="ml-2 text-gray-600 font-medium">
                  ({testimonials[currentTestimonial].rating}/5)
                </span>
              </div>
            </div>

            {/* Customer Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].name}
                  className="w-16 h-16 rounded-full object-cover shadow-lg"
                />
                <div>
                  <h4 className="font-semibold text-gray-800 text-lg">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-gray-600">
                    {testimonials[currentTestimonial].location}
                  </p>
                  <p className="text-sm text-gray-500">
                    {testimonials[currentTestimonial].date}
                  </p>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex space-x-2">
                <button
                  onClick={prevTestimonial}
                  className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                    mode === 'lovable'
                      ? 'bg-pink-100 hover:bg-pink-200 text-pink-600'
                      : 'bg-orange-100 hover:bg-orange-200 text-orange-600'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                    mode === 'lovable'
                      ? 'bg-pink-100 hover:bg-pink-200 text-pink-600'
                      : 'bg-orange-100 hover:bg-orange-200 text-orange-600'
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
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
          </div>

          {/* Testimonial Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? mode === 'lovable'
                      ? 'bg-pink-500 scale-125'
                      : 'bg-orange-500 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
                }`}
              />
            ))}
          </div>

          {/* Floating Reviews */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  index === currentTestimonial
                    ? mode === 'lovable'
                      ? 'bg-gradient-to-br from-pink-100 to-purple-100 border-2 border-pink-300'
                      : 'bg-gradient-to-br from-orange-100 to-red-100 border-2 border-orange-300'
                    : 'bg-white hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h5 className="font-semibold text-gray-800">{testimonial.name}</h5>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm line-clamp-3">
                  "{testimonial.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;