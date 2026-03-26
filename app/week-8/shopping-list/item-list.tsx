"use client";

import { useState } from "react";
import Item from "./item";

type ItemType = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

type SortBy = "name" | "category";

export default function ItemList({
  items,
  onItemSelect,
}: {
  items: ItemType[];
  onItemSelect: (item: ItemType) => void;
}) {
  const [sortBy, setSortBy] = useState<SortBy>("name");

  const sortedItems: ItemType[] = [...items];

  if (sortBy === "name") {
    sortedItems.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "category") {
    sortedItems.sort((a, b) => a.category.localeCompare(b.category));
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <span className="text-sm font-medium text-gray-600">Sort by:</span>

        <button
          className={`rounded-full px-4 py-1 text-sm font-medium transition ${
            sortBy === "name"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
          onClick={() => setSortBy("name")}
        >
          Name
        </button>

        <button
          className={`rounded-full px-4 py-1 text-sm font-medium transition ${
            sortBy === "category"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
          onClick={() => setSortBy("category")}
        >
          Category
        </button>
      </div>

      <ul className="space-y-4">
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            category={item.category}
            onSelect={() => onItemSelect(item)}
          />
        ))}
      </ul>
    </div>
  );
}