'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Globe, Menu, User, HelpCircle, X } from 'lucide-react'; // Or use SVGs

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
        setShowMobileNav(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between px-4 md:px-6 py-4 shadow-md bg-white relative z-50">
      {/* Logo */}
      <img src="/airbnb.svg" alt="Airbnb" className="h-8 sm:h-20" />

      {/* Center nav (hidden on mobile) */}
      <div className="hidden md:flex flex-1 justify-center">
        <nav className="flex items-center space-x-6 font-semibold">
          {[
            { label: 'Home', icon: 'house.png' },
            { label: 'Experiences', icon: 'lightbulb.png' },
            { label: 'Services', icon: 'meal.png' },
          ].map((item) => (
            <a
              key={item.label}
              href="/"
              className="flex items-center text-base gap-2"
            >
              <img
                src={`/${item.icon}`}
                alt={item.label}
                className="h-6 transition-transform duration-200 hover:scale-110"
              />
              <span className="relative inline-block pb-0.5 before:absolute before:left-0 before:bottom-0 before:w-0 before:h-[2px] before:bg-black hover:before:w-full before:transition-all before:duration-300">
                {item.label}
              </span>
            </a>
          ))}
        </nav>
      </div>

      {/* Right controls */}
      <div className="flex items-center space-x-3">
        <button className="text-sm font-semibold hidden md:block">
          Become a host
        </button>
        <button className="rounded-full hover:bg-gray-100 p-2 hidden md:block">
          <Globe size={18} />
        </button>

        {/* User menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu((prev) => !prev)}
            className="flex items-center space-x-2 border px-3 py-1.5 rounded-full hover:shadow-md transition"
          >
            <Menu size={18} />
            <User size={18} />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-xl p-4 space-y-4 text-sm z-50">
              <div className="flex items-center space-x-2">
                <HelpCircle size={18} className="text-gray-500" />
                <span>Help Center</span>
              </div>

              <div className="border-t pt-2 space-y-1">
                <div>
                  <p className="font-semibold">Become a host</p>
                  <p className="text-xs text-gray-500">
                    It's easy to start hosting and earn extra income.
                  </p>
                  <img
                    src="/host-home.png"
                    alt="host"
                    className="h-12 mt-1 ml-auto"
                  />
                </div>
                <p className="cursor-pointer hover:underline">Refer a Host</p>
                <p className="cursor-pointer hover:underline">Find a co-host</p>
                <p className="cursor-pointer hover:underline">Gift cards</p>
              </div>

              <div className="border-t pt-2">
                <p className="cursor-pointer hover:underline">Log in or sign up</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Nav Toggle (Hamburger) */}
      <div className="md:hidden ml-2">
        <button
          onClick={() => setShowMobileNav(true)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile Drawer */}
      {showMobileNav && (
        <div className="fixed inset-0 bg-black/40 z-40">
          <div className="absolute top-0 right-0 h-full w-72 bg-white p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Menu</h3>
              <button onClick={() => setShowMobileNav(false)}>
                <X size={22} />
              </button>
            </div>
            <nav className="space-y-4 font-medium text-gray-700">
              <a href="/" className="block">Home</a>
              <a href="/" className="block">Experiences</a>
              <a href="/" className="block">Services</a>
              <hr />
              <a href="/" className="block">Become a host</a>
              <a href="/" className="block">Gift cards</a>
              <a href="/" className="block">Help Center</a>
              <a href="/" className="block">Login or Sign up</a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
