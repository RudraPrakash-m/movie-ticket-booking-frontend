import React, { createContext, useState } from "react";

export const allMovies = createContext();

const AllMoviesContext = ({ children }) => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Zootopia 2",
      addedAt: "2026-02-27",
      releaseDate: "2026-06-20",
      rating: 7.5,
      duration: "1h 47m",
      genres: ["Animation", "Family", "Comedy"],
      year: 2025,
      status: "upcoming",
      poster:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFdVnM5nAXtrkgOQyWvyriqHNaiOBfGLwH3A&s",
      trailer: "https://www.youtube.com/embed/jWM0ct-OLsM",
      description:
        "Judy Hopps and Nick Wilde return to tackle a far more dangerous conspiracy that threatens the fragile harmony between predator and prey. As corruption spreads through the city’s highest offices, the duo must navigate political deception, underground crime networks, and their own evolving partnership to uncover the truth before Zootopia collapses into chaos.",
      cast: [
        "Ginnifer Goodwin",
        "Jason Bateman",
        "Shakira",
        "Idris Elba",
        "Jenny Slate",
      ],
      shows: [
        {
          date: "2026-03-01",
          time: "10:00",
          price: 180,
          bookedSeats: ["A1", "A2"],
          tempSelectedSeats: [],
          screenId: 1,
        },
        {
          date: "2026-03-01",
          time: "14:00",
          price: 220,
          bookedSeats: ["B3"],
          tempSelectedSeats: [],
          screenId: 2,
        },
        {
          date: "2026-03-02",
          time: "18:00",
          price: 260,
          bookedSeats: [],
          tempSelectedSeats: [],
          screenId: 1,
        },
      ],
    },

    {
      id: 2,
      title: "Avengers: Endgame",
      addedAt: "2026-02-20",
      rating: 8.4,
      duration: "3h 2m",
      genres: ["Action", "Sci-Fi"],
      year: 2019,
      price: 349,
      status: "released",
      poster: "https://m.media-amazon.com/images/I/81ExhpBEbHL._AC_SY679_.jpg",
      trailer: "https://www.youtube.com/embed/TcMBFSGVi1c",
      description:
        "After the devastating snap that erased half of all life, the remaining Avengers regroup for one final, desperate mission. Facing impossible odds, fractured morale, and the weight of past failures, they attempt a time-bending plan to undo Thanos’ destruction — even if it means sacrificing everything they have left.",
      cast: [
        "Robert Downey Jr.",
        "Chris Evans",
        "Scarlett Johansson",
        "Mark Ruffalo",
        "Chris Hemsworth",
      ],
      shows: [
        {
          date: "2026-03-01",
          time: "11:00",
          price: 260,
          bookedSeats: ["C1"],
          tempSelectedSeats: [],
          screenId: 1,
        },
        {
          date: "2026-03-02",
          time: "15:00",
          price: 320,
          bookedSeats: ["A5", "A6"],
          tempSelectedSeats: [],
          screenId: 2,
        },
      ],
    },

    {
      id: 3,
      title: "Interstellar",
      addedAt: "2026-02-18",
      rating: 8.6,
      duration: "2h 49m",
      genres: ["Sci-Fi", "Drama"],
      year: 2014,
      price: 329,
      status: "released",
      poster:
        "https://cdn.britannica.com/15/181115-050-13EF0AFB/Matthew-McConaughey-Interstellar-Christopher-Nolan.jpg",
      trailer: "https://www.youtube.com/embed/zSWdZVtXT7E",
      description:
        "With Earth on the brink of extinction, a former NASA pilot leads a daring interstellar mission through a mysterious wormhole in search of a new home for humanity. As time bends and gravity distorts reality, he must choose between saving the species and returning to the daughter he left behind.",
      cast: [
        "Matthew McConaughey",
        "Anne Hathaway",
        "Jessica Chastain",
        "Michael Caine",
      ],
      shows: [
        {
          date: "2026-03-01",
          time: "09:30",
          price: 220,
          bookedSeats: ["D1"],
          tempSelectedSeats: [],
          screenId: 2,
        },
        {
          date: "2026-03-03",
          time: "17:00",
          price: 300,
          bookedSeats: [],
          tempSelectedSeats: [],
          screenId: 1,
        },
      ],
    },

    {
      id: 4,
      title: "The Batman",
      addedAt: "2026-02-15",
      releaseDate: "2026-05-10",
      rating: 7.8,
      duration: "2h 56m",
      genres: ["Action", "Crime"],
      year: 2022,
      status: "upcoming",
      poster:
        "https://m.media-amazon.com/images/M/MV5BMmU5NGJlMzAtMGNmOC00YjJjLTgyMzUtNjAyYmE4Njg5YWMyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
      trailer: "https://www.youtube.com/embed/mqqft2x_Aa4",
      description:
        "In his second year as Gotham’s vigilante, Bruce Wayne uncovers a chilling pattern of murders orchestrated by a cryptic serial killer. As he follows a trail of corruption reaching the city’s most powerful elites, Batman is forced to confront the darkness within himself while redefining what justice truly means.",
      cast: [
        "Robert Pattinson",
        "Zoë Kravitz",
        "Paul Dano",
        "Colin Farrell",
        "Jeffrey Wright",
      ],
      shows: [
        {
          date: "2026-03-01",
          time: "13:00",
          price: 230,
          bookedSeats: ["A1"],
          tempSelectedSeats: [],
          screenId: 2,
        },
        {
          date: "2026-03-02",
          time: "20:00",
          price: 320,
          bookedSeats: [],
          tempSelectedSeats: [],
          screenId: 2,
        },
      ],
    },

    {
      id: 5,
      title: "Spider-Man: No Way Home",
      addedAt: "2026-02-10",
      rating: 8.2,
      duration: "2h 28m",
      genres: ["Action", "Fantasy"],
      year: 2021,
      price: 339,
      status: "released",
      poster:
        "https://m.media-amazon.com/images/M/MV5BMmFiZGZjMmEtMTA0Ni00MzA2LTljMTYtZGI2MGJmZWYzZTQ2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
      trailer: "https://www.youtube.com/embed/JfVOs4VSpmA",
      description:
        "When Peter Parker’s identity is exposed to the world, his life spirals out of control. A risky spell meant to restore anonymity fractures the multiverse, unleashing villains from alternate realities. Forced to grow beyond his teenage fears, Peter learns that being a hero sometimes means making the ultimate personal sacrifice.",
      cast: [
        "Tom Holland",
        "Zendaya",
        "Benedict Cumberbatch",
        "Jacob Batalon",
        "Willem Dafoe",
      ],
      shows: [
        {
          date: "2026-03-01",
          time: "12:00",
          price: 250,
          bookedSeats: ["B1"],
          tempSelectedSeats: [],
          screenId: 1,
        },
        {
          date: "2026-03-02",
          time: "16:00",
          price: 290,
          bookedSeats: [],
          tempSelectedSeats: [],
          screenId: 2,
        },
      ],
    },

    {
      id: 6,
      title: "Dune",
      addedAt: "2026-02-05",
      releaseDate: "2026-04-18",
      rating: 8.0,
      duration: "2h 35m",
      genres: ["Sci-Fi", "Adventure"],
      year: 2021,
      status: "upcoming",
      poster: "https://m.media-amazon.com/images/I/81ym3QUd3KL._AC_SY679_.jpg",
      trailer: "https://www.youtube.com/embed/8g18jFHCLXk",
      description:
        "Paul Atreides, heir to a noble house, is thrust into a deadly political conflict on the desert planet Arrakis — the universe’s only source of a priceless resource. As betrayal unfolds and war erupts, Paul must embrace a destiny greater than himself to protect his family and the future of humanity.",
      cast: [
        "Timothée Chalamet",
        "Zendaya",
        "Rebecca Ferguson",
        "Oscar Isaac",
        "Josh Brolin",
      ],
      shows: [
        {
          date: "2026-03-03",
          time: "10:00",
          price: 210,
          bookedSeats: [],
          tempSelectedSeats: [],
          screenId: 1,
        },
        {
          date: "2026-03-04",
          time: "19:00",
          price: 330,
          bookedSeats: ["C2"],
          tempSelectedSeats: [],
          screenId: 1,
        },
      ],
    },

    {
      id: 7,
      title: "Frozen II",
      addedAt: "2026-02-03",
      releaseDate: "2026-07-05",
      rating: 6.8,
      duration: "1h 43m",
      genres: ["Animation", "Family"],
      year: 2019,
      status: "upcoming",
      poster: "https://m.media-amazon.com/images/I/71QKQ9mwV7L._AC_SY679_.jpg",
      trailer: "https://www.youtube.com/embed/Zi4LMpSDccc",
      description:
        "Haunted by a mysterious voice calling from the unknown, Elsa embarks on a perilous journey beyond Arendelle to uncover the origins of her powers. Alongside Anna, Kristoff, Olaf, and Sven, she faces ancient secrets, elemental forces, and truths that will redefine her kingdom’s history forever.",
      cast: ["Idina Menzel", "Kristen Bell", "Josh Gad", "Jonathan Groff"],
      shows: [
        {
          date: "2026-03-02",
          time: "10:00",
          price: 170,
          bookedSeats: [],
          tempSelectedSeats: [],
          screenId: 1,
        },
        {
          date: "2026-03-02",
          time: "13:00",
          price: 200,
          bookedSeats: ["A3"],
          tempSelectedSeats: [],
          screenId: 2,
        },
      ],
    },

    {
      id: 8,
      title: "Joker",
      addedAt: "2026-01-30",
      rating: 8.4,
      duration: "2h 2m",
      genres: ["Drama"],
      year: 2019,
      price: 319,
      status: "released",
      poster: "https://m.media-amazon.com/images/I/71rNJQ2g-EL._AC_SY679_.jpg",
      trailer: "https://www.youtube.com/embed/zAGVQLHvwOY",
      description:
        "Arthur Fleck, a struggling comedian ignored by society, descends into isolation and madness after enduring constant humiliation and neglect. As the city’s unrest grows, his transformation into the Joker becomes both a personal rebellion and a symbol of chaos that engulfs Gotham.",
      cast: ["Joaquin Phoenix", "Robert De Niro", "Zazie Beetz"],
      shows: [
        {
          date: "2026-03-03",
          time: "18:00",
          price: 270,
          bookedSeats: ["E1"],
          tempSelectedSeats: [],
          screenId: 2,
        },
      ],
    },

    {
      id: 9,
      title: "Inception",
      addedAt: "2026-01-28",
      rating: 8.8,
      duration: "2h 28m",
      genres: ["Sci-Fi", "Thriller"],
      year: 2010,
      price: 359,
      status: "released",
      poster: "https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SY679_.jpg",
      trailer: "https://www.youtube.com/embed/YoHD9XEInc0",
      description:
        "Dom Cobb, a master thief who steals secrets from within dreams, is offered a chance at redemption: plant an idea so deeply in a target’s subconscious that it feels self-generated. As layered dream worlds collapse into one another, the line between reality and illusion begins to disappear.",
      cast: [
        "Leonardo DiCaprio",
        "Joseph Gordon-Levitt",
        "Elliot Page",
        "Tom Hardy",
      ],
      shows: [
        {
          date: "2026-03-01",
          time: "22:00",
          price: 290,
          bookedSeats: [],
          tempSelectedSeats: [],
          screenId: 2,
        },
      ],
    },

    {
      id: 10,
      title: "Top Gun: Maverick",
      addedAt: "2026-01-25",
      rating: 8.3,
      duration: "2h 10m",
      genres: ["Action"],
      year: 2022,
      price: 369,
      status: "released",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/thumb/1/13/Top_Gun_Maverick_Poster.jpg/250px-Top_Gun_Maverick_Poster.jpg",
      trailer: "https://www.youtube.com/embed/giXco2jaZ_4",
      description:
        "Decades after graduating from Top Gun, Pete “Maverick” Mitchell returns to train a new generation of elite pilots for a near-impossible mission. Confronting ghosts of his past and the limits of modern warfare, Maverick must prove that human instinct still matters in an era dominated by technology.",
      cast: ["Tom Cruise", "Miles Teller", "Jennifer Connelly", "Jon Hamm"],
      shows: [
        {
          date: "2026-03-04",
          time: "15:00",
          price: 310,
          bookedSeats: ["B4"],
          tempSelectedSeats: [],
          screenId: 1,
        },
      ],
    },

    {
      id: 11,
      title: "Encanto",
      addedAt: "2026-01-20",
      releaseDate: "2026-08-01",
      rating: 7.2,
      duration: "1h 39m",
      genres: ["Animation"],
      year: 2021,
      status: "upcoming",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/thumb/8/83/Encanto_poster.jpg/250px-Encanto_poster.jpg",
      trailer: "https://www.youtube.com/embed/CaimKeDcudo",
      description:
        "In a hidden Colombian village, the Madrigal family possesses magical gifts that sustain their community — except for Mirabel. When the family’s miracle begins to fade, she becomes their last hope, discovering that true strength lies not in powers, but in unity, courage, and unconditional love.",
      cast: [
        "Stephanie Beatriz",
        "John Leguizamo",
        "Diane Guerrero",
        "Wilmer Valderrama",
      ],
      shows: [
        {
          date: "2026-03-02",
          time: "11:30",
          price: 190,
          bookedSeats: [],
          tempSelectedSeats: [],
          screenId: 2,
        },
      ],
    },
  ]);

  return (
    <allMovies.Provider value={{ movies, setMovies }}>
      {children}
    </allMovies.Provider>
  );
};

export default AllMoviesContext;
