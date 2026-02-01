import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/effect-fade';

const Hero = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="h-full w-full"
      >
        {items.slice(0, 5).map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative h-full w-full">
              {/* Background Image */}
              <div className="absolute inset-0">
                 <img src={item.poster} alt={item.title} className="w-full h-full object-cover opacity-60 md:opacity-100" />
                 <div className="absolute inset-0 bg-gradient-to-t from-darker via-darker/50 to-transparent md:bg-gradient-to-r md:from-darker md:via-darker/80 md:to-transparent"></div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full md:w-2/3 p-6 md:p-16 flex flex-col justify-end h-full">
                <span className="text-primary font-bold tracking-wider text-sm mb-2 uppercase">{item.genre}</span>
                <h1 className="text-3xl md:text-6xl font-bold mb-4 leading-tight">{item.title}</h1>
                <p className="text-gray-300 text-sm md:text-lg mb-6 line-clamp-3 md:line-clamp-2 max-w-xl">
                    {/* Description usually in detail, using title/genre here as placeholder if desc missing in list */}
                    Watch the latest {item.genre} hit "{item.title}" now available in HD.
                </p>
                <div className="flex gap-4">
                  <Link 
                    to={`/detail/${encodeURIComponent(item.detailPath)}`}
                    className="bg-primary text-white px-8 py-3 rounded font-bold hover:bg-red-700 transition flex items-center gap-2"
                  >
                    Play Now
                  </Link>
                  <button className="bg-gray-800/80 text-white px-8 py-3 rounded font-bold hover:bg-gray-700 transition backdrop-blur-sm">
                    More Info
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
