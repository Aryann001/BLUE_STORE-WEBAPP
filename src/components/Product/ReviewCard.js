import React from "react";
import { Rating } from "@material-ui/lab";
import profilePng from "../../assets/logo.png";

const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="customerReviewCard">
      <div className="crcSection1">
        <div>
          <img src={profilePng} alt="User" />
        </div>
        {/*  */}
        <div>
          <Rating {...options} />
        </div>
      </div>
      {/*  */}
      <div className="crcSection2">
        <p>{review.comment}</p>
      </div>
      {/*  */}
      <div className="crcSection3">
        <p>{`By ${review.name}`}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
