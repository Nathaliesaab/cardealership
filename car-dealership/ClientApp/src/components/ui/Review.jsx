import { Rating } from "react-simple-star-rating";

export const Review = ({ review }) => {
  return (
    <div className="review__comment">
      <div className="review__title">
        <h4>
          Posted By <span className="purple">{review.name}</span>
        </h4>
        <span>
          <Rating readonly={true} initialValue={review.rating} size={20} />
        </span>
        <span>{review.rating} /5</span>
      </div>
      <div>{review.review}</div>
    </div>
  );
};
