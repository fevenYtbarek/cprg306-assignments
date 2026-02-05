"use client";

import { useState } from "react";

export default function NewItem() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");
  const [touched, setTouched] = useState(false);

  const validName = name.trim().length >= 3;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!validName) {
      setTouched(true);
      return;
    }

    const item = { name: name.trim(), quantity, category };

    console.log(item);
    alert(
      `Item Name: ${item.name}\nQuantity: ${item.quantity}\nCategory: ${item.category}`
    );

    setName("");
    setQuantity(1);
    setCategory("produce");
    setTouched(false);
  }

  return (
    <form className="space-y-4 max-w-sm w-full bg-white p-6 rounded-lg shadow" onSubmit={handleSubmit}>
      {/* name */}
      <div>
        <label className="block mb-1 font-medium">Product Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={() => setTouched(false)}
          onBlur={() => setTouched(true)}
          className={`border p-2 w-full rounded ${
            touched && !validName ? "border-red-500" : "border-gray-300"
          }`}
        />
        {touched && !validName && (
          <p className="text-red-500 text-sm">At least 3 characters.</p>
        )}
      </div>

      {/* quantity */}
      <div>
        <label className="block mb-1 font-medium">Quantity</label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
            className="px-3 py-1 border rounded bg-gray-200"
          >
            −
          </button>

          <span className="font-medium">{quantity}</span>

          <button
            type="button"
            onClick={() => quantity < 99 && setQuantity(quantity + 1)}
            className="px-3 py-1 border rounded bg-blue-600 text-white"
          >
            +
          </button>
        </div>
      </div>

      {/* category */}
      <div>
        <label className="block mb-1 font-medium">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 w-full rounded"
        >
          <option value="produce">Produce</option>
          <option value="dairy">Dairy</option>
          <option value="bakery">Bakery</option>
          <option value="meat">Meat</option>
          <option value="frozen foods">Frozen Foods</option>
          <option value="canned goods">Canned Goods</option>
          <option value="dry goods">Dry Goods</option>
          <option value="beverages">Beverages</option>
          <option value="snacks">Snacks</option>
          <option value="household">Household</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* submit */}
      <button
        type="submit"
        disabled={!validName}
        className="w-full bg-purple-600 text-white py-2 rounded disabled:bg-gray-400"
      >
        Add Item
      </button>
    </form>
  );
}
