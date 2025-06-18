import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export const CartReview: React.FC = () => {
  const { state, removeItem, updateQuantity } = useCart();
  const [removingItem, setRemovingItem] = useState<number | null>(null);

  const handleRemoveItem = async (productId: number) => {
    setRemovingItem(productId);
    // Simulate removal animation
    await new Promise(resolve => setTimeout(resolve, 300));
    removeItem(productId);
    setRemovingItem(null);
  };

  if (state.items.length === 0) {
    return (
      <div className="text-center py-12 md:py-16 fade-in">
        <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 md:mb-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-12 h-12 md:w-16 md:h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
          </svg>
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Your cart is empty</h3>
        <p className="text-gray-600 text-base md:text-lg mb-6 md:mb-8 px-4">Add some amazing products to get started!</p>
        <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8 fade-in">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Review Your Cart
        </h2>
        <p className="text-gray-600 text-sm md:text-base">Review and modify your items before checkout</p>
      </div>
      
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
        <div className="p-4 md:p-6 lg:p-8">
          <div className="space-y-4 md:space-y-6">
            {state.items.map((item, index) => (
              <div 
                key={item.product.id} 
                className={`flex flex-col gap-4 p-4 md:p-6 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 transition-all duration-300 ${
                  removingItem === item.product.id ? 'opacity-50 scale-95' : 'hover:shadow-lg hover:-translate-y-1'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Product Image and Basic Info */}
                <div className="flex items-start gap-4">
                  {/* Product Image */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-xl shadow-md"
                    />
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                      {item.quantity}
                    </div>
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 line-clamp-2">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">{item.product.category}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        ${item.product.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500">each</span>
                    </div>
                    
                    {/* Item Total - Mobile */}
                    <div className="md:hidden">
                      <p className="text-lg font-bold text-gray-900">
                        Total: ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  
                  {/* Remove Button - Mobile */}
                  <button
                    onClick={() => handleRemoveItem(item.product.id)}
                    className="p-2 md:p-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 flex-shrink-0"
                    title="Remove item"
                  >
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                
                {/* Quantity Controls and Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-700">Quantity:</span>
                    <div className="flex items-center gap-2 bg-white rounded-xl border border-gray-200 p-1 shadow-sm">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-10 h-10 md:w-8 md:h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
                      >
                        <svg className="w-5 h-5 md:w-4 md:h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      
                      <span className="w-12 md:w-12 text-center font-semibold text-gray-900 text-lg md:text-base">{item.quantity}</span>
                      
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-10 h-10 md:w-8 md:h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
                      >
                        <svg className="w-5 h-5 md:w-4 md:h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  {/* Item Total - Desktop */}
                  <div className="hidden md:block text-right">
                    <p className="text-lg font-bold text-gray-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Cart Summary */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-4 md:px-6 lg:px-8 py-6 border-t border-gray-100">
          <div className="flex flex-col gap-4 md:gap-6">
            {/* Info Row */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-600">Free shipping on orders over $50</span>
                </div>
                <p className="text-sm text-gray-600">
                  {state.items.reduce((total, item) => total + item.quantity, 0)} items in cart
                </p>
              </div>
            </div>
            
            {/* Totals Row */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm text-gray-600">Subtotal</p>
                  <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    ${state.total.toFixed(2)}
                  </p>
                </div>
                <div className="w-px h-12 bg-gray-200 hidden sm:block"></div>
                <div className="sm:block">
                  <p className="text-sm text-gray-600">Shipping</p>
                  <p className="text-lg font-semibold text-green-600">Free</p>
                </div>
              </div>
              
              {/* Total Amount */}
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ${state.total.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <button className="w-full sm:w-auto px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Continue Shopping
        </button>
      </div>
    </div>
  );
}; 