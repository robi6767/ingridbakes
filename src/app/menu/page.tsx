'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Cake data structure organized by categories
const cakeData = {
  honeyCakes: {
    title: "Honey Cakes",
    items: [
      { id: "h1", name: "Classic Honey Cake", price: 30, image: "/placeholder.svg", description: "Our traditional honey cake with delicate layers and sweet honey cream." },
      { id: "h2", name: "Chocolate – Cherry Honey Cake", price: 30, image: "/placeholder.svg", description: "Rich chocolate layers with cherry filling and honey cream." },
      { id: "h3", name: "Chocolate Caramel Honey Cake", price: 32, image: "/placeholder.svg", description: "Decadent chocolate cake with caramel and honey infusion." },
      { id: "h4", name: "Orange Honey Cake", price: 30, image: "/placeholder.svg", description: "Citrus-infused honey cake with light orange cream." },
      { id: "h5", name: "Mint – Lime Honey Cake", price: 30, image: "/placeholder.svg", description: "Refreshing mint and lime flavors complement the sweet honey layers." },
      { id: "h6", name: "Chocolate – Vanilla Honey Cake", price: 30, image: "/placeholder.svg", description: "Classic combination of chocolate and vanilla with honey cream." },
      { id: "h7", name: "Chocolate – Mint - Lime Honey Cake", price: 30, image: "/placeholder.svg", description: "A complex flavor profile of chocolate, mint, lime and honey." },
      { id: "h8", name: "Pistachio – Cherry Honey Cake", price: 35, image: "/placeholder.svg", description: "Luxury honey cake with pistachio cream and cherry filling." },
      { id: "h9", name: "Cherry Honey Cake", price: 30, image: "/placeholder.svg", description: "Honey-infused layers with sweet cherry filling throughout." },
    ]
  },
  mousseCakes: {
    title: "Mousse Cakes",
    items: [
      { id: "m1", name: "Mandarin – Vanilla Mousse Cake", price: 32, image: "/placeholder.svg", description: "Light vanilla mousse with fresh mandarin flavor." },
      { id: "m2", name: "Strawberry – Mascarpone Mousse Cake", price: 32, image: "/placeholder.svg", description: "Creamy mascarpone mousse with fresh strawberry layers." },
      { id: "m3", name: "Blueberry Yogurt Mousse Cake", price: 32, image: "/placeholder.svg", description: "Tangy yogurt mousse with blueberry compote." },
      { id: "m4", name: "Mango Sunrise Mousse Cake", price: 32, image: "/placeholder.svg", description: "Tropical mango mousse with a sunrise gradient effect." },
      { id: "m5", name: "Truffle Cake", price: 34, image: "/placeholder.svg", description: "Decadent chocolate truffle cake with rich ganache." },
      { id: "m6", name: "Chocolate Mousse Cake", price: 34, image: "/placeholder.svg", description: "Classic chocolate mousse on a light sponge base." },
    ]
  },
  spongeCakes: {
    title: "Sponge Cakes",
    items: [
      { id: "s1", name: "Hazelnut Dream", price: 30, description: "Hazelnut sponge with milk chocolate and raspberry filling.", image: "/placeholder.svg" },
      { id: "s2", name: "Fantasy", price: 30, description: "Delicate sponge with raspberry compote and pistachio cream.", image: "/placeholder.svg" },
      { id: "s3", name: "Pistachio Sponge Cake", price: 30, description: "Pistachio-flavored sponge with coconut cream layers.", image: "/placeholder.svg" },
      { id: "s4", name: "Brownie Cake", price: 32, description: "Rich brownie base with cream cheese frosting and pecans.", image: "/placeholder.svg" },
      { id: "s5", name: "Strawberry Sponge Cake", price: 30, description: "Light sponge with fresh strawberry filling.", image: "/placeholder.svg" },
      { id: "s6", name: "Blueberry Honey Sponge Cake", price: 30, description: "Honey-infused sponge with blueberry filling.", image: "/placeholder.svg" },
      { id: "s7", name: "Carrot – Mango Sponge Cake", price: 30, description: "Spiced carrot cake with tropical mango cream.", image: "/placeholder.svg" },
      { id: "s8", name: "Plain Vanilla Sponge Cake", price: 30, description: "Classic vanilla sponge with light vanilla cream.", image: "/placeholder.svg" },
      { id: "s9", name: "Cherry Cheesecake Sponge Cake", price: 30, description: "Sponge layers with cheesecake filling and cherry topping.", image: "/placeholder.svg" },
      { id: "s10", name: "Chocolate - Berry (Vegan) Sponge Cake", price: 32, description: "Vegan chocolate sponge with mixed berry filling.", image: "/placeholder.svg" },
    ]
  },
  cheesecakes: {
    title: "Cheesecakes",
    items: [
      { id: "c1", name: "Cheesecake", price: 32, description: "Our classic rich and creamy cheesecake.", image: "/placeholder.svg" },
      { id: "c2", name: "Baklava Cheesecake", price: 34, description: "Middle Eastern inspired cheesecake with baklava layers.", image: "/placeholder.svg" },
      { id: "c3", name: "Basque Cheesecake", price: 30, description: "Spanish-style burnt cheesecake with caramelized top.", image: "/placeholder.svg" },
      { id: "c4", name: "Marble Cheesecake", price: 30, description: "Classic cheesecake with chocolate marble swirls.", image: "/placeholder.svg" },
      { id: "c5", name: "Classic / Strawberry Cheesecake", price: 30, description: "Traditional cheesecake with optional strawberry topping.", image: "/placeholder.svg" },
      { id: "c6", name: "Raspberry & Pistachio Cheesecake", price: 30, description: "Creamy cheesecake with raspberry coulis and pistachio crust.", image: "/placeholder.svg" },
      { id: "c7", name: "Triple Chocolate Cheesecake", price: 30, description: "Decadent three-layer chocolate cheesecake.", image: "/placeholder.svg" },
      { id: "c8", name: "Berry Cheesecake", price: 30, description: "Creamy cheesecake topped with mixed berry compote.", image: "/placeholder.svg" },
      { id: "c9", name: "Vanilla Flan Cheesecake", price: 28, description: "Vanilla cheesecake with caramel flan layer.", image: "/placeholder.svg" },
      { id: "c10", name: "Pistachio Tiramisu Cheesecake", price: 28, description: "Tiramisu-inspired cheesecake with pistachio flavor.", image: "/placeholder.svg" },
    ]
  },
  otherCakes: {
    title: "Other Cakes/Tarts/Pies",
    items: [
      { id: "o1", name: "Pecan Tart", price: 29, description: "Sweet tart with caramelized pecans.", image: "/placeholder.svg", perItem: true },
      { id: "o2", name: "Pavlova Cake", price: 35, description: "Delicate meringue base with mascarpone cream and fresh strawberries.", image: "/placeholder.svg", perItem: true },
      { id: "o3", name: "Lemon Tart", price: 24, description: "Tangy lemon filling in a buttery pastry shell.", image: "/placeholder.svg", perItem: true },
      { id: "o4", name: "Berry Tart (Blueberry)", price: 30, description: "Buttery tart filled with blueberry compote.", image: "/placeholder.svg", perItem: true },
      { id: "o5", name: "Berry Tart (Mixed Berries)", price: 28, description: "Buttery tart filled with mixed berry compote.", image: "/placeholder.svg", perItem: true },
      { id: "o6", name: "Berry Tart (Vanilla pastry cream - Berries)", price: 32, description: "30cm tart with vanilla pastry cream and fresh berries.", image: "/placeholder.svg", perItem: true },
      { id: "o7", name: "Napoleon Cake", price: 35, description: "Classic French mille-feuille with layers of puff pastry and pastry cream.", image: "/placeholder.svg" },
      { id: "o8", name: "Forest Cake", price: 35, description: "Rich cake with pastry cream, black currant, and almonds.", image: "/placeholder.svg" },
      { id: "o9", name: "Black Apple & Caramel Pie", price: 32, description: "Caramelized apple pie with a unique black apple filling.", image: "/placeholder.svg" },
      { id: "o10", name: "Chocolate & Cherry Pie", price: 32, description: "Rich chocolate filling with cherry compote in a buttery crust.", image: "/placeholder.svg" },
    ]
  }
};

