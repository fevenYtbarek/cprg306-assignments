import NewItem from "./new-item";

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div>
        <h1 className="text-xl font-bold mb-4 text-center">
          Week 4 - New Item
        </h1>
        <NewItem />
      </div>
    </main>
  );
}
