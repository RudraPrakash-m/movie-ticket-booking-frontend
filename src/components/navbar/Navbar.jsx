import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate, Link } from "react-router-dom";
import { userCon } from "../../contexts/userContext/UserContext";

const Navbar = () => {
  const { user, logout } = useContext(userCon);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const closeTimeoutRef = useRef(null);

  // Scroll background effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Debounced search navigation
  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmed = searchTerm.trim();

      if (trimmed !== "") {
        navigate(`/search?q=${trimmed}`, { replace: true });
      } else if (location.pathname.startsWith("/search")) {
        navigate("/", { replace: true });
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Clear search if not on search page
  useEffect(() => {
    if (!location.pathname.startsWith("/search")) {
      setSearchTerm("");
    }
  }, [location.pathname]);

  const navLinkStyle = ({ isActive }) =>
    `px-4 py-2 rounded-full text-sm transition-all ${
      isActive ? "bg-white text-black shadow" : "text-white hover:bg-white/20"
    }`;

  // Profile dropdown handlers
  const handleMouseEnter = () => {
    clearTimeout(closeTimeoutRef.current);
    setProfileOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setProfileOpen(false);
    }, 200);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gray-900/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-red-500 hover:text-white transition"
        >
          StreamX
        </Link>

        {/* Desktop Nav */}
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

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-4">
          {/* Search */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search movies..."
            className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-red-500 transition w-48 md:w-56"
          />

          {/* Profile or Login */}
          {user ? (
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Compact Profile Button */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-sm cursor-pointer hover:bg-white/20 transition">
                <div className="w-7 h-7 flex items-center justify-center rounded-full bg-red-500 text-white text-xs font-semibold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[80px] truncate">{user.name}</span>
              </div>

              {/* Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-gray-900 border border-white/10 rounded-xl shadow-xl py-2 backdrop-blur-md">
                  <button
                    onClick={() => {
                      navigate("/my-bookings");
                      setProfileOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-white hover:bg-white/10 transition text-sm"
                  >
                    My Bookings
                  </button>

                  <button
                    onClick={() => {
                      logout();
                      navigate("/");
                      setProfileOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-red-400 hover:bg-white/10 transition text-sm"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="px-5 py-2 rounded-full bg-white text-black hover:bg-gray-200 transition"
              onClick={() => navigate("/auth")}
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div
          className="md:hidden cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <div className="space-y-1">
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden mx-4 backdrop-blur-md bg-black/80 border border-white/10 rounded-xl p-4 space-y-3">
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

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search movies..."
            className="w-full px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white outline-none"
          />

          {user ? (
            <>
              <button
                onClick={() => navigate("/my-bookings")}
                className="w-full text-left px-4 py-2 text-white"
              >
                My Bookings
              </button>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="w-full text-left px-4 py-2 text-red-400"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/auth")}
              className="px-5 py-2 rounded-full bg-white text-black w-full"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
