"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import itemsData from "./items.json";

type ItemType = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

export default function Page() {
  const [items, setItems] = useState<ItemType[]>(itemsData as ItemType[]);

  function handleAddItem(item: {
    name: string;
    quantity: number;
    category: string;
  }) {
    const newItem: ItemType = {
      id: crypto.randomUUID(),
      ...item,
    };

    setItems((prev) => [...prev, newItem]);
  }

  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Shopping List
        </h1>

        <NewItem onAddItem={handleAddItem} />

        <ItemList items={items} />
      </div>
    </main>
  );
}
