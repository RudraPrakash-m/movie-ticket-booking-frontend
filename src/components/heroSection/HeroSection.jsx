import React, { useState } from "react";

const HeroSection = ({thumbMovie}) => {

    const [movie, setMovie] = useState(thumbMovie)

  return (
    <>
      {/* overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>

      {/* content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-xl mx-6 sm:mx-10 md:mx-16 lg:mx-24 text-white space-y-5">
          {/* studio badge */}
          <div className="flex items-center gap-3">
            <img
              src="https://quickshow.vercel.app/assets/marvelLogo-D2PF-9pQ.svg"
              alt="Marvel"
              className="h-9 sm:h-10 md:h-11"
            />
          </div>

          {/* title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            {movie.title}
          </h1>

          {/* meta */}
          <div className="flex flex-wrap gap-3 text-sm sm:text-base text-gray-300">
            <span>{movie.type}</span>
            <span>•</span>
            <span>{movie.year}</span>
            <span>•</span>
            <span>{movie.duration}</span>
          </div>

          {/* desc */}
          <p className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed">
            {movie.description}
          </p>

          {/* button */}
          <button className="mt-2 w-fit px-6 py-3 sm:px-7 bg-red-600 hover:bg-red-700 rounded-full font-semibold transition">
            Explore Now
          </button>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
