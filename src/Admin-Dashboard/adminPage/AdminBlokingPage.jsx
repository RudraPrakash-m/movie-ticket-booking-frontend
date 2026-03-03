import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldX, Home } from "lucide-react";

const AdminBlockingPage = () => {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(6);

  useEffect(() => {
    if (seconds === 0) {
      navigate("/", { replace: true });
      return;
    }

    const timer = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4">
      <div className="bg-gray-900/80 backdrop-blur-md border border-gray-700 p-10 rounded-3xl shadow-2xl text-center max-w-lg w-full">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-500/20 p-5 rounded-full animate-pulse">
            <ShieldX size={48} className="text-red-500" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold mb-4">Access Restricted</h1>

        {/* Description */}
        <p className="text-gray-400 mb-8 leading-relaxed">
          You do not have administrator privileges.
          <br />
          For admin configuration, please contact an existing administrator.
        </p>

        {/* Countdown */}
        <div className="mb-6">
          <p className="text-sm text-gray-500">Redirecting to home in</p>
          <p className="text-4xl font-bold text-red-500 mt-1">{seconds}</p>
        </div>

        {/* Manual button */}
        <button
          onClick={() => navigate("/", { replace: true })}
          className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 transition-all px-6 py-3 rounded-xl font-semibold w-full"
        >
          <Home size={18} />
          Go to Home Now
        </button>
      </div>
    </div>
  );
};

export default AdminBlockingPage;
