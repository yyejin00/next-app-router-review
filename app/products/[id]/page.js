import ProductInfo from './components/ProductInfo';
import SizeReviewList from './components/SizeReviewList';
import {getProduct,getSizeReviews} from '@/lib/data';
//비동기 작업 병렬처리 Promise.all()
export default async function Product({ params }) {
  const { id } = await params;
  const [product,{ results: sizeReviews }] = await Promise.all([
    getProduct(id),
    getSizeReviews(id),
  ]);
  //const = await get(`/size_reviews?product_id=${id}`);
  return (
    <div>
      <ProductInfo productInfo={product} />
      {sizeReviews?.length > 0 && <SizeReviewList sizeReviews={sizeReviews} />}
    </div>
  );
}
