import React, { useState } from 'react';
import type { ShippingInfo } from '../types';

interface ShippingFormProps {
  shippingInfo: ShippingInfo;
  onUpdate: (info: ShippingInfo) => void;
  onNext: () => void;
}

export const ShippingForm: React.FC<ShippingFormProps> = ({ shippingInfo, onUpdate, onNext }) => {
  const [errors, setErrors] = useState<Partial<ShippingInfo>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<ShippingInfo> = {};

    if (!shippingInfo.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!shippingInfo.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!shippingInfo.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingInfo.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!shippingInfo.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!shippingInfo.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!shippingInfo.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!shippingInfo.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!shippingInfo.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    }

    if (!shippingInfo.country.trim()) {
      newErrors.country = 'Country is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitting(false);
      onNext();
    }
  };

  const handleChange = (field: keyof ShippingInfo, value: string) => {
    onUpdate({ ...shippingInfo, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  return (
    <div className="space-y-8 fade-in">
      <div className="text-center mb-8">
        <h2 className="heading-responsive font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Shipping Information
        </h2>
        <p className="text-gray-600">Please provide your shipping details</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                value={shippingInfo.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                className={`input-modern ${errors.firstName ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : ''}`}
                placeholder="Enter your first name"
              />
              {errors.firstName && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.firstName}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                value={shippingInfo.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                className={`input-modern ${errors.lastName ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : ''}`}
                placeholder="Enter your last name"
              />
              {errors.lastName && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Contact Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                value={shippingInfo.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={`input-modern ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : ''}`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                value={shippingInfo.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className={`input-modern ${errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : ''}`}
                placeholder="+1 (555) 123-4567"
              />
              {errors.phone && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.phone}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Shipping Address</h3>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="address" className="block text-sm font-semibold text-gray-700">
                Street Address *
              </label>
              <input
                type="text"
                id="address"
                value={shippingInfo.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className={`input-modern ${errors.address ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : ''}`}
                placeholder="123 Main Street, Apt 4B"
              />
              {errors.address && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.address}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label htmlFor="city" className="block text-sm font-semibold text-gray-700">
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  value={shippingInfo.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  className={`input-modern ${errors.city ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : ''}`}
                  placeholder="New York"
                />
                {errors.city && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.city}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="state" className="block text-sm font-semibold text-gray-700">
                  State/Province *
                </label>
                <input
                  type="text"
                  id="state"
                  value={shippingInfo.state}
                  onChange={(e) => handleChange('state', e.target.value)}
                  className={`input-modern ${errors.state ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : ''}`}
                  placeholder="NY"
                />
                {errors.state && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.state}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="zipCode" className="block text-sm font-semibold text-gray-700">
                  ZIP/Postal Code *
                </label>
                <input
                  type="text"
                  id="zipCode"
                  value={shippingInfo.zipCode}
                  onChange={(e) => handleChange('zipCode', e.target.value)}
                  className={`input-modern ${errors.zipCode ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : ''}`}
                  placeholder="10001"
                />
                {errors.zipCode && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.zipCode}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="country" className="block text-sm font-semibold text-gray-700">
                Country *
              </label>
              <input
                type="text"
                id="country"
                value={shippingInfo.country}
                onChange={(e) => handleChange('country', e.target.value)}
                className={`input-modern ${errors.country ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : ''}`}
                placeholder="United States"
              />
              {errors.country && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.country}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`btn-primary flex items-center gap-2 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>Continue to Payment</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}; 