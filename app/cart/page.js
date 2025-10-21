'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaTrash, FaPlus, FaMinus, FaArrowLeft, FaLock } from 'react-icons/fa';
import Link from 'next/link';

// Mock cart data - in a real app, this would come from a context or state management
export const mockCartItems = [
  {
    id: 1,
    name: 'Diwali Diya Set',
    price: 1299,
    quantity: 2,
    image: '/images/diya-set.jpg',
    inStock: true
  },
  {
    id: 3,
    name: 'Silk Saree',
    price: 4599,
    quantity: 1,
    image: '/images/silk-saree.jpg',
    inStock: true
  },
  {
    id: 5,
    name: 'Pooja Thali Set',
    price: 2499,
    quantity: 1,
    image: '/images/pooja-thali.jpg',
    inStock: true
  }
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // In a real app, you would fetch cart items from a context or API
  useEffect(() => {
    // Simulate API call to fetch cart items
    const fetchCartItems = async () => {
      try {
        // In a real app: const response = await fetch('/api/cart');
        // const data = await response.json();
        // setCartItems(data);
        
        // Using mock data for now
        await new Promise(resolve => setTimeout(resolve, 500));
        setCartItems(mockCartItems);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
    
    // In a real app, you would update the cart on the server
    // updateCartItemQuantity(id, newQuantity);
  };

  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    
    // In a real app, you would remove the item from the cart on the server
    // removeFromCart(id);
  };

  const applyCoupon = (e) => {
    e.preventDefault();
    
    // In a real app, you would validate the coupon with the server
    if (couponCode.trim() === '') return;
    
    // Mock coupon validation
    const validCoupons = {
      'DIWALI10': { discount: 0.1, message: '10% off your order' },
      'FESTIVE20': { discount: 0.2, message: '20% off your order' },
      'LIGHTS15': { discount: 0.15, message: '15% off your order' }
    };
    
    const coupon = validCoupons[couponCode.toUpperCase()];
    
    if (coupon) {
      setAppliedCoupon({
        code: couponCode.toUpperCase(),
        discount: coupon.discount,
        message: coupon.message
      });
    } else {
      alert('Invalid coupon code. Please try again.');
    }
    
    setCouponCode('');
  };

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    
    try {
      // In a real app, you would send the order to your backend/warehouse system
      // const response = await fetch('/api/orders', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     items: cartItems,
      //     subtotal,
      //     discount,
      //     shipping,
      //     total,
      //     coupon: appliedCoupon?.code || null
      // })
      // });
      // const data = await response.json();
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would redirect to an order confirmation page
      // router.push(`/order/confirmation/${data.orderId}`);
      
      // Show success message
      alert('Your order has been received and is being processed!\n\n' +
            'Order Summary:\n' +
            `Items: ${cartItems.length}\n` +
            `Subtotal: ₹${subtotal.toLocaleString()}\n` +
            `Discount: ${discount ? `-₹${discount.toLocaleString()}` : 'None'}\n` +
            `Shipping: ${shipping === 0 ? 'Free' : `₹${shipping}`}\n` +
            `Total: ₹${total.toLocaleString()}\n\n` +
            'You will receive payment options once your items are packed and ready for shipping.');
      
      // Clear the cart after successful order
      setCartItems([]);
      setAppliedCoupon(null);
      
    } catch (error) {
      console.error('Error placing order:', error);
      alert('There was an error processing your order. Please try again.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  // Calculate cart totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = appliedCoupon ? Math.round(subtotal * appliedCoupon.discount) : 0;
  const shipping = subtotal > 0 ? (subtotal > 2000 ? 0 : 99) : 0; // Free shipping on orders over 2000
  const total = subtotal - discount + shipping;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="text-yellow-400 hover:text-yellow-300">
                Home
              </Link>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-400 md:ml-2">Shopping Cart</span>
              </div>
            </li>
          </ol>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-yellow-400">Your Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-16 bg-slate-800 rounded-xl">
            <div className="mx-auto w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center mb-6">
              <FaShoppingCart className="text-4xl text-yellow-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-slate-400 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Link 
              href="/products"
              className="inline-block px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-medium rounded-lg transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <motion.div 
                  key={item.id}
                  className="bg-slate-800 rounded-xl p-4 md:p-6 flex flex-col md:flex-row gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-full md:w-40 h-40 bg-slate-700 rounded-lg overflow-hidden flex-shrink-0 relative">
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      fill
                      sizes="(max-width: 768px) 100vw, 160px"
                      className="object-cover"
                      priority
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">{item.name}</h3>
                        <p className="text-yellow-400 text-lg font-medium mb-3">₹{item.price.toLocaleString()}</p>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-slate-400 hover:text-red-400 transition-colors"
                        aria-label="Remove item"
                      >
                        <FaTrash />
                      </button>
                    </div>
                    
                    {!item.inStock && (
                      <p className="text-red-400 text-sm mb-3">Out of stock</p>
                    )}
                    
                    <div className="flex items-center mt-4">
                      <div className="flex items-center border border-slate-600 rounded-lg overflow-hidden">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-2 text-slate-300 hover:bg-slate-700 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <FaMinus size={12} />
                        </button>
                        <span className="px-4 py-2 bg-slate-700">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-2 text-slate-300 hover:bg-slate-700 transition-colors"
                        >
                          <FaPlus size={12} />
                        </button>
                      </div>
                      
                      <div className="ml-auto text-right">
                        <p className="text-lg font-semibold">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              <div className="flex justify-between items-center mt-8">
                <Link 
                  href="/products"
                  className="flex items-center text-yellow-400 hover:text-yellow-300 transition-colors"
                >
                  <FaArrowLeft className="mr-2" />
                  Continue Shopping
                </Link>
                
                <button 
                  onClick={() => {
                    // In a real app, you would clear the cart
                    setCartItems([]);
                    setAppliedCoupon(null);
                  }}
                  className="text-slate-400 hover:text-red-400 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-slate-800 rounded-xl p-6">
                <h2 className="text-xl font-bold mb-6 text-yellow-400">Order Summary</h2>
                
                {/* Coupon Code */}
                <form onSubmit={applyCoupon} className="mb-6">
                  <label htmlFor="coupon" className="block text-sm font-medium mb-2">
                    Have a coupon code?
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="coupon"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white text-sm"
                    />
                    <button 
                      type="submit"
                      className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm whitespace-nowrap"
                    >
                      Apply
                    </button>
                  </div>
                  {appliedCoupon && (
                    <p className="text-green-400 text-sm mt-2 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {appliedCoupon.message} applied ({appliedCoupon.code})
                    </p>
                  )}
                </form>
                
                {/* Order Details */}
                <div className="space-y-3 text-sm border-t border-slate-700 pt-4">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  
                  {appliedCoupon && (
                    <div className="flex justify-between text-green-400">
                      <span>Discount ({appliedCoupon.discount * 100}% off)</span>
                      <span>-₹{discount.toLocaleString()}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-slate-400">Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                  </div>
                  
                  <div className="pt-4 mt-4 border-t border-slate-700 flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>
                
                {/* Checkout Button */}
                <div className="space-y-4">
                  <button
                    onClick={handleCheckout}
                    disabled={checkoutLoading || cartItems.length === 0}
                    className={`w-full py-3 px-6 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-medium rounded-lg transition-colors flex items-center justify-center ${
                      checkoutLoading || cartItems.length === 0 ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {checkoutLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Send to Warehouse for Packing'
                    )}
                  </button>
                  
                  <div className="bg-blue-900/30 border border-blue-800 rounded-lg p-4 text-sm text-blue-100">
                    <h4 className="font-medium text-blue-300 mb-1">Pay Later Option</h4>
                    <p>Your order will be processed first. Payment options will be provided once your items are packed and ready for shipping.</p>
                  </div>
                </div>
                
                <p className="text-xs text-slate-500 text-center mt-3">
                  No payment required now. You'll pay once your order is packed and ready to ship.
                </p>
                
                <div className="mt-6 pt-6 border-t border-slate-700">
                  <h3 className="font-medium mb-3">We Accept</h3>
                  <div className="flex flex-wrap gap-3">
                    {['visa', 'mastercard', 'amex', 'paypal', 'upi'].map((method) => (
                      <div key={method} className="w-12 h-8 bg-slate-700 rounded flex items-center justify-center">
                        <span className="text-xs font-medium uppercase">{method}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 bg-slate-800 rounded-xl p-6">
                <h3 className="font-medium mb-3">Need Help?</h3>
                <p className="text-sm text-slate-400 mb-4">
                  Have questions about your order? Our customer service team is here to help.
                </p>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +91 98765 43210
                  </p>
                  <p className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    support@diwalidelights.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
