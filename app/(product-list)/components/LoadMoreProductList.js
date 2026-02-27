'use client';

import { useState } from 'react';
import ProductsLists from './ProductsLists';
import { get } from '@/lib/fetch';

export default function LoadMoreProductList({
  initialProducts = [],
  initialNext = null,
}) {
  const [products, setProducts] = useState(initialProducts);
  const [next, setNext] = useState(initialNext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleLoadMore = async () => {
    try {
      setLoading(true);
      setError(null);
      const { results: moreProducts, next: nextUrl } = await get(next);
      setProducts((prev) => [...prev, ...moreProducts]);
      setNext(nextUrl);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ProductsLists products={products} />
      {next && (
        <button
          style={{ marginTop: '20px' }}
          onClick={handleLoadMore}
          disabled={loading}
        >
          상품 더 보기
        </button>
      )}
      {error && <div>상품을 더 불러오는데 실패했습니다.</div>}
    </div>
  );
}
