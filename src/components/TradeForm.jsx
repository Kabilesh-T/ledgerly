import { useState } from "react";

export default function TradeForm({ onAdd }) {
  const [formData, setFormData] = useState({
    symbol: "",
    type: "BUY",
    qty: "",
    price: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ symbol: "", type: "BUY", qty: "", price: "" }); // Reset
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 flex gap-4 mb-8"
    >
      <input
        placeholder="Symbol (AAPL)"
        className="border p-2 rounded w-full"
        value={formData.symbol}
        onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
        required
      />
      <select
        className="border p-2 rounded bg-white"
        value={formData.type}
        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
      >
        <option value="BUY">BUY</option>
        <option value="SELL">SELL</option>
      </select>
      <input
        type="number"
        placeholder="Qty"
        className="border p-2 rounded w-32"
        value={formData.quantity}
        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
        required
      />
      <input
        type="number"
        step="0.01"
        placeholder="Price"
        className="border p-2 rounded w-32"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        required
      />
      <button className="bg-orange-500 text-white px-6 py-2 rounded font-medium">
        Add
      </button>
    </form>
  );
}
