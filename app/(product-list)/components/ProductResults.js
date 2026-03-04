import { getInitialProducts } from '@/lib/data';
import LoadMoreProductList from './LoadMoreProductList';

export default async function ProductResults({ q = '' }) {
  const { results: products, next } = await getInitialProducts(q);

  return (
    <LoadMoreProductList
      key={q || 'all'}
      initialProducts={products}
      initialNext={next}
    />
  );
}
