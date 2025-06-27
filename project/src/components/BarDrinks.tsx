import React, { useState, useEffect } from 'react';
import { Wine, Coffee, Sparkles, Clock, Star, Plus, Flame, Leaf, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useCart } from '../contexts/CartContext';
import { motion } from 'framer-motion';
interface DrinkItem {
  name: string;
  price: string;
  description: string;
  isAlcoholic?: boolean;
  isSignature?: boolean;
  isSpicy?: boolean;
  rating?: number;
}

interface DrinkCategory {
  name: string;
  icon: string;
  items: DrinkItem[];
  color: string;
}

const BarDrinks: React.FC = () => {
  const { mode } = useTheme();
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<DrinkCategory | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const barImages = [
    'https://images.pexels.com/photos/274192/pexels-photo-274192.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1304540/pexels-photo-1304540.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800'
  ];

  const decorativeImages = [
    'https://images.pexels.com/photos/274192/pexels-photo-274192.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1304540/pexels-photo-1304540.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=400'
  ];

  const drinkCategories: DrinkCategory[] = [
    {
      name: 'Signature Cocktails',
      icon: '🍸',
      color: 'from-purple-500 to-pink-500',
      items: [
        { name: 'DosaDelight Martini', price: '₹450', description: 'Premium vodka with curry leaf essence and lime', isAlcoholic: true, isSignature: true, rating: 4.9 },
        { name: 'Spice Route Mojito', price: '₹380', description: 'White rum with fresh mint and Indian spices', isAlcoholic: true, isSignature: true, isSpicy: true, rating: 4.8 },
        { name: 'Mango Tango Margarita', price: '₹420', description: 'Tequila with fresh mango and chili rim', isAlcoholic: true, isSignature: true, rating: 4.7 },
        { name: 'Coconut Curry Colada', price: '₹400', description: 'Rum with coconut cream and curry leaf', isAlcoholic: true, isSignature: true, rating: 4.6 },
        { name: 'Tamarind Whiskey Sour', price: '₹480', description: 'Premium whiskey with tamarind and jaggery', isAlcoholic: true, isSignature: true, rating: 4.8 }
      ]
    },
    {
      name: 'Premium Spirits',
      icon: '🥃',
      color: 'from-amber-500 to-orange-500',
      items: [
        { name: 'Single Malt Whiskey', price: '₹600', description: '25ml of premium aged single malt', isAlcoholic: true, rating: 4.9 },
        { name: 'Premium Vodka', price: '₹450', description: 'Top shelf vodka served neat or on rocks', isAlcoholic: true, rating: 4.7 },
        { name: 'Aged Rum', price: '₹520', description: 'Caribbean aged rum with rich flavor', isAlcoholic: true, rating: 4.8 },
        { name: 'Premium Gin', price: '₹480', description: 'Botanical gin with juniper notes', isAlcoholic: true, rating: 4.6 },
        { name: 'Tequila Blanco', price: '₹550', description: 'Pure agave tequila from Mexico', isAlcoholic: true, rating: 4.7 }
      ]
    },
    {
      name: 'Wine Collection',
      icon: '🍷',
      color: 'from-red-500 to-rose-500',
      items: [
        { name: 'Cabernet Sauvignon', price: '₹350', description: 'Full-bodied red wine with rich tannins', isAlcoholic: true, rating: 4.8 },
        { name: 'Chardonnay', price: '₹320', description: 'Crisp white wine with citrus notes', isAlcoholic: true, rating: 4.6 },
        { name: 'Pinot Noir', price: '₹380', description: 'Light-bodied red with berry flavors', isAlcoholic: true, rating: 4.7 },
        { name: 'Sauvignon Blanc', price: '₹300', description: 'Fresh white wine with herbal notes', isAlcoholic: true, rating: 4.5 },
        { name: 'Rosé Wine', price: '₹340', description: 'Light pink wine with floral aroma', isAlcoholic: true, rating: 4.6 }
      ]
    },
    {
      name: 'Craft Beers',
      icon: '🍺',
      color: 'from-yellow-500 to-amber-500',
      items: [
        { name: 'IPA (India Pale Ale)', price: '₹280', description: 'Hoppy beer with citrus and pine notes', isAlcoholic: true, rating: 4.7 },
        { name: 'Wheat Beer', price: '₹250', description: 'Smooth wheat beer with lemon slice', isAlcoholic: true, rating: 4.5 },
        { name: 'Lager', price: '₹220', description: 'Crisp and refreshing light beer', isAlcoholic: true, rating: 4.4 },
        { name: 'Stout', price: '₹300', description: 'Dark beer with coffee and chocolate notes', isAlcoholic: true, rating: 4.6 },
        { name: 'Pilsner', price: '₹240', description: 'Golden beer with floral hop aroma', isAlcoholic: true, rating: 4.5 }
      ]
    },
    {
      name: 'Non-Alcoholic',
      icon: '🥤',
      color: 'from-green-500 to-blue-500',
      items: [
        { name: 'Virgin Mojito', price: '₹180', description: 'Fresh mint with lime and soda', rating: 4.6 },
        { name: 'Fresh Lime Soda', price: '₹120', description: 'Refreshing lime with sparkling water', rating: 4.4 },
        { name: 'Mango Lassi', price: '₹150', description: 'Creamy yogurt drink with fresh mango', rating: 4.8 },
        { name: 'Masala Chai', price: '₹80', description: 'Traditional spiced tea blend', isSpicy: true, rating: 4.9 },
        { name: 'Fresh Coconut Water', price: '₹100', description: 'Natural tender coconut water', rating: 4.5 },
        { name: 'Iced Coffee', price: '₹140', description: 'Cold brew coffee with ice and cream', rating: 4.6 }
      ]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % barImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const openCategoryPopup = (category: DrinkCategory) => {
    setSelectedCategory(category);
    document.body.style.overflow = 'hidden';
  };

  const closeCategoryPopup = () => {
    setSelectedCategory(null);
    document.body.style.overflow = 'unset';
  };

  const handleAddToCart = (item: DrinkItem, category: DrinkCategory) => {
    const cartItem = {
      id: `${category.name}-${item.name}`,
      name: item.name,
      price: item.price,
      description: item.description,
      category: category.name,
      isAlcoholic: item.isAlcoholic,
      isSignature: item.isSignature
    };
    addToCart(cartItem);
  };

  const getRandomImages = (count: number) => {
    const shuffled = [...decorativeImages].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const CategoryCard: React.FC<{ category: DrinkCategory; index: number }> = ({ category, index }) => (
    <div
      className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-500 transform hover:scale-105 hover:shadow-xl group bg-gradient-to-br ${category.color} text-white overflow-hidden`}
      onClick={() => openCategoryPopup(category)}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white transform translate-x-8 -translate-y-8"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white transform -translate-x-4 translate-y-4"></div>
      </div>
      
      <div className="relative z-10">
        <div className="text-5xl mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
          {category.icon}
        </div>
        
        <h3 className="text-xl font-bold mb-2">{category.name}</h3>
        <p className="text-sm opacity-90 mb-4">
          {category.items.length} premium options
        </p>

        {/* Special badges */}
        <div className="flex flex-wrap gap-2">
          {category.items.some(item => item.isSignature) && (
            <span className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium">
              Signature
            </span>
          )}
          {category.items.some(item => item.isAlcoholic) && (
            <span className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium">
              21+
            </span>
          )}
        </div>
      </div>

      {/* Hover particles */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float text-white/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: '2s'
            }}
          >
            ✨
          </div>
        ))}
      </div>

      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
        <Plus className="w-4 h-4" />
      </div>
    </div>
  );

  const DrinkPopup: React.FC<{ category: DrinkCategory }> = ({ category }) => {
    const randomImages = getRandomImages(6);
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        {/* Decorative Images */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none overflow-hidden">
          {randomImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Decoration"
              className={`absolute w-24 h-24 rounded-full object-cover opacity-20 animate-float ${
                index % 2 === 0 ? 'rounded-2xl' : 'rounded-full'
              }`}
              style={{
                left: index < 3 ? `${10 + index * 5}%` : `${70 + (index - 3) * 10}%`,
                top: index < 3 ? `${20 + index * 20}%` : `${30 + (index - 3) * 25}%`,
                animationDelay: `${index * 0.5}s`,
                width: `${20 + Math.random() * 16}px`,
                height: `${20 + Math.random() * 16}px`
              }}
            />
          ))}
        </div>

        <div className={`relative w-full max-w-4xl h-[90vh] overflow-hidden rounded-3xl shadow-2xl bg-white flex flex-col`}>
          
          {/* Header */}
          <div className={`flex-shrink-0 p-4 md:p-6 border-b bg-gradient-to-r ${category.color} text-white`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-3xl md:text-4xl">{category.icon}</span>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold">{category.name}</h3>
                  <p className="text-sm opacity-90">{category.items.length} items available</p>
                </div>
              </div>
              
              <button
                onClick={closeCategoryPopup}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 hover:scale-110"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="grid gap-4 md:gap-6">
              {category.items.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 md:p-6 rounded-xl border transition-all duration-300 hover:shadow-lg cursor-pointer ${
                    hoveredItem === `${category.name}-${index}`
                      ? 'border-orange-300 bg-orange-50 scale-102 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                  onMouseEnter={() => setHoveredItem(`${category.name}-${index}`)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center flex-wrap gap-2 mb-2">
                        <h4 className="font-semibold text-gray-800 text-lg">{item.name}</h4>
                        <div className="flex items-center space-x-1">
                          {item.isSignature && (
                            <div className="flex items-center space-x-1">
                              <Sparkles className="w-4 h-4 text-purple-600" />
                              <span className="text-xs text-purple-600 font-medium">SIGNATURE</span>
                            </div>
                          )}
                          {item.isAlcoholic && (
                            <div className="flex items-center space-x-1">
                              <Wine className="w-4 h-4 text-red-500" />
                              <span className="text-xs text-red-500 font-medium">21+</span>
                            </div>
                          )}
                          {item.isSpicy && (
                            <div className="flex items-center space-x-1">
                              <Flame className="w-4 h-4 text-red-500" />
                              <span className="text-xs text-red-500 font-medium">SPICY</span>
                            </div>
                          )}
                          {!item.isAlcoholic && (
                            <div className="flex items-center space-x-1">
                              <Leaf className="w-4 h-4 text-green-600" />
                              <span className="text-xs text-green-600 font-medium">NON-ALCOHOLIC</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm md:text-base mb-3 leading-relaxed">
                        {item.description}
                      </p>
                      
                      {item.rating && (
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(item.rating!)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">({item.rating})</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between md:flex-col md:items-end gap-3">
                      <span className={`font-bold text-xl md:text-2xl ${
                        mode === 'lovable' ? 'text-pink-600' : 'text-orange-600'
                      }`}>
                        {item.price}
                      </span>
                      
                     
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="bar" className={`py-20 ${
      mode === 'lovable'
        ? 'bg-gradient-to-b from-purple-50 to-pink-50'
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
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 ${
            mode === 'lovable'
              ? 'bg-pink-100 text-pink-800'
              : 'bg-orange-100 text-orange-800'
          }`}>
            Bar & Drinks
          </div>
          
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
            mode === 'lovable' ? 'text-gray-800' : 'text-gray-900'
          }`}>
            Raise Your{' '}
            <span className={`${
              mode === 'lovable'
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600'
                : 'text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600'
            }`}>
              Glass
            </span>
          </h2>
          
          <p className={`text-lg max-w-3xl mx-auto ${
            mode === 'lovable' ? 'text-gray-600' : 'text-gray-700'
          }`}>
            From signature cocktails crafted with Indian spices to premium spirits and refreshing 
            non-alcoholic beverages, discover the perfect drink to complement your dining experience.
          </p>
        </div>

        {/* Hero Image Slider */}
        <div className="relative mb-16">
          <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            {barImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Bar ${index + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
            
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white">
                <Wine className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
                <h3 className="text-3xl md:text-4xl font-bold mb-2">Premium Bar Experience</h3>
                <p className="text-lg md:text-xl">Crafted Cocktails & Fine Spirits</p>
              </div>
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute animate-float ${
                    mode === 'lovable' ? 'text-pink-300' : 'text-yellow-300'
                  }`}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${3 + Math.random() * 2}s`
                  }}
                >
                  ✨
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center space-x-2 mt-6">
            {barImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex
                    ? mode === 'lovable'
                      ? 'bg-pink-500 scale-125'
                      : 'bg-orange-500 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
        
{/* Age Restriction Notice */}
<div className={`text-center mt-16 mb-12 p-6 rounded-2xl ${  // Added mb-12 for bottom gap
  mode === 'lovable'
    ? 'bg-pink-100 border border-pink-200'
    : 'bg-orange-100 border border-orange-200'
}`}>
  <Wine className={`w-8 h-8 mx-auto mb-3 ${
    mode === 'lovable' ? 'text-pink-600' : 'text-orange-600'
  }`} />
  <p className="text-gray-700 font-medium">
    <strong>Please Note:</strong> Alcoholic beverages are served only to guests above 21 years of age. 
    Valid ID required. We promote responsible drinking.
  </p>
</div>


{/* Features */}
<div className="flex flex-nowrap md:flex-row justify-between gap-4 sm:gap-6 md:gap-8 mb-16 px-4 md:px-0">  {/* Increased base gap to gap-4 */}
  {[
    { icon: Clock, title: 'Happy Hours', desc: '4:00 PM - 7:00 PM Daily', color: 'text-blue-600' },
    { icon: Star, title: 'Expert Bartenders', desc: 'Crafted by certified mixologists', color: 'text-yellow-600' },
    { icon: Sparkles, title: 'Premium Quality', desc: 'Only the finest spirits & ingredients', color: 'text-purple-600' }
  ].map((feature, index) => (
    <div
      key={index}
      className={`flex-shrink-0 w-full max-w-[calc(33.33%-10px)] text-center p-4 sm:p-5 md:p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${  // Increased p-4 base padding
        mode === 'lovable'
          ? 'bg-white shadow-md hover:shadow-lg border border-pink-100'
          : 'bg-white shadow-md hover:shadow-lg border border-orange-100'
      }`}
    >
      <feature.icon className={`w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-3 sm:mb-4 ${feature.color}`} />  {/* Slightly larger base icon */}
      <h4 className="font-semibold text-gray-800 text-sm md:text-base mb-2">{feature.title}</h4>  {/* Unified text-sm base size */}
      <p className="text-xs sm:text-sm text-gray-600">{feature.desc}</p>
    </div>
  ))}
</div>



      {/* Category Grid - Always 3 per row, no scroll */}
<div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-8">
  {drinkCategories.map((category, index) => (
    <CategoryCard key={category.name} category={category} index={index} />
  ))}
</div>

        {/* Age Restriction Notice */}
        <div className={`text-center mt-16 p-6 rounded-2xl ${
          mode === 'lovable'
            ? 'bg-pink-100 border border-pink-200'
            : 'bg-orange-100 border border-orange-200'
        }`}>
          <Wine className={`w-8 h-8 mx-auto mb-3 ${
            mode === 'lovable' ? 'text-pink-600' : 'text-orange-600'
          }`} />
          <p className="text-gray-700 font-medium">
            <strong>Please Note:</strong> Alcoholic beverages are served only to guests above 21 years of age. 
            Valid ID required. We promote responsible drinking.
          </p>
        </div>
      </div>

      {/* Drink Popup */}
      {selectedCategory && <DrinkPopup category={selectedCategory} />}
    </section>
  );
};

export default BarDrinks;