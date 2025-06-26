import React, { useState, useEffect } from 'react';
import { ChefHat, Star, Flame, Leaf, X, Hand } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

interface MenuItem {
  name: string;
  price: string;
  description: string;
  isSpicy?: boolean;
  isVeg?: boolean;
  rating?: number;
  subcategory?: string;
}

interface MenuCategory {
  name: string;
  icon: string;
  image: string;
  subcategories?: string[];
  items: MenuItem[];
}

const Menu: React.FC = () => {
  const { mode } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [activeSubcategory, setActiveSubcategory] = useState<string>('All');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuCategories: MenuCategory[] = [
   {
  "name": "Snacks & Chaats",
  "icon": "🥨",
   "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  "items": [
    {
      "name": "Samosa",
      "price": "$8.99",
      "description": "Pastry filled with potato stuff and deep fried in oil and served with tamarind sauce",
      "isVeg": true
    },
    {
      "name": "Mirchi Bhajji",
      "price": "$9.99",
      "description": "Green chili battered with besan and rice flour and deep fried and served with variety of chutney",
      "isSpicy": true,
      "isVeg": true
    },
    {
      "name": "Cut Mirchi",
      "price": "$10.99",
      "description": "Fried Green Chili cutlets battered with besan and ajwain and served with peanut and onion",
      "isSpicy": true,
      "isVeg": true
    },
    {
      "name": "Pav Baji",
      "price": "$12.99",
      "description": "Spicy mix of mix vegetables and potato cooked in butter, Ginger and garlic served with Bun",
      "isVeg": true
    },
    {
      "name": "Chole Bathure",
      "price": "$19.99",
      "description": "Spicy chickpeas (choley) served with deep-fried bread (bhature)",
      "isVeg": true
    },
    {
      "name": "Bhel Puri",
      "price": "$12.99",
      "description": "Unique flavors of roasted rice puff, peanuts, mint, tamarind chutney and sev",
      "isVeg": true
    },
    {
      "name": "Masala Puri",
      "price": "$12.99",
      "description": "Hallow balls filled with chickpeas masala, sweet, mint, tamarind and beetroot sauce and topped with Sev",
      "isVeg": true
    },
    {
      "name": "Dahi Puri",
      "price": "$13.99",
      "description": "Hallow balls filled with three unique sauces and served with Sev",
      "isVeg": true
    },
    {
      "name": "Pani Puri",
      "price": "$10.99",
      "description": "Hallow balls filled with potato and chickpea stuff, served with mint and coriander flavor water",
      "isVeg": true
    },
    {
      "name": "Papri Chat",
      "price": "$13.99",
      "description": "Crispy papri with diced tomato and onion and topped with three sauces and mild chilli and chat masala",
      "isVeg": true
    },
    {
      "name": "Aloo Tikki chat",
      "price": "$13.99",
      "description": "Deep fried Tikki served with diced tomato, onion and topped with three sauces, mild chilli & chat masala",
      "isVeg": true
    },
    {
      "name": "Samosa Chat",
      "price": "$13.99",
      "description": "Samosa crushed and served with diced tomato, onion & topped with three sauces, mild chilli & chat masala",
      "isVeg": true
    },
    {
      "name": "Dahi Balla",
      "price": "$13.99",
      "description": "Fried lentil fritters or pakode, prepared with thick curd, chutneys, spice powders and other toppings",
      "isVeg": true
    }
  ]
},
    {
      name: 'Soup\'s',
      icon: '🍲',
       "image": "https://t3.ftcdn.net/jpg/02/45/00/72/360_F_245007231_vDwC9ceDNtjUCA5YDuq6mPDRG5ocPg0B.jpg",
      items: [
        { name: 'Sweet Corn (Veg)', price: '$5.99', description: 'Creamy sweet corn soup', isVeg: true },
        { name: 'Sweet Corn (Chicken)', price: '$6.99', description: 'Creamy sweet corn soup with chicken' },
        { name: 'Hot and Sour (Veg)', price: '$5.99', description: 'Spicy and tangy vegetable soup', isSpicy: true, isVeg: true },
        { name: 'Hot and Sour (Chicken)', price: '$6.99', description: 'Spicy and tangy chicken soup', isSpicy: true }
      ]
    },
    {
      name: 'Kid\'s Menu',
      icon: '👶',
       "image": "https://www.cubesnjuliennes.com/wp-content/uploads/2025/05/Homemade-Chicken-Nuggets-Recipe.jpg",
      items: [
        { name: 'Chicken Nuggets', price: '$10.99', description: 'Crispy chicken nuggets with fries' },
        { name: 'French Fries', price: '$6.99', description: 'Crispy golden fries', isVeg: true },
        { name: 'Nutella Dosa', price: '$8.99', description: 'Sweet dosa with Nutella spread', isVeg: true },
        { name: 'Nutella Naan', price: '$4.99', description: 'Naan bread with Nutella', isVeg: true }
      ]
    },
    {
      name: 'Idli and Vada',
      icon: '🥣',
       "image": "https://t3.ftcdn.net/jpg/05/33/82/34/360_F_533823407_h0wVzQub7h3b6OZVWE44BPf5E6SHndxI.jpg",
      items: [
        { name: 'Idly', price: '$9.99', description: 'Steamed rice cakes', isVeg: true },
        { name: 'Vada', price: '$9.99', description: 'Fried lentil donuts', isVeg: true },
        { name: 'Ghee Idly', price: '$10.99', description: 'Idly with ghee topping', isVeg: true },
        { name: 'Sambar Idly', price: '$10.99', description: 'Idly served with sambar', isVeg: true },
        { name: 'Idly and Vada', price: '$10.99', description: 'Combination of idly and vada', isVeg: true },
        { name: 'Ghee Podi Idly', price: '$11.99', description: 'Idly with ghee and spice powder', isVeg: true },
        { name: 'Sambar Idly/Vada/Idly and Vada', price: '$12.99', description: 'Idly and/or vada served with sambar', isVeg: true }
      ]
    },
    {
      name: 'Tandoor',
      icon: '🔥',
       "image": "https://media.istockphoto.com/id/995903748/photo/smoked-and-spicy-tandoori-chicken-grilling-with-smoke.jpg?s=612x612&w=0&k=20&c=xq_apF2Osk5HYFOgBS9crRi1puLozxyGWFuCUV0mhYg=",
      subcategories: ['Veg', 'Non-Veg'],
      items: [
        { name: 'Panner Tikka', price: '$19.99', description: 'Cubes of fresh cottage cheese marinated with spices and capsicum and onion and cooked in tandoor', subcategory: 'Veg', isVeg: true },
        { name: 'Achaari Panner Tikka', price: '$20.99', description: 'Traditional North Indian dish simmered with veg mix pickling spices and yogurt', subcategory: 'Veg', isVeg: true },
        { name: 'Soya chaap Tikka', price: '$20.99', description: 'Soya chunks marinated with yogurt and spices and cooked in Tandoor', subcategory: 'Veg', isVeg: true },
        { name: 'Malai Soya chaap Tikka', price: '$20.99', description: 'Crispy soya chaap tossed in our cream sauce and cooked in tandoor', subcategory: 'Veg', isVeg: true },
        { name: 'Chicken Tikka', price: '$21.99', description: 'Juicy Chicken Thigh Fillet marinated overnight and cooked in tandoor in smoky flavour', subcategory: 'Non-Veg' },
        { name: 'Malai chicken Tikka', price: '$21.99', description: 'Chicken Pieces marinated with creamy sauce and cheese, then cooked in Tandoor', subcategory: 'Non-Veg' },
        { name: 'Seekh kabab', price: '$21.99', description: 'Lamb Mince infused with mint, coriander and cheese and different variety of masala and cooked in our tandoor', subcategory: 'Non-Veg' },
        { name: 'Tandoori chicken (Full)', price: '$26.99', description: 'Whole chicken Marinated with yogurt and spices overnight and cooked in our tandoor', subcategory: 'Non-Veg' },
        { name: 'Tandoori chicken (Half)', price: '$18.99', description: 'Half chicken Marinated with yogurt and spices overnight and cooked in our tandoor', subcategory: 'Non-Veg' },
        { name: 'Tandoori Prawns (10 Pieces)', price: '$22.99', description: 'Tiger Prawns marinated with yogurt and special spices and cooked in charcoal grill with smoky flavour', subcategory: 'Non-Veg' },
        { name: 'Meat platter', price: '$33.99', description: 'Mix of all 4 different Non-Veg kebabs and served with Naan Bread', subcategory: 'Non-Veg' }
      ]
    },
    {
  name: "Indo-Chinese",
  icon: "🥢",
   image: "https://kohinoor-joy.com/wp-content/uploads/2020/01/indo-chinese-food.jpg",
  subcategories: ["Veg Starters", "Sea Food Starters", "Non-Veg Starters"],
  items: [
    {
      "name": "Manchurian (Veg)",
      "price": "$19.99",
      "description": "Vegetable balls, Batter fried and tossed with garlic, spring onion and Manchurian sauce",
      "subcategory": "Veg Starters",
      "isVeg": true
    },
    {
      "name": "Manchurian (Paneer)",
      "price": "$19.99",
      "description": "Paneer balls, Batter fried and tossed with garlic, spring onion and Manchurian sauce",
      "subcategory": "Veg Starters",
      "isVeg": true
    },
    {
      "name": "Manchurian (Gobhi)",
      "price": "$19.99",
      "description": "Cauliflower balls, Batter fried and tossed with garlic, spring onion and Manchurian sauce",
      "subcategory": "Veg Starters",
      "isVeg": true
    },
    {
      "name": "Manchurian (Mushroom)",
      "price": "$19.99",
      "description": "Mushroom balls, Batter fried and tossed with garlic, spring onion and Manchurian sauce",
      "subcategory": "Veg Starters",
      "isVeg": true
    },
    {
      "name": "Manchurian (Baby corn)",
      "price": "$19.99",
      "description": "Baby corn balls, Batter fried and tossed with garlic, spring onion and Manchurian sauce",
      "subcategory": "Veg Starters",
      "isVeg": true
    },
    {
      "name": "Chilli Gobhi",
      "price": "$19.99",
      "description": "Batter fried cauliflower tossed with onion, capsicum and sautéed with chilli sauce",
      "subcategory": "Veg Starters",
      "isVeg": true,
      "isSpicy": true
    },
    {
      "name": "Chilli Paneer",
      "price": "$19.99",
      "description": "Batter fried paneer tossed with onion, capsicum and sautéed with chilli sauce",
      "subcategory": "Veg Starters",
      "isVeg": true,
      "isSpicy": true
    },
    {
      "name": "Chilli Baby corn",
      "price": "$19.99",
      "description": "Batter fried baby corn tossed with onion, capsicum and sautéed with chilli sauce",
      "subcategory": "Veg Starters",
      "isVeg": true,
      "isSpicy": true
    },
    {
      "name": "Chilli Mushroom",
      "price": "$19.99",
      "description": "Batter fried mushroom tossed with onion, capsicum and sautéed with chilli sauce",
      "subcategory": "Veg Starters",
      "isVeg": true,
      "isSpicy": true
    },
    {
      "name": "65 Gobhi",
      "price": "$20.99",
      "description": "Batter fried cauliflower tossed with curry leaves, garlic and sautéed with 65 sauce",
      "subcategory": "Veg Starters",
      "isVeg": true,
      "isSpicy": true
    },
    {
      "name": "65 Paneer",
      "price": "$20.99",
      "description": "Batter fried paneer tossed with curry leaves, garlic and sautéed with 65 sauce",
      "subcategory": "Veg Starters",
      "isVeg": true,
      "isSpicy": true
    },
    {
      "name": "65 Baby corn",
      "price": "$20.99",
      "description": "Batter fried baby corn tossed with curry leaves, garlic and sautéed with 65 sauce",
      "subcategory": "Veg Starters",
      "isVeg": true,
      "isSpicy": true
    },
    {
      "name": "65 Mushroom",
      "price": "$20.99",
      "description": "Batter fried mushroom tossed with curry leaves, garlic and sautéed with 65 sauce",
      "subcategory": "Veg Starters",
      "isVeg": true,
      "isSpicy": true
    },
    {
      "name": "555 Gobhi",
      "price": "$20.99",
      "description": "Batter fried cauliflower dumplings sauteed with hot and spicy sauce",
      "subcategory": "Veg Starters",
      "isVeg": true,
      "isSpicy": true
    },
    {
      "name": "555 Paneer",
      "price": "$20.99",
      "description": "Batter fried paneer dumplings sauteed with hot and spicy sauce",
      "subcategory": "Veg Starters",
      "isVeg": true,
      "isSpicy": true
    },
    {
      "name": "555 Baby corn",
      "price": "$20.99",
      "description": "Batter fried baby corn dumplings sauteed with hot and spicy sauce",
      "subcategory": "Veg Starters",
      "isVeg": true,
      "isSpicy": true
    },
    {
      "name": "555 Mushroom",
      "price": "$20.99",
      "description": "Batter fried mushroom dumplings sauteed with hot and spicy sauce",
      "subcategory": "Veg Starters",
      "isVeg": true,
      "isSpicy": true
    },
    {
      "name": "Crispy Baby corn",
      "price": "$20.99",
      "description": "Deep fried battered baby corn tossed with capsicum, onion, cashew, garlic, and curry leaves",
      "subcategory": "Veg Starters",
      "isVeg": true
    },
    {
      "name": "Crispy Mushroom",
      "price": "$20.99",
      "description": "Deep fried battered mushroom tossed with capsicum, onion, cashew, garlic, and curry leaves",
      "subcategory": "Veg Starters",
      "isVeg": true
    },
    {
      "name": "Pepper Paneer Fry",
      "price": "$20.99",
      "description": "Fusion dish of cottage Cheese tossed with Pepper and Spices",
      "subcategory": "Veg Starters",
      "isVeg": true,
      "isSpicy": true
    },
    {
      "name": "Pepper Mushroom Fry",
      "price": "$20.99",
      "description": "Fusion dish of mushroom tossed with Pepper and Spices",
      "subcategory": "Veg Starters",
      "isVeg": true,
      "isSpicy": true
    },
    {
      "name": "Paneer Pakora",
      "price": "$20.99",
      "description": "Paneer fried with special masala batter and curry leaves",
      "subcategory": "Veg Starters",
      "isVeg": true
    },
    {
      "name": "Baby corn Pakora",
      "price": "$20.99",
      "description": "Baby corn fried with special masala batter and curry leaves",
      "subcategory": "Veg Starters",
      "isVeg": true
    },
    {
      "name": "Mushroom Pakora",
      "price": "$20.99",
      "description": "Mushroom fried with special masala batter and curry leaves",
      "subcategory": "Veg Starters",
      "isVeg": true
    },
    {
      "name": "Schezwan Gobhi",
      "price": "$20.99",
      "description": "Battered cauliflower tossed with diced onions and schezwan sauce",
      "subcategory": "Veg Starters",
      "isVeg": true,
      "isSpicy": true
    },
    {
      "name": "Schezwan Paneer",
      "price": "$20.99",
      "description": "Battered paneer tossed with diced onions and schezwan sauce",
      "subcategory": "Veg Starters",
      "isVeg": true,
      "isSpicy": true
    },
    {
      "name": "65 Fish",
      "price": "$22.99",
      "description": "Fried pieces of Fish tossed with curry leaves and garlic and sautéed with 65 sauce",
      "subcategory": "Sea Food Starters",
      "isSpicy": true
    },
    {
      "name": "65 Prawn",
      "price": "$22.99",
      "description": "Fried pieces of Prawn tossed with curry leaves and garlic and sautéed with 65 sauce",
      "subcategory": "Sea Food Starters",
      "isSpicy": true
    },
    {
      "name": "Chilli Fish",
      "price": "$22.99",
      "description": "Fried Fish tossed with onion and capsicum and sautéed with chilli sauce",
      "subcategory": "Sea Food Starters",
      "isSpicy": true
    },
    {
      "name": "Chilli Prawn",
      "price": "$22.99",
      "description": "Fried Prawn tossed with onion and capsicum and sautéed with chilli sauce",
      "subcategory": "Sea Food Starters",
      "isSpicy": true
    },
    {
      "name": "Fish Pakora",
      "price": "$22.99",
      "description": "Fish fried with special masala batter and curry leaves",
      "subcategory": "Sea Food Starters"
    },
    {
      "name": "Prawn Pakora",
      "price": "$22.99",
      "description": "Prawn fried with special masala batter and curry leaves",
      "subcategory": "Sea Food Starters"
    },
    {
      "name": "Crispy Prawns",
      "price": "$22.99",
      "description": "Crispy fried Prawns tossed with bell peppers, cashew and tangy sauce",
      "subcategory": "Sea Food Starters"
    },
    {
      "name": "Chicken Manchurian (Dry)",
      "price": "$21.99",
      "description": "Fried Chicken tossed with garlic, spring onion and Manchurian sauce",
      "subcategory": "Non-Veg Starters",
      "isSpicy": true
    },
    {
      "name": "Chicken Manchurian (Gravy)",
      "price": "$21.99",
      "description": "Fried Chicken tossed with garlic, spring onion and Manchurian sauce in gravy",
      "subcategory": "Non-Veg Starters",
      "isSpicy": true
    },
    {
      "name": "Chili Chicken (Dry)",
      "price": "$21.99",
      "description": "Fried Chicken tossed with onion and capsicum and sautéed with chilli sauce",
      "subcategory": "Non-Veg Starters",
      "isSpicy": true
    },
    {
      "name": "Chili Chicken (Gravy)",
      "price": "$21.99",
      "description": "Fried Chicken tossed with onion and capsicum and sautéed with chilli sauce in gravy",
      "subcategory": "Non-Veg Starters",
      "isSpicy": true
    },
    {
      "name": "Chili Goat (Dry)",
      "price": "$22.99",
      "description": "Fried Goat tossed with onion and capsicum and sautéed with chilli sauce",
      "subcategory": "Non-Veg Starters",
      "isSpicy": true
    },
    {
      "name": "Chili Goat (Gravy)",
      "price": "$22.99",
      "description": "Fried Goat tossed with onion and capsicum and sautéed with chilli sauce in gravy",
      "subcategory": "Non-Veg Starters",
      "isSpicy": true
    },
    {
      "name": "Chicken 65 (Dry)",
      "price": "$21.99",
      "description": "Fried Chicken tossed with curry leaves and garlic and sautéed with 65 sauce",
      "subcategory": "Non-Veg Starters",
      "isSpicy": true
    },
    {
      "name": "Chicken 65 (Gravy)",
      "price": "$21.99",
      "description": "Fried Chicken tossed with curry leaves and garlic and sautéed with 65 sauce in gravy",
      "subcategory": "Non-Veg Starters",
      "isSpicy": true
    },
    {
      "name": "Chicken 555",
      "price": "$21.99",
      "description": "Fried Chicken tossed with hot and spicy sauce",
      "subcategory": "Non-Veg Starters",
      "isSpicy": true
    },
    {
      "name": "Schezwan Chicken",
      "price": "$21.99",
      "description": "Fried Chicken tossed with diced onions and schezwan sauce",
      "subcategory": "Non-Veg Starters",
      "isSpicy": true
    },
    {
      "name": "Ginger Chicken",
      "price": "$21.99",
      "description": "Fried Chicken tossed with fresh Ginger and slice onion then flavoured with ginger sauce",
      "subcategory": "Non-Veg Starters",
      "isSpicy": true
    },
    {
      "name": "Karivepaku Chicken",
      "price": "$21.99",
      "description": "Fried chicken tossed with onion, spicy curry leaves powder, lemon, and garlic",
      "subcategory": "Non-Veg Starters",
      "isSpicy": true
    },
    {
      "name": "Pepper Chicken",
      "price": "$21.99",
      "description": "Fried Chicken tossed with bell peppers, onion, and spicy sauce",
      "subcategory": "Non-Veg Starters",
      "isSpicy": true
    },
    {
      "name": "Madras Chicken 65",
      "price": "$21.99",
      "description": "Chicken marinated with yogurt, spices, and hot sauce overnight and deep Fried",
      "subcategory": "Non-Veg Starters",
      "isSpicy": true
    },
    {
      "name": "Crispy Goat",
      "price": "$22.99",
      "description": "Crispy fried goat slices tossed with bell peppers, cashew, and tangy sauce",
      "subcategory": "Non-Veg Starters"
    },
    {
      "name": "Chicken Lollipops",
      "price": "$20.99",
      "description": "Chicken Drumsticks marinated with special masala and deep fried in oil and served with onions",
      "subcategory": "Non-Veg Starters"
    },
    {
      "name": "Chicken Pakora",
      "price": "$20.99",
      "description": "Thigh pieces of Chicken are deep fried with special battered masala and served with mint sauce",
      "subcategory": "Non-Veg Starters"
    }
  ]
},
   {
  "name": "Dosa",
  "icon": "🥞",
   "image": "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?cs=srgb&dl=pexels-saveurssecretes-5560763.jpg&fm=jpg",
  "subcategories": ["Veg", "Non-Veg", "70 MM's Dosa", "Ravva Dosa", "Cheese Series"],
  "items": [
    {
      "name": "Plain Dosa",
      "price": "$10.99",
      "description": "Classic crispy dosa",
      "subcategory": "Veg",
      "isVeg": true
    },
    {
      "name": "Paper Dosa",
      "price": "$12.99",
      "description": "Extra thin and crispy dosa",
      "subcategory": "Veg",
      "isVeg": true
    },
    {
      "name": "Ghee Roast Dosa",
      "price": "$11.99",
      "description": "Dosa roasted with ghee for rich flavor",
      "subcategory": "Veg",
      "isVeg": true
    },
    {
      "name": "Onion Dosa",
      "price": "$15.99",
      "description": "Dosa topped with seasoned onions",
      "subcategory": "Veg",
      "isVeg": true
    },
    {
      "name": "Spicy Karam Dosa",
      "price": "$14.99",
      "description": "Dosa with spicy Andhra-style chutney",
      "subcategory": "Veg",
      "isVeg": true,
      "isSpicy": true
    },
    {
      "name": "Ghee Karam Dosa",
      "price": "$16.99",
      "description": "Ghee-roasted dosa with spicy chutney",
      "subcategory": "Veg",
      "isVeg": true,
      "isSpicy": true
    },
    {
      "name": "Masala Dosa",
      "price": "$16.99",
      "description": "Crispy dosa with potato filling",
      "subcategory": "Veg",
      "isVeg": true
    },
    {
      "name": "Mysore Masala Dosa",
      "price": "$17.99",
      "description": "Spicy red chutney with potato masala",
      "subcategory": "Veg",
      "isVeg": true,
      "isSpicy": true
    },
    {
      "name": "Paneer Dosa",
      "price": "$19.99",
      "description": "Dosa with spiced cottage cheese",
      "subcategory": "Veg",
      "isVeg": true
    },
    {
      "name": "Palak Paneer Dosa",
      "price": "$19.99",
      "description": "Dosa with spinach and paneer filling",
      "subcategory": "Veg",
      "isVeg": true
    },
    {
      "name": "Butter Paneer Dosa",
      "price": "$19.99",
      "description": "Dosa with butter paneer masala",
      "subcategory": "Veg",
      "isVeg": true
    },
    {
      "name": "Cheese Dosa",
      "price": "$14.99",
      "description": "Dosa with melted cheese",
      "subcategory": "Veg",
      "isVeg": true
    },
    {
      "name": "Chicken Dosa",
      "price": "$19.99",
      "description": "Dosa filled with spicy chicken curry",
      "subcategory": "Non-Veg"
    },
    {
      "name": "Lamb Dosa",
      "price": "$19.99",
      "description": "Dosa filled with spicy lamb curry",
      "subcategory": "Non-Veg"
    },
    {
      "name": "Chicken 65 Dosa",
      "price": "$19.99",
      "description": "Dosa with spicy Chicken 65 filling",
      "subcategory": "Non-Veg",
      "isSpicy": true
    },
    {
      "name": "Butter Chicken Dosa",
      "price": "$20.99",
      "description": "Dosa with butter chicken filling",
      "subcategory": "Non-Veg"
    },
    {
      "name": "Egg Dosa",
      "price": "$13.99",
      "description": "Dosa with egg coating",
      "subcategory": "Non-Veg"
    },
    {
      "name": "Egg Karam Dosa",
      "price": "$14.99",
      "description": "Spicy egg dosa",
      "subcategory": "Non-Veg",
      "isSpicy": true
    },
    {
      "name": "70 mm Plain Dosa",
      "price": "$15.99",
      "description": "Extra large plain dosa",
      "subcategory": "70 MM's Dosa",
      "isVeg": true
    },
    {
      "name": "70 mm Onion Dosa",
      "price": "$17.99",
      "description": "Extra large dosa with onions",
      "subcategory": "70 MM's Dosa",
      "isVeg": true
    },
    {
      "name": "70 mm Podi Dosa",
      "price": "$17.99",
      "description": "Extra large dosa with spicy podi powder",
      "subcategory": "70 MM's Dosa",
      "isVeg": true,
      "isSpicy": true
    },
    {
      "name": "70 mm Ghee Dosa",
      "price": "$20.99",
      "description": "Extra large ghee-roasted dosa",
      "subcategory": "70 MM's Dosa",
      "isVeg": true
    },
    {
      "name": "70 mm Paneer Dosa",
      "price": "$20.99",
      "description": "Extra large dosa with paneer filling",
      "subcategory": "70 MM's Dosa",
      "isVeg": true
    },
    {
      "name": "70 mm Chicken Dosa",
      "price": "$19.99",
      "description": "Extra large dosa with chicken filling",
      "subcategory": "70 MM's Dosa"
    },
    {
      "name": "70 mm Lamb Dosa",
      "price": "$19.99",
      "description": "Extra large dosa with lamb filling",
      "subcategory": "70 MM's Dosa"
    },
    {
      "name": "70 mm Cheese Dosa",
      "price": "$19.99",
      "description": "Extra large cheese dosa",
      "subcategory": "70 MM's Dosa",
      "isVeg": true
    },
    {
      "name": "70 mm Ghee Podi Dosa",
      "price": "$18.99",
      "description": "Extra large ghee dosa with spicy podi",
      "subcategory": "70 MM's Dosa",
      "isVeg": true,
      "isSpicy": true
    },
    {
      "name": "70 mm Masala Dosa",
      "price": "$19.99",
      "description": "Extra large masala dosa",
      "subcategory": "70 MM's Dosa",
      "isVeg": true
    },
    {
      "name": "Plain Ravva Dosa",
      "price": "$15.99",
      "description": "Crispy semolina dosa",
      "subcategory": "Ravva Dosa",
      "isVeg": true
    },
    {
      "name": "Ravva Onion Dosa",
      "price": "$15.99",
      "description": "Semolina dosa with onions",
      "subcategory": "Ravva Dosa",
      "isVeg": true
    },
    {
      "name": "Ravva Masala",
      "price": "$19.99",
      "description": "Semolina dosa with potato filling",
      "subcategory": "Ravva Dosa",
      "isVeg": true
    },
    {
      "name": "Ravva Paneer",
      "price": "$19.99",
      "description": "Semolina dosa with paneer filling",
      "subcategory": "Ravva Dosa",
      "isVeg": true
    },
    {
      "name": "Ravva Chicken",
      "price": "$20.99",
      "description": "Semolina dosa with chicken filling",
      "subcategory": "Ravva Dosa"
    },
    {
      "name": "Ravva Lamb",
      "price": "$20.99",
      "description": "Semolina dosa with lamb filling",
      "subcategory": "Ravva Dosa"
    },
    {
      "name": "Cheese Masala",
      "price": "$18.99",
      "description": "Cheese dosa with potato filling",
      "subcategory": "Cheese Series",
      "isVeg": true
    },
    {
      "name": "Cheese Paneer",
      "price": "$18.99",
      "description": "Cheese dosa with paneer filling",
      "subcategory": "Cheese Series",
      "isVeg": true
    },
    {
      "name": "Cheese Chicken",
      "price": "$19.99",
      "description": "Cheese dosa with chicken filling",
      "subcategory": "Cheese Series"
    },
    {
      "name": "Cheese Lamb",
      "price": "$19.99",
      "description": "Cheese dosa with lamb filling",
      "subcategory": "Cheese Series"
    }
  ]
},
    {
  "name": "Noodles/Fried Rice",
  "icon": "🍜",
   "image": "https://png.pngtree.com/thumb_back/fh260/background/20220318/pngtree-food-photography-fried-rice-noodles-with-eggs-image_1034304.jpg",
  "subcategories": ["Veg", "Non-Veg"],
  "items": [
    {
      "name": "Veg Noodles",
      "price": "$19.99",
      "description": "Stir-fried noodles with mixed vegetables",
      "subcategory": "Veg",
      "isVeg": true
    },
    {
      "name": "Schezwan Veg Noodles",
      "price": "$19.99",
      "description": "Spicy schezwan-style vegetable noodles",
      "subcategory": "Veg",
      "isVeg": true,
      "isSpicy": true
    },
    {
      "name": "Chilli Garlic Veg Noodles",
      "price": "$20.99",
      "description": "Vegetable noodles tossed in chili-garlic sauce",
      "subcategory": "Veg",
      "isVeg": true,
      "isSpicy": true
    },
    {
      "name": "Mixed Noodles",
      "price": "$20.99",
      "description": "Combination of vegetables and choice of protein",
      "subcategory": "Non-Veg"
    },
    {
      "name": "Chicken Noodles",
      "price": "$21.99",
      "description": "Stir-fried noodles with chicken and vegetables",
      "subcategory": "Non-Veg"
    },
    {
      "name": "Egg Noodles",
      "price": "$21.99",
      "description": "Noodles with scrambled egg and vegetables",
      "subcategory": "Non-Veg"
    },
    {
      "name": "Prawn Noodles",
      "price": "$22.99",
      "description": "Stir-fried noodles with prawns and vegetables",
      "subcategory": "Non-Veg"
    },
    {
      "name": "Chilli Garlic Chicken Noodles",
      "price": "$22.99",
      "description": "Chicken noodles tossed in spicy chili-garlic sauce",
      "subcategory": "Non-Veg",
      "isSpicy": true
    },
    {
      "name": "Chilli Garlic Prawn Noodles",
      "price": "$22.99",
      "description": "Prawn noodles tossed in spicy chili-garlic sauce",
      "subcategory": "Non-Veg",
      "isSpicy": true
    },
    {
      "name": "Schezwan Chicken Noodles",
      "price": "$21.99",
      "description": "Spicy schezwan-style chicken noodles",
      "subcategory": "Non-Veg",
      "isSpicy": true
    },
    {
      "name": "Schezwan Prawn Noodles",
      "price": "$22.99",
      "description": "Spicy schezwan-style prawn noodles",
      "subcategory": "Non-Veg",
      "isSpicy": true
    },
    {
      "name": "Paneer Fried Rice",
      "price": "$19.99",
      "description": "Fried rice with paneer and vegetables",
      "subcategory": "Veg",
      "isVeg": true
    },
    {
      "name": "Veg Fried Rice",
      "price": "$19.99",
      "description": "Classic vegetable fried rice",
      "subcategory": "Veg",
      "isVeg": true
    },
    {
      "name": "Schezwan Veg Fried Rice",
      "price": "$19.99",
      "description": "Spicy schezwan-style vegetable fried rice",
      "subcategory": "Veg",
      "isVeg": true,
      "isSpicy": true
    },
    {
      "name": "Veg Manchurian Fried Rice",
      "price": "$20.99",
      "description": "Fried rice with vegetable manchurian balls",
      "subcategory": "Veg",
      "isVeg": true
    },
    {
      "name": "Chilli Garlic Veg Rice",
      "price": "$20.99",
      "description": "Vegetable fried rice tossed in chili-garlic sauce",
      "subcategory": "Veg",
      "isVeg": true,
      "isSpicy": true
    },
    {
      "name": "Mixed Fried Rice",
      "price": "$21.99",
      "description": "Fried rice with mixed vegetables and choice of protein",
      "subcategory": "Non-Veg"
    },
    {
      "name": "Chicken Fried Rice",
      "price": "$21.99",
      "description": "Classic chicken fried rice with vegetables",
      "subcategory": "Non-Veg"
    },
    {
      "name": "Egg Fried Rice",
      "price": "$21.99",
      "description": "Fried rice with scrambled egg and vegetables",
      "subcategory": "Non-Veg"
    },
    {
      "name": "Prawn Fried Rice",
      "price": "$22.99",
      "description": "Prawn fried rice with vegetables",
      "subcategory": "Non-Veg"
    },
    {
      "name": "Chilli Garlic Chicken Rice",
      "price": "$22.99",
      "description": "Chicken fried rice tossed in spicy chili-garlic sauce",
      "subcategory": "Non-Veg",
      "isSpicy": true
    },
    {
      "name": "Chilli Garlic Prawn Rice",
      "price": "$22.99",
      "description": "Prawn fried rice tossed in spicy chili-garlic sauce",
      "subcategory": "Non-Veg",
      "isSpicy": true
    },
    {
      "name": "Chilli Garlic Egg Rice",
      "price": "$22.99",
      "description": "Egg fried rice tossed in spicy chili-garlic sauce",
      "subcategory": "Non-Veg",
      "isSpicy": true
    },
    {
      "name": "Schezwan Chicken Fried Rice",
      "price": "$21.99",
      "description": "Spicy schezwan-style chicken fried rice",
      "subcategory": "Non-Veg",
      "isSpicy": true
    },
    {
      "name": "Schezwan Prawn Fried Rice",
      "price": "$22.99",
      "description": "Spicy schezwan-style prawn fried rice",
      "subcategory": "Non-Veg",
      "isSpicy": true
    }
  ]
},
    
  {
    "name": "Veg Curries",
    "icon": "🥘",
     "image": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgF-F2inbVwiAfJQPVLHLPsI0Q3zwg_01dwNUlI5lzkD61vtvtsw2FoV8vJhZhx_jg0eK6Ibt8bcLzb5NiS-OTVCct-7loF4NrZ9A536cqGc2triqyaCrdNopeAWyUj9LrDNL3J0IWxGE3x/s640/editted--1-1.jpg",
    "items": [
      {
        "name": "Dal Makhani",
        "price": "$20.99",
        "description": "Urid Beans and Kidney Beans cooked with tomato and Onion sauce with Indian spices",
        "isVeg": true
      },
      {
        "name": "Dal Tadka",
        "price": "$18.99",
        "description": "Slow cooked yellow and red lentils, topped with fry onion and garlic tadka with curry leaves",
        "isVeg": true
      },
      {
        "name": "Paneer Butter masala",
        "price": "$20.99",
        "description": "Indian Cottage Cheese sautéed in rich creamy tomato sauce, topped with butter and cream",
        "isVeg": true
      },
      {
        "name": "Panner Tikka Masala",
        "price": "$20.99",
        "description": "Indian Panner cooked in Tandoor and sautéed with spicy tikka masala and flavoured with fresh onion and capsicum",
        "isVeg": true
      },
      {
        "name": "Malai Kofta",
        "price": "$20.99",
        "description": "Potato and panner dumpling are simmered in cashew and onion sauce with mild spices",
        "isVeg": true
      },
      {
        "name": "Kadai Panner",
        "price": "$20.99",
        "description": "Fresh Panner tossed with onion & capsicum, cooked in fresh tomato-based sauce with spices",
        "isVeg": true
      },
      {
        "name": "Shahi Panner",
        "price": "$20.99",
        "description": "Thin and sliced panner is cooked in rich cashew and tomato gray with special spices",
        "isVeg": true
      },
      {
        "name": "Palak Paneer or Palak Mushroom",
        "price": "$20.99",
        "description": "Indian Cottage Cheese or Fried mushroom cooked in creamy spinach texture and topped with thickened cream",
        "isVeg": true
      },
      {
        "name": "Channa Masala",
        "price": "$19.99",
        "description": "Boiled Chickpeas sauteed with Ginger and garlic and cooked in tomato and onion gravy with spices",
        "isVeg": true
      },
      {
        "name": "Balti Paneer",
        "price": "$21.99",
        "description": "Cottage cheese marinated with spices and then tossed with onion and capsicum and tomato gravy",
        "isVeg": true
      },
      {
        "name": "Veg Kolhapuri",
        "price": "$20.99",
        "description": "Mixed vegetables cooked in spicy Kolhapuri masala with chili and curry leaves",
        "isVeg": true
      },
      {
        "name": "Paneer Makhni",
        "price": "$20.99",
        "description": "Paneer cooked in rich tomato sauce and finished with cream",
        "isVeg": true
      },
      {
        "name": "Kadai Veg",
        "price": "$20.99",
        "description": "Mixed Vegetables cooked in spicy masala and tossed with onion and capsicum",
        "isVeg": true
      },
      {
        "name": "Methi Malai Matar",
        "price": "$20.99",
        "description": "Methi and peas sautéed with garlic and ginger and cooked in rich cashew and creamy onion sauce",
        "isVeg": true
      },
      {
        "name": "Paneer Burji",
        "price": "$20.99",
        "description": "Smashed panner is tossed with der masala and turmeric and sautéed with onion and fresh tomatoes",
        "isVeg": true
      },
      {
        "name": "Aloo Jeera",
        "price": "$20.99",
        "description": "Fried potato pieces is tossed with dry masala, onion and garlic and topped with fresh coriander",
        "isVeg": true
      },
      {
        "name": "Aloo Matar",
        "price": "$20.99",
        "description": "Fried potato is combined with green peas sautéed with rich tomato and onion gravy",
        "isVeg": true
      },
      {
        "name": "Paneer Do Pyaza",
        "price": "$20.99",
        "description": "Panner tossed with mint and fresh onion and cooked in creamy cashew and onion sauce",
        "isVeg": true
      },
      {
        "name": "Panner Taka Tak",
        "price": "$20.99",
        "description": "Slices of marinated paneer cooked in tandoor is tossed with onion and sautéed with tomato gravy",
        "isVeg": true
      },
      {
        "name": "Cashew Paneer Curry",
        "price": "$20.99",
        "description": "Slices of paneer cooked in white gravy made with onions, cashews, whole spices, milk, and cream",
        "isVeg": true
      },
      {
        "name": "Soya Chaap Tikka Masala",
        "price": "$20.99",
        "description": "Soya Chunks tossed with rich tomato and onion masala with capsicum",
        "isVeg": true
      }
    ]
  },
  
    {
    "name": "Sea Food Curries",
    "icon": "🐟",
     "image": "https://media.istockphoto.com/id/1295772368/photo/macher-jhol-in-black-bowl-on-dark-slate-table-top-indian-cuisine-bengali-fish-curry-asian.jpg?s=612x612&w=0&k=20&c=3asIIURIgisLwXAijZnmNY3p2EWEZEHzByjk7ke9xZk=",
    "items": [
      {
        "name": "Fish / Prawn Curry",
        "price": "$22.99",
        "description": "Basa fillet pieces flavored with garlic and ginger and cooked in fresh onion and tomato sauce",
        "isVeg": false
      },
      {
        "name": "Prawn Masala",
        "price": "$22.99",
        "description": "Prawns tossed with onion and capsicum and chili and sautéed with spicy cashew onion gravy",
        "isVeg": false
      },
      {
        "name": "Prawn / Fish Korma",
        "price": "$22.99",
        "description": "Prawn/ Fish tossed with garlic and cashew paste and cooked in creamy texture sauce",
        "isVeg": false
      },
      {
        "name": "Prawn Iguru",
        "price": "$22.99",
        "description": "Prawn tossed with fresh garlic and spicy chili and the cooked with spicy onion sauce",
        "isVeg": false
      }
    ]
  },
    {
  "name": "Non-Veg Curries",
  "icon": "🍗",
   "image": "https://media.istockphoto.com/id/579767430/photo/chicken-tikka-masala.jpg?s=612x612&w=0&k=20&c=EjeRH4r3w9qQ2WELp5qkqkUh1HbJJwRcFNNv1suOtvM=",
  "items": [
    {
      "name": "Butter Chicken",
      "price": "$21.99",
      "description": "Tender chicken marinated, cooked in tandoor, simmered in creamy cashew tomato sauce & topped with butter",
      "isVeg": false
    },
    {
      "name": "Chicken Tikka Masala",
      "price": "$21.99",
      "description": "Chicken Tikka Pieces tossed with fresh Onion and capsicum and simmered in Fresh Tomato Gravy",
      "isVeg": false
    },
    {
      "name": "Punjabi Butter Chicken",
      "price": "$21.99",
      "description": "Bone chicken cooked in tandoor is fried with ginger and garlic and cooked in desi thick gravy",
      "isVeg": false
    },
    {
      "name": "Chicken Curry",
      "price": "$21.99",
      "description": "Chicken simmered in Onion and tomato sauce and flavored with variety of spices",
      "isVeg": false
    },
    {
      "name": "Goat Curry",
      "price": "$22.99",
      "description": "Baby goat pieces cooked on low flame with variety of spices with onion gravy",
      "isVeg": false
    },
    {
      "name": "Lamb Rogan Josh",
      "price": "$22.99",
      "description": "Pieces of lamb simmered in yogurt and spices until it is tendered",
      "isVeg": false
    },
    {
      "name": "Handi Chicken / Goat/ Lamb",
      "price": "$21.99/22.99",
      "description": "Chicken cooked in a different vessel with some variety of flavors with aromatic gravy",
      "isVeg": false
    },
    {
      "name": "Kadhai Chicken /Goat",
      "price": "$21.99/22.99",
      "description": "Chicken tossed with chili and capsicum and cooked in pure tomato sauce with kadhai masala",
      "isVeg": false
    },
    {
      "name": "Andhra Chicken / Goat",
      "price": "$21.99/22.99",
      "description": "Traditional Andhra style chicken curry cooked with special Andhra masala, coconut and onion gravy",
      "isVeg": false
    },
    {
      "name": "Chettinad Chicken/ Goat",
      "price": "$21.99",
      "description": "Chicken/Goat cooked in chettinad style, flavored with curry leaves, mustard seeds, coconut & various spices",
      "isVeg": false
    },
    {
      "name": "Kolhapuri Chicken/ Goat",
      "price": "$21.99/22.99",
      "description": "Chicken /Goat cooked in desi style with tangy flavor and kolhapuri masala",
      "isVeg": false
    },
    {
      "name": "Pepper Gravy Chicken/ Goat",
      "price": "$21.99/22.99",
      "description": "Chicken/ Goat tossed with chop capsicum with pepper and chili and sautéed with Onion gravy",
      "isVeg": false
    },
    {
      "name": "Gongora Chicken/ Goat",
      "price": "$21.99/22.99",
      "description": "Chicken /Goat cooked with fresh Sorrel Leaves, ginger and chili and topped with tadka",
      "isVeg": false
    },
    {
      "name": "Vindaloo Chicken /Goat/Lamb",
      "price": "$21.99/22.99",
      "description": "Chicken / Goat/ Lamb cooked in spicy vindaloo sauce flavored with garlic",
      "isVeg": false
    },
    {
      "name": "Korma Chicken/ Goat/Lamb",
      "price": "$21.99/22.99",
      "description": "Chicken/ Goat/ Lamb tossed with garlic and cashew paste and cooked in creamy texture sauce",
      "isVeg": false
    },
    {
      "name": "Afghani Chicken/ Goat",
      "price": "$21.99/22.99",
      "description": "Chicken/ Goat infused in cream mixed with rich cashews along with pepper and grilled to perfection",
      "isVeg": false
    }
  ]
},
    {
  "name": "Breads",
  "icon": "🫓",
   "image": "https://media.istockphoto.com/id/1150376593/photo/bread-tandoori-indian-cuisine.jpg?s=612x612&w=0&k=20&c=GGT5LN7G4zLhJTEnP_KcyvYuayi8f1nJcvQwvmj0rCM=",
  "items": [
    {
      "name": "Plain Naan",
      "price": "$5.50",
      "description": "Traditional tandoor-baked leavened bread",
      "isVeg": true
    },
    {
      "name": "Butter Naan",
      "price": "$5.50",
      "description": "Soft naan brushed with butter",
      "isVeg": true
    },
    {
      "name": "Garlic Naan",
      "price": "$5.50",
      "description": "Naan topped with fresh garlic and herbs",
      "isVeg": true
    },
    {
      "name": "Plain Roti",
      "price": "$4.50",
      "description": "Whole wheat unleavened flatbread",
      "isVeg": true
    },
    {
      "name": "Butter Roti",
      "price": "$5.50",
      "description": "Whole wheat roti brushed with butter",
      "isVeg": true
    },
    {
      "name": "Chicken Tikka Naan",
      "price": "$7.99",
      "description": "Naan stuffed with spiced chicken tikka pieces",
      "isVeg": false
    },
    {
      "name": "Malabar Parota",
      "price": "$6.99",
      "description": "Layered flaky South Indian paratha",
      "isVeg": true
    },
    {
      "name": "Lachha Parota",
      "price": "$6.99",
      "description": "Crispy layered paratha with multiple thin layers",
      "isVeg": true
    },
    {
      "name": "Cheese Naan",
      "price": "$6.99",
      "description": "Naan stuffed with melted cheese",
      "isVeg": true
    },
    {
      "name": "Keema Naan",
      "price": "$7.99",
      "description": "Naan stuffed with spiced minced lamb",
      "isVeg": false
    },
    {
      "name": "Herb and Cheese Naan",
      "price": "$7.99",
      "description": "Naan with mixed herbs and cheese filling",
      "isVeg": true
    },
    {
      "name": "Aloo Parota",
      "price": "$6.99",
      "description": "Layered paratha stuffed with spiced potato filling",
      "isVeg": true
    },
    {
      "name": "Cheese and Garlic Naan",
      "price": "$6.99",
      "description": "Naan with garlic and cheese combination",
      "isVeg": true
    },
    {
      "name": "Cheese and Chilli Naan",
      "price": "$6.99",
      "description": "Naan with cheese and green chili filling",
      "isVeg": true
    },
    {
      "name": "Masala Kulcha",
      "price": "$7.99",
      "description": "Leavened bread stuffed with spiced potato and onion mixture",
      "isVeg": true
    }
  ]
},
    {
  "name": "Rice",
  "icon": "🍚",
   "image": "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/12/jeera-rice-recipe.webp",
  "items": [
    {
      "name": "Plain Rice",
      "price": "$6.99",
      "description": "Steamed basmati rice",
      "isVeg": true
    },
    {
      "name": "Saffron Rice",
      "price": "$5.99",
      "description": "Fragrant basmati rice infused with saffron",
      "isVeg": true
    },
    {
      "name": "Jeera Rice",
      "price": "$8.99",
      "description": "Basmati rice tempered with cumin seeds",
      "isVeg": true
    },
    {
      "name": "Coconut Rice",
      "price": "$9.99",
      "description": "Rice cooked with coconut and mild spices",
      "isVeg": true
    },
    {
      "name": "Karivepaku Rice",
      "price": "$8.99",
      "description": "Rice flavored with curry leaves and South Indian spices",
      "isVeg": true
    },
    {
      "name": "Peas Pulao",
      "price": "$9.99",
      "description": "Fragrant rice with green peas and mild spices",
      "isVeg": true
    },
    {
      "name": "Egg Jeera Rice",
      "price": "$11.99",
      "description": "Jeera rice with scrambled eggs",
      "isVeg": false
    }
  ]
},
{
  "name": "Sides",
   "icon": "🍞",
    "image": "https://media.istockphoto.com/id/1263817605/photo/masala-papad-or-spicy-papadum-is-an-indian-or-asian-vegetarian-crispy-food-starter-in.jpg?s=612x612&w=0&k=20&c=leHxfC-oTlHAQaT16NmgDIqS_wITa8m-6ZqJvrWjodk=",
  "items": [
    {
      "name": "Papadam",
      "price": "$5.99",
      "description": "Crispy lentil wafers",
      "isVeg": true
    },
    {
      "name": "Green Salad",
      "price": "$4.99",
      "description": "Fresh garden greens",
      "isVeg": true
    },
    {
      "name": "Onion Salad",
      "price": "$5.99",
      "description": "Fresh onion salad with herbs",
      "isVeg": true
    },
    {
      "name": "Lachha Onion",
      "price": "$4.99",
      "description": "Thinly sliced onion rings",
      "isVeg": true
    }
  ]
},


    {
  "name": "Biryani's",
  "icon": "🍛",
   "image": "https://png.pngtree.com/thumb_back/fh260/background/20240727/pngtree-3d-chicken-kabsa-homemade-arabian-biryani-image_16117957.jpg",
  "subcategories": ["Veg", "Non-Veg", "Special"],
  "items": [
    {
      "name": "Hyderabadi Chicken Dum Biryani",
      "price": "$20.99",
      "description": "Traditional Hyderabadi Style Biryani made with chicken thigh and leg marinated with yogurt and spices and cooked with Dum",
      "subcategory": "Non-Veg",
      "isVeg": false
    },
    {
      "name": "Hyderabadi Goat Dum Biryani",
      "price": "$21.99",
      "description": "Traditional Hyderabadi Style Biryani made with goat marinated with yogurt and spices and cooked with Dum",
      "subcategory": "Non-Veg",
      "isVeg": false
    },
    {
      "name": "Veg Dum Biryani",
      "price": "$19.99",
      "description": "Mix of all types of vegetables marinated with yogurt and spices and cooked with Dum",
      "subcategory": "Veg",
      "isVeg": true
    },
    {
      "name": "65 Biryani (Chicken)",
      "price": "$21.99",
      "description": "Chicken pieces sautéed with 65 sauce and layered with masala rice",
      "subcategory": "Non-Veg",
      "isVeg": false
    },
    {
      "name": "65 Biryani (Paneer)",
      "price": "$20.99",
      "description": "Paneer sautéed with 65 sauce and layered with masala rice",
      "subcategory": "Veg",
      "isVeg": true
    },
    {
      "name": "65 Biryani (Gobi)",
      "price": "$20.99",
      "description": "Cauliflower sautéed with 65 sauce and layered with masala rice",
      "subcategory": "Veg",
      "isVeg": true
    },
    {
      "name": "65 Biryani (Egg)",
      "price": "$20.99",
      "description": "Egg sautéed with 65 sauce and layered with masala rice",
      "subcategory": "Non-Veg",
      "isVeg": false
    },
    {
      "name": "Paneer Biryani",
      "price": "$20.99",
      "description": "Paneer Pieces fried and marinated with special spices and served with masala rice",
      "subcategory": "Veg",
      "isVeg": true
    },
    {
      "name": "Pachi Mirchi Biryani (Chicken)",
      "price": "$21.99",
      "description": "Chicken cooked with Pachi Mirchi paste and tossed with flavored Rice",
      "subcategory": "Non-Veg",
      "isVeg": false
    },
    {
      "name": "Pachi Mirchi Biryani (Goat)",
      "price": "$22.99",
      "description": "Goat cooked with Pachi Mirchi paste and tossed with flavored Rice",
      "subcategory": "Non-Veg",
      "isVeg": false
    },
    {
      "name": "Pachi Mirchi Biryani (Prawn)",
      "price": "$23.99",
      "description": "Prawn cooked with Pachi Mirchi paste and tossed with flavored Rice",
      "subcategory": "Non-Veg",
      "isVeg": false
    },
    {
      "name": "Pachi Mirchi Biryani (Paneer)",
      "price": "$19.99",
      "description": "Paneer cooked with Pachi Mirchi paste and tossed with flavored Rice",
      "subcategory": "Veg",
      "isVeg": true
    },
    {
      "name": "Fried Chicken Biryani",
      "price": "$21.99",
      "description": "Fried Pieces of Chicken blended with special spices and served with masala rice",
      "subcategory": "Non-Veg",
      "isVeg": false
    },
    {
      "name": "Fried Goat Biryani",
      "price": "$22.99",
      "description": "Fried Pieces of Goat blended with special spices and served with masala rice",
      "subcategory": "Non-Veg",
      "isVeg": false
    },
    {
      "name": "Gongura Chicken Biryani",
      "price": "$21.99",
      "description": "Chicken flavored with sorrel Leaves and spices and served with flavored Rice",
      "subcategory": "Non-Veg",
      "isVeg": false
    },
    {
      "name": "Gongura Goat Biryani",
      "price": "$22.99",
      "description": "Goat flavored with sorrel Leaves and spices and served with flavored Rice",
      "subcategory": "Non-Veg",
      "isVeg": false
    },
    {
      "name": "Gongura Paneer Biryani",
      "price": "$20.99",
      "description": "Paneer flavored with sorrel Leaves and spices and served with flavored Rice",
      "subcategory": "Veg",
      "isVeg": true
    },
    {
      "name": "Gongura Prawn Biryani",
      "price": "$23.99",
      "description": "Prawn flavored with sorrel Leaves and spices and served with flavored Rice",
      "subcategory": "Non-Veg",
      "isVeg": false
    },
    {
      "name": "Avakaya Chicken Biryani",
      "price": "$21.99",
      "description": "Chicken coated with avakaya paste and special spices with flavored rice",
      "subcategory": "Non-Veg",
      "isVeg": false
    },
    {
      "name": "Avakaya Goat Biryani",
      "price": "$22.99",
      "description": "Goat coated with avakaya paste and special spices with flavored rice",
      "subcategory": "Non-Veg",
      "isVeg": false
    },
    {
      "name": "Avakaya Paneer Biryani",
      "price": "$20.99",
      "description": "Paneer coated with avakaya paste and special spices with flavored rice",
      "subcategory": "Veg",
      "isVeg": true
    },
    {
      "name": "Prawn Biryani",
      "price": "$23.99",
      "description": "Tiger Prawns marinated with spices and fried and flavored with basmati Rice",
      "subcategory": "Non-Veg",
      "isVeg": false
    },
    {
      "name": "Karivepaku Chicken Biryani",
      "price": "$21.99",
      "description": "Chicken fried and battered with curry leaves powder and tossed with flavored Rice",
      "subcategory": "Non-Veg",
      "isVeg": false
    },
    {
      "name": "Karivepaku Goat Biryani",
      "price": "$22.99",
      "description": "Goat fried and battered with curry leaves powder and tossed with flavored Rice",
      "subcategory": "Non-Veg",
      "isVeg": false
    },
    {
      "name": "Keema Pulav (Chicken)",
      "price": "$21.99",
      "description": "Chicken keema simmered with spices and cashews and served with flavored rice",
      "subcategory": "Non-Veg",
      "isVeg": false
    },
    {
      "name": "Keema Pulav (Lamb)",
      "price": "$22.99",
      "description": "Lamb keema simmered with spices and cashews and served with flavored rice",
      "subcategory": "Non-Veg",
      "isVeg": false
    },
    {
      "name": "Delights Special Biryani (Chicken)",
      "price": "$23.99",
      "description": "Delight special biryani made with special masala from our chef and served with Flavor Rice",
      "subcategory": "Special",
      "isVeg": false
    },
    {
      "name": "Delights Special Biryani (Paneer)",
      "price": "$23.99",
      "description": "Delight special biryani made with special masala from our chef and served with Flavor Rice",
      "subcategory": "Special",
      "isVeg": true
    },
    {
      "name": "Delights Special Biryani (Goat)",
      "price": "$23.99",
      "description": "Delight special biryani made with special masala from our chef and served with Flavor Rice",
      "subcategory": "Special",
      "isVeg": false
    },
    {
      "name": "Ullikaram Biryani (Paneer)",
      "price": "$20.99",
      "description": "Paneer sautéed with spicy masala and served with flavoured rice",
      "subcategory": "Veg",
      "isVeg": true
    },
    {
      "name": "Ullikaram Biryani (Egg)",
      "price": "$21.99",
      "description": "Egg sautéed with spicy masala and served with flavoured rice",
      "subcategory": "Non-Veg",
      "isVeg": false
    },
    {
      "name": "Ullikaram Biryani (Chicken)",
      "price": "$21.99",
      "description": "Chicken sautéed with spicy masala and served with flavoured rice",
      "subcategory": "Non-Veg",
      "isVeg": false
    },
    {
      "name": "Ullikaram Biryani (Goat)",
      "price": "$23.99",
      "description": "Goat sautéed with spicy masala and served with flavoured rice",
      "subcategory": "Non-Veg",
      "isVeg": false
    },
    {
      "name": "Ullikaram Biryani (Prawn)",
      "price": "$23.99",
      "description": "Prawn sautéed with spicy masala and served with flavoured rice",
      "subcategory": "Non-Veg",
      "isVeg": false
    },
    {
      "name": "Ulavacharu Biryani (Paneer)",
      "price": "$20.99",
      "description": "Paneer sautéed with ulavacharu paste and served with flavoured rice",
      "subcategory": "Veg",
      "isVeg": true
    },
    {
      "name": "Ulavacharu Biryani (Egg)",
      "price": "$21.99",
      "description": "Egg sautéed with ulavacharu paste and served with flavoured rice",
      "subcategory": "Non-Veg",
      "isVeg": false
    },
    {
      "name": "Ulavacharu Biryani (Chicken)",
      "price": "$21.99",
      "description": "Chicken sautéed with ulavacharu paste and served with flavoured rice",
      "subcategory": "Non-Veg",
      "isVeg": false
    },
    {
      "name": "Ulavacharu Biryani (Goat)",
      "price": "$23.99",
      "description": "Goat sautéed with ulavacharu paste and served with flavoured rice",
      "subcategory": "Non-Veg",
      "isVeg": false
    },
    {
      "name": "Ulavacharu Biryani (Prawn)",
      "price": "$23.99",
      "description": "Prawn sautéed with ulavacharu paste and served with flavoured rice",
      "subcategory": "Non-Veg",
      "isVeg": false
    }
  ]
},
    {
      name: 'Desserts',
      icon: '🍮',
       "image": "https://burst.shopifycdn.com/photos/berry-cheesecake.jpg?width=1000&format=pjpg&exif=0&iptc=0",
      items: [
        { name: 'Rasmalai (3 Pieces)', price: '$9.99', description: 'Spongy cottage cheese in flavored milk', isVeg: true },
        { name: 'Gulab Jamun (2 Pieces)', price: '$9.99', description: 'Soft milk dumplings in sugar syrup', isVeg: true },
        { name: 'Falooda', price: '$11.99', description: 'Traditional Indian dessert with vermicelli, ice cream and rose syrup', isVeg: true },
        { name: 'Pista Kulfi', price: '$7.99', description: 'Traditional Indian ice cream with pistachio', isVeg: true },
        { name: 'Chocolate Dosa', price: '$10.99', description: 'Sweet dosa with chocolate and ice cream', isVeg: true },
        { name: 'Pan Kulfi', price: '$7.99', description: 'Pan Kulfi ', isVeg: true }
      ]
    },
    {
  "name": "Family/Jumbo",
  "icon": "👨‍👩‍👧‍👦",
   "image": "https://img.freepik.com/premium-photo/dinner-with-family-friends-large-table-with-lots-food_962751-3533.jpg",
  "subcategories": ["Family", "Jumbo", "Desserts"],
  "items": [
    {
      "name": "Rasmalai (3 Pieces)",
      "price": "$9.99",
      "description": "Soft cottage cheese dumplings in sweetened milk",
      "subcategory": "Desserts",
      "isVeg": true
    },
    {
      "name": "Gulab Jamun (2 Pieces)",
      "price": "$9.99",
      "description": "Deep-fried milk balls in sugar syrup",
      "subcategory": "Desserts",
      "isVeg": true
    },
    {
      "name": "Falooda",
      "price": "$11.99",
      "description": "Vermicelli dessert with rose syrup and ice cream",
      "subcategory": "Desserts",
      "isVeg": true
    },
    {
      "name": "Pista Kulfi",
      "price": "$7.99",
      "description": "Traditional pistachio flavored Indian ice cream",
      "subcategory": "Desserts",
      "isVeg": true
    },
    {
      "name": "Pan Kulfi",
      "price": "$7.99",
      "description": "Traditional pan flavored Indian ice cream",
      "subcategory": "Desserts",
      "isVeg": true
    },
    {
      "name": "Family Vegetable Biryani",
      "price": "$64.99",
      "description": "Large portion vegetable biryani for family",
      "subcategory": "Family",
      "isVeg": true
    },
    {
      "name": "Family Chicken Dum Biryani",
      "price": "$75",
      "description": "Large portion chicken biryani for family",
      "subcategory": "Family",
      "isVeg": false
    },
    {
      "name": "Family Goat Dum Biryani",
      "price": "$80",
      "description": "Large portion goat biryani for family",
      "subcategory": "Family",
      "isVeg": false
    },
    {
      "name": "Jumbo Vegetable Biryani",
      "price": "$80.99",
      "description": "Extra large portion vegetable biryani",
      "subcategory": "Jumbo",
      "isVeg": true
    },
    {
      "name": "Jumbo Chicken Dum Biryani",
      "price": "$90",
      "description": "Extra large portion chicken biryani",
      "subcategory": "Jumbo",
      "isVeg": false
    },
    {
      "name": "Jumbo Goat Dum Biryani",
      "price": "$95",
      "description": "Extra large portion goat biryani",
      "subcategory": "Jumbo",
      "isVeg": false
    },
    {
      "name": "Family Starters (Veg)",
      "price": "$94.99",
      "description": "Assorted vegetarian starters for family",
      "subcategory": "Family",
      "isVeg": true
    },
    {
      "name": "Family Starters (Chicken)",
      "price": "$94.99",
      "description": "Assorted chicken starters for family",
      "subcategory": "Family",
      "isVeg": false
    },
    {
      "name": "Family Starters (Goat)",
      "price": "$150",
      "description": "Assorted goat starters for family",
      "subcategory": "Family",
      "isVeg": false
    },
    {
      "name": "Family Starters (Prawn/Fish)",
      "price": "$150",
      "description": "Assorted seafood starters for family",
      "subcategory": "Family",
      "isVeg": false
    },
    {
      "name": "Jumbo Starters (Veg)",
      "price": "$130",
      "description": "Extra large assorted vegetarian starters",
      "subcategory": "Jumbo",
      "isVeg": true
    },
    {
      "name": "Jumbo Starters (Chicken)",
      "price": "$130",
      "description": "Extra large assorted chicken starters",
      "subcategory": "Jumbo",
      "isVeg": false
    },
    {
      "name": "Jumbo Starters (Goat)",
      "price": "$150",
      "description": "Extra large assorted goat starters",
      "subcategory": "Jumbo",
      "isVeg": false
    },
    {
      "name": "Jumbo Starters (Prawn/Fish)",
      "price": "$150",
      "description": "Extra large assorted seafood starters",
      "subcategory": "Jumbo",
      "isVeg": false
    },
    {
      "name": "Family Rice/Noodles (Veg)",
      "price": "$75.99",
      "description": "Large portion vegetarian rice or noodles for family",
      "subcategory": "Family",
      "isVeg": true
    },
    {
      "name": "Family Rice/Noodles (Egg/Chicken/Prawn)",
      "price": "$105.99",
      "description": "Large portion non-vegetarian rice or noodles for family",
      "subcategory": "Family",
      "isVeg": false
    },
    {
      "name": "Jumbo Rice/Noodles (Veg)",
      "price": "$95.99",
      "description": "Extra large portion vegetarian rice or noodles",
      "subcategory": "Jumbo",
      "isVeg": true
    },
    {
      "name": "Jumbo Rice/Noodles (Egg/Chicken/Prawn)",
      "price": "$105.99",
      "description": "Extra large portion non-vegetarian rice or noodles",
      "subcategory": "Jumbo",
      "isVeg": false
    },
    {
      "name": "Any Special Family Biryani",
      "price": "$75",
      "description": "Custom family-sized biryani with choice of ingredients",
      "subcategory": "Family"
    },
    {
      "name": "Any Special Jumbo Biryani",
      "price": "$90",
      "description": "Custom jumbo-sized biryani with choice of ingredients",
      "subcategory": "Jumbo"
    }
  ]
}
    
  ];


  const openCategoryPopup = (category: MenuCategory) => {
    setSelectedCategory(category);
    setActiveSubcategory('All');
    setIsPopupOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeCategoryPopup = () => {
    setIsPopupOpen(false);
    setTimeout(() => {
      setSelectedCategory(null);
      document.body.style.overflow = 'unset';
    }, 300);
  };

  const CategoryCard: React.FC<{ category: MenuCategory; index: number }> = ({ category, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative rounded-2xl cursor-pointer overflow-hidden group"
      onClick={() => openCategoryPopup(category)}
    >
      <div className="relative h-48 sm:h-56 md:h-64 w-full">
        <img 
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center p-4">
          <div className="bg-white/90 px-4 py-2 rounded-full mb-2">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 text-center">
              {category.name}
            </h3>
          </div>
          {isMobile && (
            <div className="flex items-center bg-white/90 px-3 py-1 rounded-full mt-2">
              <Hand className="w-4 h-4 mr-1" />
              <span className="text-xs font-medium">Tap to view</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  const MenuPopup: React.FC<{ category: MenuCategory }> = ({ category }) => {
    const popupRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (popupRef.current) {
        popupRef.current.scrollTop = 0;
      }
    }, [category, activeSubcategory]);

    const filteredItems = activeSubcategory === 'All' 
      ? category.items 
      : category.items.filter(item => item.subcategory === activeSubcategory);

    return (
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
        isPopupOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div 
          ref={popupRef}
          className={`relative w-full max-w-4xl h-[90vh] overflow-hidden rounded-3xl shadow-2xl ${
            mode === 'lovable'
              ? 'bg-white border-2 border-pink-200'
              : 'bg-white border-2 border-orange-200'
          } transition-all duration-300 transform ${
            isPopupOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          } flex flex-col`}
        >
          <div className={`flex-shrink-0 p-4 md:p-6 border-b ${
            mode === 'lovable'
              ? 'bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200'
              : 'bg-gradient-to-r from-orange-50 to-red-50 border-orange-200'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-3xl md:text-4xl">{category.icon}</span>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800">{category.name}</h3>
                  <p className="text-sm text-gray-600">
                    {filteredItems.length} items available
                    {activeSubcategory !== 'All' && ` in ${activeSubcategory}`}
                  </p>
                </div>
              </div>
              
              <button
                onClick={closeCategoryPopup}
                className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                  mode === 'lovable'
                    ? 'bg-pink-100 hover:bg-pink-200 text-pink-600'
                    : 'bg-orange-100 hover:bg-orange-200 text-orange-600'
                }`}
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>

            {category.subcategories && (
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveSubcategory('All')}
                  className={`px-3 py-1 text-sm rounded-full transition-all ${
                    activeSubcategory === 'All'
                      ? mode === 'lovable'
                        ? 'bg-pink-500 text-white'
                        : 'bg-orange-500 text-white'
                      : mode === 'lovable'
                        ? 'bg-pink-100 text-pink-800 hover:bg-pink-200'
                        : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                  }`}
                >
                  All
                </button>
                {category.subcategories.map(subcategory => (
                  <button
                    key={subcategory}
                    onClick={() => setActiveSubcategory(subcategory)}
                    className={`px-3 py-1 text-sm rounded-full transition-all ${
                      activeSubcategory === subcategory
                        ? mode === 'lovable'
                          ? 'bg-pink-500 text-white'
                          : 'bg-orange-500 text-white'
                        : mode === 'lovable'
                          ? 'bg-pink-100 text-pink-800 hover:bg-pink-200'
                          : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                    }`}
                  >
                    {subcategory}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="mb-6 p-4 rounded-lg bg-yellow-50 border border-yellow-200">
              <p className="text-sm text-yellow-800 font-medium">
                <span className="font-bold">Food Allergy Warning:</span> Please be advised that our food may have come in contact or contains peanuts, tree nuts, soy, milk, eggs, wheat, shellfish or fish. Kindly ask a staff member about the ingredients used in your meal before ordering.
              </p>
              <p className="text-xs text-yellow-700 mt-2">
                *Prices are subject to change without any prior notice
              </p>
            </div>

            <div className="grid gap-4 md:gap-6">
              {filteredItems.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 md:p-6 rounded-xl border transition-all duration-300 hover:shadow-lg cursor-pointer ${
                    hoveredItem === `${category.name}-${index}`
                      ? mode === 'lovable'
                        ? 'border-pink-300 bg-pink-50 scale-102 shadow-md'
                        : 'border-orange-300 bg-orange-50 scale-102 shadow-md'
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
                          {item.isVeg && (
                            <div className="flex items-center space-x-1">
                              <Leaf className="w-4 h-4 text-green-600" />
                              <span className="text-xs text-green-600 font-medium">VEG</span>
                            </div>
                          )}
                          {item.isSpicy && (
                            <div className="flex items-center space-x-1">
                              <Flame className="w-4 h-4 text-red-500" />
                              <span className="text-xs text-red-500 font-medium">SPICY</span>
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
    <section id="menu" className={`py-12 md:py-20 ${
      mode === 'lovable'
        ? 'bg-gradient-to-b from-purple-50 to-pink-50'
        : 'bg-gradient-to-b from-white to-gray-50'
    }`}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="mb-8 flex justify-center"
      >
        <motion.img
          src="https://i.postimg.cc/W470Rm5s/Dosa.png"
          alt="DosaDelight Logo"
          className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64"
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
        <div className="text-center mb-12 md:mb-16">
          <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 ${
            mode === 'lovable'
              ? 'bg-pink-100 text-pink-800'
              : 'bg-orange-100 text-orange-800'
          }`}>
            Our Menu
          </div>
          
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 ${
            mode === 'lovable' ? 'text-gray-800' : 'text-gray-900'
          }`}>
            Flavors That{' '}
            <span className={`${
              mode === 'lovable'
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600'
                : 'text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600'
            }`}>
              Speak to Your Soul
            </span>
          </h2>
          
          <p className={`text-base md:text-lg max-w-2xl mx-auto ${
            mode === 'lovable' ? 'text-gray-600' : 'text-gray-700'
          }`}>
            Explore our carefully curated menu featuring authentic Indian delicacies, 
            each dish prepared with love and traditional recipes passed down through generations.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {menuCategories.map((category: MenuCategory, index: number) => (
            <CategoryCard key={category.name} category={category} index={index} />
          ))}
        </div>

        <div className="text-center mt-12 md:mt-16">
          <div className={`inline-flex items-center space-x-2 px-4 py-2 md:px-6 md:py-3 rounded-full ${
            mode === 'lovable'
              ? 'bg-gradient-to-r from-pink-500 to-purple-600'
              : 'bg-gradient-to-r from-orange-500 to-red-600'
          } text-white shadow-lg hover:scale-105 transition-transform duration-300`}>
            <ChefHat className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-sm md:text-base font-medium">Can't decide? Try our Chef's Special Thali!</span>
          </div>
        </div>
      </div>

      {selectedCategory && <MenuPopup category={selectedCategory} />}
    </section>
  );
};

export default Menu;