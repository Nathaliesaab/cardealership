import React from "react";
import { StarIcon } from "../../components/common/icons/StarIcon";
const RatingDisplay = ({ rating }) => {
  return (
    <div className="book__ratings">
      {new Array(Math.floor(rating)).fill(0).map((_, index) => (
        <StarIcon key={index} />
      ))}
    </div>
  );
};

export default RatingDisplay;
