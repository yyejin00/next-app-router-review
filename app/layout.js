import Header from '@/components/Header/Header';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div style={{ padding: '16px' }}>{children}</div>
      </body>
    </html>
  );
}
