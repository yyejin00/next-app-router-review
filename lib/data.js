import { get } from '@/lib/fetch';

export async function getInitialProducts(q = '') {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const query = q ? `&q=${q}` : '';
  const response = await get(`/products?offset=0&limit=9${query}`, {
    cache: 'no-store',
  });
  return response;
}

export async function getProduct(productId) {
try {
    const product = await get(`/products/${productId}`);
    return product;
  } catch (err) {
    if (err.status === 404) {
      return null;
    }
    throw err;
  }
}

export async function getSizeReviews(productId) {
  const response = await get(`/size_reviews?product_id=${productId}`);
  return response;
}
export async function getFeaturedBanner() {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return {
    title: '❄️ 겨울 세일',
    message: '선택된 상품 추가 20% 할인',
    ctaText: '특가 보러가기',
    background: '#1f2937',
  };
}
