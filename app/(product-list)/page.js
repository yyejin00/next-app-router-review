import { get } from '@/lib/fetch';
import { getProduct, getInitialProducts } from '@/lib/data';
import LoadMoreProductList from './components/LoadMoreProductList';

export default async function Home() {
  const { results: products, next } = await getInitialProducts();

  return (
    <div>
      <h1>homepage~!</h1>
      <LoadMoreProductList
        key="all"
        initialProducts={products}
        initialNext={next}
      />
    </div>
  );
}
