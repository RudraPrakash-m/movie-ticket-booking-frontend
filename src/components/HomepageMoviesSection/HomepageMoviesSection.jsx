import React, { useContext, useMemo, useRef, useEffect, useState } from "react";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { allMovies } from "../../contexts/allMoviesContext/AllMoviesContext";
import { Link } from "react-router-dom";

const HomepageMoviesSection = () => {
  const { movies } = useContext(allMovies);
  const scrollRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const releasedMovies = useMemo(() => {
  return movies
    .filter(movie => movie.status === "released")
    .sort(() => 0.5 - Math.random())
    .slice(0, 7);
}, [movies]);

  // arrow scroll
  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 340;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // progress indicator
  useEffect(() => {
    const container = scrollRef.current;

    const handleScroll = () => {
      const max = container.scrollWidth - container.clientWidth;
      const current = container.scrollLeft;
      setProgress((current / max) * 100);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="bg-gray-950 text-white py-14 relative group">
      {/* header */}
      <div className="flex justify-between items-center px-10 md:px-16 mb-6">
        <h2 className="text-2xl font-semibold">Discover Movies</h2>

        <Link
          to="/shows"
          className="text-red-500 hover:underline text-sm font-medium"
        >
          More →
        </Link>
      </div>

      {/* arrows (hover visible) */}
      <button
        onClick={() => scroll("left")}
        className="opacity-0 group-hover:opacity-100 transition absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/70 p-2 rounded-full"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={() => scroll("right")}
        className="opacity-0 group-hover:opacity-100 transition absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/70 p-2 rounded-full"
      >
        <ChevronRight />
      </button>

      {/* gradient edges */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-gray-950 to-transparent z-10"></div>
      <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-gray-950 to-transparent z-10"></div>

      {/* scroll container */}
      <div
        ref={scrollRef}
        className="overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar"
      >
        <div className="flex gap-8 px-10 md:px-16 pb-4">
          {releasedMovies.map((movie) => (
            <ParallaxCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>

      {/* progress bar */}
      <div className="mt-4 px-10 md:px-16">
        <div className="h-[3px] bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-red-600 transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default HomepageMoviesSection;

// ⭐ Parallax card component
const ParallaxCard = ({ movie }) => {
  const cardRef = useRef(null);

  const handleMove = (e) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const center = rect.width / 2;
    const rotate = (x - center) / 25;

    el.style.transform = `rotateY(${rotate}deg) scale(1.05)`;
  };

  const reset = () => {
    const el = cardRef.current;
    if (el) el.style.transform = "rotateY(0deg) scale(1)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="relative min-w-[260px] h-[420px] rounded-xl overflow-hidden shadow-xl snap-center transition-transform duration-300"
    >
      {/* poster */}
      <img
        src={movie.poster}
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

      {/* favourite */}
      <button className="absolute top-3 right-3 p-2 bg-black/60 rounded-full hover:bg-red-600 z-10">
        <Heart size={18} />
      </button>

      {/* bottom content */}
      <div className="absolute bottom-0 p-3 z-10 space-y-1.5 w-full">
        <h3 className="text-base font-semibold leading-tight line-clamp-1">
          {movie.title}
        </h3>

        <p className="text-xs text-gray-300">
          ⭐ {movie.rating} • {movie.year}
        </p>

        <p className="text-xs text-gray-200 leading-snug line-clamp-2">
          {movie.description}
        </p>

        <Link
          to={`/booking/${movie.title
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, "")
            .trim()
            .replace(/\s+/g, "-")}`}
          state={{ movie }}
          className="inline-block mt-1 px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-xs rounded-md font-medium"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};
