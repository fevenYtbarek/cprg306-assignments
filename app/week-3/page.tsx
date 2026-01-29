import ItemList from "./item-list";

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl p-6">
        <h1 className="mb-6 text-center text-3xl font-bold">Shopping List</h1>
        <ItemList />
      </div>
    </main>
  );
}
