'use client';

import { useTheme } from '@/contexts/themeContext';
import styles from './ThemeSelect.module.css';
import Dropdown from '@/components/Dropdown';

export default function ThemeSelect() {
  const { theme, setTheme } = useTheme();

  return (
    <Dropdown
      className={styles.input}
      name="theme"
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      options={[
        { label: '라이트', value: 'light' },
        { label: '다크', value: 'dark' },
      ]}
    />
  );
}
