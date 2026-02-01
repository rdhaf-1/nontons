import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchMovies, endpoints } from '../services/api';
import MovieCard from '../components/MovieCard';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const doSearch = async () => {
      if (!query) return;
      setLoading(true);
      const res = await fetchMovies(endpoints.search, 1, query);
      if (res && res.items) {
        setItems(res.items);
      }
      setLoading(false);
    };
    doSearch();
  }, [query]);

  return (
    <div className="pt-24 px-4 container mx-auto min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Search Results for: <span className="text-primary">{query}</span></h1>
      
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
           {Array(4).fill(0).map((_, i) => <MovieCard key={i} isLoading={true} />)}
        </div>
      ) : items.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map((item) => <MovieCard key={item.id} item={item} />)}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-20">No results found</div>
      )}
    </div>
  );
};

export default SearchPage;
