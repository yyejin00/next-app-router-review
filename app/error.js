'use client';

import { useEffect } from 'react';
import Button from '@/components/Button';
import styles from './error.module.css';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>오류가 발생했습니다</h1>
      <p className={styles.message}>
        문제가 지속되면 잠시 후 다시 시도해 주세요.
      </p>
      <Button onClick={reset}>다시 시도</Button>
    </div>
  );
}
