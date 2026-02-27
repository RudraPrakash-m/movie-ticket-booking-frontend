import React, { createContext } from "react";

export const allMovies = createContext();

const AllMoviesContext = ({ children }) => {
  const movies = [
    {
      id: 1,
      title: "Zootopia 2",
      rating: 7.5,
      duration: "1h 47m",
      genres: ["Animation", "Family", "Comedy"],
      year: 2025,
      poster:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFdVnM5nAXtrkgOQyWvyriqHNaiOBfGLwH3A&s",
      description: "Judy Hopps and Nick Wilde uncover a new conspiracy.",
      cast: ["Ginnifer Goodwin", "Jason Bateman"],
      shows: [
        {
          date: "2026-03-01",
          time: "10:00",
          bookedSeats: ["A1", "A2"],
          tempSelectedSeats: [],
        },
        {
          date: "2026-03-01",
          time: "14:00",
          bookedSeats: ["B3"],
          tempSelectedSeats: [],
        },
        {
          date: "2026-03-02",
          time: "18:00",
          bookedSeats: [],
          tempSelectedSeats: [],
        },
      ],
    },

    {
      id: 2,
      title: "Avengers: Endgame",
      rating: 8.4,
      duration: "3h 2m",
      genres: ["Action", "Sci-Fi"],
      year: 2019,
      poster: "https://m.media-amazon.com/images/I/81ExhpBEbHL._AC_SY679_.jpg",
      description: "The Avengers unite to undo Thanos’ devastation.",
      cast: ["Robert Downey Jr.", "Chris Evans"],
      shows: [
        {
          date: "2026-03-01",
          time: "11:00",
          bookedSeats: ["C1"],
          tempSelectedSeats: [],
        },
        {
          date: "2026-03-02",
          time: "15:00",
          bookedSeats: ["A5", "A6"],
          tempSelectedSeats: [],
        },
      ],
    },

    {
      id: 3,
      title: "Interstellar",
      rating: 8.6,
      duration: "2h 49m",
      genres: ["Sci-Fi", "Drama"],
      year: 2014,
      poster:
        "https://cdn.britannica.com/15/181115-050-13EF0AFB/Matthew-McConaughey-Interstellar-Christopher-Nolan.jpg",
      description: "Explorers travel through a wormhole.",
      cast: ["Matthew McConaughey"],
      shows: [
        {
          date: "2026-03-01",
          time: "09:30",
          bookedSeats: ["D1"],
          tempSelectedSeats: [],
        },
        {
          date: "2026-03-03",
          time: "17:00",
          bookedSeats: [],
          tempSelectedSeats: [],
        },
      ],
    },

    {
      id: 4,
      title: "The Batman",
      rating: 7.8,
      duration: "2h 56m",
      genres: ["Action", "Crime"],
      year: 2022,
      poster:
        "https://m.media-amazon.com/images/M/MV5BMmU5NGJlMzAtMGNmOC00YjJjLTgyMzUtNjAyYmE4Njg5YWMyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
      description: "Batman hunts a serial killer.",
      cast: ["Robert Pattinson"],
      shows: [
        {
          date: "2026-03-01",
          time: "13:00",
          bookedSeats: ["A1"],
          tempSelectedSeats: [],
        },
        {
          date: "2026-03-02",
          time: "20:00",
          bookedSeats: [],
          tempSelectedSeats: [],
        },
      ],
    },

    {
      id: 5,
      title: "Spider-Man: No Way Home",
      rating: 8.2,
      duration: "2h 28m",
      genres: ["Action", "Fantasy"],
      year: 2021,
      poster:
        "https://m.media-amazon.com/images/M/MV5BMmFiZGZjMmEtMTA0Ni00MzA2LTljMTYtZGI2MGJmZWYzZTQ2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
      description: "Peter Parker faces multiverse chaos.",
      cast: ["Tom Holland"],
      shows: [
        {
          date: "2026-03-01",
          time: "12:00",
          bookedSeats: ["B1"],
          tempSelectedSeats: [],
        },
        {
          date: "2026-03-02",
          time: "16:00",
          bookedSeats: [],
          tempSelectedSeats: [],
        },
      ],
    },

    {
      id: 6,
      title: "Dune",
      rating: 8.0,
      duration: "2h 35m",
      genres: ["Sci-Fi", "Adventure"],
      year: 2021,
      poster: "https://m.media-amazon.com/images/I/81ym3QUd3KL._AC_SY679_.jpg",
      description: "Paul Atreides journeys to Arrakis.",
      cast: ["Timothée Chalamet"],
      shows: [
        {
          date: "2026-03-03",
          time: "10:00",
          bookedSeats: [],
          tempSelectedSeats: [],
        },
        {
          date: "2026-03-04",
          time: "19:00",
          bookedSeats: ["C2"],
          tempSelectedSeats: [],
        },
      ],
    },

    {
      id: 7,
      title: "Frozen II",
      rating: 6.8,
      duration: "1h 43m",
      genres: ["Animation", "Family"],
      year: 2019,
      poster: "https://m.media-amazon.com/images/I/71QKQ9mwV7L._AC_SY679_.jpg",
      description: "Elsa searches for truth.",
      cast: ["Idina Menzel"],
      shows: [
        {
          date: "2026-03-02",
          time: "10:00",
          bookedSeats: [],
          tempSelectedSeats: [],
        },
        {
          date: "2026-03-02",
          time: "13:00",
          bookedSeats: ["A3"],
          tempSelectedSeats: [],
        },
      ],
    },

    {
      id: 8,
      title: "Joker",
      rating: 8.4,
      duration: "2h 2m",
      genres: ["Drama"],
      year: 2019,
      poster: "https://m.media-amazon.com/images/I/71rNJQ2g-EL._AC_SY679_.jpg",
      description: "A comedian descends into madness.",
      cast: ["Joaquin Phoenix"],
      shows: [
        {
          date: "2026-03-03",
          time: "18:00",
          bookedSeats: ["E1"],
          tempSelectedSeats: [],
        },
      ],
    },

    {
      id: 9,
      title: "Inception",
      rating: 8.8,
      duration: "2h 28m",
      genres: ["Sci-Fi", "Thriller"],
      year: 2010,
      poster: "https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SY679_.jpg",
      description: "A thief invades dreams.",
      cast: ["Leonardo DiCaprio"],
      shows: [
        {
          date: "2026-03-01",
          time: "22:00",
          bookedSeats: [],
          tempSelectedSeats: [],
        },
      ],
    },

    {
      id: 10,
      title: "Top Gun: Maverick",
      rating: 8.3,
      duration: "2h 10m",
      genres: ["Action"],
      year: 2022,
      poster:
        "https://upload.wikimedia.org/wikipedia/en/thumb/1/13/Top_Gun_Maverick_Poster.jpg/250px-Top_Gun_Maverick_Poster.jpg",
      description: "Maverick trains elite pilots.",
      cast: ["Tom Cruise"],
      shows: [
        {
          date: "2026-03-04",
          time: "15:00",
          bookedSeats: ["B4"],
          tempSelectedSeats: [],
        },
      ],
    },

    {
      id: 11,
      title: "Encanto",
      rating: 7.2,
      duration: "1h 39m",
      genres: ["Animation"],
      year: 2021,
      poster:
        "https://upload.wikimedia.org/wikipedia/en/thumb/8/83/Encanto_poster.jpg/250px-Encanto_poster.jpg",
      description: "A magical family's miracle fades.",
      cast: ["Stephanie Beatriz"],
      shows: [
        {
          date: "2026-03-02",
          time: "11:30",
          bookedSeats: [],
          tempSelectedSeats: [],
        },
      ],
    },
  ];
  return <allMovies.Provider value={{ movies }}>{children}</allMovies.Provider>;
};

export default AllMoviesContext;
