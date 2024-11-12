"use server";

import Ratings from "../../models/Ratings";
import { connectMongoDB } from "../mymongodb";

export async function createReview({ rating, name, comment }) {
  try {
    console.log({ rating, name, comment });
    connectMongoDB();

    const createReview = await Ratings.create([
      {
        rating,
        name,
        comment,
      },
    ]);
  } catch (error) {
    console.log("My error", error);
  }
}

export async function fetchReviews() {
  connectMongoDB();

  const featchReviews = await Ratings.find().lean();

  console.log(featchReviews);

  return JSON.parse(JSON.stringify(featchReviews));
}
