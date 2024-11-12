import React from "react";
import Review from "@/components/Review";
import { fetchReviews } from "@/lib/actions/review.actions";

const page = async () => {
  const reviews = await fetchReviews();
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Review reviews={reviews} />
    </div>
  );
};

export default page;
