interface ItemProps {
    name: string;
    quantity: number;
    category: string;
}

export default function Item({ name, quantity, category }: ItemProps) {
    return (
        <li>
            {name} - Quantity: {quantity} - Category: {category}
        </li>
    );
}