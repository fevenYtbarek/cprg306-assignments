"use client";

import { useState } from "react";

export default function NewItem({
  onAddItem,
}: {
  onAddItem: (item: { name: string; quantity: number; category: string }) => void;
}) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const item = {
      name: name.trim(),
      quantity,
      category,
    };

    if (!item.name) return;

    onAddItem(item);

    setName("");
    setQuantity(1);
    setCategory("produce");
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4 text-gray-900">
      <label className="block">
        <span className="mb-1 block font-medium">Item name:</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-900"
        />
      </label>

      <label className="block">
        <span className="mb-1 block font-medium">Quantity:</span>
        <input
          type="number"
          min={1}
          max={99}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-900"
        />
      </label>

      <label className="block">
        <span className="mb-1 block font-medium">Category:</span>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-900"
        >
          <option value="produce">produce</option>
          <option value="dairy">dairy</option>
          <option value="bakery">bakery</option>
          <option value="meat">meat</option>
          <option value="frozen">frozen</option>
          <option value="canned">canned</option>
          <option value="dry">dry</option>
          <option value="household">household</option>
        </select>
      </label>

      <button
        type="submit"
        className="rounded bg-gray-800 px-4 py-2 font-semibold text-white hover:bg-gray-700"
      >
        Add
      </button>
    </form>
  );
}