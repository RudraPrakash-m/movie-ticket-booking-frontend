import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmed = searchTerm.trim();

      if (trimmed !== "") {
        navigate(`/search?q=${trimmed}`, { replace: true });
      } else {
        // Only go home if we are currently on search page
        if (location.pathname.startsWith("/search")) {
          navigate("/", { replace: true });
        }
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (!location.pathname.startsWith("/search")) {
      setSearchTerm("");
    }
  }, [location.pathname]);

  const navLinkStyle = ({ isActive }) =>
    `px-4 py-2 rounded-full text-sm transition-all ${
      isActive ? "bg-white text-black shadow" : "text-white hover:bg-white/20"
    }`;

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="relative text-3xl font-bold text-red-500 transition duration-300 hover:text-white"
        >
          <span className="hover:drop-shadow-[0_0_12px_rgba(239,68,68,0.8)] transition duration-300">
            StreamX
          </span>
        </Link>

        {/* Floating Capsule Nav */}
        <div className="hidden md:flex items-center gap-2 backdrop-blur-md bg-white/10 border border-white/20 px-2 py-1 rounded-full">
          <NavLink to="/" className={navLinkStyle}>
            Home
          </NavLink>
          <NavLink to="/shows" className={navLinkStyle}>
            Shows
          </NavLink>
          <NavLink to="/release" className={navLinkStyle}>
            Release
          </NavLink>
          <NavLink to="/favourite" className={navLinkStyle}>
            Favourite
          </NavLink>
        </div>

        {/* Right */}
        <div className="hidden md:flex items-center gap-4">
          {/* Search */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search movies..."
            className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-red-500 transition w-48 md:w-56"
          />

          {/* Login */}
          <button
            className="px-5 py-2 rounded-full bg-white text-black hover:bg-gray-200 transition"
            onClick={() => {
              navigate("/auth");
            }}
          >
            Login
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden" onClick={() => setOpen(!open)}>
          <div className="space-y-1 cursor-pointer">
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden mx-4 backdrop-blur-md bg-black/60 border border-white/10 rounded-xl p-4 space-y-3">
          <NavLink
            to="/"
            className={navLinkStyle}
            onClick={() => setOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/shows"
            className={navLinkStyle}
            onClick={() => setOpen(false)}
          >
            Shows
          </NavLink>
          <NavLink
            to="/release"
            className={navLinkStyle}
            onClick={() => setOpen(false)}
          >
            Release
          </NavLink>
          <NavLink
            to="/favourite"
            className={navLinkStyle}
            onClick={() => setOpen(false)}
          >
            Favourite
          </NavLink>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search movies..."
            className="w-full px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white outline-none"
          />

          <button
            onClick={() => {
              navigate("/auth");
            }}
            className="px-5 py-2 rounded-full bg-white text-black"
          >
            Login
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
