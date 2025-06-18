import React, { useState } from 'react';
import { CartReview } from './CartReview';
import { ShippingForm } from './ShippingForm';
import { PaymentForm } from './PaymentForm';
import { OrderSummary } from './OrderSummary';
import { OrderConfirmation } from './OrderConfirmation';
import { useCart } from '../context/CartContext';
import type { CheckoutStep, ShippingInfo, PaymentMethod, Order } from '../types';

interface CheckoutProps {
  onNavigateToProducts?: () => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ onNavigateToProducts }) => {
  const { state } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('cart');
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    type: 'credit',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    paypalEmail: ''
  });
  const [order, setOrder] = useState<Order | null>(null);

  const steps = [
    { id: 'cart', name: 'Cart Review', icon: '🛒' },
    { id: 'shipping', name: 'Shipping', icon: '📦' },
    { id: 'payment', name: 'Payment', icon: '💳' },
    { id: 'summary', name: 'Summary', icon: '📋' },
    { id: 'confirmation', name: 'Confirmation', icon: '✅' }
  ];

  const handleNext = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id as CheckoutStep);
    }
  };

  const handleBack = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id as CheckoutStep);
    }
  };

  const handleConfirmOrder = () => {
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      items: state.items,
      shippingInfo,
      paymentMethod,
      total: state.total,
      date: new Date()
    };
    setOrder(newOrder);
    setCurrentStep('confirmation');
  };

  const handleContinueShopping = () => {
    if (onNavigateToProducts) {
      onNavigateToProducts();
    } else {
      setCurrentStep('cart');
      setShippingInfo({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
      });
      setPaymentMethod({
        type: 'credit',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: '',
        paypalEmail: ''
      });
      setOrder(null);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'cart':
        return (
          <div className="space-y-6">
            <CartReview />
            {state.items.length > 0 && (
              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Proceed to Shipping
                </button>
              </div>
            )}
          </div>
        );

      case 'shipping':
        return (
          <div className="space-y-6">
            <ShippingForm
              shippingInfo={shippingInfo}
              onUpdate={setShippingInfo}
              onNext={handleNext}
            />
            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Back to Cart
              </button>
            </div>
          </div>
        );

      case 'payment':
        return (
          <div className="space-y-6">
            <PaymentForm
              paymentMethod={paymentMethod}
              onUpdate={setPaymentMethod}
              onNext={handleNext}
            />
            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Back to Shipping
              </button>
            </div>
          </div>
        );

      case 'summary':
        return (
          <div className="space-y-6">
            <OrderSummary
              shippingInfo={shippingInfo}
              paymentMethod={paymentMethod}
              onConfirm={handleConfirmOrder}
            />
            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Back to Payment
              </button>
            </div>
          </div>
        );

      case 'confirmation':
        return order ? (
          <OrderConfirmation
            order={order}
            onContinueShopping={handleContinueShopping}
          />
        ) : null;

      default:
        return null;
    }
  };

  if (currentStep === 'confirmation') {
    return renderStepContent();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
            <button
              onClick={onNavigateToProducts || handleContinueShopping}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const stepIndex = steps.findIndex(s => s.id === currentStep);
                const isActive = step.id === currentStep;
                const isCompleted = index < stepIndex;

                return (
                  <div key={step.id} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-blue-600 text-white'
                            : isCompleted
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {isCompleted ? '✓' : step.icon}
                      </div>
                      <span
                        className={`mt-2 text-xs font-medium ${
                          isActive ? 'text-blue-600' : 'text-gray-500'
                        }`}
                      >
                        {step.name}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-16 h-0.5 mx-4 ${
                          isCompleted ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderStepContent()}
      </main>
    </div>
  );
}; 