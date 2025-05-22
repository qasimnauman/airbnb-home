"use client";
import React from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css"; // Base styles

const StyledCalendar = ({ range, onChange }) => {
  return (
    <div className="bg-white mt-12 p-6 rounded-2xl shadow-xl w-fit">
      <DateRange
        ranges={[range]}
        onChange={onChange}
        moveRangeOnFirstSelection={false}
        months={2}
        direction="horizontal"
        rangeColors={["#2563eb"]}
        showMonthAndYearPickers={false}
        weekdayDisplayFormat="EEEEEE"
        minDate={new Date()} // optional: disable past dates
      />

      {/* Date Flexibility Options (Optional) */}
      <div className="flex gap-2 mt-4 flex-wrap">
        {[
          "Exact dates",
          "± 1 day",
          "± 2 days",
          "± 3 days",
          "± 7 days",
          "± 14 days",
        ].map((label, i) => (
          <button
            key={i}
            className="border px-3 py-1 rounded-full text-sm hover:bg-gray-100 transition"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StyledCalendar;
