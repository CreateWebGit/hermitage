"use client";
import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Input from "../Input";

import { MdOutlineRateReview } from "react-icons/md";
import { IoIosPerson } from "react-icons/io";
import { PiShootingStarLight } from "react-icons/pi";
import { TbPencilStar } from "react-icons/tb";
import InputStar from "../InputStar";
import Navbar from "../Navbar";
import { createReview, fetchReviews } from "@/lib/actions/review.actions";
import { comment } from "postcss";

const Review = ({ reviews }) => {
  console.log("isName");
  console.log(reviews);
  // const [isRate, setRate] = useState("");
  const [isReviewData, setReviewData] = useState(reviews);
  const [isName, setName] = useState();
  const [isComment, setComment] = useState();
  const [isRating, setRating] = useState(0);
  console.log(isRating);

  const addReviewData = () => {
    let _isReviewDta = [...isReviewData];
    _isReviewDta.push({
      rating: isRating,
      name: isName,
      comment: isComment,
    });
    setReviewData(_isReviewDta);
  };

  console.log(isReviewData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(isRate);
    console.log("isName");
    console.log(isName);
    console.log(isComment);
    try {
      console.log("isName");
      createReview({
        rating: isRating,
        name: isName,
        comment: isComment,
      });
      addReviewData();
      /*
      const res = await fetch("./api/ratings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: isName,
          comment: isComment,
        }),
      });
      */
    } catch (error) {
      console.log("isName");
      console.log(error);
    }
  };

  return (
    <>
      <Navbar white={true} />
      <div className=" h-full w-[1200px] m-auto flex justify-between items-center relative ">
        <div>
          {isReviewData.map((item) => {
            return (
              <>
                <div>{item.name} har sagt:</div>
                <div>
                  <StarRating
                    isRating={item.rating}
                    onlyView={true}
                    iconSize={16}
                  />
                </div>
              </>
            );
          })}
        </div>
        <div className=" bg-[#FBFBFB]  top-[110px] bottom-0 flex items-center px-4">
          <form onSubmit={handleSubmit}>
            <InputStar isRating={isRating} setRating={setRating} />
            <Input
              name="isName"
              onChange={(e) => setName(e.target.value)}
              value={isName}
              placeholder="Namn"
              Icon={IoIosPerson}
            />
            <Input
              name="comment"
              onChange={(e) => setComment(e.target.value)}
              value={isComment}
              type="textarea"
              placeholder="Skriv en kommentar.."
              Icon={MdOutlineRateReview}
            />
            <input type="submit" value="Skicka" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Review;
