const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const api = {
  // Create a new order
  createOrder: async (orderData) => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to place order');
    return data;
  },

  // Fetch all orders (for your future admin panel)
  getAllOrders: async (status = '') => {
    const response = await fetch(`${API_BASE_URL}/orders?status=${status}`);
    return await response.json();
  }
};