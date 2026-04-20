import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function LoginPage({ setView, redirectAfter }) {
  const { login } = useAuth();
  const { dark } = useTheme();
  const [mode, setMode]       = useState('login'); // 'login' | 'register'
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [success, setSuccess] = useState('');

  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: '', address: ''
  });

  const handleChange = (e) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'register') {
        // Validations
        if (!form.name.trim())
          return setError('Please enter your full name.');
        if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
          return setError('Enter a valid email address.');
        if (!form.phone.match(/^[6-9]\d{9}$/))
          return setError('Enter a valid 10-digit mobile number.');
        if (form.password.length < 6)
          return setError('Password must be at least 6 characters.');
        if (form.password !== form.confirmPassword)
          return setError('Passwords do not match.');

        const res = await fetch(`${API}/api/customers/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name:     form.name.trim(),
            email:    form.email.trim(),
            phone:    form.phone.trim(),
            password: form.password,
            address:  form.address.trim(),
          })
        });
        const data = await res.json();
        if (!res.ok) return setError(data.error || 'Registration failed.');

        login(data.customer, data.token);
        setSuccess('Account created! Welcome to ShimmerNest 🌸');
        setTimeout(() => {
          setView(redirectAfter || 'home');
        }, 1200);

      } else {
        // Login
        if (!form.email || !form.password)
          return setError('Please enter email and password.');

        const res = await fetch(`${API}/api/customers/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: form.email.trim(), password: form.password })
        });
        const data = await res.json();
        if (!res.ok) return setError(data.error || 'Login failed.');

        login(data.customer, data.token);
        setSuccess(`Welcome back, ${data.customer.name}! 💜`);
        setTimeout(() => {
          setView(redirectAfter || 'home');
        }, 1000);
      }
    } catch {
      setError('Cannot connect to server. Make sure server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fadeIn max-w-md mx-auto pb-20 px-4 pt-6">
      <button onClick={() => setView('home')}
        className="mb-6 text-purple-300 font-black text-[10px] uppercase tracking-widest hover:text-purple-500 transition-colors">
        ← Back to Shop
      </button>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">{mode === 'login' ? '💜' : '🌸'}</div>
        <h1 className={`text-3xl font-black tracking-tighter ${dark ? 'text-white' : 'text-gray-900'}`}>
          {mode === 'login' ? 'Welcome Back!' : 'Create Account'}
        </h1>
        <p className={`text-sm font-medium mt-2 ${dark ? 'text-purple-300' : 'text-gray-400'}`}>
          {redirectAfter === 'checkout'
            ? '🔐 Please login or register to place your order'
            : mode === 'login'
            ? 'Login to view your orders and checkout faster'
            : 'Join ShimmerNest to track your orders'}
        </p>
        {redirectAfter === 'checkout' && (
          <div className="mt-3 bg-purple-50 border border-purple-100 rounded-2xl px-4 py-2 inline-block">
            <p className="text-[9px] font-black text-purple-500 uppercase tracking-widest">
              🧺 Your cart is saved — login to continue
            </p>
          </div>
        )}
      </div>

      {/* Card */}
      <div className={`rounded-[3rem] shadow-2xl border-4 p-8 ${dark ? 'bg-gray-900 border-purple-900/40' : 'bg-white border-white'}`}>

        {/* Tab switcher */}
        <div className={`flex rounded-2xl p-1 mb-6 ${dark ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <button onClick={() => { setMode('login'); setError(''); }}
            className={`flex-1 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${mode === 'login' ? (dark ? 'bg-gray-700 text-purple-400 shadow-sm' : 'bg-white text-purple-700 shadow-sm') : (dark ? 'text-gray-500' : 'text-gray-400')}`}>
            Login
          </button>
          <button onClick={() => { setMode('register'); setError(''); }}
            className={`flex-1 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${mode === 'register' ? (dark ? 'bg-gray-700 text-purple-400 shadow-sm' : 'bg-white text-purple-700 shadow-sm') : (dark ? 'text-gray-500' : 'text-gray-400')}`}>
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Register-only fields */}
          {mode === 'register' && (
            <>
              <div>
                <input name="name" placeholder="Your Full Name" value={form.name}
                  onChange={handleChange}
                  className={`w-full p-4 rounded-2xl border-2 focus:border-purple-400 outline-none text-sm font-medium ${dark ? 'bg-gray-800 border-gray-700 text-purple-100 placeholder-purple-600' : 'bg-gray-50 border-transparent text-gray-800'}`} />
              </div>
              <div>
                <input name="phone" placeholder="WhatsApp Number (10 digits)" value={form.phone}
                  onChange={handleChange} maxLength={10} inputMode="numeric"
                  className={`w-full p-4 rounded-2xl border-2 focus:border-purple-400 outline-none text-sm font-medium ${dark ? 'bg-gray-800 border-gray-700 text-purple-100 placeholder-purple-600' : 'bg-gray-50 border-transparent text-gray-800'}`} />
              </div>
              <div>
                <textarea name="address" placeholder="Delivery Address + Pincode (optional)" value={form.address}
                  onChange={handleChange} rows={2}
                  className={`w-full p-4 rounded-2xl border-2 focus:border-purple-400 outline-none text-sm font-medium resize-none ${dark ? 'bg-gray-800 border-gray-700 text-purple-100 placeholder-purple-600' : 'bg-gray-50 border-transparent text-gray-800'}`} />
              </div>
            </>
          )}

          {/* Common fields */}
          <div>
            <input name="email" type="email" placeholder="Email Address" value={form.email}
              onChange={handleChange}
              className={`w-full p-4 rounded-2xl border-2 focus:border-purple-400 outline-none text-sm font-medium ${dark ? 'bg-gray-800 border-gray-700 text-purple-100 placeholder-purple-600' : 'bg-gray-50 border-transparent text-gray-800'}`} />
          </div>
          <div>
            <input name="password" type="password" placeholder="Password" value={form.password}
              onChange={handleChange}
              className={`w-full p-4 rounded-2xl border-2 focus:border-purple-400 outline-none text-sm font-medium ${dark ? 'bg-gray-800 border-gray-700 text-purple-100 placeholder-purple-600' : 'bg-gray-50 border-transparent text-gray-800'}`} />
          </div>
          {mode === 'register' && (
            <div>
              <input name="confirmPassword" type="password" placeholder="Confirm Password"
                value={form.confirmPassword} onChange={handleChange}
                className={`w-full p-4 rounded-2xl border-2 focus:border-purple-400 outline-none text-sm font-medium ${dark ? 'bg-gray-800 border-gray-700 text-purple-100 placeholder-purple-600' : 'bg-gray-50 border-transparent text-gray-800'}`} />
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-100 rounded-2xl p-3">
              <p className="text-red-500 text-xs font-bold text-center">⚠️ {error}</p>
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="bg-green-50 border border-green-100 rounded-2xl p-3">
              <p className="text-green-600 text-xs font-bold text-center">✅ {success}</p>
            </div>
          )}

          {/* No refund notice on register */}
          {mode === 'register' && (
            <div className={`rounded-2xl p-3 border ${dark ? 'bg-purple-950/50 border-purple-800/40' : 'bg-purple-50 border-purple-100'}`}>
              <p className={`text-[9px] font-bold uppercase tracking-widest text-center leading-relaxed ${dark ? 'text-purple-400' : 'text-purple-500'}`}>
                🧶 All items are handmade to order · No cancellations or refunds · 5–7 working days
              </p>
            </div>
          )}

          <button type="submit" disabled={loading}
            className={`w-full py-5 rounded-full font-black text-xs uppercase tracking-widest text-white shadow-xl transition-all active:scale-95 ${loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 shadow-purple-100'}`}>
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                {mode === 'login' ? 'Logging in...' : 'Creating account...'}
              </span>
            ) : mode === 'login' ? 'Login to My Account →' : 'Create My Account →'}
          </button>
        </form>
      </div>

      {/* Policy note */}
      <p className="text-center text-[10px] text-gray-300 font-bold uppercase tracking-widest mt-6">
        🧶 All items handmade · No cancellations or refunds
      </p>
    </div>
  );
}