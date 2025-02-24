import React from "react";

interface StarRatingProps {
  rating: number;
  totalReviews?: number;
  className?: string;
  size?: number;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  totalReviews,
  className = "",
  size = 20,
}) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className={`flex items-center ${className}`}>
      {stars.map((star) => (
        <img
          key={star}
          src={rating >= star ? "/icon/star-svgrepo-com.svg" : "/icon/star-empty.svg"}
          className="w-auto"
          style={{ width: size, height: size }}
          alt={`Star ${star}`}
        />
      ))}
      {totalReviews !== undefined && (
        <span className="ml-1 text-gray-500 text-sm">({totalReviews})</span>
      )}
    </div>
  );
};

export default StarRating;
