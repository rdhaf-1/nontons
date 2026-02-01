import { Link } from 'react-router-dom';
import { Star, PlayCircle } from 'lucide-react';

const MovieCard = ({ item, isLoading }) => {
  if (isLoading) {
    return (
      <div className="aspect-[2/3] bg-gray-800 rounded-md animate-pulse"></div>
    );
  }

  return (
    <Link to={`/detail/${encodeURIComponent(item.detailPath)}`} className="group relative block aspect-[2/3] overflow-hidden rounded-md bg-gray-900 transition-all hover:scale-105 hover:z-10 hover:shadow-xl hover:shadow-primary/20">
      <img 
        src={item.poster} 
        alt={item.title} 
        className="h-full w-full object-cover transition-transform duration-300 group-hover:opacity-50"
        loading="lazy"
      />
      
      {/* Overlay Info */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black via-black/80 to-transparent">
        <div className="flex items-center gap-1 text-yellow-400 mb-1">
          <Star className="w-3 h-3 fill-current" />
          <span className="text-xs font-bold">{item.rating}</span>
        </div>
        <h3 className="text-sm font-bold leading-tight mb-1 line-clamp-2">{item.title}</h3>
        <div className="flex justify-between text-[10px] text-gray-300">
          <span>{item.year}</span>
          <span>{item.type}</span>
        </div>
        <PlayCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-primary opacity-0 group-hover:opacity-100 transition-all scale-0 group-hover:scale-100" />
      </div>

      {/* Static Info (Mobile Friendly) */}
      <div className="md:hidden absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-2">
         <h3 className="text-xs font-bold truncate">{item.title}</h3>
      </div>
    </Link>
  );
};

export default MovieCard;
