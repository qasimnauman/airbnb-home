'use client';
import React, { useState, useEffect, useRef } from 'react';
import StyledCalendar from './StyledCalendar';

const destinations = [
  { label: 'Nearby', description: 'Find what’s around you' },
  { label: 'Lahore, Pakistan', description: 'For a trip abroad' },
  { label: 'Rawalpindi, Pakistan', description: 'Near you' },
  { label: 'Karachi, Pakistan', description: 'For a trip abroad' },
  { label: 'Istanbul, Türkiye', description: 'For sights like Galata Tower' },
  { label: 'Murree, Pakistan', description: 'Near you' },
];

const SearchBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showGuests, setShowGuests] = useState(false);

  const [selectionRange, setSelectionRange] = useState({
    startDate: null,
    endDate: null,
    key: 'selection',
  });

  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });

  const calendarRef = useRef();
  const guestRef = useRef();

  // Close on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowDropdown(false);
      setShowCalendar(false);
      setShowGuests(false);
      const active = document.activeElement;
      if (active && active.tagName === 'INPUT') active.blur();
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Outside click for calendar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Outside click for guests
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (guestRef.current && !guestRef.current.contains(e.target)) {
        setShowGuests(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDateChange = (ranges) => {
    setSelectionRange(ranges.selection);
  };

  const formatGuests = () => {
    const total =
      guests.adults + guests.children + guests.infants + guests.pets;
    return total > 0 ? `${total} guest${total > 1 ? 's' : ''}` : '';
  };

  return (
    <div className="flex justify-center px-4 py-4 relative z-50">
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-2 bg-white rounded-2xl shadow-lg px-4 py-4 w-full max-w-4xl">
        {/* Where */}
        <div className="relative w-full md:w-[40%]">
          <input
            className="w-full px-4 py-2 text-sm rounded-full bg-gray-100 focus:outline-none focus:ring-0 transition"
            placeholder="Where"
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          />
          {showDropdown && (
            <div className="absolute z-10 left-0 right-0 mt-2 bg-white shadow-lg rounded-2xl p-4 overflow-y-auto border border-gray-200">
              <p className="text-sm text-gray-500 font-medium mb-2">
                Suggested destinations
              </p>
              {destinations.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded-xl hover:bg-gray-100 cursor-pointer transition"
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <p className="font-semibold text-sm">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Check In */}
        <div className="w-full md:w-[20%] relative">
          <input
            className="w-full px-4 py-2 text-sm rounded-full bg-gray-100 focus:outline-none focus:ring-0 cursor-pointer"
            placeholder="Check in"
            value={
              selectionRange.startDate
                ? selectionRange.startDate.toDateString()
                : ''
            }
            readOnly
            onClick={() => setShowCalendar(true)}
          />
        </div>

        {/* Check Out */}
        <div className="w-full md:w-[20%] relative">
          <input
            className="w-full px-4 py-2 text-sm rounded-full bg-gray-100 focus:outline-none focus:ring-0 cursor-pointer"
            placeholder="Check out"
            value={
              selectionRange.endDate
                ? selectionRange.endDate.toDateString()
                : ''
            }
            readOnly
            onClick={() => setShowCalendar(true)}
          />
        </div>

        {/* Guests */}
        <div className="w-full md:w-[20%] relative">
          <input
            className="w-full rounded-full px-4 py-2 bg-gray-100 focus:outline-none focus:ring-0 cursor-pointer"
            placeholder="Who"
            value={formatGuests()}
            readOnly
            onClick={() => setShowGuests(true)}
          />

          {showGuests && (
            <div
              ref={guestRef}
              className="absolute mt-2 right-0 w-[320px] bg-white rounded-2xl shadow-xl p-4 z-50 space-y-4"
            >
              {[
                { label: 'Adults', desc: 'Ages 13 or above', key: 'adults' },
                { label: 'Children', desc: 'Ages 2 – 12', key: 'children' },
                { label: 'Infants', desc: 'Under 2', key: 'infants' },
                {
                  label: 'Pets',
                  desc: 'Bringing a service animal?',
                  key: 'pets',
                  isLink: true,
                },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-gray-500">
                      {item.isLink ? (
                        <a href="#" className="underline">
                          {item.desc}
                        </a>
                      ) : (
                        item.desc
                      )}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() =>
                        setGuests((prev) => ({
                          ...prev,
                          [item.key]: Math.max(prev[item.key] - 1, 0),
                        }))
                      }
                      className="w-8 h-8 rounded-full border text-xl flex items-center justify-center text-gray-500"
                    >
                      –
                    </button>
                    <span>{guests[item.key]}</span>
                    <button
                      onClick={() =>
                        setGuests((prev) => ({
                          ...prev,
                          [item.key]: prev[item.key] + 1,
                        }))
                      }
                      className="w-8 h-8 rounded-full border text-xl flex items-center justify-center text-gray-700"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Search Button */}
        <div className="w-full md:w-auto flex justify-center md:justify-end">
          <button className="w-full md:w-auto text-white bg-blue-500 rounded-full p-2 hover:bg-blue-600 transition">
            🔍
          </button>
        </div>
      </div>

      {/* Calendar Dropdown */}
      {showCalendar && (
        <div ref={calendarRef} className="absolute mt-4 z-50">
          <StyledCalendar range={selectionRange} onChange={handleDateChange} />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
