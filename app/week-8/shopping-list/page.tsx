"use client";

import Link from "next/link";
import { useState } from "react";
import { useUserAuth } from "../_utils/auth-context";
import ItemList from "./item-list";
import NewItem from "./new-item";
import itemsData from "./items.json";

type ItemType = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

export default function ShoppingListPage() {
  const { user, firebaseSignOut } = useUserAuth();
  const [items, setItems] = useState<ItemType[]>(itemsData);

  const handleAddItem = (item: ItemType) => {
    setItems([...items, item]);
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="mb-4">You must be logged in to view this page.</p>
        <Link
          href="/week-8"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Go Back
        </Link>
      </main>
    );
  }

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Shopping List</h1>
        <button
          onClick={handleSignOut}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <p className="mb-4">Welcome, {user.displayName}</p>

      <NewItem onAddItem={handleAddItem} />
      <ItemList items={items} />
    </main>
  );
}