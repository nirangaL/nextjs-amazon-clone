import React from "react";
import { Star } from "lucide-react";

export default function Rating({ rating = 0, size = 6 }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, index) => (
        <Star key={index} size={size} className="text-yellow-500" />
      ))}
      {hasHalfStar && <Star size={size} className="text-yellow-500" />}
      {[...Array(emptyStars)].map((_, index) => (
        <Star key={index} size={size} className="text-muted-foreground" />
      ))}
    </div>
  );
}
