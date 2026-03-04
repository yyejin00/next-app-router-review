# app router 복습하기

<br/>

- 구조분해할당
  오타조심
  api 에서 result로 값을 불러온다.
  const {results: products} = await get....
  이라는 코드에서 `results`부분을 `result`로 작성하면 확인할 수 없는 에러가 생긴다!

- 클라이언트
  'use client'
  useEffect 사용 -> 첫화면 깜빡임(빈화면 -> useEffect-> fetch ->데이터),seo 이슈
  서버 클라이언트 사용 -> 깜빡임 거의 없음. 최대 콘텐츠 랜더,seo 유리하고 체감 속도가 빠름

LoadMoreProductLists는 Home,Search 컴포넌트에서 서버쪽에서 fetch 한 값을 다룸
다른 검색어를 작성할 때 초기화,

- key='all'
  key가 같으면 → 같은 컴포넌트로 간주 → state 유지
  key가 바뀌면 → 완전히 다른 컴포넌트 → 강제 재마운트

```js
<LoadMoreProductList
  key={q || 'all'} //false 값이 될 경우 all 값을 줘서 안정적으로 변화
  initialProducts={products}
  initialNext={next}
/>
```

- 서버 클라이언트 경계
  부모컴포넌트가 클라이언트라면 자식 클라이언트도 클라이언트 컴포넌트가 된다.
  여기서 클라이언트 컴포넌트가 된 부모컴포넌트와 부모컴포넌트의 조상컴포넌트간의 경계가 생긴다.

- ssr(server side rendering)
- RSC payload
  처음 웹사이트 접속 시
  서버: 페이지의 서버 컴포넌트들을 실행해서 RSC Payload 생성
  -> 서버: RSC Payload와 클라이언트 컴포넌트를 활용하여 초기 HTML을 생성
  -> 클라이언트: HTML을 활용해 초기 화면을 렌더링
  -> 클라이언트: RSC Payload를 활용해 컴포넌트 트리 구조 파악
  -> 클라이언트: 자바스크립트 번들을 실행해서 클라이언트 컴포넌트를 hydrate

- 서버함수
  데이터업데이트 하는 방법!
  리액트에서의 폼 작성

  ```
  <form action={액션}..
  ```

  next.js의 경우 조금 다름

  사이즈 추천 목록에 작성된 리뷰가 바로 반영되게 한다.
  상세 페이지 코드에서는 사이즈 리뷰는 fetch로 가지고 있어서 state로 가지고 있지 않는다!
  사이즈리뷰를 state로 활요하게 된다면 클라이언트가 될것
  수동 state가 될 경우 서버에 있는 데이터와 동기화가 깨져서 에러가 생길 수 있음
  이때 서버함수를 사용한다.
  서버함수 :next.js에서 돌아가는 함수
  `<form/>`태그를 이용해서 클라이언트에서 리뷰를 작성
  -> 해당 함수는 서버에서 함수가 실행된다!
  -> 서버함수 안에서는 api서버에게 데이터를 업데이트하고 페이지에서 업데이트된 부분을 돌려준다.
  - 클라이언트 입장
    리퀘스트 한번으로 api 서버에 데이터를 업데이트
    업데이트 된 ui를 받을 수있다

  서버함수도 next.js의 개념이아닌 리액트 개념!
  클랑이ㅓㄴ트에 자바스크립트가 돌아가지 않아도 가동된다.
  모바일 환경처럼 네트워크가 불안정한 경우,
  자바스크립트가 제대로 로딩되지 않을 수있는데, 서버함수를 이용해서 폼을 만들어두면 폼부분은 정상작동 가능 => 폼 제출 함수는 클라이언트가아닌 서버단에서 실행되기 때문.
  - 서버함수 사용방법
    `use server`로 서버함수 표시

  함수내부에 `use server`를 작성해서 서버함수 작성가능.
  ⚠️ 조건 : 서버컴포넌트 내부에서만 서버 함수를 만들 수 있다.

  ```js
  async function createPost(formData){
   'use server'⭐️
   // ..
   return ..
  }
  ```

  파일을 `use server`로 정의 후 파일 안에 함수를 정의

  ```js
  `use server`

  export async function createPost(){ ..
  export async function deletePost(){ ..
  ```

  리뷰 폼태그가 있는 페이지

  ```js
  import { createPost } from '@/compo/serverFile';
  ...

  <form action ={createPost}>//⭐️ 서버액션
  ```

  - 서버액션 : 서버함수는 폼 데이터를 처리하기 위해서 action 프롭으로 사용해서 서버액션이라고도 불리기도 한다.
  - 서버함수 파일
    `SizeReviewForm.js`
  - `useActionState`

