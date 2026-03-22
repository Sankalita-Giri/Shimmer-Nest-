import React, { createContext, useContext, useState, useEffect } from 'react';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [customer, setCustomer] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Load customer from localStorage on app start
  useEffect(() => {
    const token    = localStorage.getItem('sn_token');
    const saved    = localStorage.getItem('sn_customer');
    if (token && saved) {
      try {
        setCustomer(JSON.parse(saved));
      } catch {}
    }
    setAuthLoading(false);
  }, []);

  const login = (customerData, token) => {
    localStorage.setItem('sn_token',    token);
    localStorage.setItem('sn_customer', JSON.stringify(customerData));
    setCustomer(customerData);
  };

  const logout = () => {
    localStorage.removeItem('sn_token');
    localStorage.removeItem('sn_customer');
    setCustomer(null);
  };

  const updateCustomer = (data) => {
    const updated = { ...customer, ...data };
    localStorage.setItem('sn_customer', JSON.stringify(updated));
    setCustomer(updated);
  };

  const getToken = () => localStorage.getItem('sn_token');

  // Fetch orders for logged-in customer
  const fetchMyOrders = async () => {
    const token = getToken();
    if (!token) return [];
    try {
      const res = await fetch(`${API}/api/customers/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        return data.orders || [];
      }
    } catch {}
    return [];
  };

  return (
    <AuthContext.Provider value={{
      customer, authLoading,
      login, logout, updateCustomer,
      getToken, fetchMyOrders,
      isLoggedIn: !!customer
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);