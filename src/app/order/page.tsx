'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Crisp } from 'crisp-sdk-web';

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
      { id: "m4", name: "&quot;Mango Sunrise&quot; Mousse Cake", price: 32, image: "/placeholder.svg", description: "Tropical mango mousse with a sunrise gradient effect." },
      { id: "m5", name: "Truffle Cake", price: 34, image: "/placeholder.svg", description: "Decadent chocolate truffle cake with rich ganache." },
      { id: "m6", name: "Chocolate Mousse Cake", price: 34, image: "/placeholder.svg", description: "Classic chocolate mousse on a light sponge base." },
    ]
  },
  spongeCakes: {
    title: "Sponge Cakes",
    items: [
      { id: "s1", name: "&quot;Hazelnut Dream&quot; (Hazelnut - Milk chocolate – Raspberry)", price: 30, image: "/placeholder.svg", description: "Hazelnut sponge with milk chocolate and raspberry filling." },
      { id: "s2", name: "&quot;Fantasy&quot; (Raspberry – Pistachio)", price: 30, image: "/placeholder.svg", description: "Delicate sponge with raspberry compote and pistachio cream." },
      { id: "s3", name: "Pistachio Sponge Cake (Pistachio – Coconut)", price: 30, image: "/placeholder.svg", description: "Pistachio-flavored sponge with coconut cream layers." },
      { id: "s4", name: "Brownie Cake (Chocolate – Creamcheese – Pecans)", price: 32, image: "/placeholder.svg", description: "Rich brownie base with cream cheese frosting and pecans." },
      { id: "s5", name: "Strawberry Sponge Cake", price: 30, image: "/placeholder.svg", description: "Light sponge with fresh strawberry filling." },
      { id: "s6", name: "Blueberry Honey Sponge Cake", price: 30, image: "/placeholder.svg", description: "Honey-infused sponge with blueberry filling." },
      { id: "s7", name: "Carrot – Mango Sponge Cake", price: 30, image: "/placeholder.svg", description: "Spiced carrot cake with tropical mango cream." },
      { id: "s8", name: "Plain Vanilla Sponge Cake", price: 30, image: "/placeholder.svg", description: "Classic vanilla sponge with light vanilla cream." },
      { id: "s9", name: "&quot;Cherry Cheesecake&quot; Sponge Cake", price: 30, image: "/placeholder.svg", description: "Sponge layers with cheesecake filling and cherry topping." },
      { id: "s10", name: "Chocolate - Berry (Vegan) Sponge Cake", price: 32, image: "/placeholder.svg", description: "Vegan chocolate sponge with mixed berry filling." },
    ]
  },
  cheesecakes: {
    title: "Cheesecakes",
    items: [
      { id: "c1", name: "Cheesecake", price: 32, image: "/placeholder.svg", description: "Our classic rich and creamy cheesecake." },
      { id: "c2", name: "Baklava Cheesecake", price: 34, image: "/placeholder.svg", description: "Middle Eastern inspired cheesecake with baklava layers." },
      { id: "c3", name: "Basque Cheesecake", price: 30, image: "/placeholder.svg", description: "Spanish-style burnt cheesecake with caramelized top." },
      { id: "c4", name: "Marble Cheesecake", price: 30, image: "/placeholder.svg", description: "Classic cheesecake with chocolate marble swirls." },
      { id: "c5", name: "Classic / Strawberry Cheesecake", price: 30, image: "/placeholder.svg", description: "Traditional cheesecake with optional strawberry topping." },
      { id: "c6", name: "Raspberry & Pistachio Cheesecake", price: 30, image: "/placeholder.svg", description: "Creamy cheesecake with raspberry coulis and pistachio crust." },
      { id: "c7", name: "Triple Chocolate Cheesecake", price: 30, image: "/placeholder.svg", description: "Decadent three-layer chocolate cheesecake." },
      { id: "c8", name: "Berry Cheesecake", price: 30, image: "/placeholder.svg", description: "Creamy cheesecake topped with mixed berry compote." },
      { id: "c9", name: "Vanilla Flan Cheesecake", price: 28, image: "/placeholder.svg", description: "Vanilla cheesecake with caramel flan layer." },
      { id: "c10", name: "Pistachio Tiramisu Cheesecake", price: 28, image: "/placeholder.svg", description: "Tiramisu-inspired cheesecake with pistachio flavor." },
    ]
  },
  otherCakes: {
    title: "Other Cakes/Tarts/Pies",
    items: [
      { id: "o1", name: "Pecan Tart", price: 29, image: "/placeholder.svg", description: "Sweet tart with caramelized pecans.", perItem: true },
      { id: "o2", name: "&quot;Pavlova&quot; Cake (Meringue – Mascarpone – Strawberries)", price: 35, image: "/placeholder.svg", description: "Delicate meringue base with mascarpone cream and fresh strawberries.", perItem: true },
      { id: "o3", name: "Lemon Tart", price: 24, image: "/placeholder.svg", description: "Tangy lemon filling in a buttery pastry shell.", perItem: true },
      { id: "o4", name: "Berry Tart (Blueberry)", price: 30, image: "/placeholder.svg", description: "Buttery tart filled with blueberry compote.", perItem: true },
      { id: "o5", name: "Berry Tart (Mixed Berries)", price: 28, image: "/placeholder.svg", description: "Buttery tart filled with mixed berry compote.", perItem: true },
      { id: "o6", name: "Berry Tart (Vanilla pastry cream - Berries)", price: 32, image: "/placeholder.svg", description: "30cm tart with vanilla pastry cream and fresh berries.", perItem: true },
      { id: "o7", name: "&quot;Napoleon&quot; Cake", price: 35, image: "/placeholder.svg", description: "Classic French mille-feuille with layers of puff pastry and pastry cream." },
      { id: "o8", name: "&quot;Forest&quot; Cake", price: 35, image: "/placeholder.svg", description: "Rich cake with pastry cream, black currant, and almonds." },
      { id: "o9", name: "Black Apple & Caramel Pie", price: 32, image: "/placeholder.svg", description: "Caramelized apple pie with a unique black apple filling." },
      { id: "o10", name: "Chocolate & Cherry Pie", price: 32, image: "/placeholder.svg", description: "Rich chocolate filling with cherry compote in a buttery crust." },
    ]
  }
};

