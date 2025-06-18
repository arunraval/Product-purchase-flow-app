import React, { useState } from 'react';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 300));
    addItem(product);
    setIsLoading(false);
  };

  return (
    <div 
      className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 ease-out overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2 h-[600px] flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Enhanced Effects */}
      <div className="relative overflow-hidden aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            isHovered ? 'scale-110 rotate-1' : 'scale-100 rotate-0'
          }`}
        />
        
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} />
        
        {/* Category Badge - Redesigned */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-4 py-2 rounded-full text-xs font-bold bg-white/90 backdrop-blur-sm text-gray-800 shadow-lg border border-white/20">
            {product.category}
          </span>
        </div>

        {/* Price Badge - New Position */}
        <div className="absolute top-4 right-4">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full shadow-lg">
            <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          </div>
        </div>

        {/* Quick Actions Overlay */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex gap-3">
            <button className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-xl hover:bg-white transition-all duration-300 hover:scale-110">
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            <button className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-xl hover:bg-white transition-all duration-300 hover:scale-110">
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Rating Stars */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-white text-sm font-medium drop-shadow-lg">(4.8)</span>
        </div>
      </div>
      
      {/* Content Section - Redesigned */}
      <div className="p-6 space-y-4 flex-1 flex flex-col">
        {/* Product Title */}
        <div className="space-y-2 flex-shrink-0">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
            {product.name}
          </h3>
          
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
        
        {/* Features List */}
        <div className="space-y-2 flex-shrink-0">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Free shipping worldwide</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>30-day return policy</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Premium quality</span>
          </div>
        </div>
        
        {/* Spacer to push button to bottom */}
        <div className="flex-1"></div>
        
        {/* Action Button - Redesigned */}
        <button
          onClick={handleAddToCart}
          disabled={isLoading}
          className={`w-full relative overflow-hidden rounded-2xl px-6 py-4 font-bold text-white transition-all duration-300 ease-out transform flex-shrink-0 ${
            isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl hover:scale-105 active:scale-95'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-3">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Adding to Cart...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              <span>Add to Cart</span>
            </div>
          )}
          
          {/* Ripple effect */}
          <div className="absolute inset-0 bg-white/20 transform scale-0 transition-transform duration-300 ease-out" />
        </button>

        {/* Stock Status */}
        <div className="flex items-center justify-between pt-2 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-600">In Stock</span>
          </div>
          <span className="text-xs text-gray-500">Fast delivery</span>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm" />
      <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200 blur-sm" />
      
      {/* Corner Accent */}
      <div className="absolute top-0 right-0 w-0 h-0 border-l-[50px] border-l-transparent border-t-[50px] border-t-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}; 