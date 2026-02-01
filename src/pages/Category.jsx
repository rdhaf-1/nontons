import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovies, endpoints } from '../services/api';
import MovieCard from '../components/MovieCard';

const Category = () => {
  const { slug } = useParams(); // e.g., 'kdrama', 'anime'
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Reset saat ganti kategori
  useEffect(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
    loadData(1, true);
  }, [slug]);

  const loadData = async (pageNum, isRefresh = false) => {
    setLoading(true);
    // Map route slug to API action
    const actionMap = {
      'indonesian-movies': endpoints.indoMovies,
      'kdrama': endpoints.kdrama,
      'anime': endpoints.anime,
      'short-tv': endpoints.shortTv,
      'indonesian-drama': endpoints.indoDrama
    };
    
    const action = actionMap[slug] || endpoints.trending;
    const res = await fetchMovies(action, pageNum);

    if (res && res.items) {
      if (isRefresh) setItems(res.items);
      else setItems(prev => [...prev, ...res.items]);
      
      setHasMore(res.hasMore);
    }
    setLoading(false);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadData(nextPage);
  };

  return (
    <div className="pt-24 px-4 container mx-auto min-h-screen">
      <h1 className="text-3xl font-bold mb-8 capitalize">{slug.replace('-', ' ')}</h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {items.map((item, idx) => (
          <MovieCard key={`${item.id}-${idx}`} item={item} />
        ))}
        {loading && Array(5).fill(0).map((_, i) => <MovieCard key={i} isLoading={true} />)}
      </div>

      {!loading && hasMore && (
        <div className="flex justify-center mt-10 mb-20">
          <button 
            onClick={handleLoadMore}
            className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-full font-bold transition-all"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Category;