export default function OrderPage() {
  // State for selected items and order details
  const [selectedItems, setSelectedItems] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    deliveryMethod: 'pickup',
    address: ''
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [activeCategory, setActiveCategory] = useState('honeyCakes');

  // Initialize Crisp chat
  useEffect(() => {
    Crisp.configure('YOUR_WEBSITE_ID'); // Replace with your Crisp Website ID
  }, []);

  // Calculate total price whenever selected items change
  useEffect(() => {
    let total = 0;
    selectedItems.forEach(item => {
      total += item.price * item.quantity * item.weight;
    });
    setTotalPrice(total);
  }, [selectedItems]);

  // Add item to cart
  const addItem = (item, weight = 1, quantity = 1, notes = '') => {
    const existingItemIndex = selectedItems.findIndex(i => 
      i.id === item.id && i.weight === weight && i.notes === notes);

    if (existingItemIndex !== -1) {
      // Item with same specs exists, update quantity
      const newItems = [...selectedItems];
      newItems[existingItemIndex].quantity += quantity;
      setSelectedItems(newItems);
    } else {
      // Add new item
      setSelectedItems([
        ...selectedItems,
        {
          ...item,
          weight,
          quantity,
          notes
        }
      ]);
    }
  };

  // Remove item from cart
  const removeItem = (index) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  };

  // Handle customer info
  const handleCustomerInfoChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare order data for submission
    const orderData = {
      customer: customerInfo,
      items: selectedItems,
      total: totalPrice,
      orderDate: new Date().toISOString()
    };
    
    console.log('Order submitted:', orderData);
    // Here you would normally send this to your backend
    // For example: fetch('/api/orders', { method: 'POST', body: JSON.stringify(orderData) })
    
    // Show confirmation
    alert('Thank you for your order! We will contact you shortly to confirm.');
  };

  return (
    <div className="min-h-screen bg-[#fdf7e3] text-[#1a2b48]">
      {/* Hero Banner */}
      <div className="relative bg-[#1a2b48] h-[30vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('/imgs/gold-pattern.png')] opacity-10 mix-blend-overlay"></div>
        <div className="text-center z-10 px-4">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#D4AF37] via-[#e6c76e] to-[#bfa14b] text-transparent bg-clip-text drop-shadow-lg">
            Order Now
          </h1>
          <p className="text-white mt-4 max-w-2xl mx-auto">
            Select from our handcrafted cakes and pastries, made fresh with the finest ingredients
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cake Selection Area - 2/3 width on desktop */}
          <div className="lg:w-2/3">
            {/* Category Navigation */}
            <nav className="mb-8 overflow-x-auto whitespace-nowrap pb-2">
              <div className="flex space-x-4">
                {Object.keys(cakeData).map(category => (
                  <button
                    key={category}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCategory === category 
                        ? 'bg-[#1a2b48] text-white shadow-lg' 
                        : 'bg-white text-[#1a2b48] hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {cakeData[category].title}
                  </button>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cakeData[activeCategory].items.map((cake) => (
                <motion.div
                  key={cake.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-48">
                    <Image
                      src={cake.image}
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
                      <button
                        onClick={() => addItem(cake)}
                        className="bg-[#1a2b48] hover:bg-opacity-90 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                      >
                        Add to Order
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Order Summary & Customer Info - 1/3 width on desktop */}
          <div className="lg:w-1/3 mt-8 lg:mt-0">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <h2 className="text-2xl font-bold mb-6 text-center">Your Order</h2>
              
              {/* Order Items */}
              <div className="mb-6 max-h-[400px] overflow-y-auto">
                {selectedItems.length === 0 ? (
                  <p className="text-center text-gray-500 my-8">
                    Your order is empty. Please select some delicious cakes!
                  </p>
                ) : (
                  <div className="space-y-4">
                    {selectedItems.map((item, index) => (
                      <div key={index} className="flex justify-between items-center pb-3 border-b">
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <div className="flex text-sm text-gray-600 mt-1">
                            <span>
                              {item.weight}kg × {item.quantity} 
                              {item.perItem ? ' items' : ''}
                            </span>
                            {item.notes && (
                              <span className="ml-2 italic">&quot;{item.notes}&quot;</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium mr-3">
                            €{(item.price * item.weight * item.quantity).toFixed(2)}
                          </span>
                          <button 
                            onClick={() => removeItem(index)}
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
                  <div>
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
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={selectedItems.length === 0}
                  className={`w-full py-3 rounded-lg font-medium text-center text-white transition-colors ${
                    selectedItems.length === 0 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-[#1a2b48] hover:bg-opacity-90'
                  }`}
                >
                  Submit Order
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}