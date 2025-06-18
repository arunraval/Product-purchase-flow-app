import React from 'react';
import { useCart } from '../context/CartContext';
import type { ShippingInfo, PaymentMethod } from '../types';

interface OrderSummaryProps {
  shippingInfo: ShippingInfo;
  paymentMethod: PaymentMethod;
  onConfirm: () => void;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ shippingInfo, paymentMethod, onConfirm }) => {
  const { state } = useCart();

  const formatCardNumber = (cardNumber: string) => {
    if (!cardNumber) return '';
    const cleaned = cardNumber.replace(/\s/g, '');
    return `**** **** **** ${cleaned.slice(-4)}`;
  };

  const getPaymentDisplay = () => {
    if (paymentMethod.type === 'paypal') {
      return `PayPal (${paymentMethod.paypalEmail})`;
    } else {
      return `${paymentMethod.type === 'credit' ? 'Credit' : 'Debit'} Card - ${formatCardNumber(paymentMethod.cardNumber || '')}`;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Details */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
            <div className="space-y-3">
              {state.items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.product.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-gray-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total:</span>
                <span className="text-2xl font-bold text-blue-600">
                  ${state.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping & Payment Info */}
        <div className="space-y-6">
          {/* Shipping Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Information</h3>
            <div className="space-y-2 text-sm">
              <p className="font-medium text-gray-900">
                {shippingInfo.firstName} {shippingInfo.lastName}
              </p>
              <p className="text-gray-600">{shippingInfo.email}</p>
              <p className="text-gray-600">{shippingInfo.phone}</p>
              <p className="text-gray-600">{shippingInfo.address}</p>
              <p className="text-gray-600">
                {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
              </p>
              <p className="text-gray-600">{shippingInfo.country}</p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center">
                {paymentMethod.type === 'paypal' ? (
                  <span className="text-xs font-bold text-blue-600">PP</span>
                ) : (
                  <span className="text-xs font-bold text-gray-600">CC</span>
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900">{getPaymentDisplay()}</p>
                {paymentMethod.type !== 'paypal' && paymentMethod.cardholderName && (
                  <p className="text-sm text-gray-500">{paymentMethod.cardholderName}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Button */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-600">By clicking "Place Order", you agree to our</p>
            <p className="text-sm text-gray-600">
              <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and{' '}
              <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Order Total</p>
            <p className="text-2xl font-bold text-blue-600">${state.total.toFixed(2)}</p>
          </div>
        </div>
        
        <button
          onClick={onConfirm}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Place Order
        </button>
      </div>
    </div>
  );
}; 