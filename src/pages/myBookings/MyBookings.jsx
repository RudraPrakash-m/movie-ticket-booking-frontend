import React from "react";

const MyBookings = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
      <div className="text-center px-6">
        {/* Icon Circle */}
        <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/10">
          <span className="text-4xl">🚧</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          My Bookings
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 max-w-md mx-auto mb-6">
          This section is currently under development. We're working on bringing
          your booking history and ticket details here soon.
        </p>

        {/* Status Badge */}
        <div className="inline-block px-4 py-2 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-sm">
          In Development
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
