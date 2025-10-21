'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import products from '@/data/products';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiArrowLeft, FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const ProductDetail = () => {
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = () => {
      try {
        // Simulate API call with local data
        setTimeout(() => {
          const foundProduct = products.find(p => p.id === parseInt(id));
          if (foundProduct) {
            setProduct(foundProduct);
            // Get related products from the same category
            const related = products
              .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
              .slice(0, 4);
            setRelatedProducts(related);
          }
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    // Get existing cart or initialize empty array
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if product already in cart
    const existingItemIndex = existingCart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex >= 0) {
      // Update quantity if product already in cart
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      existingCart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // Show success message
    alert(`${quantity} ${product.name} added to cart!`);
  };
  
  const incrementQuantity = () => setQuantity(prev => Math.min(prev + 1, 10));
  const decrementQuantity = () => setQuantity(prev => Math.max(prev - 1, 1));
  
  const nextImage = () => {
    if (product?.images) {
      setSelectedImage(prev => (prev + 1) % product.images.length);
    }
  };
  
  const prevImage = () => {
    if (product?.images) {
      setSelectedImage(prev => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center p-6">
        <h1 className="text-4xl font-bold text-yellow-500 mb-4">404 - Product Not Found</h1>
        <p className="text-slate-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link 
          href="/" 
          className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-medium rounded-full transition-colors inline-flex items-center"
        >
          <FiArrowLeft className="mr-2" /> Back to Home
        </Link>
      </div>
    );
  }
  
  // Generate sample images array from product data
  const productImages = product.images || [product.image];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-slate-600 hover:text-yellow-600 transition-colors"
        >
          <FiArrowLeft className="mr-2" />
          Back to Products
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="container mx-auto px-4 py-20 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
        </div>
      )}

      {/* Product Not Found */}
      {!loading && !product && (
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Product not found</h2>
          <button
            onClick={() => router.push('/')}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Back to Home
          </button>
        </div>
      )}

      {/* Product Details */}
      {!loading && product && (
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <div className="relative h-96 bg-white rounded-xl shadow-md overflow-hidden mb-4">
                <Image
                  src={productImages[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {productImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 ${
                      selectedImage === idx ? 'border-yellow-500' : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} - ${idx + 1}`}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating || 0) ? 'fill-current' : ''}`}
                    />
                  ))}
                </div>
                <span className="text-slate-500 text-sm">
                  ({product.rating?.toFixed(1) || 'No ratings'})
                </span>
              </div>
              
              <p className="text-3xl font-bold text-slate-900 mb-6">
                ₹{product.price.toLocaleString('en-IN')}
              </p>
              
              <p className="text-slate-600 mb-8">{product.description}</p>
              
              <div className="flex items-center space-x-4 mb-8">
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <button 
                    onClick={decrementQuantity}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button 
                    onClick={incrementQuantity}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800"
                    disabled={quantity >= 10}
                  >
                    +
                  </button>
                </div>
                
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-medium py-2 px-6 rounded-lg transition-colors flex items-center justify-center"
                >
                  <FiShoppingCart className="mr-2" />
                  Add to Cart
                </button>
              </div>
              
              <div className="border-t border-slate-200 pt-6">
                <div className="flex items-center text-sm text-slate-600 mb-2">
                  <span className="font-medium mr-2">Category:</span>
                  <Link 
                    href={`/category/${product.category.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-yellow-600 hover:underline"
                  >
                    {product.category}
                  </Link>
                </div>
                {product.tags && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {product.tags.map((tag, idx) => (
                      <span 
                        key={idx}
                        className="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product Description & Details */}
          <div className="mt-12 bg-white rounded-xl shadow-md p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">Product Details</h2>
            <div className="prose max-w-none">
              <p className="text-slate-600 mb-4">
                {product.description} This beautiful {product.name.toLowerCase()} is handcrafted with care to bring joy to your Diwali celebrations. 
                Made with high-quality materials, it's designed to last and add a touch of elegance to your home.
              </p>
              <ul className="mt-4 space-y-2 text-slate-600">
                <li>• Handcrafted with premium materials</li>
                <li>• Perfect for Diwali decorations and gifting</li>
                <li>• Eco-friendly and sustainable</li>
                <li>• Easy to maintain and clean</li>
                <li>• Comes with a 1-year warranty</li>
              </ul>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-8 text-slate-900">You May Also Like</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Link 
                    href={`/products/${relatedProduct.id}`} 
                    key={relatedProduct.id}
                    className="group block"
                  >
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-transform hover:scale-105 h-full flex flex-col">
                      <div className="relative h-48 bg-slate-100">
                        <Image
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className="font-medium text-slate-900 group-hover:text-yellow-600 transition-colors">
                          {relatedProduct.name}
                        </h3>
                        <p className="text-yellow-600 font-semibold mt-2">
                          ₹{relatedProduct.price.toLocaleString('en-IN')}
                        </p>
                        <div className="flex items-center mt-2">
                          <div className="flex text-yellow-400 mr-1">
                            {[...Array(5)].map((_, i) => (
                              <FiStar 
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(relatedProduct.rating || 5) ? 'fill-current' : ''}`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-slate-500">
                            ({(relatedProduct.rating || 5).toFixed(1)})
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
