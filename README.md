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
        key={q || 'all'}//false 값이 될 경우 all 값을 줘서 안정적으로 변화
        initialProducts={products}
        initialNext={next}
      />
```
- 서버 클라이언트 경계
  부모컴포넌트가 클라이언트라면 자식 클라이언트도 클라이언트 컴포넌트가 된다.
  여기서 클라이언트 컴포넌트가 된 부모컴포넌트와 부모컴포넌트의 조상컴포넌트간의 경계가 생긴다.
   