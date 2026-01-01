
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { PostRequirement } from './pages/PostRequirement';
import { Products } from './pages/Products';
import { ProductDetails } from './pages/ProductDetails';
import { BlogPage } from './pages/Blog';
import { BlogDetails } from './pages/BlogDetails';
import { Dashboard } from './pages/Dashboard';
import { Auth } from './pages/Auth';
import { BecomeVendor } from './pages/BecomeVendor';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Faq } from './pages/Faq';
import { AlertCircle, MessageSquare } from 'lucide-react';

const AppContent: React.FC = () => {
  const navigate = useNavigate();

  const handleSupportClick = () => {
    navigate('/contact');
  };

  const handleChatClick = () => {
    alert("AI Chat Support is initializing... Our business consultant will be with you shortly.");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow min-h-[60vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/post-requirement" element={<PostRequirement />} />
          <Route path="/become-vendor" element={<BecomeVendor />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth isRegister={true} />} />
          <Route path="/careers" element={<div className="container mx-auto py-32 text-center h-screen"><h1 className="text-4xl font-black text-slate-900">Careers</h1><p className="mt-4 text-slate-500">Join our mission to transform B2B procurement.</p></div>} />
          <Route path="/press" element={<div className="container mx-auto py-32 text-center h-screen"><h1 className="text-4xl font-black text-slate-900">Press Kit</h1><p className="mt-4 text-slate-500">Logos, assets, and brand guidelines for BantConfirm.</p></div>} />
          {/* Fallbacks for Footer links that might not have dedicated pages yet */}
          <Route path="/features" element={<Navigate to="/" />} />
          <Route path="/pricing" element={<Navigate to="/" />} />
          <Route path="/security" element={<Navigate to="/" />} />
          <Route path="/help" element={<Navigate to="/faq" />} />
          <Route path="/api" element={<Navigate to="/contact" />} />
          <Route path="/community" element={<Navigate to="/become-vendor" />} />
          <Route path="/privacy" element={<div className="container mx-auto py-32 text-center h-screen"><h1 className="text-4xl font-black">Privacy Policy</h1></div>} />
          <Route path="/terms" element={<div className="container mx-auto py-32 text-center h-screen"><h1 className="text-4xl font-black">Terms of Service</h1></div>} />
          <Route path="/cookies" element={<div className="container mx-auto py-32 text-center h-screen"><h1 className="text-4xl font-black">Cookie Settings</h1></div>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-10 right-10 flex flex-col space-y-4 z-50">
        <button 
          onClick={handleSupportClick}
          title="Help & Support"
          className="bg-[#6366f1] text-white p-4 rounded-2xl shadow-2xl hover:scale-110 transition-transform flex items-center justify-center ring-4 ring-white/20"
        >
          <AlertCircle size={28} />
        </button>
        <button 
          onClick={handleChatClick}
          title="Live Chat"
          className="bg-[#22c55e] text-white p-4 rounded-2xl shadow-2xl hover:scale-110 transition-transform flex items-center justify-center ring-4 ring-white/20"
        >
          <MessageSquare size={28} />
        </button>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
