import { get } from '@/lib/fetch';
import ProductsLists from './components/ProductsLists';

export default async function Home() {
  const { results: products } = await get('/products');
  return (
    <div>
      <h1>homepage~!</h1>
      <ProductsLists products={products} />
    </div>
  );
}
