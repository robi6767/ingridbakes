'use client';

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Footer from "../../../components/shared/Footer";

// Menu data structure with all categories
const menu = {
  cakes: [
    {
      name: "Basque Cheesecake",
      description: "Our signature creamy, crustless cheesecake with a caramelized top.",
      image: "/placeholder.svg",
      pricePerPiece: "8.50",
      priceWhole: "48.00"
    },
    {
      name: "Pistachio Cake",
      description: "A rich and nutty cake layered with pistachio cream.",
      image: "/placeholder.svg",
      pricePerPiece: "9.00",
      priceWhole: "52.00"
    },
    {
      name: "Raspberry-Pistachio Birthday Cake",
      description: "A festive cake perfect for celebrations.",
      image: "/placeholder.svg",
      pricePerPiece: "9.50",
      priceWhole: "58.00"
    },
    {
      name: "Dark Chocolate Ganache",
      description: "Decadent dark chocolate cake with smooth ganache frosting.",
      image: "/placeholder.svg",
      pricePerPiece: "8.75",
      priceWhole: "50.00"
    },
    {
      name: "Lemon Meringue Tart",
      description: "Tangy lemon filling topped with fluffy toasted meringue.",
      image: "/placeholder.svg",
      pricePerPiece: "7.50",
      priceWhole: "45.00"
    },
  ],
  pastries: [
    {
      name: "Croissant",
      description: "Buttery and flaky, baked fresh daily.",
      image: "/placeholder.svg",
      pricePerPiece: "4.50",
      priceWhole: null
    },
    {
      name: "Pain au Chocolat",
      description: "A classic French pastry with dark chocolate.",
      image: "/placeholder.svg",
      pricePerPiece: "5.00",
      priceWhole: null
    },
    {
      name: "Almond Croissant",
      description: "Flaky croissant filled with rich almond cream.",
      image: "/placeholder.svg",
      pricePerPiece: "5.50",
      priceWhole: null
    },
    {
      name: "Cardamom Bun",
      description: "Sweet and fragrant bun with a cardamom sugar swirl.",
      image: "/placeholder.svg",
      pricePerPiece: "5.25",
      priceWhole: null
    },
  ],
  drinks: [
    {
      name: "Artisan Coffee",
      description: "Freshly brewed coffee from local roasters.",
      image: "/placeholder.svg",
      pricePerPiece: "4.00",
      priceWhole: null
    },
    {
      name: "Fresh Juice",
      description: "A selection of seasonal fresh juices.",
      image: "/placeholder.svg",
      pricePerPiece: "6.00",
      priceWhole: null
    },
    {
      name: "Mediterranean Mint Tea",
      description: "Refreshing mint tea served hot or iced.",
      image: "/placeholder.svg",
      pricePerPiece: "4.50",
      priceWhole: null
    },
  ],
  iceCream: [
    {
      name: "Homemade Ice Cream",
      description: "Creamy, artisanal ice cream in various flavors.",
      image: "/placeholder.svg",
      pricePerPiece: "5.50",
      priceWhole: "32.00"
    },
    {
      name: "Pistachio Gelato",
      description: "Rich pistachio gelato made with imported nuts.",
      image: "/placeholder.svg",
      pricePerPiece: "6.00",
      priceWhole: "35.00"
    },
    {
      name: "Rose Water Sorbet",
      description: "Light and fragrant dairy-free sorbet with subtle floral notes.",
      image: "/placeholder.svg",
      pricePerPiece: "5.75",
      priceWhole: "34.00"
    },
  ],
};

// Category label mapping for display
const categoryLabels = {
  cakes: "Cakes",
  pastries: "Pastries",
  drinks: "Drinks",
  iceCream: "Ice Cream",
};

// URL parameter to menu key mapping with additional variants
const urlToMenuKey = {
  'cakes': 'cakes',
  'pastries': 'pastries', 
  'drinks': 'drinks',
  'ice-cream': 'iceCream',
  'icecream': 'iceCream', // Handle without hyphen
  'ice cream': 'iceCream', // Handle with space
  'icecreams': 'iceCream', // Handle potential plural
  'ice-creams': 'iceCream' // Handle potential plural with hyphen
};