- 서버액션에 추가 아규먼트 전달하기
- `<input type='hidden'/>`
  타입이 hidden 인 input : 사이즈 리뷰를 작성할 때 product의 id가 필요한데, hidden으로 input으로 만들어서 ui 적으로 보이지 않게 값을 보내도록한다.
- `.bind`를 활용한 아규먼트 전달
  hidden input을 사용할 수 있지만, 좀 더권장되는 방식이 존재.

```js
export default function SizeReviewForm({ product }) {
  const [state, formAction, isPending] = useActionState(
    (currentState, formData) =>
      submitSizeReview(product.id, currentState, formData),
    { error: null },
  ); //⭐️ 서버액션이 아닌 화살표함수.

  return (
    <form className={styles.sizeForm} action={formAction}>
      ...
    </form>
  );
}
```

서버 액션의 장점을 활용하기 위해 폼의 action prop이나 useActionState의 액션 함수로는 항상 서버 함수를 전달하는 것이 좋다. 그래서 위처럼 서버 함수를 새로운 함수로 감싸는 방식보다는 자바스크립트 함수의 .bind() 메소드를 사용하는 것을 권장
그래서 서버 액션의 파라미터 순서도 중요하다.
추가로 받고 싶은 파라미터들을 앞에 배치해야 .bind()로 전달할 수 있다.

```js
export default function SizeReviewForm({ product }) {
  const submit = (currentState, formData) =>
    submitSizeReview(product.id, currentState, formData); // ❌

  const submit = submitSizeReview.bind(null, product.id); // ✅

  const [state, formAction, isPending] = useActionState(submit, {
    error: null,
  });

  return (
    <form className={styles.sizeForm} action={formAction}>
      ...
    </form>
  );
}
```

- `revalidatePath`
  화면에 업데이트할 내용이 바로 보인다.
  재검증 : 경로에서 받아오는 데이터를 재검증해서 최신 데이터로 업데이트
  revalidatePath(`/products/${sizeReview.productId}`);
  }
- `useActionState`
  isPending : 액션이 실행중인지를 나타냄
  isPending으로 폼태그에서 값이 서버로 넘어갈 때 disabled해서 여러번 클릭되지 않게 할 수 있다.

```js
const [state, formAction, isPending] = useActionState(서버함수, 초기state값);
```

## 렌더링 최적화

- 정적 렌더링
  빌드 시점에서 렌더링을 한다.
  빌드(소스코드를 배포가능한 형태로 변환)
  html, RSC Payload 를 생성해서 저장해둔다.
  이후에도 페이지에서 사용되는 데이터가 재검증 또는 Revalidate되는 시점에 새로 렌더링을 해놓는다.
  정적렌더링은 빌드 시점에 렌더링한다.
  페이지 리퀘스트가 들어오면 미리만들어둔 결가ㅗ물을 보여준ㄷ.
  장점: 결과를 미리 ㅅ애성해서 로딩속도가 빠르다.
  리퀘스트가 들어올때마다 보내지 않기때문에 서버 리소스를 아낄 수 있다.
  단점: 미리 렌더링하기때문에 실시간 데이터를 보여주는 페이지면 적합하지 않을 수 있다.
