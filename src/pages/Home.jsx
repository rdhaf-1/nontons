import { useEffect, useState } from 'react';
import { fetchMovies, endpoints } from '../services/api';
import Hero from '../components/Hero';
import MovieCard from '../components/MovieCard';

const Section = ({ title, items, loading }) => (
  <div className="py-8 px-4 md:px-8">
    <div className="flex justify-between items-end mb-4">
      <h2 className="text-xl md:text-2xl font-bold text-white border-l-4 border-primary pl-3">{title}</h2>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {loading 
        ? Array(5).fill(0).map((_, i) => <MovieCard key={i} isLoading={true} />)
        : items.map((item) => <MovieCard key={item.id} item={item} />)
      }
    </div>
  </div>
);

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [kdrama, setKdrama] = useState([]);
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [trendData, kdramaData, animeData] = await Promise.all([
          fetchMovies(endpoints.trending),
          fetchMovies(endpoints.kdrama),
          fetchMovies(endpoints.anime)
        ]);
        
        if (trendData?.items) setTrending(trendData.items);
        if (kdramaData?.items) setKdrama(kdramaData.items.slice(0, 10));
        if (animeData?.items) setAnime(animeData.items.slice(0, 10));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div className="min-h-screen pb-20">
      {loading ? (
        <div className="h-[80vh] w-full bg-gray-900 animate-pulse" />
      ) : (
        <Hero items={trending} />
      )}
      
      <div className="container mx-auto -mt-10 relative z-10">
        <Section title="Trending Now" items={trending} loading={loading} />
        <Section title="Popular K-Drama" items={kdrama} loading={loading} />
        <Section title="Latest Anime" items={anime} loading={loading} />
      </div>
    </div>
  );
};

export default Home;
