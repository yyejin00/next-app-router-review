import Link from 'next/link';

export default function ProductsLists({ products }) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id} style={{ marginBottom: '40px' }}>
          <Link href={`/products/${product.id}`}>
            <img
              src={product.imgUrl}
              alt={product.name}
              width={330}
              height={350}
            />
            <div>
              <h2>{product.name}</h2>
              <div>가격 {product.salePrice}</div>
              <div>별점 {product.starRating}</div>
              <div>좋아요 {product.liekCount}</div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