export default function CategoryPage() {
  const params = useParams();
  const [category, setCategory] = useState("");
  const [items, setItems] = useState([]);
  const [isHomeButtonHovered, setIsHomeButtonHovered] = useState(false);
  const [isBackButtonHovered, setIsBackButtonHovered] = useState(false);
  
  useEffect(() => {
    if (!params || !params.category) return;
    
    // Get category from URL and validate it - clean and normalize
    const urlCategory = (params.category as string).trim().toLowerCase();
    
    // Handle both kebab-case and camelCase URLs with enhanced mapping
    const menuKey = urlToMenuKey[urlCategory] || urlCategory;
    
    if (menuKey && menu[menuKey]) {
      setCategory(menuKey);
      setItems(menu[menuKey]);
    } else {
      // Additional fallback: try to match any menu key that contains the URL segment
      const menuKeys = Object.keys(menu);
      const matchingKey = menuKeys.find(key => 
        key.toLowerCase().includes(urlCategory) || 
        urlCategory.includes(key.toLowerCase())
      );
      
      if (matchingKey) {
        setCategory(matchingKey);
        setItems(menu[matchingKey]);
      }
    }
  }, [params]);
  
  // Button hover animation
  const buttonHoverVariants = {
    rest: { 
      background: "linear-gradient(to right, #D4AF37, #f0e6bc, #D4AF37)",
      backgroundSize: "200% 100%",
      backgroundPosition: "0% 50%",
      scale: 1,
      boxShadow: "0 2px 12px rgba(212,175,55,0.2)",
      transition: { duration: 1.0 }
    },
    hover: { 
      backgroundPosition: "100% 50%",
      scale: 1.03,
      boxShadow: "0 12px 35px rgba(212,175,55,0.6)",
      transition: { duration: 1.2 }
    }
  };
  
  // If category not found
  if (!category) {
    return (
      <div className="min-h-screen flex flex-col bg-[#fdf7e3] text-[#1a2b48] font-sans">
        <main className="flex-grow flex flex-col items-center justify-center pt-6 px-4">
          <h1 className="text-3xl font-bold mb-6">Category not found</h1>
          <Link 
            href="/menu"
            className="px-8 py-3 bg-[#1a2b48] text-white rounded-lg hover:bg-opacity-90 transition-all"
          >
            Back to Menu
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fdf7e3] text-[#1a2b48] font-sans">
      <main className="flex-grow pt-6">
        {/* Hero/Banner with navy background */}
        <section className="relative flex items-center justify-center h-[25vh] sm:h-[30vh] bg-[#1a2b48] mb-16">
          {/* Top border line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-white opacity-20"></div>
          
          {/* Background patterns */}
          <div className="absolute inset-0 pointer-events-none bg-[url('/imgs/gold-pattern.png')] bg-repeat opacity-10 mix-blend-overlay"></div>
          
          {/* Geometric shapes for visual interest */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -left-20 -top-20 w-72 h-72 rounded-full border border-[#e4c96b] opacity-15"></div>
            <div className="absolute -right-40 -bottom-20 w-96 h-96 rounded-full border border-[#e4c96b] opacity-10"></div>
            <div className="absolute right-1/4 top-1/3 w-20 h-20 rounded-full border border-white opacity-10"></div>
            <div className="absolute left-1/4 bottom-1/4 w-16 h-16 border-2 border-[#e4c96b] opacity-10 rotate-45"></div>
          </div>
          
          {/* Hero content */}
          <motion.div 
            className="relative z-10 text-center px-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#D4AF37] via-[#e6c76e] to-[#bfa14b] text-transparent bg-clip-text drop-shadow-lg">
              {categoryLabels[category]}
            </h1>
            <p className="text-white text-lg sm:text-xl font-sans max-w-xl mx-auto mt-3">
              Our selection of {category === 'iceCream' ? 'ice cream' : category} made fresh daily with the finest ingredients
            </p>
          </motion.div>
          
          {/* Bottom border line */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white opacity-20"></div>
        </section>
        
        {/* Navigation buttons */}
        <div className="flex justify-center space-x-6 mb-12">
          {/* Home button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 80,
              damping: 25,
              mass: 1.3,
              delay: 0.5,
              duration: 1.8
            }}
          >
            <motion.div
              variants={buttonHoverVariants}
              initial="rest"
              animate={isHomeButtonHovered ? "hover" : "rest"}
              className="relative overflow-hidden rounded-full shadow-lg"
              onMouseEnter={() => setIsHomeButtonHovered(true)}
              onMouseLeave={() => setIsHomeButtonHovered(false)}
            >
              <Link 
                href="/" 
                className="flex items-center px-8 py-4 text-lg font-semibold tracking-wide text-[#1a2b48]"
              >
                <motion.span 
                  className="inline-flex items-center mr-3"
                  animate={isHomeButtonHovered ? { x: -6 } : { x: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 80,
                    damping: 20,
                    duration: 1.0
                  }}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </motion.span>
                Home
              </Link>
              {/* Glow effect overlay */}
              <motion.div 
                className="absolute inset-0 pointer-events-none"
                animate={isHomeButtonHovered ? { opacity: 0.7 } : { opacity: 0 }}
                transition={{ duration: 1.0 }}
                style={{
                  background: "radial-gradient(circle at center, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)",
                  mixBlendMode: "overlay"
                }}
              />
            </motion.div>
          </motion.div>

          {/* Back to Menu button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 80,
              damping: 25,
              mass: 1.3,
              delay: 0.7,
              duration: 1.8
            }}
          >
            <motion.div
              variants={buttonHoverVariants}
              initial="rest"
              animate={isBackButtonHovered ? "hover" : "rest"}
              className="relative overflow-hidden rounded-full shadow-lg"
              onMouseEnter={() => setIsBackButtonHovered(true)}
              onMouseLeave={() => setIsBackButtonHovered(false)}
            >
              <Link 
                href="/menu" 
                className="flex items-center px-8 py-4 text-lg font-semibold tracking-wide text-[#1a2b48]"
              >
                <motion.span 
                  className="inline-flex items-center mr-3"
                  animate={isBackButtonHovered ? { x: -6 } : { x: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 80,
                    damping: 20,
                    duration: 1.0
                  }}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </motion.span>
                Menu
              </Link>
              <motion.div 
                className="absolute inset-0 pointer-events-none"
                animate={isBackButtonHovered ? { opacity: 0.7 } : { opacity: 0 }}
                transition={{ duration: 1.0 }}
                style={{
                  background: "radial-gradient(circle at center, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)",
                  mixBlendMode: "overlay"
                }}
              />
            </motion.div>
          </motion.div>
        </div>
        
        {/* Item Cards */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {items.map((item, index) => (
              <motion.div
                key={`${category}-${index}`}
                initial={{ 
                  opacity: 0, 
                  y: 30,
                  x: index % 2 === 0 ? -20 : 20,
                  scale: 0.95 
                }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0, 
                  x: 0,
                  scale: 1 
                }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 60, 
                  damping: 20, 
                  mass: 1.3, 
                  delay: index * 0.1,
                  duration: 1.5 
                }}
                whileHover={{ 
                  scale: 1.03,
                  transition: { duration: 0.7 }
                }}
                className="h-full"
              >
                <div className="flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500">
                  {/* Image */}
                  <div className="relative h-52 w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index < 3}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a2b48]/30 to-transparent pointer-events-none"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-[#1a2b48] mb-2">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 text-base mb-4">
                        {item.description}
                      </p>
                    </div>
                    
                    {/* Pricing */}
                    <div className="mt-auto">
                      <div className="border-t border-gray-200 pt-4 mt-4">
                        {item.pricePerPiece && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">
                              {category === 'iceCream' ? 'Per Scoop' : 'Per Piece'}
                            </span>
                            <span className="font-medium text-[#1a2b48]">€{item.pricePerPiece}</span>
                          </div>
                        )}
                        {item.priceWhole && (
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-gray-600">
                              {category === 'iceCream' 
                                ? 'Per Cone' 
                                : category === 'cakes' 
                                  ? 'Whole Cake' 
                                  : 'Whole'}
                            </span>
                            <span className="font-medium text-[#1a2b48]">€{item.priceWhole}</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Order Button */}
                      <motion.button
                        className="w-full mt-5 py-3 bg-[#1a2b48] text-white rounded-lg font-medium flex items-center justify-center group"
                        whileHover={{ 
                          backgroundColor: '#2a3b58',
                          transition: { duration: 0.3 } 
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>Order Now</span>
                        <motion.span 
                          className="ml-2"
                          initial={{ x: 0 }}
                          whileHover={{ x: 4 }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 100,
                            damping: 18,
                            duration: 0.8
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </motion.span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}