// Crisp chat integration function
const initCrisp = () => {
  // Initialize Crisp chat client
  window.$crisp = [];
  window.CRISP_WEBSITE_ID = "c4dc44ea-90a4-4dea-b989-1befc2066555";
  
  // Load Crisp script
  const script = document.createElement('script');
  script.src = 'https://client.crisp.chat/l.js';
  script.async = true;
  document.head.appendChild(script);
};

export default function OrderPage() {
  // State for selected items and order details
  const [selectedItems, setSelectedItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('honeyCakes');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    deliveryMethod: 'pickup',
    address: ''
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedCake, setSelectedCake] = useState(null);
  const [weight, setWeight] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [comments, setComments] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize Crisp chat
  useEffect(() => {
    initCrisp();
  }, []);

  // Calculate total price whenever selected items change
  useEffect(() => {
    let total = 0;
    selectedItems.forEach(item => {
      total += item.price * item.quantity * item.weight;
    });
    setTotalPrice(total);
  }, [selectedItems]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 80, 
        damping: 12
      }
    }
  };

  const modalVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 25 }
    },
    exit: { 
      scale: 0.8, 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  // Handle adding item to cart
  const handleAddToCart = () => {
    if (!selectedCake) return;
    
    const newItem = {
      ...selectedCake,
      quantity,
      weight,
      comments,
      id: `${selectedCake.id}-${Date.now()}` // Ensure unique ID
    };
    
    setSelectedItems([...selectedItems, newItem]);
    setIsModalOpen(false);
    resetModal();
  };

  // Reset modal state
  const resetModal = () => {
    setSelectedCake(null);
    setWeight(1);
    setQuantity(1);
    setComments('');
  };

  // Open modal with selected cake
  const openCakeModal = (cake) => {
    setSelectedCake(cake);
    setWeight(cake.perItem ? 1 : 1);
    setIsModalOpen(true);
  };

  // Remove item from cart
  const removeItem = (id) => {
    setSelectedItems(selectedItems.filter(item => item.id !== id));
  };

  // Update customer info
  const handleCustomerInfoChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare order data
    const orderData = {
      customer: customerInfo,
      items: selectedItems,
      totalPrice,
      date: new Date().toISOString()
    };
    
    // Log the order data (would send to server in production)
    console.log('Order submitted:', orderData);
    
    // Show confirmation alert
    alert('Thank you for your order! We will contact you shortly to confirm.');
  };

  return (
    <div className="min-h-screen bg-[#fdf7e3] text-[#1a2b48]">
      {/* Hero Banner */}
      <div className="relative bg-[#1a2b48] h-[30vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('/imgs/gold-pattern.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -left-20 -top-20 w-72 h-72 rounded-full border border-[#e4c96b] opacity-15"></div>
          <div className="absolute -right-40 -bottom-20 w-96 h-96 rounded-full border border-[#e4c96b] opacity-10"></div>
          <div className="absolute right-1/4 top-1/3 w-20 h-20 rounded-full border border-white opacity-10"></div>
          <div className="absolute left-1/4 bottom-1/4 w-16 h-16 border-2 border-[#e4c96b] opacity-10 rotate-45"></div>
        </div>
        <div className="text-center z-10 px-4">
          <motion.h1 
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#D4AF37] via-[#e6c76e] to-[#bfa14b] text-transparent bg-clip-text drop-shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Order Now
          </motion.h1>
          <motion.p 
            className="text-white mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Select from our handcrafted cakes and pastries, made fresh with the finest ingredients
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cake Selection Area - 2/3 width on desktop */}
          <div className="lg:w-2/3">
            {/* Category Navigation */}
            <nav className="mb-8 overflow-x-auto whitespace-nowrap pb-2">
              <div className="flex space-x-4">
                {Object.keys(cakeData).map(category => (
                  <motion.button
                    key={category}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCategory === category 
                        ? 'bg-[#1a2b48] text-white shadow-lg' 
                        : 'bg-white text-[#1a2b48] hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveCategory(category)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {cakeData[category].title}
                  </motion.button>
                ))}
              </div>
            </nav>
            
            {/* Active Category Title */}
            <motion.h2 
              className="text-3xl font-serif font-bold mb-6 text-center relative"
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="relative inline-block pb-2">
                {cakeData[activeCategory].title}
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-[#D4AF37] to-[#e4c96b]"></span>
              </span>
            </motion.h2>
            
            {/* Cake Grid */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              key={activeCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {cakeData[activeCategory].items.map((cake) => (
                <motion.div
                  key={cake.id}
                  variants={itemVariants}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-48">
                    <Image
                      src={cake.image || "/placeholder.svg"}
                      alt={cake.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-2">{cake.name}</h3>
                    <p className="text-gray-600 mb-3 text-sm h-12 overflow-hidden">
                      {cake.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[#1a2b48] font-medium">
                        €{cake.price} {cake.perItem ? 'per item' : 'per kg'}
                      </span>
                      <motion.button
                        onClick={() => openCakeModal(cake)}
                        className="bg-[#1a2b48] hover:bg-opacity-90 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Add to Order
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Order Summary & Customer Info - 1/3 width on desktop */}
          <div className="lg:w-1/3 mt-8 lg:mt-0">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <h2 className="text-2xl font-bold mb-6 text-center">Your Order</h2>
              
              {/* Order Items */}
              <div className="mb-6 max-h-[300px] overflow-y-auto">
                {selectedItems.length === 0 ? (
                  <p className="text-center text-gray-500 my-8">
                    Your order is empty. Please select some delicious cakes!
                  </p>
                ) : (
                  <div className="space-y-4">
                    {selectedItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-center pb-3 border-b">
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <div className="flex text-sm text-gray-600 mt-1">
                            <span>
                              {item.weight}kg × {item.quantity} 
                              {item.perItem ? ' items' : ''}
                            </span>
                            {item.comments && (
                              <span className="ml-2 italic">&quot;{item.comments}&quot;</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium mr-3">
                            €{(item.price * item.weight * item.quantity).toFixed(2)}
                          </span>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Order Total */}
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Total:</span>
                  <span>€{totalPrice.toFixed(2)}</span>
                </div>
              </div>
              
              {/* Customer Information Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-bold text-xl mb-3">Your Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleCustomerInfoChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1a2b48] focus:border-[#1a2b48] outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleCustomerInfoChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1a2b48] focus:border-[#1a2b48] outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={customerInfo.email}
                    onChange={handleCustomerInfoChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1a2b48] focus:border-[#1a2b48] outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Method
                  </label>
                  <div className="flex gap-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="pickup"
                        checked={customerInfo.deliveryMethod === 'pickup'}
                        onChange={handleCustomerInfoChange}
                        className="text-[#1a2b48] focus:ring-[#1a2b48]"
                      />
                      <span className="ml-2">Pickup</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="delivery"
                        checked={customerInfo.deliveryMethod === 'delivery'}
                        onChange={handleCustomerInfoChange}
                        className="text-[#1a2b48] focus:ring-[#1a2b48]"
                      />
                      <span className="ml-2">Delivery</span>
                    </label>
                  </div>
                </div>
                
                {customerInfo.deliveryMethod === 'delivery' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="address">
                      Delivery Address
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={customerInfo.address}
                      onChange={handleCustomerInfoChange}
                      required
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1a2b48] focus:border-[#1a2b48] outline-none"
                    ></textarea>
                  </motion.div>
                )}
                
                <motion.button
                  type="submit"
                  disabled={selectedItems.length === 0}
                  className={`w-full py-3 rounded-lg font-medium text-center text-white transition-colors ${
                    selectedItems.length === 0 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-[#1a2b48] hover:bg-opacity-90'
                  }`}
                  whileHover={selectedItems.length > 0 ? { scale: 1.02 } : {}}
                  whileTap={selectedItems.length > 0 ? { scale: 0.98 } : {}}
                >
                  Submit Order
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Cake Customization Modal */}
      <AnimatePresence>
        {isModalOpen && selectedCake && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <motion.div 
              className="bg-white rounded-xl max-w-md w-full p-6"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4">{selectedCake.name}</h2>
              <form onSubmit={(e) => { e.preventDefault(); handleAddToCart(); }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {selectedCake.perItem ? 'Quantity' : 'Weight (kg)'}
                  </label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => setWeight(Math.max(selectedCake.perItem ? 1 : 0.5, weight - (selectedCake.perItem ? 1 : 0.5)))}
                      className="px-3 py-1 border border-gray-300 rounded-l-lg"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(Number(e.target.value))}
                      min={selectedCake.perItem ? 1 : 0.5}
                      step={selectedCake.perItem ? 1 : 0.5}
                      className="w-16 text-center border-t border-b border-gray-300 py-1"
                    />
                    <button
                      type="button"
                      onClick={() => setWeight(weight + (selectedCake.perItem ? 1 : 0.5))}
                      className="px-3 py-1 border border-gray-300 rounded-r-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {selectedCake.perItem ? 'Number of Items' : 'Quantity'}
                  </label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1 border border-gray-300 rounded-l-lg"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      min="1"
                      className="w-16 text-center border-t border-b border-gray-300 py-1"
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1 border border-gray-300 rounded-r-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Instructions (optional)
                  </label>
                  <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    rows="3"
                    placeholder="Any special requests for your cake..."
                  ></textarea>
                </div>
                
                <div className="pt-2">
                  <p className="font-medium text-lg mb-4">
                    Total: €{(selectedCake.price * weight * quantity).toFixed(2)}
                  </p>
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      Cancel
                    </button>
                    <motion.button
                      type="submit"
                      className="flex-1 py-2 bg-[#1a2b48] text-white rounded-lg hover:bg-opacity-90 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Add to Order
                    </motion.button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
