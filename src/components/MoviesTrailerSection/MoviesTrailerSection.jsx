import React, { useContext, useEffect, useRef, useState } from "react";
import { allMovies } from "../../contexts/allMoviesContext/AllMoviesContext";

const MoviesTrailerSection = () => {
  const { movies } = useContext(allMovies);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const scrollRef = useRef(null);
  const itemRefs = useRef({});

  const sortedMovies = [...movies]
  .filter(movie => movie.status?.toLowerCase() === "released")
  .sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));

  // ⭐ initial selected
  useEffect(() => {
    if (sortedMovies.length && !selectedMovie) {
      setSelectedMovie(sortedMovies[0]);
    }
  }, [sortedMovies, selectedMovie]);

  // ⭐ arrow visibility
  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;

    setShowLeft(el.scrollLeft > 5);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
  };

  useEffect(() => {
    updateArrows();
  }, [sortedMovies]);

  // ⭐ auto center selected
  useEffect(() => {
    if (!selectedMovie) return;

    const container = scrollRef.current;
    const item = itemRefs.current[selectedMovie.id];

    if (!container || !item) return;

    const containerRect = container.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    const offset =
      itemRect.left -
      containerRect.left -
      containerRect.width / 2 +
      itemRect.width / 2;

    container.scrollBy({ left: offset, behavior: "smooth" });
  }, [selectedMovie]);

  const getVideoId = (url) => url.split("/embed/")[1];

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -350, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
  };

  const scrollStart = () => {
    scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
  };

  if (!selectedMovie) return null;

  return (
    <section className="bg-gray-950 text-white px-6 md:px-16 py-14">
      <h2 className="text-3xl font-bold mb-6">Watch Trailers</h2>

      {/* ⭐ MAIN TRAILER */}
      <div className="w-full aspect-video rounded-xl overflow-hidden shadow-xl mb-8">
        <iframe
          className="w-full h-full"
          src={`${selectedMovie.trailer}?autoplay=1&mute=1`}
          title={selectedMovie.title}
          allowFullScreen
        />
      </div>

      <h3 className="text-xl font-semibold mb-6">{selectedMovie.title}</h3>

      {/* ⭐ CAROUSEL */}
      <div className="relative group">
        {showLeft && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition"
          >
            ◀
          </button>
        )}

        {showRight && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition"
          >
            ▶
          </button>
        )}

        <div
          ref={scrollRef}
          onScroll={updateArrows}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth cursor-grab active:cursor-grabbing"
        >
          {sortedMovies.map((movie) => {
            const videoId = getVideoId(movie.trailer);
            const thumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

            return (
              <div
                key={movie.id}
                ref={(el) => (itemRefs.current[movie.id] = el)}
                onClick={() => setSelectedMovie(movie)}
                className={`min-w-[240px] cursor-pointer transition ${
                  selectedMovie.id === movie.id
                    ? "scale-105 border-2 border-red-500"
                    : "opacity-80 hover:opacity-100"
                }`}
              >
                <div className="aspect-video rounded-lg overflow-hidden relative">
                  <img
                    src={thumb}
                    loading="lazy"
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white text-xl">
                      ▶
                    </div>
                  </div>
                </div>

                <p className="mt-2 text-sm">{movie.title}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ⭐ MORE / LESS */}
      <div className="flex justify-end mt-5">
        <button
          onClick={showRight ? scrollRight : scrollStart}
          className="text-red-500 hover:text-red-400 font-semibold"
        >
          {showRight ? "More" : "Back to Start"}
        </button>
      </div>
    </section>
  );
};

export default MoviesTrailerSection;