- 다이나믹 렌더링
  리퀘스트가 들어오면 렌더링해서 보내주는 방식.
  장점 :

  next.js는 기본적으로 정적 렌더링한다.
  페이지에서 특정 api를 사용하는 경우엠만 다이나믹 렌더링을 한다.
  -> serachParams Prop
  쿼리에따라 페이지 내용이 달라진다.
  빌드 시점에는 어떤 쿼리가 넘어올지 모른다. -> 아이나믹 렌더링
  -> 리퀘스트 헤더 정보나 쿠키에 접근하는경우
  헤더와 쿠키 정보는 리퀘스트마다 다르기때문 -> 다이나믹 렌더링

  -> next.js에서 fetch를 할 때는 `cache`라는 옵션을 사용할 수 있다.
  페이지에 있는 fetch를 no-store로 설정하면 다이나믹 렌더링을 한다.
  상반적
  페이지를 프리렌더하면 빌드 시점에서 한번만 가져와서 렌더링함 <-> no-store
  다이나믹 렌더링
  ->강제 다이나믹 렌더링
  await connection()
  현재 날짜 또는 시간을 보여줄 때

개발모드에서는 항상 다이나믹 렌더링한다.
프로덕션 모드일 경우 정적 + 다이나믹 렌더링이 나뉜다.

- 공식문서
  https://nextjs.org/docs/app/guides/caching#dynamic-rendering

### fetch함수와 캐시기능

- 캐싱 : 받아온 데이털르 더빠르게 접근할 수 있는 곳에 저장해둔다.
- 캐싱은 렌더링과 관련되어있음
  next서버와 클라이언트에서 `fetch()`할 수 있다. 하지만 next서버에서 하는경우가 훨씬 많다.
  서버쪽 캐싱을 보자.
  next.js데이터 캐시 : 패치결과를 저장
  여기서 fetch 결과를저장해서 서버가 데이터 캐시에서 데이터를 가져올 수 있게된다.

fetch옵션에 따라 캐시방식이 달라진다.
캐시 옵션
⚠️ 해당 캐시 옵션은 서버컴포넌트쪽에서 렌더링할 때만 유효하다.

- auto no cache : 정적 렌더링되는 경우
- revalidate
  데이터 유효기간이 다되어도 첫요청에는 원래 존재했던 오래된 데이터가 먼저 불러진다는 거 잊지 말기.
  - 옵션 number(예:3600) / 0 / false
- tags
  - 코드에서 수동으로 재검증.
    revalidatePath()모든데이터무효화,updateTag()특정태그 데이터 무효화
    캐시에 있는 데이터를 무효화해서 새로운 데이터를 받아오게 함
- 캐싱과 렌더링의 관계
  동적 렌더링
  cache : 'no-store' api서버에서 데이터를
  cache : 'force-cahce'

```js
export async function getInitialProducts(q = '') {
  const query = q ? `&q=${q}` : '';
  const response = await get(`/products?offset=0&limit=9${query}`, {
    cache: 'no-store', //⭐️
  });
  return response;
}
```

next.revalidate() : 캐싱시간
정적 렌더링
빌드 시 미리 렌더링
페이지에 사용되는 데이터가 하나라도 next.revalidate(),
수동으로 revalidate하게되면 다시 렌더링 된다.

```js
export async function getInitialProducts(q = '') {
  const query = q ? `&q=${q}` : '';
  const response = await get(`/products?offset=0&limit=9${query}`, {
    next: { revalidate: 10 }, //⭐️
  });
  return response;
}
```

revalidate시간 이전에 리렌더링
-> 그사이에 데이터가 변경이 있어도 revalidate시간이되지 않았기때문에 원래 있던 페이지를 보내준다.
-> revalidate시간이 지난 이후에 리렌더링 하게된다면 업데이트된페이지를 확인할 수 있다.

- 다이나믹 라우트
  staticParams()으로 렌더링할 라우트를 알려줄 수 있다.

