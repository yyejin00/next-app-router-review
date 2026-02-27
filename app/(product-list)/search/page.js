import { getProducts } from '@/lib/data';
import ProductsLists from '../components/ProductsLists';

export default async function Search({ searchParams }) {
  const { q } = await searchParams;
  const { results: products } = await getProducts(q);
  return (
    <div>
      <ProductsLists products={products} />
    </div>
  );
}
