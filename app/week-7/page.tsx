"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";

type ItemType = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

export default function Page() {
  const [items, setItems] = useState<ItemType[]>(itemsData as ItemType[]);
  const [selectedItemName, setSelectedItemName] = useState("");

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

  function handleItemSelect(item: ItemType) {
    const cleanedName = item.name
      .split(",")[0]
      .trim()
      .replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\u2011-\u26FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F])/g,
        ""
      )
      .trim();

    setSelectedItemName(cleanedName);
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-6xl px-4 text-gray-900">
        <h1 className="mb-8 text-center text-4xl font-bold">Shopping List</h1>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <div className="rounded-xl bg-white p-8 shadow-md">
              <NewItem onAddItem={handleAddItem} />
              <ItemList items={items} onItemSelect={handleItemSelect} />
            </div>
          </div>

          <div>
            <MealIdeas ingredient={selectedItemName} />
          </div>
        </div>
      </div>
    </main>
  );
}