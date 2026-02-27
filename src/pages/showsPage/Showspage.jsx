import React from "react";
import { useNavigate } from "react-router-dom";
import { Ticket, ArrowLeft } from "lucide-react";

const Showspage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-6">
      <div className="text-center max-w-xl">
        {/* icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-purple-500/10 p-5 rounded-full">
            <Ticket size={48} className="text-purple-400" />
          </div>
        </div>

        {/* title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Shows Coming Soon
        </h1>

        {/* description */}
        <p className="text-gray-400 mb-8 leading-relaxed">
          We’re working on bringing live shows and events to this section.
          Stay tuned — exciting updates are on the way.
        </p>

        {/* actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-md transition"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-md font-semibold transition"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Showspage;

