import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovies, endpoints } from '../services/api';
import { Star, Calendar, Tag, Play } from 'lucide-react';

const Detail = () => {
  const { detailPath } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeEpisode, setActiveEpisode] = useState(null);

  useEffect(() => {
    const loadDetail = async () => {
      setLoading(true);
      const decodedPath = decodeURIComponent(detailPath);
      const res = await fetchMovies(endpoints.detail, 1, null, decodedPath);
      
      if (res && res.items && res.items.length > 0) {
        const detail = res.items[0];
        setData(detail);
        // Jika ada episode list (series), set episode pertama
        if (detail.episodes && detail.episodes.length > 0) {
            setActiveEpisode(detail.episodes[0]);
        }
      }
      setLoading(false);
    };
    loadDetail();
  }, [detailPath]);

  if (loading) return <div className="h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  if (!data) return <div className="h-screen flex items-center justify-center">Content not found</div>;

  // Determine video URL source: Direct playerUrl or active episode url
  const videoUrl = activeEpisode ? activeEpisode.playerUrl : data.playerUrl;

  return (
    <div className="min-h-screen pt-20 pb-10">
      {/* Backdrop & Player Area */}
      <div className="w-full bg-black relative">
        <div className="container mx-auto px-0 md:px-4">
           <div className="aspect-video w-full bg-black rounded-none md:rounded-xl overflow-hidden shadow-2xl border border-gray-800">
             {videoUrl ? (
                <iframe 
                  src={videoUrl} 
                  className="w-full h-full" 
                  allowFullScreen 
                  title={data.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
             ) : (
               <div className="w-full h-full flex items-center justify-center bg-gray-900 text-gray-500">
                 No Video Source Available
               </div>
             )}
           </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="container mx-auto px-4 mt-8 flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <img src={data.poster} alt={data.title} className="w-full rounded-lg shadow-lg" />
        </div>
        
        <div className="w-full md:w-3/4">
          <h1 className="text-4xl font-bold mb-2">{data.title}</h1>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
            <span className="flex items-center gap-1 text-yellow-400"><Star className="w-4 h-4 fill-current"/> {data.rating}</span>
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4"/> {data.year}</span>
            <span className="flex items-center gap-1"><Tag className="w-4 h-4"/> {data.genre}</span>
            <span className="border border-gray-600 px-2 rounded">{data.type}</span>
          </div>

          <p className="text-gray-300 leading-relaxed mb-8 text-lg">{data.description || "No description available."}</p>

          {/* Episode List (If Series) - Mocking structure based on requirement */}
          {data.episodes && data.episodes.length > 0 && (
            <div className="bg-gray-900 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Episodes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-60 overflow-y-auto custom-scrollbar">
                {data.episodes.map((ep, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveEpisode(ep)}
                    className={`flex items-center gap-3 p-3 rounded text-left transition-colors ${activeEpisode === ep ? 'bg-primary text-white' : 'bg-gray-800 hover:bg-gray-700'}`}
                  >
                    <Play className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate text-sm">Ep {idx + 1}: {ep.title || `Episode ${idx+1}`}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;
