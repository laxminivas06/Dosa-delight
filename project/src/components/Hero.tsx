import React, { useEffect, useState } from 'react';
import { ArrowRight, Mail, Calendar, GlassWater, Utensils } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const { mode } = useTheme();
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  
  const lovableBgImages = [
    "https://w0.peakpx.com/wallpaper/275/419/HD-wallpaper-indian-food-indian-food-stock-8k-food.jpg",
     "https://img.freepik.com/free-photo/delicious-food-table_23-2150857814.jpg?semt=ais_hybrid&w=740",
      "https://media.istockphoto.com/id/1280158821/photo/diverse-keto-dishes.jpg?s=612x612&w=0&k=20&c=V0YSYORJ5rwklY3adnK5K6XU3nhup1NIT_wq8BizJx8=",
       "https://i.ytimg.com/vi/ou4zok6jkIw/maxresdefault.jpg",
        "https://img.onmanorama.com/content/dam/mm/en/food/features/images/2024/6/3/indian-tiffin.jpg?w=1120&h=583",
         "https://media.istockphoto.com/id/1396604313/photo/roasted-whole-chicken-legs-with-condiment-directly-above-photo.jpg?s=612x612&w=0&k=20&c=JDs72E-fX5SdcBQREta58T82W8zO_rFiKC7d1WwEEUE=",
          "https://media.istockphoto.com/id/1334115358/photo/cabbage-manchurian.jpg?s=612x612&w=0&k=20&c=lZvW1lWr03mQszDbx4v59IAnxWacQ_Ti275hjj18hcE=",
          
            "https://media.istockphoto.com/id/471614507/photo/indian-chicken-curry.jpg?s=612x612&w=0&k=20&c=uT5QbV1SD6Hux043sAhsm5IyVxAGzNt47r6nL1YyIQc=",
             "https://images.pexels.com/photos/340996/pexels-photo-340996.jpeg?cs=srgb&dl=pexels-isabella-mendes-107313-340996.jpg&fm=jpg",
              "https://images.pexels.com/photos/8887011/pexels-photo-8887011.jpeg"
               

  ];

  const defaultBgImages = [
    "https://images.alphacoders.com/862/862639.jpg",
     "https://harispeax.wordpress.com/wp-content/uploads/2021/08/thali.png",
      "https://media.istockphoto.com/id/1255577137/photo/traditional-indian-dishes-paes-and-misti-doi-blurred-rice-and-non-veg-bengali-meal-special.jpg?s=612x612&w=0&k=20&c=LBXP36DmRTtrnhERDj_CrfFDPOzmMuAbm-Sv89l8hAU=",
       "https://images.jdmagicbox.com/quickquotes/listicle/listicle_1689934306499_msj3n_3200x2134.jpg",
        "https://www.lekhafoods.com/media/89221/hyderabad-non-veg-biryani-recipes.jpg",
         "https://media.istockphoto.com/id/1333127675/photo/chicken-biryani-spicy-indian-malabar-biryani-hyderabadi-biryani-dum-biriyani-pulao-golden.jpg?s=612x612&w=0&k=20&c=cuof8o-8VkdKw2EuDV6XTOFjqQBobiff5ugsBwD4Erg=",
          "https://thumbs.dreamstime.com/b/south-indian-food-idli-medu-vada-dosa-sambar-coconut-chatney-tomato-chatney-south-indian-cuisine-features-idli-sambar-spicy-314167996.jpg",
           "https://t4.ftcdn.net/jpg/01/58/36/13/360_F_158361356_PsgqLvsirkpM5n9hqCn48rexuB2UWsul.jpg",
            "https://media.istockphoto.com/id/1443993866/photo/french-fries-with-ketchup-and-cocktail-sauce.jpg?s=612x612&w=0&k=20&c=URpOsc5tds8tOfxK4ZO3Tkx6mwLho7fL_pTBSNdziBU=",
             "https://t3.ftcdn.net/jpg/08/76/53/94/360_F_876539462_7OSVGDZ2DebHaFztAGcBTEXgOKykjoeH.jpg",
              "https://sc0.blr1.cdn.digitaloceanspaces.com/article/102898-sndhrcwqoh-1539346639.jpg",
               "https://eastindianrecipes.net/wp-content/uploads/2023/05/Mixed-Vegetable-Curry-Indian2-1.jpg",
                "https://media.istockphoto.com/id/579767430/photo/chicken-tikka-masala.jpg?s=612x612&w=0&k=20&c=EjeRH4r3w9qQ2WELp5qkqkUh1HbJJwRcFNNv1suOtvM=",
                 "https://i.pinimg.com/736x/ce/55/ca/ce55ca12802685c5938be7e5a8a4323b.jpg",
                  "https://media.istockphoto.com/id/1441840881/photo/appetizing-traditional-ras-malai-indian-sweet-dish-soft-paneer-balls-immersed-in-creamy-milk.jpg?s=612x612&w=0&k=20&c=9Z7seuhg0eEjvUq8ykjIftkfydKsNLsLq-smHBvZwMg="
                   
    
  ];

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

  // Facility images for Banquet, Bar, and Restaurant
  const facilityImages = {
    banquet: "https://www.shutterstock.com/shutterstock/videos/1107828539/thumb/5.jpg?ip=x480",
    bar: "https://images.pexels.com/photos/340996/pexels-photo-340996.jpeg?cs=srgb&dl=pexels-isabella-mendes-107313-340996.jpg&fm=jpg",
    restaurant: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8MHx8fDA%3D"
  };

  useEffect(() => {
    const bgInterval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % (mode === 'lovable' ? lovableBgImages.length : defaultBgImages.length));
    }, 5000);

    return () => {
      clearInterval(bgInterval);
    };
  }, [mode]);

  // Navigation functions
  const navigateToMenu = () => window.location.hash = 'menu';
  const navigateToContact = () => window.location.hash = 'contact';
  const navigateToBanquet = () => window.location.hash = 'banquet';
  const navigateToBar = () => window.location.hash = 'bar';
  const navigateToRestaurant = () => window.location.hash = 'menu';

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
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="mb-4 sm:mb-6 flex justify-center"
        >
          <motion.img
            src="https://i.postimg.cc/VvgSZGPp/dd.png"
            alt="DosaDelight Logo"
            className="w-48 h-48 sm:w-50 sm:h-50 md:w-64 md:h-64 lg:w-150 lg:h-150"
          />
        </motion.div>

        {/* Main Content */}
        <div className="w-full max-w-3xl mx-auto">
          {/* Facilities Section */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
            {/* Banquet Hall */}
            <motion.div 
              onClick={navigateToBanquet}
              whileHover={{ y: -3 }}
              className={`relative overflow-hidden p-0 rounded-lg backdrop-blur-sm flex flex-col items-center text-center cursor-pointer ${
                mode === 'lovable' 
                  ? 'bg-white/80 hover:bg-white/90' 
                  : 'bg-white/80 hover:bg-white/90'
              } transition-all duration-300 shadow-sm hover:shadow-md`}
            >
              <div className="relative w-full h-24 sm:h-28">
                <img
                  src={facilityImages.banquet}
                  alt="Banquet Hall"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <Calendar className={`w-8 h-8 ${
                    mode === 'lovable' ? 'text-purple-100' : 'text-orange-100'
                  }`} />
                </div>
              </div>
              <div className="p-2 w-full">
                <h3 className={`text-xs sm:text-sm font-bold mb-1 ${
                  mode === 'lovable' ? 'text-purple-700' : 'text-orange-600'
                }`}>
                  Banquet Halls
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-700">
                  Event Spaces
                </p>
              </div>
            </motion.div>

            {/* Bar */}
            <motion.div 
              onClick={navigateToBar}
              whileHover={{ y: -3 }}
              className={`relative overflow-hidden p-0 rounded-lg backdrop-blur-sm flex flex-col items-center text-center cursor-pointer ${
                mode === 'lovable' 
                  ? 'bg-white/80 hover:bg-white/90' 
                  : 'bg-white/80 hover:bg-white/90'
              } transition-all duration-300 shadow-sm hover:shadow-md`}
            >
              <div className="relative w-full h-24 sm:h-28">
                <img
                  src={facilityImages.bar}
                  alt="Bar"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <GlassWater className={`w-8 h-8 ${
                    mode === 'lovable' ? 'text-purple-100' : 'text-orange-100'
                  }`} />
                </div>
              </div>
              <div className="p-2 w-full">
                <h3 className={`text-xs sm:text-sm font-bold mb-1 ${
                  mode === 'lovable' ? 'text-purple-700' : 'text-orange-600'
                }`}>
                  Bar
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-700">
                  Drinks
                </p>
              </div>
            </motion.div>

            {/* Restaurant */}
            <motion.div 
              onClick={navigateToRestaurant}
              whileHover={{ y: -3 }}
              className={`relative overflow-hidden p-0 rounded-lg backdrop-blur-sm flex flex-col items-center text-center cursor-pointer ${
                mode === 'lovable' 
                  ? 'bg-white/80 hover:bg-white/90' 
                  : 'bg-white/80 hover:bg-white/90'
              } transition-all duration-300 shadow-sm hover:shadow-md`}
            >
              <div className="relative w-full h-24 sm:h-28">
                <img
                  src={facilityImages.restaurant}
                  alt="Restaurant"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <Utensils className={`w-8 h-8 ${
                    mode === 'lovable' ? 'text-purple-100' : 'text-orange-100'
                  }`} />
                </div>
              </div>
              <div className="p-2 w-full">
                <h3 className={`text-xs sm:text-sm font-bold mb-1 ${
                  mode === 'lovable' ? 'text-purple-700' : 'text-orange-600'
                }`}>
                  Dining
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-700">
                  Restaurant
                </p>
              </div>
            </motion.div>
          </div>

          {/* Delivery Partners Section */}
<motion.div 
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.3 }}
  className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg backdrop-blur-sm mx-auto w-fit ${
    mode === 'lovable' ? 'bg-white/40' : 'bg-white/40'
  }`}
>
  <h3 className={`text-center text-xs sm:text-sm font-bold mb-2 ${
    mode === 'lovable' 
      ? 'text-purple-600' 
      : 'text-orange-600'
  }`}>
    Delivery Partners:
  </h3>
  <div className="flex justify-center items-center gap-3 sm:gap-5">
    {deliveryPartners.map((partner, index) => (
      <motion.div
        key={index}
        whileHover={{ scale: 1.05 }}
       className="w-14 h-14 sm:w-24 sm:h-24 md:w-34 md:h-34 lg:w-50 lg:h-50"
      >
        <img 
          src={partner.logo} 
          alt={partner.name} 
          className="h-full w-full object-contain"
          loading="lazy"
        />
      </motion.div>
    ))}
  </div>
</motion.div>
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
            <motion.button
              onClick={navigateToMenu}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`group px-4 py-2 sm:px-6 sm:py-2 rounded-full font-medium transition-all duration-300 ${
                mode === 'lovable'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white'
                  : 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white'
              } shadow-md hover:shadow-lg text-xs sm:text-sm`}
            >
              <span className="flex items-center justify-center space-x-1 sm:space-x-2">
                <span>Explore Menu</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
            
            <motion.button
              onClick={navigateToContact}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`group px-4 py-2 sm:px-6 sm:py-2 rounded-full font-medium transition-all duration-300 ${
                mode === 'lovable'
                  ? 'bg-white text-pink-600 hover:bg-pink-50 border border-pink-200'
                  : 'bg-white/90 text-orange-600 hover:bg-orange-50 border border-orange-200'
              } shadow-md hover:shadow-lg text-xs sm:text-sm`}
            >
              <span className="flex items-center justify-center space-x-1 sm:space-x-2">
                <span>Contact Us</span>
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