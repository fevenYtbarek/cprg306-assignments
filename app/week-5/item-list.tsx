
"use client";

import { useState } from "react";
import Item from "./item";
import itemsData from "./items.json";

type ItemType = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

type SortBy = "name" | "category" | "grouped";

export default function ItemList() {
  const [sortBy, setSortBy] = useState<SortBy>("name");

  // Make a copy so .sort() doesn't mutate the original JSON data
  const items: ItemType[] = [...(itemsData as ItemType[])];

  // Sort items for name/category modes
  if (sortBy === "name") {
    items.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "category") {
    items.sort((a, b) => a.category.localeCompare(b.category));
  }

  // Grouped data
  const groupedItems: Record<string, ItemType[]> = {};

  if (sortBy === "grouped") {
    (itemsData as ItemType[]).forEach((item) => {
      if (!groupedItems[item.category]) {
        groupedItems[item.category] = [];
      }
      groupedItems[item.category].push(item);
    });

    // Sort items within each category by name
    Object.keys(groupedItems).forEach((cat) => {
      groupedItems[cat].sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  const buttonClass = (active: boolean) =>
    `rounded border px-3 py-1 ${active ? "bg-gray-300" : "bg-white"}`;

  return (
    <div>
      {/* Buttons */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          className={buttonClass(sortBy === "name")}
          onClick={() => setSortBy("name")}
        >
          Sort by Name
        </button>

        <button
          className={buttonClass(sortBy === "category")}
          onClick={() => setSortBy("category")}
        >
          Sort by Category
        </button>

        <button
          className={buttonClass(sortBy === "grouped")}
          onClick={() => setSortBy("grouped")}
        >
          Group by Category
        </button>
      </div>

      {/* Normal list */}
      {sortBy !== "grouped" && (
        <ul className="space-y-2">
          {items.map((item) => (
            <Item
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
            />
          ))}
        </ul>
      )}

      {/* Grouped list */}
      {sortBy === "grouped" && (
        <div className="space-y-6">
          {Object.keys(groupedItems)
            .sort()
            .map((category) => (
              <div key={category}>
                <h2 className="mb-2 font-bold capitalize">{category}</h2>
                <ul className="space-y-2">
                  {groupedItems[category].map((item) => (
                    <Item
                      key={item.id}
                      name={item.name}
                      quantity={item.quantity}
                      category={item.category}
                    />
                  ))}
                </ul>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
