"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews, resetReviews } from "../redux/slices/reviewSlice";
import { RootState, AppDispatch } from "../redux/store";
import {
  computeStarDistribution,
  computeAverageRating,
} from "../utils/reviewUtils";

interface ReviewsSectionProps {
    jobId: string | number;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ jobId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { reviews, loading, error } = useSelector((state: RootState) => state.reviews);

  useEffect(() => {
    if (jobId) {
      dispatch(fetchReviews(jobId));
    }
    return () => {
      dispatch(resetReviews());
    };
  }, [dispatch, jobId]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  const totalReviews = reviews.length;
  const distribution = computeStarDistribution(reviews);
  const averageRating = computeAverageRating(reviews).toFixed(1);

  const ratingBreakdown = [
    { label: "Seller communication level", rating: averageRating },
    { label: "Quality of delivery", rating: averageRating },
    { label: "Value of delivery", rating: averageRating },
  ];

  function getPercentage(count: number) {
    if (!totalReviews) return 0;
    return (count / totalReviews) * 100;
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 mt-6">
      <div className="w-full md:w-1/2">
        <h3 className="text-lg font-semibold mb-2">
          {totalReviews} reviews for this Gig
        </h3>

        <div className="space-y-2">
  <div className="flex items-center">
    <span className="text-sm w-16">5 Stars</span>
    <div className="flex-1 h-2 bg-gray-200 rounded mx-2">
      <div
        className={
          "h-2 rounded transition-all duration-300 " +
          (distribution[5] > 0 ? "bg-gray-800" : "bg-gray-300")
        }
        style={{ width: `${getPercentage(distribution[5])}%` }}
      />
    </div>
    <span className="text-sm text-gray-600">({distribution[5]})</span>
  </div>

  <div className="flex items-center">
    <span className="text-sm w-16">4 Stars</span>
    <div className="flex-1 h-2 bg-gray-200 rounded mx-2">
      <div
        className={
          "h-2 rounded transition-all duration-300 " +
          (distribution[4] > 0 ? "bg-gray-800" : "bg-gray-300")
        }
        style={{ width: `${getPercentage(distribution[4])}%` }}
      />
    </div>
    <span className="text-sm text-gray-600">({distribution[4]})</span>
  </div>

  <div className="flex items-center">
    <span className="text-sm w-16">3 Stars</span>
    <div className="flex-1 h-2 bg-gray-200 rounded mx-2">
      <div
        className={
          "h-2 rounded transition-all duration-300 " +
          (distribution[3] > 0 ? "bg-gray-800" : "bg-gray-300")
        }
        style={{ width: `${getPercentage(distribution[3])}%` }}
      />
    </div>
    <span className="text-sm text-gray-600">({distribution[3]})</span>
  </div>

  <div className="flex items-center">
    <span className="text-sm w-16">2 Stars</span>
    <div className="flex-1 h-2 bg-gray-200 rounded mx-2">
      <div
        className={
          "h-2 rounded transition-all duration-300 " +
          (distribution[2] > 0 ? "bg-gray-800" : "bg-gray-300")
        }
        style={{ width: `${getPercentage(distribution[2])}%` }}
      />
    </div>
    <span className="text-sm text-gray-600">({distribution[2]})</span>
  </div>

  <div className="flex items-center">
    <span className="text-sm w-16">1 Star</span>
    <div className="flex-1 h-2 bg-gray-200 rounded mx-2">
      <div
        className={
          "h-2 rounded transition-all duration-300 " +
          (distribution[1] > 0 ? "bg-gray-800" : "bg-gray-300")
        }
        style={{ width: `${getPercentage(distribution[1])}%` }}
      />
    </div>
    <span className="text-sm text-gray-600">({distribution[1]})</span>
  </div>
</div>
      </div>

      <div className="w-full md:w-1/2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Rating Breakdown</h3>
          <div className="flex items-center">
            <span className="ml-2 text-sm text-gray-700">{averageRating}</span>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {ratingBreakdown.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between"
            >
              <span className="text-sm text-gray-600">{item.label}</span>
              <div className="flex items-center">
                <span className="ml-2 text-sm text-gray-700">{item.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;
