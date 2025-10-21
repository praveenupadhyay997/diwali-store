'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';

export default function CategoryPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        
        // Filter products by category (slug)
        const filteredProducts = data.filter(product => 
          product.category.toLowerCase() === slug.toLowerCase()
        );
        
        setProducts(filteredProducts);
        setCategory(slug);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProducts();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-500"></div>
      </div>
    );
  }

  // Format category name for display (capitalize first letter)
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <main className="min-h-screen bg-slate-900 py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-slate-400 mb-8">
          <Link href="/" className="hover:text-yellow-400">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-yellow-400">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-yellow-400">{formattedCategory}</span>
        </nav>

        {/* Category Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-yellow-400">
            {formattedCategory} Collection
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Explore our exquisite collection of {formattedCategory.toLowerCase()} for your Diwali celebrations
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-800 rounded-2xl">
            <h3 className="text-xl font-medium text-slate-300 mb-2">
              No products found in this category
            </h3>
            <p className="text-slate-500 mb-6">
              We couldn't find any products in the {formattedCategory} category.
            </p>
            <Link
              href="/products"
              className="inline-block px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-medium rounded-full transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        )}

        {/* Category Description */}
        <div className="mt-16 bg-slate-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4 text-white">
            About Our {formattedCategory} Collection
          </h2>
          <div className="prose prose-invert max-w-none text-slate-300">
            <p>
              Our {formattedCategory.toLowerCase()} collection features beautifully crafted items perfect for Diwali celebrations. 
              Each piece is carefully selected to bring joy and elegance to your festive decorations. 
              Whether you're looking for traditional designs or modern interpretations, our {formattedCategory.toLowerCase()} 
              collection has something special for everyone.
            </p>
            <p className="mt-4">
              All our {formattedCategory.toLowerCase()} are made with high-quality materials and attention to detail, 
              ensuring they become cherished parts of your Diwali celebrations for years to come.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
