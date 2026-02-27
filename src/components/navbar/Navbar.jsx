import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navLinkStyle = ({ isActive }) =>
    `px-4 py-2 rounded-full text-sm transition-all ${
      isActive
        ? "bg-white text-black shadow"
        : "text-white hover:bg-white/20"
    }`;

  return (
    <nav className="absolute top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
        
        {/* Logo */}
        <div className="text-3xl font-bold text-white text-red-500">
          StreamX
        </div>

        {/* Floating Capsule Nav */}
        <div className="hidden md:flex items-center gap-2 backdrop-blur-md bg-white/10 border border-white/20 px-2 py-1 rounded-full">
          <NavLink to="/" className={navLinkStyle}>Home</NavLink>
          <NavLink to="/shows" className={navLinkStyle}>Shows</NavLink>
          <NavLink to="/release" className={navLinkStyle}>Release</NavLink>
          <NavLink to="/favourite" className={navLinkStyle}>Favourite</NavLink>
        </div>

        {/* Right */}
        <div className="hidden md:flex items-center gap-4">
          
          {/* Search */}
          <input
            placeholder="Search..."
            className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white/40"
          />

          {/* Login */}
          <button className="px-5 py-2 rounded-full bg-white text-black hover:bg-gray-200 transition">
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
          <NavLink to="/" className={navLinkStyle} onClick={()=>setOpen(false)}>Home</NavLink>
          <NavLink to="/shows" className={navLinkStyle} onClick={()=>setOpen(false)}>Shows</NavLink>
          <NavLink to="/release" className={navLinkStyle} onClick={()=>setOpen(false)}>Release</NavLink>
          <NavLink to="/favourite" className={navLinkStyle} onClick={()=>setOpen(false)}>Favourite</NavLink>

          <input
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white outline-none"
          />

          <button className="w-full px-5 py-2 rounded-full bg-white text-black">
            Login
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;