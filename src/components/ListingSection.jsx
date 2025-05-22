import React, { useRef } from 'react';
import ListingCard from './ListingCard';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const mockListings = [
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjacMUivyo-I1deA_zLuRn8py-uRGAjZ_rrQ&s",
    title: "Room in Lahore",
    price: "$39",
    nights: 2,
    rating: 4.96,
  },
  {
    image: "https://picsum.photos/200/300?1",
    title: "Condo in Lahore",
    price: "$63",
    nights: 2,
    rating: 4.92,
  },
  {
    image: "https://picsum.photos/200/300?2",
    title: "Home in Lahore",
    price: "$216",
    nights: 2,
    rating: 5.0,
  },
  {
    image: "https://picsum.photos/200/300?3",
    title: "Apartment in Lahore",
    price: "$66",
    nights: 2,
    rating: 5.0,
  },
  {
    image: "https://picsum.photos/200/300?4",
    title: "Villa in Lahore",
    price: "$110",
    nights: 2,
    rating: 4.95,
  },
];

const ListingSection = ({ title = "Popular homes in Lahore" }) => {
  const scrollRef = useRef();

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="px-4 md:px-6 my-6">
      {/* Section Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg md:text-xl font-semibold">{title}</h3>
        <div className="space-x-2 hidden md:flex">
          <button
            onClick={() => scroll('left')}
            className="p-1 bg-white rounded-full shadow border hover:bg-gray-100"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-1 bg-white rounded-full shadow border hover:bg-gray-100"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Scrollable Listing Row */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar pb-2"
      >
        {mockListings.map((listing, index) => (
          <ListingCard key={index} {...listing} />
        ))}
      </div>
    </section>
  );
};

export default ListingSection;
