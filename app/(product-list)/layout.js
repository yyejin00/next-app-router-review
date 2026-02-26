import SearchForm from './components/SearchForm';

export default function ProductListLayout({ children }) {
  return (
    <div>
      <SearchForm />
      <div style={{ marginTop: '16px' }}>{children}</div>
    </div>
  );
}
