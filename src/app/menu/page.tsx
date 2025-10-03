'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const menu = {
  cakes: [
    {
      name: "Basque Cheesecake",
      description: "Our signature creamy, crustless cheesecake with a caramelized top.",
      image: "/placeholder.svg",
    },
    {
      name: "Pistachio Cake",
      description: "A rich and nutty cake layered with pistachio cream.",
      image: "/placeholder.svg",
    },
    {
      name: "Raspberry-Pistachio Birthday Cake",
      description: "A festive cake perfect for celebrations.",
      image: "/placeholder.svg",
    },
  ],
  pastries: [
    {
      name: "Croissant",
      description: "Buttery and flaky, baked fresh daily.",
      image: "/placeholder.svg",
    },
    {
      name: "Pain au Chocolat",
      description: "A classic French pastry with dark chocolate.",
      image: "/placeholder.svg",
    },
  ],
  drinks: [
    {
      name: "Artisan Coffee",
      description: "Freshly brewed coffee from local roasters.",
      image: "/placeholder.svg",
    },
    {
      name: "Fresh Juice",
      description: "A selection of seasonal fresh juices.",
      image: "/placeholder.svg",
    },
  ],
  iceCream: [
    {
      name: "Homemade Ice Cream",
      description: "Creamy, artisanal ice cream in various flavors.",
      image: "/placeholder.svg",
    },
  ],
};

// Category label mapping for clean URLs and display
const categoryLabels = {
  cakes: "Cakes",
  pastries: "Pastries",
  drinks: "Drinks",
  iceCream: "Ice Cream",
};

