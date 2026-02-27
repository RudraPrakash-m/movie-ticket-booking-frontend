import React from "react";

const DateSelector = ({ dates = [], selectedDate, onSelect, onBook }) => {

  const formatDate = (d) => {
    const date = new Date(d);

    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      date: date.getDate(),
      month: date.toLocaleDateString("en-US", { month: "short" }),
    };
  };

  return (
    <div className="bg-gray-900 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">

      {/* dates */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar w-full md:w-auto">
        {dates.map((d, i) => {
          const f = formatDate(d);
          const active = selectedDate === d;

          return (
            <button
              key={i}
              onClick={() => onSelect(d)}
              className={`min-w-[70px] rounded-lg px-3 py-2 text-center transition ${
                active
                  ? "bg-red-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              <p className="text-[11px]">{f.day}</p>
              <p className="text-lg font-semibold">{f.date}</p>
              <p className="text-[11px]">{f.month}</p>
            </button>
          );
        })}
      </div>

      {/* book button */}
      <button
        onClick={() => onBook?.(selectedDate)}
        className="px-6 py-2.5 bg-red-600 hover:bg-red-700 rounded-md font-semibold whitespace-nowrap"
      >
        Book Now
      </button>
    </div>
  );
};

export default DateSelector;