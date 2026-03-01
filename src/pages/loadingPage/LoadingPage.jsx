import React from "react";

const LoadingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-red-600/20 blur-[140px] rounded-full top-[-100px] left-[-100px] animate-pulse"></div>
      <div className="absolute w-[400px] h-[400px] bg-blue-600/20 blur-[140px] rounded-full bottom-[-100px] right-[-100px] animate-pulse"></div>

      {/* Spinner */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-white/20 border-t-red-600 rounded-full animate-spin"></div>

        <h2 className="mt-6 text-xl font-semibold tracking-wide animate-pulse">
          Loading your experience...
        </h2>

        <p className="mt-2 text-sm text-gray-400">
          Please wait while we prepare everything for you
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
