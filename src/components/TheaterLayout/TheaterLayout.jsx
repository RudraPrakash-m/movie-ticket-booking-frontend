import React from "react";

const TheaterLayout = ({
  selectedShow,
  selectedSeats,
  setSelectedSeats,
  rows = [],
  seatsPerRow = 0,
  screenName,
}) => {
  if (!selectedShow) return null;

  const toggleSeat = (seat) => {
    if (
      selectedShow.bookedSeats.includes(seat) ||
      selectedShow.tempSelectedSeats.includes(seat)
    ) {
      return;
    }

    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat],
    );
  };

  return (
    <div>
      {/* Screen Name */}
      {screenName && (
        <h3 className="text-center text-lg font-semibold mb-4">{screenName}</h3>
      )}

      {/* Screen Indicator */}
      <div className="mb-6 text-center">
        <div className="bg-gray-700 h-2 w-2/3 mx-auto rounded-full mb-2"></div>
        <p className="text-gray-400 text-sm">Screen This Way</p>
      </div>

      {/* Seats */}
      <div className="flex flex-col items-center gap-3">
        {rows.map((row) => (
          <div key={row} className="flex gap-2">
            {Array.from({ length: seatsPerRow }, (_, i) => {
              const seat = `${row}${i + 1}`;
              const isBooked = selectedShow.bookedSeats.includes(seat);
              const isTempLocked =
                selectedShow.tempSelectedSeats.includes(seat);
              const isSelected = selectedSeats.includes(seat);

              return (
                <button
                  key={seat}
                  disabled={isBooked || isTempLocked}
                  onClick={() => toggleSeat(seat)}
                  className={`w-9 h-9 text-xs rounded-md transition ${
                    isBooked
                      ? "bg-gray-600 cursor-not-allowed"
                      : isTempLocked
                        ? "bg-yellow-600 cursor-not-allowed"
                        : isSelected
                          ? "bg-red-600"
                          : "bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  {seat}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TheaterLayout;
