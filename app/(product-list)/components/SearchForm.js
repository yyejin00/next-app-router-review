'use client';

import { useEffect, useState } from 'react';
import styles from './SearchForm.module.css';
import { usePathname, useRouter } from 'next/navigation';

export default function SearchForm() {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      router.push(`/search?q=${query}`);
    }
  };

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (pathname === '/') {
      setQuery('');
    }
  }, [pathname]);
  /* eslint-enable react-hooks/set-state-in-effect */

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
