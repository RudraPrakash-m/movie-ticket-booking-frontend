import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ArrowLeft } from "lucide-react";
const Favouritepage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-6">
      {" "}
      <div className="text-center max-w-xl">
        {" "}
        {/* icon */}{" "}
        <div className="flex justify-center mb-6">
          {" "}
          <div className="bg-pink-500/10 p-5 rounded-full">
            {" "}
            <Heart size={48} className="text-pink-400" />{" "}
          </div>{" "}
        </div>{" "}
        {/* title */}{" "}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {" "}
          Favourites Coming Soon{" "}
        </h1>{" "}
        {/* description */}{" "}
        <p className="text-gray-400 mb-8 leading-relaxed">
          {" "}
          Soon you’ll be able to save movies to your favourites list and access
          them anytime for quick booking and tracking.{" "}
        </p>{" "}
        {/* actions */}{" "}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {" "}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-md transition"
          >
            {" "}
            <ArrowLeft size={18} /> Go Back{" "}
          </button>{" "}
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-md font-semibold transition"
          >
            {" "}
            Go Home{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
export default Favouritepage;
