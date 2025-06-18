import React, { useState } from 'react';
import type { PaymentMethod } from '../types';

interface PaymentFormProps {
  paymentMethod: PaymentMethod;
  onUpdate: (method: PaymentMethod) => void;
  onNext: () => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ paymentMethod, onUpdate, onNext }) => {
  const [errors, setErrors] = useState<Partial<PaymentMethod>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<PaymentMethod> = {};

    if (paymentMethod.type === 'credit' || paymentMethod.type === 'debit') {
      if (!paymentMethod.cardNumber?.trim()) {
        newErrors.cardNumber = 'Card number is required';
      } else if (!/^\d{16}$/.test(paymentMethod.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number';
      }

      if (!paymentMethod.expiryDate?.trim()) {
        newErrors.expiryDate = 'Expiry date is required';
      } else if (!/^\d{2}\/\d{2}$/.test(paymentMethod.expiryDate)) {
        newErrors.expiryDate = 'Please enter expiry date in MM/YY format';
      }

      if (!paymentMethod.cvv?.trim()) {
        newErrors.cvv = 'CVV is required';
      } else if (!/^\d{3,4}$/.test(paymentMethod.cvv)) {
        newErrors.cvv = 'Please enter a valid CVV';
      }

      if (!paymentMethod.cardholderName?.trim()) {
        newErrors.cardholderName = 'Cardholder name is required';
      }
    } else if (paymentMethod.type === 'paypal') {
      if (!paymentMethod.paypalEmail?.trim()) {
        newErrors.paypalEmail = 'PayPal email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paymentMethod.paypalEmail)) {
        newErrors.paypalEmail = 'Please enter a valid email address';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  const handleChange = (field: keyof PaymentMethod, value: string) => {
    onUpdate({ ...paymentMethod, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const handlePaymentTypeChange = (type: 'credit' | 'debit' | 'paypal') => {
    onUpdate({
      type,
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: '',
      paypalEmail: ''
    });
    setErrors({});
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Payment Method</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Payment Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Choose Payment Method
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => handlePaymentTypeChange('credit')}
              className={`p-4 border rounded-lg text-left transition-colors ${
                paymentMethod.type === 'credit'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  paymentMethod.type === 'credit' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                }`}></div>
                <div>
                  <div className="font-medium">Credit Card</div>
                  <div className="text-sm text-gray-500">Visa, Mastercard, Amex</div>
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handlePaymentTypeChange('debit')}
              className={`p-4 border rounded-lg text-left transition-colors ${
                paymentMethod.type === 'debit'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  paymentMethod.type === 'debit' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                }`}></div>
                <div>
                  <div className="font-medium">Debit Card</div>
                  <div className="text-sm text-gray-500">Direct bank payment</div>
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handlePaymentTypeChange('paypal')}
              className={`p-4 border rounded-lg text-left transition-colors ${
                paymentMethod.type === 'paypal'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  paymentMethod.type === 'paypal' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                }`}></div>
                <div>
                  <div className="font-medium">PayPal</div>
                  <div className="text-sm text-gray-500">Pay with PayPal</div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Card Payment Form */}
        {(paymentMethod.type === 'credit' || paymentMethod.type === 'debit') && (
          <div className="space-y-4">
            <div>
              <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700 mb-2">
                Cardholder Name *
              </label>
              <input
                type="text"
                id="cardholderName"
                value={paymentMethod.cardholderName || ''}
                onChange={(e) => handleChange('cardholderName', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.cardholderName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="John Doe"
              />
              {errors.cardholderName && (
                <p className="mt-1 text-sm text-red-600">{errors.cardholderName}</p>
              )}
            </div>

            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Card Number *
              </label>
              <input
                type="text"
                id="cardNumber"
                value={paymentMethod.cardNumber || ''}
                onChange={(e) => handleChange('cardNumber', formatCardNumber(e.target.value))}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
              {errors.cardNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date *
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  value={paymentMethod.expiryDate || ''}
                  onChange={(e) => handleChange('expiryDate', formatExpiryDate(e.target.value))}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="MM/YY"
                  maxLength={5}
                />
                {errors.expiryDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
                )}
              </div>

              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
                  CVV *
                </label>
                <input
                  type="text"
                  id="cvv"
                  value={paymentMethod.cvv || ''}
                  onChange={(e) => handleChange('cvv', e.target.value.replace(/\D/g, ''))}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.cvv ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="123"
                  maxLength={4}
                />
                {errors.cvv && (
                  <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* PayPal Form */}
        {paymentMethod.type === 'paypal' && (
          <div>
            <label htmlFor="paypalEmail" className="block text-sm font-medium text-gray-700 mb-2">
              PayPal Email *
            </label>
            <input
              type="email"
              id="paypalEmail"
              value={paymentMethod.paypalEmail || ''}
              onChange={(e) => handleChange('paypalEmail', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.paypalEmail ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="your-email@example.com"
            />
            {errors.paypalEmail && (
              <p className="mt-1 text-sm text-red-600">{errors.paypalEmail}</p>
            )}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            Review Order
          </button>
        </div>
      </form>
    </div>
  );
}; 