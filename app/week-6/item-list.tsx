"use client";

import { useState } from "react";
import Item from "./item";

type ItemType = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

type SortBy = "name" | "category" | "grouped";

export default function ItemList({ items }: { items: ItemType[] }) {
  const [sortBy, setSortBy] = useState<SortBy>("name");

  // Copy so we never mutate props
  const sortedItems: ItemType[] = [...items];

  if (sortBy === "name") {
    sortedItems.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "category") {
    sortedItems.sort((a, b) => a.category.localeCompare(b.category));
  }

  // Grouped data (based on items prop, not JSON)
  const groupedItems: Record<string, ItemType[]> = {};

  if (sortBy === "grouped") {
    sortedItems.forEach((item) => {
      if (!groupedItems[item.category]) {
        groupedItems[item.category] = [];
      }
      groupedItems[item.category].push(item);
    });

    // Sort within each category by name
    Object.keys(groupedItems).forEach((cat) => {
      groupedItems[cat].sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  const buttonClass = (active: boolean) =>
    `rounded border px-3 py-1 ${active ? "bg-gray-300" : "bg-white"}`;

  return (
    <div>
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

      {sortBy !== "grouped" && (
        <ul className="space-y-2">
          {sortedItems.map((item) => (
            <Item
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
            />
          ))}
        </ul>
      )}

      {sortBy === "grouped" && (
        <div className="space-y-6">
          {Object.keys(groupedItems)
            .sort()
            .map((category) => (
              <div key={category}>
                <h2 className="mb-4 font-bold capitalize">{category}</h2>
                <ul className="space-y-3">
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
