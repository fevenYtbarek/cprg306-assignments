"use client";

import { useEffect, useState } from "react";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

async function fetchMealIdeas(ingredient: string): Promise<Meal[]> {
  if (!ingredient) return [];

  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );

  const data = await response.json();
  return data.meals || [];
}

export default function MealIdeas({ ingredient }: { ingredient: string }) {
  const [meals, setMeals] = useState<Meal[]>([]);

  async function loadMealIdeas() {
    const mealIdeas = await fetchMealIdeas(ingredient);
    setMeals(mealIdeas);
  }

  useEffect(() => {
    loadMealIdeas();
  }, [ingredient]);

  return (
    <div className="rounded-xl bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold text-gray-900">Meal Ideas</h2>

      {ingredient && (
        <p className="mb-4 text-sm text-gray-600">
          Here are meal ideas using <span className="font-bold">{ingredient}</span>.
        </p>
      )}

      {!ingredient && (
        <p className="text-gray-500">Select an item to see meal ideas.</p>
      )}

      {ingredient && meals.length === 0 && (
        <p className="text-gray-500">No meal ideas found.</p>
      )}

      <ul className="space-y-3">
        {meals.map((meal) => (
          <li
            key={meal.idMeal}
            className="rounded-lg border border-gray-200 p-3"
          >
            <p className="font-medium text-gray-900">{meal.strMeal}</p>
          </li>
        ))}
      </ul>
    </div>
  );
} 


