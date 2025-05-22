'use client';
import React, { useState, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const StyledCalendar = ({ range, onChange }) => {
  const [monthsToShow, setMonthsToShow] = useState(2);

  // Dynamically change months shown based on screen size
  useEffect(() => {
    const updateMonths = () => {
      setMonthsToShow(window.innerWidth < 768 ? 1 : 2); // <768px = 1 month
    };
    updateMonths(); // Initial load
    window.addEventListener('resize', updateMonths);
    return () => window.removeEventListener('resize', updateMonths);
  }, []);

  return (
    <div className="bg-white mt-4 p-4 sm:p-6 rounded-2xl shadow-xl w-full max-w-4xl overflow-x-auto">
      {/* Calendar */}
      <DateRange
        ranges={[range]}
        onChange={onChange}
        moveRangeOnFirstSelection={false}
        months={monthsToShow}
        direction="horizontal"
        rangeColors={['#2563eb']}
        showMonthAndYearPickers={false}
        weekdayDisplayFormat="EEEEEE"
        minDate={new Date()}
        className="text-sm"
      />

      {/* Flexibility Chips */}
      <div className="flex gap-2 mt-4 flex-wrap">
        {[
          'Exact dates',
          '± 1 day',
          '± 2 days',
          '± 3 days',
          '± 7 days',
          '± 14 days',
        ].map((label, i) => (
          <button
            key={i}
            type="button"
            className="border px-3 py-1 rounded-full text-sm hover:bg-gray-100 transition whitespace-nowrap"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StyledCalendar;
