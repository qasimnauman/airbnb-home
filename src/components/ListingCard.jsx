import React from 'react';
import { Heart } from 'lucide-react'; // or use an inline SVG if you're not using Lucide

const ListingCard = ({
  title,
  image,
  price,
  nights,
  rating,
  isFavorite = true,
}) => {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-sm w-64 cursor-pointer transition hover:shadow-lg">
      {/* Image */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="h-40 w-full object-cover rounded-t-xl"
        />

        {/* Top badges */}
        <div className="absolute top-2 left-2 bg-white text-xs font-semibold px-3 py-1 rounded-full shadow">
          {isFavorite ? 'Guest favorite' : ''}
        </div>
        <div className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
          <Heart size={16} className="text-gray-600" />
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        <p className="text-sm font-medium text-gray-800">{title}</p>
        <p className="text-sm text-gray-600">{price} for {nights} nights</p>
        <p className="text-sm text-gray-600 mt-1">★ {rating}</p>
      </div>
    </div>
  );
};

export default ListingCard;
