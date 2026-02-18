import ItemList from "./item-list";

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Shopping List
        </h1>
        <ItemList />
      </div>
    </main>
  );
}
