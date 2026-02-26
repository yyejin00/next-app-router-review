import Link from 'next/link';

export default function ProductsLists() {
  return (
    <ul>
      {Array.from({ length: 20 }, (_, i) => i + 1).map((id) => (
        <li key={id} style={{ marginBottom: '40px' }}>
          <Link href={`/products/${id}`}>
            <div>상품 아이디 바로 확인하기 🔥{id}🔥</div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
