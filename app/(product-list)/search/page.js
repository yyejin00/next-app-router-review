export default async function Search({ searchParams }) {
  const { q } = await searchParams;
  return <div>검색어: {q}</div>;
}
