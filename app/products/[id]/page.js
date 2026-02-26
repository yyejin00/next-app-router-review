import Button from '@/components/Button/Button';
import ProductInfo from './components/ProductInfo';

export default async function Product({ params }) {
  const { id } = await params;
  return (
    <div>
      <ProductInfo />
      <Button />
      <div>상품아이디! : {id}</div>
    </div>
  );
}
