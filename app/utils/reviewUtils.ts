import { Review } from "../redux/slices/reviewSlice";

export function computeStarDistribution(reviews: Review[]) {
  const distribution: Record<number, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  for (const review of reviews) {
    const star = review.saoBinhLuan;
    if (!distribution[star]) {
      distribution[star] = 0;
    }
    distribution[star]++;
  }

  return distribution;
}

export function computeAverageRating(reviews: Review[]) {
  if (reviews.length === 0) return 0;

  let sum = 0;
  for (const review of reviews) {
    sum += review.saoBinhLuan;
  }

  return sum / reviews.length
}
