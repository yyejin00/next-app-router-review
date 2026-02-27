import StarRating from '@/components/StarRating';
import styles from './ProductInfo.module.css';

export default function ProductInfo({ product }) {
  return (
    <div className={styles.info}>
      <table className={styles.infoTable}>
        <tbody>
          <tr>
            <th>브랜드 / 품번</th>
            <td>
              {product.brand} / {product.productCode}
            </td>
          </tr>
          <tr>
            <th>제품명</th>
            <td>{product.name}</td>
          </tr>
          <tr>
            <th>가격</th>
            <td>
              <span className={styles.salePrice}>
                {product.price.toLocaleString()}원
              </span>{' '}
              {product.salePrice.toLocaleString()}원
            </td>
          </tr>
          <tr>
            <th>포인트 적립</th>
            <td>{product.point.toLocaleString()}</td>
          </tr>
          <tr>
            <th>구매 후기</th>
            <td className={styles.starRating}>
              <StarRating value={product.starRating} />{' '}
              {product.starRatingCount.toLocaleString()}
            </td>
          </tr>
          <tr>
            <th>좋아요</th>
            <td className={styles.like}>
              ♥ {product.likeCount.toLocaleString()}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
