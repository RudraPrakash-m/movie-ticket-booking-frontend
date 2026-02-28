import React from "react";
import { lazy, Suspense } from "react";
import HomepageMoviesSection from "../../components/HomepageMoviesSection/HomepageMoviesSection";
const MoviesTrailerSection = lazy(
  () => import("../../components/MoviesTrailerSection/MoviesTrailerSection"),
);
import HeroSection from "../../components/heroSection/HeroSection";

const Homepage = () => {
  const movie = {
    title: "Guardians of the Galaxy Vol. 2",
    type: "Superhero / Sci-Fi / Adventure",
    year: 2017,
    duration: "2h 16m",
    description:
      "The Guardians struggle to keep their newfound family together while unraveling the mystery of Peter Quill’s true parentage, leading to emotional revelations and cosmic battles.",
  };

  return (
    <>
      {/* ⭐ HERO ONLY */}
      <div
        className="h-screen w-full bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://heroichollywood.com/wp-content/uploads/2016/07/Guardians-of-the-Galaxy-Vol.-2-banner-1.jpg')",
        }}
      >
        <HeroSection thumbMovie={movie} />
      </div>

      {/* ⭐ NORMAL FLOW */}
      <HomepageMoviesSection />
      <Suspense
        fallback={
          <div className="text-white p-10 text-center">Loading trailers...</div>
        }
      >
        <MoviesTrailerSection />
      </Suspense>
    </>
  );
};

export default Homepage;
