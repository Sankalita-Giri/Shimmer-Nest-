import React, { useState, useEffect } from "react";
import axios from "axios";

export default function OrderForm({ product, goBack }) {
  // State for the form fields
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    quantity: 1,
    product: product?.name || "",
    price: product?.price || 0,
  });

  // State to handle button loading UI
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update form data if the product prop changes (e.g. user selects a different item)
  useEffect(() => {
    if (product) {
      setFormData((prev) => ({
        ...prev,
        product: product.name,
        price: product.price,
      }));
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "quantity" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Start loading

    try {
      // API call to your backend
      const response = await axios.post("http://localhost:5000/api/orders/create", formData);
      
      if (response.status === 201 || response.status === 200) {
        alert("Order placed successfully 💜");
        
        // Reset form to initial state
        setFormData({
          name: "",
          phone: "",
          address: "",
          quantity: 1,
          product: product.name,
          price: product.price,
        });

        goBack(); // Return to the gallery/main page
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Error placing order 😭 Please check if the server is running.");
    } finally {
      setIsSubmitting(false); // Stop loading
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border border-purple-100">
      {/* Back Button */}
      <button 
        onClick={goBack} 
        className="mb-4 text-purple-600 hover:text-purple-800 font-medium flex items-center gap-1 transition-colors"
      >
        <span>←</span> Back to Gallery
      </button>

      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Ordering: <span className="text-purple-700">{product?.name}</span>
        </h2>
        <p className="text-gray-500 font-medium text-lg">
          Price: ₹{product?.price}
        </p>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600 ml-1">Name</label>
          <input
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600 ml-1">Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter 10-digit number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600 ml-1">Delivery Address</label>
          <textarea
            name="address"
            placeholder="Enter house no, street, landmark, city..."
            value={formData.address}
            onChange={handleChange}
            required
            className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none h-24 resize-none transition-all"
          />
        </div>

        <div className="flex items-center justify-between bg-purple-50 p-3 rounded-xl">
          <label className="font-semibold text-purple-900">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            className="p-2 border border-purple-200 rounded-lg w-20 text-center font-bold outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`${
            isSubmitting ? "bg-purple-300" : "bg-purple-600 hover:bg-purple-700 shadow-md active:scale-95"
          } text-white font-bold py-4 rounded-2xl transition-all flex justify-center items-center`}
        >
          {isSubmitting ? "Processing Order..." : "Place Order 💜"}
        </button>
      </form>
    </div>
  );
}