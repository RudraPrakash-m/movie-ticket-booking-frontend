import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-gray-950 text-gray-300 px-6 md:px-16 pt-14 pb-8">
      {" "}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {" "}
        {/* ⭐ BRAND */}{" "}
        <div>
          {" "}
          <h2 className="text-2xl font-bold text-white mb-3">StreamX</h2>{" "}
          <p className="text-sm leading-relaxed">
            {" "}
            Stream movies, watch trailers, and book tickets seamlessly.
            Entertainment at your fingertips anytime, anywhere.{" "}
          </p>{" "}
          {/* ⭐ STORE BUTTONS */}{" "}
          <div className="flex gap-4 mt-6 flex-wrap">
            {" "}
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
              className="h-10 cursor-pointer hover:opacity-80"
            />{" "}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Play Store"
              className="h-10 cursor-pointer hover:opacity-80"
            />{" "}
          </div>{" "}
        </div>{" "}
        {/* ⭐ QUICK LINKS */}{" "}
        <div>
          {" "}
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>{" "}
          <ul className="space-y-2 text-sm">
            {" "}
            <li
              className="hover:text-white cursor-pointer"
              onClick={() => navigate("/")}
            >
              Home
            </li>{" "}
            <li
              className="hover:text-white cursor-pointer"
              onClick={() => navigate("/shows")}
            >
              Shows
            </li>{" "}
            <li
              className="hover:text-white cursor-pointer"
              onClick={() => navigate("/release")}
            >
              Upcoming
            </li>{" "}
            <li
              className="hover:text-white cursor-pointer"
              onClick={() => navigate("/favourite")}
            >
              Favourites
            </li>{" "}
          </ul>{" "}
        </div>{" "}
        {/* ⭐ SOCIAL */}{" "}
        <div>
          {" "}
          <h3 className="text-white font-semibold mb-4">Follow Us</h3>{" "}
          <div className="flex gap-4">
            {" "}
            <div className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 cursor-pointer">
              {" "}
              <FaFacebookF />{" "}
            </div>{" "}
            <div className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 cursor-pointer">
              {" "}
              <FaInstagram />{" "}
            </div>{" "}
            <div className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 cursor-pointer">
              {" "}
              <FaTwitter />{" "}
            </div>{" "}
            <div className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 cursor-pointer">
              {" "}
              <FaYoutube />{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {/* ⭐ BOTTOM */}{" "}
      <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm text-gray-500">
        {" "}
        © {new Date().getFullYear()} StreamX. All rights reserved.{" "}
      </div>{" "}
    </footer>
  );
};
export default Footer;
