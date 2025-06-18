import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ProductListing } from './components/ProductListing';
import { Checkout } from './components/Checkout';
import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<ProductListingWithNav />} />
            <Route path="/checkout" element={<CheckoutWithNav />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

// Helper components to handle navigation
function ProductListingWithNav() {
  const navigate = useNavigate();
  return (
    <>
      <ProductListing onNavigateToCheckout={() => navigate('/checkout')} />
      {/* Floating Checkout Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => navigate('/checkout')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg font-medium transition-colors duration-200 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
          </svg>
          Checkout
        </button>
      </div>
    </>
  );
}

function CheckoutWithNav() {
  const navigate = useNavigate();
  return <Checkout onNavigateToProducts={() => navigate('/')} />;
}

export default App;
