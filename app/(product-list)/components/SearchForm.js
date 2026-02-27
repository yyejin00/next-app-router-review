'use client';

import { useEffect, useState } from 'react';
import styles from './SearchForm.module.css';

import { usePathname, useRouter } from 'next/navigation';

export default function SearchForm() {
  const [query, setQuery] = useState();
  const router = useRouter();
  const pathname = usePathname();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      router.push(`/search?q=${query}`);
    }
  };
  useEffect(() => {
    if (pathname === '/') {
      setQuery('');
    }
  }, [pathname]);
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        name="q"
        type="text"
        placeholder="찾고 싶은 상품을 검색해보세요."
        className={styles.input}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className={styles.button}>
        검색
      </button>
    </form>
  );
}
//1.일반 form 컴포넌트대신 next.js 컴포넌트사용
//import Form from 'next/form';
//추가기능 - 페이지이동을 클라이언트 사이드에서 가능
//2.action 프롭스 이동하지 않고 페이지 이동을 직접 구현하는 방법
//'use client'