```
export async function generateStaticParams() {
  const { results } = await get('/products?limit=100');
  return results.map((product) => ({ id: product.id.toString() }));//객체로된 배열 리턴
}
```

- 새상품이 생겨서 `products/[id]`가 추가될 때는?
  정적 렌더링된 페이지가 없다면 다이나믹 라우트 `page.js`코드를 실행해서 페이지를 실행하고 저장한다.
  `sizeReviewForm.js`에서
  `revalidatePath(`/products/${sizeReview.productId}`);`를 사용했기 때문에
  특정부분을 수동으로 리렌더링한 것!
  새롭게 무언가 추가될 때마다 갱신되는 화면을 확인할 수 있다.
  - upDateTag('size-reviews'); next : {tag : ['size-reviews']}

```js
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
    //revalidatePath(`/products/${sizeReview.productId}`);
    upDateTag('size-reviews');
    return { error: null };
  } catch (err) {
    return {
      error: '리뷰 작성 중 오류가 발생했습니다.',
    };
  }
}
--------------------------------
export async function getSizeReviews(productId) {
  const response = await get(`/size_reviews?product_id=${productId}`,{
    next : {tag : ['size-reviews']}
  });
  return response;
}
```

### 로딩 처리 `<Suspense>`
  코드는 위에서부터 아래로 읽는데, 현재 코드는 이미 2번째줄에서 데이터를 가져오기 때문에
  suspense가 일어날 일이 없다.
  그렇게되면 기다리는동안 로딩화면이 뜨는 것이 아닌 그냥 빈화면만 확인하게 된다.
  ```js
  export default async function Home() {
    const { results: products, next } = await getInitialProducts();

    return (
      <div>
        <FeaturedBanner />
        <Suspense fallback={<ProductListSkeleton />}>
          <LoadMoreProductList
            key="all"
            initialProducts={products}
            initialNext={next}
          />
        </Suspense>
      </div>
    );
  }
  ```
  - 해결방법
  suspense태그 안에 데이터를 불러오는 컴포넌트가 존재해야한다.
  `ProductResults.js`라는 컴포넌트에서 fetch하게 따로 만들고,
  `(product-list)/Page.js`에서는 suspense 만사용하게 할 수 있다.
  또는 use 훅을 이용해서 서버 컴포넌트에서 await fetch()를 하고
  결과를 클라이언트 컴포넌트의 prop으로 전달할 수도 있다.
  - `<Suspense>`란?
    loading.js 와 suspnese
    loading.js도 `<Suspense>`를 활용한다.
    페이지내용을 `<Suspense>`로 감싸고 loading.js를 fallback으로 사용한다.
    - `<Suspense>`동작
    렌더링의 첫번째 단계 서버컴포넌트를 실행
    커버컴포넌트에 `<Suspense>`로 감싼 부분이 있을 때 감싸진 컴포넌트(자식컴포넌트)가
    비동기로 기다린는 부분이 있다면 일단 렌더링을 `<Suspense>`하고 Fallback 컴포넌트로 대체한다.
    이런 상태로 RSC Payload + html 파일을 클라이언트로 보낸다.
    이때 클라이언트는 fallback 컴포넌트(skeleton)을 보여준다.
    렌더링이 다되었다면, 자식컴포넌트의 rsc payload를 클라이언트에게 보내주고 클라이언트는
    fallback 부분대신 보여주게 된다.

  스트리밍 : 위와 같은 방식으로 부분부분 준비되는대로 클라이언트에 보내주는 방식.
  rsc payload를 여러번 요청할 필요없이 처음 요청을 계속 유지하면서 클라이언트가 받을 수 있다.
  리퀘스트와 리스폰스를 여러 번 주고받는 비용을 아낄 수 있다.
  - PPR (Partial Preredendering)
    `use cache`
  - 
## 웹사이트 완성도 높이기
### error.js
각 페이지별로 만들 필요는 없이 app폴더에 하나 작성해둔다.
