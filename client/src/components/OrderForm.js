import { useState } from "react";

export default function OrderForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    product: "",
    quantity: 1,
    price: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/orders/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    alert("Order placed 💜");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-purple-100 rounded-xl">
      <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} />
      <input placeholder="Phone" onChange={e => setForm({...form, phone: e.target.value})} />
      <input placeholder="Address" onChange={e => setForm({...form, address: e.target.value})} />
      <input placeholder="Product" onChange={e => setForm({...form, product: e.target.value})} />
      <input type="number" placeholder="Quantity" onChange={e => setForm({...form, quantity: e.target.value})} />
      <button type="submit">Order Now</button>
    </form>
  );
}