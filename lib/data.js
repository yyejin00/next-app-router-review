import { get } from '@/lib/fetch';

export async function getProducts() {
  const response = await get('/products');
  return response;
}

export async function getProduct(productId) {
  const product = await get(`/products/${productId}`);
  return product;
}

export async function getSizeReviews(productId) {
  const response = await get(`/size_reviews?product_id=${productId}`);
  return response;
}
