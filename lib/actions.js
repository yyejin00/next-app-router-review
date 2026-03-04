'use server';

import { revalidatePath } from 'next/cache';
import { post } from './fetch';

export async function submitSizeReview(currentState, formData) {
  const data = Object.fromEntries(formData.entries());
  const sizeReview = {
    ...data,
    height: Number(data.height),
    productId: Number(data.productId),
  };
  try {
    await post('/size_reviews', sizeReview);
    //화면에 업데이트할 내용이 바로 보인다.
    //재검증 : 경로에서 ㅂ다아오는 데이터를 재검증해서 최신 데이터로 업데이트
    revalidatePath(`/products/${sizeReview.productId}`);
    return { error: null };
  } catch (err) {
    return {
      error: '리뷰 작성 중 오류가 발생했습니다.',
    };
  }
}
