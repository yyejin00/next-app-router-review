export default function ProductInfo({ productInfo }) {
  return (
    <div>
      <img
        src={productInfo.imgUrl}
        alt={productInfo.name}
        width={660}
        height={700}
      />
      <h1>{productInfo.name}</h1>
      <div>
        {productInfo.brand} / {productInfo.productCode}
      </div>
      <div>{productInfo.salePrice}원</div>
      <div>포인트 적립 {productInfo.point}점</div>
      <div>구매 후기 {productInfo.starRating}</div>
      <div>좋아요 {productInfo.likeCount}</div>
    </div>
  );
}
