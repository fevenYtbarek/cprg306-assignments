interface ItemProps {
  name: string;
  quantity: number;
  category: string;
  onSelect?: () => void;
}

export default function Item({ name, quantity, category, onSelect }: ItemProps) {
  return (
    <li onClick={onSelect}
        className="rounded-md border border-gray-400 p-4">
      <p className="mb-2 font-semibold">{name}</p>
      <p>Quantity: {quantity}</p>
      <p className="capitalize">Category: {category}</p>
    </li>
  );
}