export default function MenuPage() {
  const [isHomeButtonHovered, setIsHomeButtonHovered] = useState(false);
  
  // Animation variants for container staggering effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.35,    // Stagger children animations
        delayChildren: 0.3,       // Initial delay before first animation
      }
    }
  };
  
  // Left slide animation for even-indexed cards
  const cardVariantsLeft = {
    hidden: { x: -120, opacity: 0, scale: 0.9 },  
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 60,    // Smoother motion
        damping: 20,      // Controlled movement
        mass: 1.3,        // Weightier feel
        duration: 1.5     // Longer animation
      }
    }
  };
  
  // Right slide animation for odd-indexed cards
  const cardVariantsRight = {
    hidden: { x: 120, opacity: 0, scale: 0.9 },  
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 60,
        damping: 20,
        mass: 1.3,
        duration: 1.5
      }
    }
  };
  
  // Home button entrance animation
  const homeButtonVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 80,
        damping: 25,
        mass: 1.3,
        delay: 1.0,      // Delay for dramatic timing
        duration: 1.8
      }
    }
  };
  
  // Home button hover animation
  const homeButtonHoverVariants = {
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
  
  return (
    <div className="min-h-screen flex flex-col bg-[#fdf7e3] text-[#1a2b48] font-sans">
      <main className="flex-grow pt-6">
        {/* Hero/Banner with navy background */}
        <section className="relative flex items-center justify-center h-[30vh] sm:h-[36vh] bg-[#1a2b48] mb-16">
          {/* Top border line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-white opacity-20"></div>
          
          {/* Background patterns */}
          <div className="absolute inset-0 pointer-events-none bg-[url('/imgs/gold-pattern.png')] bg-repeat opacity-10 mix-blend-overlay"></div>
          
          {/* Geometric shapes for visual interest */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -left-20 -top-20 w-72 h-72 rounded-full border border-[#e4c96b] opacity-15"></div>
            <div className="absolute -right-40 -bottom-20 w-96 h-96 rounded-full border border-[#e4c96b] opacity-10"></div>
            <div className="absolute right-1/4 top-1/3 w-20 h-20 rounded-full border border-white opacity-10"></div>
            
            {/* Additional modern geometric elements */}
            <div className="absolute left-1/4 bottom-1/4 w-16 h-16 border-2 border-[#e4c96b] opacity-10 rotate-45"></div>
            <div className="absolute right-1/3 top-1/4 w-24 h-24 border border-white opacity-10 rounded-md transform -rotate-12"></div>
          </div>
          
          {/* Hero content */}
          <motion.div 
            className="relative z-10 text-center px-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#D4AF37] via-[#e6c76e] to-[#bfa14b] text-transparent bg-clip-text drop-shadow-lg">
              Our Menu
            </h1>
            <p className="text-white text-lg sm:text-xl font-sans max-w-xl mx-auto mt-3">
              Discover our Mediterranean-inspired cakes and pastries, crafted with love and the finest ingredients.
            </p>
          </motion.div>
          
          {/* Bottom border line */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white opacity-20"></div>
        </section>
        
        {/* Animated Home Button - positioned below hero */}
        <div className="flex justify-center mb-12">
          <motion.div
            variants={homeButtonVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={homeButtonHoverVariants}
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
        </div>
        
        {/* Menu Sections - Vertical Layout with Navy Cards */}
        <div className="max-w-5xl mx-auto w-full px-4 sm:px-8 pb-20">
          {Object.entries(menu).map(([category, items]) => (
            <section key={category} className="mb-20">
              <motion.h2 
                className="font-serif text-3xl sm:text-4xl font-bold capitalize mb-10 text-[#1a2b48] text-center relative"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                <span className="relative inline-block pb-2">
                  {categoryLabels[category]}
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-[#D4AF37] to-[#e4c96b]"></span>
                </span>
              </motion.h2>
              
              <motion.div 
                className="space-y-12"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                {items.map((item, index) => (
                  <motion.div
                    key={`${category}-${index}`}
                    initial={{ 
                      x: index % 2 === 0 ? -120 : 120, 
                      opacity: 0, 
                      scale: 0.9 
                    }}
                    whileInView={{ 
                      x: 0, 
                      opacity: 1, 
                      scale: 1 
                    }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 60, 
                      damping: 20, 
                      mass: 1.3, 
                      duration: 1.5 
                    }}
                    whileHover={{ 
                      scale: 1.015,
                      transition: { duration: 0.9 }
                    }}
                  >
                    <Link 
                      href={`/menu/${category.toLowerCase()}`}
                      className="block group"
                    >
                      <div className="bg-[#1a2b48] rounded-xl overflow-hidden shadow-lg hover:shadow-[0_12px_40px_-8px_rgba(26,43,72,0.5)] transition-all duration-700 flex flex-col md:flex-row md:h-[380px]">
                        {/* Image - Takes full width on mobile, half width on desktop */}
                        <div className="relative w-full md:w-1/2 h-72 md:h-full overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-1200"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority={index === 0}
                          />
                          {/* Image overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#1a2b48]/70 to-transparent md:bg-gradient-to-l md:from-[#1a2b48]/70 md:to-transparent pointer-events-none"></div>
                        </div>
                        
                        {/* Content */}
                        <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
                          <h3 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-white group-hover:text-[#e4c96b] transition-colors duration-900">
                            {item.name}
                          </h3>
                          <p className="text-gray-300 text-lg font-sans leading-relaxed">
                            {item.description}
                          </p>
                          <div className="mt-8 flex items-center">
                            <span className="text-[#e4c96b] font-medium text-lg">View details</span>
                            <motion.div
                              className="ml-2 text-[#e4c96b]"
                              animate={{ x: 0 }}
                              whileHover={{ x: 8 }}
                              transition={{ 
                                type: "spring", 
                                stiffness: 100,
                                damping: 18,
                                duration: 0.8
                              }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                              </svg>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
              
              {/* View All Category Link Button */}
              <motion.div 
                className="mt-16 text-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1.2 }}
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.03,
                    transition: { duration: 0.9 }
                  }}
                  whileTap={{ 
                    scale: 0.97,
                    transition: { duration: 0.3 }
                  }}
                >
                  <Link 
                    href={`/menu/${category.toLowerCase()}`}
                    className="inline-flex items-center justify-center px-8 py-4 bg-[#fdf7e3] border border-[#1a2b48] text-[#1a2b48] font-medium rounded-lg hover:bg-[#1a2b48] hover:text-white transition-all duration-700 group shadow-md"
                  >
                    <span>View all {categoryLabels[category]}</span>
                    <motion.div
                      className="ml-2"
                      animate={{ x: 0 }}
                      whileHover={{ x: 8 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 100,
                        damping: 18,
                        duration: 0.8
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </Link>
                </motion.div>
              </motion.div>
            </section>
          ))}
        </div>
      </main>
      {/* Footer removed from here - it's already in the layout */}
    </div>
  );
}
