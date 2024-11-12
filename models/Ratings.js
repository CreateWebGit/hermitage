import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    rating: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

const Ratings = models.Ratings || mongoose.model("Ratings", userSchema);
export default Ratings;
