'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/images/diwali-bg.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            y: y1,
          }}
        />
        
        <div className="absolute inset-0 bg-black/60 z-0" />
        
        <motion.div 
          className="container mx-auto px-6 z-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-yellow-400">
            Celebrate the Festival of Lights
          </h1>
          <p className="text-lg md:text-xl text-white mb-8 max-w-3xl mx-auto">
            Discover our exclusive collection of Diwali products, perfect for your celebrations and gifting needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#products" className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-medium rounded-full transition-colors">
              Shop Now
            </Link>
            <Link href="#collections" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full transition-colors">
              View Collections
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <h2 className="section-title text-white">Featured Products</h2>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {products.slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link href="/products" className="inline-block px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-medium rounded-full transition-colors">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Categories with Parallax */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-fixed bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/diwali-pattern.jpg)' }}
        />
        <div className="absolute inset-0 bg-black/60 z-0" />
        
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl font-bold text-center mb-12 relative inline-block">
            Shop by Category
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-yellow-500 rounded-full"></span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {['Decor', 'Clothing', 'Gifts'].map((category, index) => (
              <motion.div 
                key={category}
                className="bg-white/10 backdrop-blur-md rounded-xl p-8 text-center hover:bg-white/20 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎇</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{category}</h3>
                <p className="text-slate-300 mb-4">
                  Discover our exclusive collection of {category.toLowerCase()} for Diwali
                </p>
                <Link 
                  href={`/category/${category.toLowerCase()}`}
                  className="text-yellow-400 hover:text-yellow-300 font-medium inline-flex items-center justify-center"
                >
                  Shop {category} <span className="ml-2">→</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />
      
      {/* Newsletter */}
      <Newsletter />
      
      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <a 
          href="https://wa.me/1234567890" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Chat on WhatsApp"
        >
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.498 14.382v-.002c-.301-.15-1.767-.867-2.04-.966-.274-.1-.473-.15-.673.15-.197.295-.771.963-.944 1.16-.175.195-.349.21-.646.075-.3-.15-1.27-.465-2.42-1.485-.89-.795-1.484-1.77-1.66-2.07-.173-.31-.019-.48.13-.63.136-.14.305-.366.458-.54.15-.18.2-.3.3-.5.1-.195.05-.36-.025-.51-.075-.15-.673-1.62-.922-2.21-.24-.584-.487-.51-.672-.51-.172-.015-.371-.01-.571-.01-.2 0-.523.075-.795.36-.273.3-1.045 1.02-1.045 2.49 0 1.47 1.07 2.88 1.22 3.09.15.195 2.1 3.2 5.08 4.485.71.3 1.27.48 1.71.63.714.23 1.37.195 1.89.12.57-.09 1.77-.72 2.02-1.43.25-.71.25-1.32.17-1.43-.07-.105-.23-.165-.49-.285"/>
            <path d="M20 12a8 8 0 10-16 0 8 8 0 0016 0zm-8-6.5a6.5 6.5 0 110 13 6.5 6.5 0 010-13z"/>
          </svg>
        </a>
      </div>
    </main>
  );
}
