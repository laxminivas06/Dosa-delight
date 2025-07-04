import React, { useState, useRef, useEffect } from 'react';
import { Wine, Sparkles, Clock, Star, Plus, Flame, Leaf, X, ChevronDown, ChevronLeft, ChevronRight, ChefHat } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

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
  image: string;
  color: string;
}

const BarDrinks: React.FC = () => {
  const { mode } = useTheme();
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number | null>(null);
  const itemsContainerRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Bar images for the slider
  const barImages = [
    'https://images.pexels.com/photos/274192/pexels-photo-274192.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1304540/pexels-photo-1304540.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800'
  ];

  // Delivery partners data
  const deliveryPartners = [
    {
      name: "Uber Eats",
      logo: "https://wishu.io/wp-content/uploads/2021/09/Uber-Eats-logo-1024x492-1.jpeg",
      width: 100
    },
    {
      name: "Door Dash",
      logo: "https://www.pngall.com/wp-content/uploads/15/Door-Dash-Logo-PNG-Images.png",
      width: 80
    },
    {
      name: "Menu Log",
      logo: "https://logowik.com/content/uploads/images/menulog7877.jpg",
      width: 80
    }
  ];

 const drinkCategories: DrinkCategory[] = [
    {
      name: 'Drinks',
      icon: '🥤',
      color: 'from-green-500 to-blue-500',
      items: [
        { name: 'Masala Tea', price: '$3.99', description: 'Traditional spiced tea blend', isSpicy: true, rating: 4.5 },
        { name: 'Mango Lassi', price: '$4.99', description: 'Creamy yogurt drink with fresh mango', rating: 4.7 },
        { name: 'Soft Drinks', price: '$3.99', description: 'Assorted carbonated beverages', rating: 4.2 },
        { name: 'Ginger Beer', price: '$4.99', description: 'Spicy non-alcoholic ginger beverage', isSpicy: true, rating: 4.4 },
        { name: 'Fruit Juices', price: '$5.99', description: 'Mango, apple, pineapple, orange, grape', rating: 4.6 }
      ],
      image: 'https://t4.ftcdn.net/jpg/01/66/87/43/360_F_166874362_kZTGg8x1JgRsSCJgO0GWhrkgSWa4ZqRA.jpg'
    },
    {
      name: 'Beers',
      icon: '🍺',
      color: 'from-yellow-500 to-amber-500',
      image: 'https://thumbs.dreamstime.com/b/bottles-famous-global-beer-brands-poznan-pol-mar-including-heineken-becks-bud-miller-corona-stella-artois-san-miguel-143170440.jpg',
      items: [
        { name: 'Corona', price: '$8.99', description: 'Light, crisp Mexican lager', isAlcoholic: true, rating: 4.5 },
        { name: 'Kingfisher (KF)', price: '$8.99', description: 'Popular Indian lager', isAlcoholic: true, rating: 4.3 },
        { name: 'Heineken', price: '$8.99', description: 'Dutch pale lager with a mild bitter taste', isAlcoholic: true, rating: 4.6 },
        { name: 'Asahi', price: '$8.99', description: 'Japanese super dry lager', isAlcoholic: true, rating: 4.5 },
        { name: 'Budweiser', price: '$8.99', description: 'Classic American lager', isAlcoholic: true, rating: 4.4 }
      ]
    },
    {
      name: 'Whisky',
      icon: '🥃',
      color: 'from-amber-700 to-amber-900',
      image: 'https://images.unsplash.com/photo-1669804803304-e476993ec594?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHdoaXNreXxlbnwwfHwwfHx8MA%3D%3D',
      items: [
        { name: 'Glenfiddich', price: '$11.99', description: 'Single malt Scotch whisky', isAlcoholic: true, rating: 4.8 },
        { name: 'Jack Daniels', price: '$8.99', description: 'Tennessee whiskey with smooth finish', isAlcoholic: true, rating: 4.7 },
        { name: 'Jonnie Walker Red', price: '$7.99', description: 'Blended Scotch whisky', isAlcoholic: true, rating: 4.5 },
        { name: 'Black Label', price: '$8.99', description: 'Aged blended Scotch whisky', isAlcoholic: true, rating: 4.7 },
        { name: 'Gold Label', price: '$11.99', description: 'Premium blended Scotch whisky', isAlcoholic: true, rating: 4.8 },
        { name: 'Chivas Regal', price: '$8.99', description: 'Rich and smooth blended Scotch', isAlcoholic: true, rating: 4.7 },
        { name: 'Jamson', price: '$8.99', description: 'Irish whiskey with light floral fragrance', isAlcoholic: true, rating: 4.6 },
        { name: 'Jim Beam', price: '$8.99', description: 'Kentucky straight bourbon whiskey', isAlcoholic: true, rating: 4.5 },
        { name: 'Makers Mark', price: '$8.99', description: 'Handcrafted Kentucky bourbon', isAlcoholic: true, rating: 4.6 },
        { name: 'Amrut', price: '$12.99', description: 'Indian single malt whisky', isAlcoholic: true, rating: 4.8 },
        { name: 'Indri', price: '$11.99', description: 'Award-winning Indian single malt', isAlcoholic: true, rating: 4.8 }
      ]
    },
    {
      name: 'Vodka',
      icon: '🍸',
      color: 'from-red-300 to-red-100',
      image: 'https://c4.wallpaperflare.com/wallpaper/195/335/811/absolut-vodka-hd-absolut-liquor-bottles-wallpaper-thumb.jpg',
      items: [
        { name: 'Absolute', price: '$8.99', description: 'Swedish premium vodka', isAlcoholic: true, rating: 4.5 },
        { name: 'Smirnoff', price: '$8.99', description: 'Classic triple distilled vodka', isAlcoholic: true, rating: 4.4 },
        { name: 'Grey Goose', price: '$8.99', description: 'French luxury vodka', isAlcoholic: true, rating: 4.7 },
        { name: 'Belvedere', price: '$9.99', description: 'Polish rye vodka, smooth and crisp', isAlcoholic: true, rating: 4.8 },
        { name: '42 Below', price: '$8.99', description: 'New Zealand vodka, pure and clean', isAlcoholic: true, rating: 4.6 }
      ]
    },
    {
      name: 'Rum',
      icon: '🏴‍☠️',
      color: 'from-amber-700 to-amber-900',
      image: 'https://c1.wallpaperflare.com/preview/311/210/541/bottle-drink-alcohol-whiskey-rum-tequila.jpg',
      items: [
        { name: 'Bacardi White', price: '$8.99', description: 'Classic white rum from Cuba', isAlcoholic: true, rating: 4.5 },
        { name: 'Malibu', price: '$8.99', description: 'Caribbean rum with coconut flavor', isAlcoholic: true, rating: 4.4 },
        { name: 'Old Monk', price: '$8.99', description: 'Iconic Indian dark rum', isAlcoholic: true, rating: 4.6 }
      ]
    },
    {
      name: 'Mocktails',
      icon: '🍹',
      color: 'from-pink-300 to-purple-300',
      image: 'https://t4.ftcdn.net/jpg/05/56/26/67/360_F_556266786_ovXgZWdbQwEpMf3kKMUVnLUNQUEnmHwa.jpg',
      items: [
        { name: 'Lemon Lime Bitter', price: '$7.99', description: 'Zesty citrus blend with a hint of bitterness', rating: 4.5 },
        { name: 'Strawberry Daiquiri', price: '$8.99', description: 'Frozen strawberries and lime in a fruity slush', rating: 4.7 },
        { name: 'Nutella Frappe', price: '$10.99', description: 'Creamy Nutella and ice cream blended together', rating: 4.8 },
        { name: 'Minty Mess', price: '$9.99', description: 'Mint, lime, and fizz - light and refreshing', rating: 4.6 },
        { name: 'Melon Surprise', price: '$8.99', description: 'Chilled melon and lime with soda splash', rating: 4.5 },
        { name: 'Jal Jeera', price: '$7.99', description: 'Spicy-tangy Indian cooler with earthy notes', isSpicy: true, rating: 4.7 },
        { name: 'Oreo Frappe', price: '$10.99', description: 'Cookies and cream blended into a rich treat', rating: 4.8 },
        { name: 'Orange & Rose Cooler', price: '$8.99', description: 'Citrus and rose combine for floral refreshment', rating: 4.6 },
        { name: 'Virgin Pina Colada', price: '$8.99', description: 'Pineapple and coconut in tropical delight', rating: 4.7 },
        { name: 'Masala Coke', price: '$7.99', description: 'Classic Coke spiced with lemon and masala', isSpicy: true, rating: 4.5 },
        { name: 'Classic Virgin Mojito', price: '$8.99', description: 'Mint and lime soda - cooling and crisp', rating: 4.6 }
      ]
    },
    {
      name: 'Cocktails',
      icon: '🍸',
      color: 'from-red-500 to-yellow-500',
      image: 'https://media.istockphoto.com/id/928321242/photo/five-colorful-gin-tonic-cocktails-in-wine-glasses-on-bar-counter-in-pup-or-restaurant.jpg?s=612x612&w=0&k=20&c=t9Lx1ouBZbH623AK9dMf5-0TWfkV4Q_1D-fyWl_Qai8=',
      items: [
        { name: 'Tequila Sunrise', price: '$14.99', description: 'Tequila, orange, and grenadine in vibrant layers', isAlcoholic: true, rating: 4.7 },
        { name: 'Mojito', price: '$14.99', description: 'Rum, lime, and mint topped with soda', isAlcoholic: true, rating: 4.8 },
        { name: 'Long Island Iced Tea', price: '$17.99', description: 'Strong mix of spirits with lemon and cola', isAlcoholic: true, rating: 4.6 },
        { name: 'Watermelon Margarita', price: '$14.99', description: 'Tequila and watermelon shaken together', isAlcoholic: true, rating: 4.7 },
        { name: 'Espresso Martini', price: '$14.99', description: 'Vodka and espresso shaken into bold lift', isAlcoholic: true, rating: 4.8 },
        { name: 'Cosmopolita', price: '$14.99', description: 'Cinnamon gin with ginger soda and spices', isAlcoholic: true, isSpicy: true, rating: 4.7 },
        { name: 'Blue Cloud Sour', price: '$14.99', description: 'Blue vodka, lychee, and coconut blend', isAlcoholic: true, rating: 4.6 },
        { name: 'Masala Old Fashioned', price: '$14.99', description: 'Whiskey meets Indian spices', isAlcoholic: true, isSpicy: true, rating: 4.8 },
        { name: 'Orange & Rose Cosmo', price: '$14.99', description: 'Citrus vodka and cranberry with floral touch', isAlcoholic: true, rating: 4.7 },
        { name: 'Corona Sunrise', price: '$14.99', description: 'Corona, tequila, and orange with grenadine', isAlcoholic: true, rating: 4.6 },
        { name: 'Moscow Mule', price: '$14.99', description: 'Vodka, lime, and ginger beer in copper mug', isAlcoholic: true, rating: 4.7 }
      ]
    },
    {
      name: 'Wines',
      icon: '🍷',
      color: 'from-purple-700 to-red-700',
      image: 'https://assets.gqindia.com/photos/5cdc688f306c1c56eb6e7eb1/16:9/w_2560%2Cc_limit/best-wines-in-india-starting-rs-295.jpg',
      items: [
        { name: 'Red Wine (Shiraz) - Glass', price: '$8.99', description: 'Rich and spicy Shiraz red wine by the glass', isAlcoholic: true, rating: 4.6 },
        { name: 'Red Wine (Shiraz) - Bottle', price: '$45.99', description: 'Full bottle of Shiraz red wine', isAlcoholic: true, rating: 4.6 },
        { name: 'Merlot - Glass', price: '$8.99', description: 'Smooth and fruity Merlot by the glass', isAlcoholic: true, rating: 4.7 },
        { name: 'Merlot - Bottle', price: '$45.99', description: 'Full bottle of Merlot red wine', isAlcoholic: true, rating: 4.7 }
      ]
    }
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % barImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const openCategory = (index: number) => {
    setSelectedCategoryIndex(index);
    setTimeout(() => {
      if (itemsContainerRef.current) {
        itemsContainerRef.current.scrollTop = 0;
      }
    }, 10);
  };

  const closeCategory = () => {
    setSelectedCategoryIndex(null);
  };

  const nextCategory = () => {
    if (selectedCategoryIndex !== null && selectedCategoryIndex < drinkCategories.length - 1) {
      openCategory(selectedCategoryIndex + 1);
    }
  };

  const prevCategory = () => {
    if (selectedCategoryIndex !== null && selectedCategoryIndex > 0) {
      openCategory(selectedCategoryIndex - 1);
    }
  };

  const DrinkItemCard: React.FC<{ item: DrinkItem }> = ({ item }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="p-4 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex justify-between items-start gap-2">
        <div>
          <div className="flex items-center flex-wrap gap-1 mb-1">
            <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{item.name}</h3>
            <div className="flex items-center space-x-1">
              {item.isSignature && <Sparkles className="w-3 h-3 text-purple-600" />}
              {item.isAlcoholic && <Wine className="w-3 h-3 text-red-500" />}
              {item.isSpicy && <Flame className="w-3 h-3 text-red-500" />}
              {!item.isAlcoholic && <Leaf className="w-3 h-3 text-green-600" />}
            </div>
          </div>
          
          <p className="text-gray-600 text-xs sm:text-sm mb-2">{item.description}</p>
          
          {item.rating && (
            <div className="flex items-center space-x-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(item.rating!) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">({item.rating})</span>
            </div>
          )}
        </div>
        <span className={`font-bold text-sm sm:text-base ${
          mode === 'lovable' ? 'text-pink-600' : 'text-orange-600'
        }`}>
          {item.price}
        </span>
      </div>
    </motion.div>
  );

  const CategoryCard: React.FC<{ category: DrinkCategory; index: number }> = ({ category, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative rounded-2xl cursor-pointer overflow-hidden group aspect-square"
      onClick={() => openCategory(index)}
    >
      <div className="relative h-full w-full">
        <img 
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center p-4">
          <div className="bg-white/90 px-3 py-1 rounded-full mb-2 w-full max-w-[90%] text-center">
            <h3 className="font-bold text-sm sm:text-base text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis">
              {category.name}
            </h3>
          </div>
          <div className="flex items-center bg-white/90 px-2 py-1 rounded-full">
            <span className="text-xs font-medium">Tap to explore</span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="bar" className={`py-12 md:py-20 ${
      mode === 'lovable'
        ? 'bg-gradient-to-b from-purple-50 to-pink-50'
        : 'bg-gradient-to-b from-white to-gray-50'
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
          className="w-48 h-auto sm:w-50 md:w-64"
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
      </motion.div>

      {/* Delivery Partners Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className={`mb-8 mx-auto px-4 w-full max-w-3xl ${
          mode === 'lovable' ? 'bg-white/40' : 'bg-white/40'
        } rounded-lg backdrop-blur-sm p-4`}
      >
        <h3 className={`text-center text-sm sm:text-base font-bold mb-3 ${
          mode === 'lovable' ? 'text-purple-600' : 'text-orange-600'
        }`}>
          Available on:
        </h3>
        <div className="flex justify-center items-center gap-4 sm:gap-6">
          {deliveryPartners.map((partner, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="h-10 sm:h-12"
            >
              <img 
                src={partner.logo} 
                alt={partner.name}
                className="h-full w-auto object-contain"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Hero Image Slider */}
      <div className="relative mb-6 sm:mb-10">
        <div className="relative h-48 sm:h-80 rounded-xl overflow-hidden shadow-lg">
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
            <div className="text-center text-white px-4">
              <Wine className="w-10 h-10 mx-auto mb-2 text-yellow-400" />
              <h3 className="text-xl sm:text-2xl font-bold">Premium Bar Experience</h3>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-2 mt-3">
          {barImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImageIndex
                  ? mode === 'lovable'
                    ? 'bg-pink-500 scale-125'
                    : 'bg-orange-500 scale-125'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Age Notice */}
      <div className={`text-center mb-6 p-3 rounded-lg ${
        mode === 'lovable'
          ? 'bg-pink-100 border border-pink-200'
          : 'bg-orange-100 border border-orange-200'
      }`}>
        <Wine className={`w-5 h-5 mx-auto mb-1 ${
          mode === 'lovable' ? 'text-pink-600' : 'text-orange-600'
        }`} />
        <p className="text-xs sm:text-sm text-gray-700">
          <strong>Note:</strong> Alcohol served only to guests 21+. Valid ID required.
        </p>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <div className={`inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-3 ${
            mode === 'lovable'
              ? 'bg-pink-100 text-pink-800'
              : 'bg-orange-100 text-orange-800'
          }`}>
            Bar & Drinks
          </div>
          
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 ${
            mode === 'lovable' ? 'text-gray-800' : 'text-gray-900'
          }`}>
            <span className="block sm:inline">Raise Your </span>
            <span className={`${
              mode === 'lovable'
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600'
                : 'text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600'
            }`}>
              Glass
            </span>
          </h2>
          
          <p className={`text-sm sm:text-base md:text-lg max-w-2xl mx-auto ${
            mode === 'lovable' ? 'text-gray-600' : 'text-gray-700'
          }`}>
            From signature cocktails to premium spirits and refreshing beverages
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 sm:mb-8">
          {[
            { icon: Clock, title: 'Happy Hours', desc: '4-7PM Daily', color: 'text-blue-600' },
            { icon: Star, title: 'Expert Mixologists', color: 'text-yellow-600' },
            { icon: Sparkles, title: 'Premium Quality', color: 'text-purple-600' }
          ].map((feature, index) => (
            <div
              key={index}
              className={`p-2 sm:p-3 rounded-lg text-center ${
                mode === 'lovable'
                  ? 'bg-white shadow-sm border border-pink-100'
                  : 'bg-white shadow-sm border border-orange-100'
              }`}
            >
              <feature.icon className={`w-5 h-5 mx-auto mb-1 ${feature.color}`} />
              <h4 className="font-medium text-gray-800 text-xs sm:text-sm">{feature.title}</h4>
              {feature.desc && <p className="text-xs text-gray-600">{feature.desc}</p>}
            </div>
          ))}
        </div>

        {/* Category Grid */}
        {selectedCategoryIndex === null && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
            {drinkCategories.map((category, index) => (
              <CategoryCard key={category.name} category={category} index={index} />
            ))}
          </div>
        )}

        {/* Category Items View */}
        <AnimatePresence>
          {selectedCategoryIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full min-h-[500px] bg-white rounded-3xl shadow-xl overflow-hidden"
            >
              {/* Category Header */}
              <div className={`sticky top-0 z-10 p-4 ${
                mode === 'lovable'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600'
                  : 'bg-gradient-to-r from-orange-500 to-red-600'
              } text-white`}>
                <div className="flex items-center justify-between">
                  <button
                    onClick={closeCategory}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{drinkCategories[selectedCategoryIndex].icon}</span>
                    <h3 className="text-xl font-bold">{drinkCategories[selectedCategoryIndex].name}</h3>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={prevCategory}
                      disabled={selectedCategoryIndex === 0}
                      className={`p-2 rounded-full transition-colors ${
                        selectedCategoryIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'bg-white/20 hover:bg-white/30'
                      }`}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextCategory}
                      disabled={selectedCategoryIndex === drinkCategories.length - 1}
                      className={`p-2 rounded-full transition-colors ${
                        selectedCategoryIndex === drinkCategories.length - 1 ? 'opacity-50 cursor-not-allowed' : 'bg-white/20 hover:bg-white/30'
                      }`}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div 
                ref={itemsContainerRef}
                className="h-[calc(100%-60px)] overflow-y-auto p-4"
              >
                <div className="grid gap-4">
                  {drinkCategories[selectedCategoryIndex].items.map((item, index) => (
                    <DrinkItemCard key={index} item={item} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chef's Special */}
        {selectedCategoryIndex === null && (
          <div className="text-center mt-8 md:mt-12">
            <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${
              mode === 'lovable'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600'
                : 'bg-gradient-to-r from-orange-500 to-red-600'
            } text-white shadow-lg hover:scale-105 transition-transform duration-300`}>
              <ChefHat className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-medium">Try our Signature Cocktails!</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BarDrinks;