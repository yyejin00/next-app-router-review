'use client';

import { useTheme } from '@/contexts/themeContext';

export default function ThemeSelect() {
  const { theme, setTheme } = useTheme();

  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
      <option value="light">라이트</option>
      <option value="dark">다크</option>
    </select>
  );
}
