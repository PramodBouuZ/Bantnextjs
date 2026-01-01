
import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, ShieldCheck, Info, Phone, MapPin, Building2, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type AuthMode = 'login' | 'register' | 'forgot-password';

export const Auth: React.FC<{ isRegister?: boolean }> = ({ isRegister = false }) => {
  const [mode, setMode] = useState<AuthMode>(isRegister ? 'register' : 'login');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [location, setLocation] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [resetSent, setResetSent] = useState(false);
  
  const navigate = useNavigate();

  const handleGoogleAuth = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('userEmail', 'google.user@example.com');
      localStorage.setItem('userName', 'Google User');
      localStorage.setItem('userRole', 'user');
      // Simulated Google login might not have mobile/location initially
      navigate('/dashboard');
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate authentication logic
    setTimeout(() => {
      setLoading(false);
      
      if (mode === 'forgot-password') {
        setResetSent(true);
        return;
      }

      // Store user info in localStorage for demo purposes
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userName', fullName || 'User');
      
      if (mode === 'register') {
        localStorage.setItem('userMobile', mobile);
        localStorage.setItem('userLocation', location);
        localStorage.setItem('userCompany', companyName);
      }

      if (email === 'info.bouuz@gmail.com') {
        localStorage.setItem('userRole', 'admin');
      } else if (email.includes('vendor')) {
        localStorage.setItem('userRole', 'vendor');
      } else {
        localStorage.setItem('userRole', 'user');
      }

      navigate('/dashboard');
    }, 1500);
  };

  const renderGoogleButton = () => (
    <div className="w-full mt-6">
      <div className="relative flex items-center justify-center mb-6">
        <div className="border-t border-slate-100 w-full"></div>
        <span className="bg-white px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest absolute">Or continue with</span>
      </div>
      <button 
        type="button"
        onClick={handleGoogleAuth}
        className="w-full bg-white border border-slate-200 text-slate-700 font-bold py-4 rounded-2xl shadow-sm hover:bg-slate-50 transition-all flex items-center justify-center space-x-3 group"
      >
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5 group-hover:scale-110 transition-transform" alt="" />
        <span>Continue with Google</span>
      </button>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center p-4">
      <div className={`${mode === 'register' ? 'max-w-xl' : 'max-w-md'} w-full transition-all duration-500`}>
        <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 mb-6">
              <span className="text-2xl font-extrabold tracking-tighter text-blue-800">BANT</span>
              <span className="text-2xl font-bold tracking-tighter text-amber-500">Confirm</span>
            </div>
            
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
              {mode === 'register' ? 'Create Account' : 
               mode === 'forgot-password' ? 'Forgot Password' : 'Welcome Back'}
            </h1>
            <p className="text-slate-500 text-sm">
              {mode === 'register' ? "Join India's premier B2B IT marketplace" : 
               mode === 'forgot-password' ? "We'll help you get back into your account" : 'Enter your credentials to access your dashboard'}
            </p>
          </div>

          {resetSent && mode === 'forgot-password' ? (
            <div className="text-center animate-in fade-in zoom-in-95 duration-500 w-full">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Check Your Email</h3>
              <p className="text-slate-500 text-sm mb-8">We've sent a recovery link to <span className="font-bold text-slate-900">{email}</span></p>
              <button 
                onClick={() => { setResetSent(false); setMode('login'); }}
                className="text-blue-600 font-bold hover:underline flex items-center justify-center mx-auto space-x-2"
              >
                <ChevronLeft size={16} />
                <span>Back to Login</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 w-full">
              <div className={`grid gap-4 ${mode === 'register' ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                {mode === 'register' && (
                  <>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                        <User size={18} />
                      </div>
                      <input 
                        type="text" 
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                        <Phone size={18} />
                      </div>
                      <input 
                        type="tel" 
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                        placeholder="Mobile Number"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        required
                      />
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                        <MapPin size={18} />
                      </div>
                      <input 
                        type="text" 
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                      />
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                        <Building2 size={18} />
                      </div>
                      <input 
                        type="text" 
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                        placeholder="Company Name (Optional)"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                    </div>
                  </>
                )}
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Mail size={18} />
                  </div>
                  <input 
                    type="email" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                    placeholder="Business Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {mode !== 'forgot-password' && (
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                      <Lock size={18} />
                    </div>
                    <input 
                      type="password" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                )}
              </div>

              {mode === 'login' && (
                <div className="text-right">
                  <button 
                    type="button" 
                    onClick={() => { setMode('forgot-password'); setResetSent(false); }}
                    className="text-xs font-bold text-blue-600 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-200 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 mt-4"
              >
                <span>
                  {loading ? 'Processing...' : 
                   mode === 'register' ? 'Register Now' : 
                   mode === 'forgot-password' ? 'Send Reset Link' : 'Sign In'}
                </span>
                {!loading && <ArrowRight size={18} />}
              </button>

              {mode !== 'forgot-password' && renderGoogleButton()}
            </form>
          )}

          <div className="mt-8 pt-8 border-t border-slate-50 text-center w-full">
            <p className="text-sm text-slate-500">
              {mode === 'register' ? 'Already have an account?' : "Don't have an account?"}
              <button 
                onClick={() => {
                  setResetSent(false);
                  if (mode === 'register') setMode('login');
                  else setMode('register');
                }}
                className="ml-2 font-bold text-blue-600 hover:underline"
              >
                {mode === 'register' ? 'Sign In' : 'Create Account'}
              </button>
            </p>
          </div>

          <div className="mt-6 flex items-center justify-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <ShieldCheck size={14} className="text-green-500" />
            <span>Bank-Grade 256-bit Security</span>
          </div>
        </div>
      </div>
    </div>
  );
};
