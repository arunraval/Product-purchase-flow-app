import React, { useState, useEffect } from "react";
import { CartReview } from "./CartReview";
import { ShippingForm } from "./ShippingForm";
import { PaymentForm } from "./PaymentForm";
import { OrderSummary } from "./OrderSummary";
import { OrderConfirmation } from "./OrderConfirmation";
import { useCart } from "../context/CartContext";
import type {
  CheckoutStep,
  ShippingInfo,
  PaymentMethod,
  Order,
} from "../types";

interface CheckoutProps {
  onNavigateToProducts?: () => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ onNavigateToProducts }) => {
  const { state } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("cart");
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    type: "credit",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    paypalEmail: "",
  });
  const [order, setOrder] = useState<Order | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const steps = [
    { id: "cart", name: "Cart", icon: "🛒", shortName: "Cart" },
    { id: "shipping", name: "Shipping", icon: "📦", shortName: "Ship" },
    { id: "payment", name: "Payment", icon: "💳", shortName: "Pay" },
    { id: "summary", name: "Summary", icon: "📋", shortName: "Review" },
    { id: "confirmation", name: "Done", icon: "✅", shortName: "Done" },
  ];

  const handleNext = () => {
    const currentIndex = steps.findIndex((step) => step.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id as CheckoutStep);
    }
  };

  const handleBack = () => {
    const currentIndex = steps.findIndex((step) => step.id === currentStep);
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
      date: new Date(),
    };
    setOrder(newOrder);
    setCurrentStep("confirmation");
  };

  const handleContinueShopping = () => {
    if (onNavigateToProducts) {
      onNavigateToProducts();
    } else {
      setCurrentStep("cart");
      setShippingInfo({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      });
      setPaymentMethod({
        type: "credit",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        cardholderName: "",
        paypalEmail: "",
      });
      setOrder(null);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "cart":
        return (
          <div className="space-y-4 md:space-y-6">
            <CartReview />
            {state.items.length > 0 && (
              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Continue to Shipping →
                </button>
              </div>
            )}
          </div>
        );

      case "shipping":
        return (
          <div className="space-y-4 md:space-y-6">
            <ShippingForm
              shippingInfo={shippingInfo}
              onUpdate={setShippingInfo}
              onNext={handleNext}
            />
            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
              >
                ← Back to Cart
              </button>
            </div>
          </div>
        );

      case "payment":
        return (
          <div className="space-y-4 md:space-y-6">
            <PaymentForm
              paymentMethod={paymentMethod}
              onUpdate={setPaymentMethod}
              onNext={handleNext}
            />
            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
              >
                ← Back to Shipping
              </button>
            </div>
          </div>
        );

      case "summary":
        return (
          <div className="space-y-4 md:space-y-6">
            <OrderSummary
              shippingInfo={shippingInfo}
              paymentMethod={paymentMethod}
              onConfirm={handleConfirmOrder}
            />
            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
              >
                ← Back to Payment
              </button>
            </div>
          </div>
        );

      case "confirmation":
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

  if (currentStep === "confirmation") {
    return renderStepContent();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Mobile Header */}
      <header className="bg-white shadow-lg border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">C</span>
              </div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Checkout
              </h1>
            </div>
            <button
              onClick={onNavigateToProducts || handleContinueShopping}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm md:text-base transition-colors duration-200"
            >
              {isMobile ? "← Back" : "Continue Shopping"}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Progress Steps */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 md:py-6">
            {isMobile ? (
              // Mobile: Horizontal scrollable steps
              <div className="flex items-center space-x-4 overflow-x-auto pb-2 scrollbar-hide">
                {steps.map((step, index) => {
                  const stepIndex = steps.findIndex(
                    (s) => s.id === currentStep
                  );
                  const isActive = step.id === currentStep;
                  const isCompleted = index < stepIndex;

                  return (
                    <div key={step.id} className="flex-shrink-0">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                            isActive
                              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-110"
                              : isCompleted
                              ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md"
                              : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          {isCompleted ? "✓" : step.icon}
                        </div>
                        <span
                          className={`mt-2 text-xs font-medium ${
                            isActive ? "text-blue-600" : "text-gray-500"
                          }`}
                        >
                          {step.shortName}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              // Desktop: Full progress bar
              <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                  const stepIndex = steps.findIndex(
                    (s) => s.id === currentStep
                  );
                  const isActive = step.id === currentStep;
                  const isCompleted = index < stepIndex;

                  return (
                    <div key={step.id} className="flex items-center">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                            isActive
                              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                              : isCompleted
                              ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                              : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          {isCompleted ? "✓" : step.icon}
                        </div>
                        <span
                          className={`mt-2 text-xs font-medium ${
                            isActive ? "text-blue-600" : "text-gray-500"
                          }`}
                        >
                          {step.name}
                        </span>
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`w-16 h-0.5 mx-4 transition-all duration-300 ${
                            isCompleted
                              ? "bg-gradient-to-r from-green-500 to-emerald-500"
                              : "bg-gray-200"
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
          {renderStepContent()}
        </div>
      </main>

      {/* Mobile Step Indicator */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-40">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              {steps.findIndex((s) => s.id === currentStep) + 1} of{" "}
              {steps.length}
            </span>
            <div className="flex space-x-2">
              {currentStep !== "cart" && (
                <button
                  onClick={handleBack}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium transition-colors duration-200"
                >
                  Back
                </button>
              )}
              {(currentStep as string) !== "confirmation" &&
                currentStep !== "summary" && (
                  <button
                    onClick={handleNext}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105"
                  >
                    Next
                  </button>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
