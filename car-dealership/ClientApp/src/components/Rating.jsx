import { useContext, useState } from "react";
import { AppContext } from "../providers/AppProvider";
import { CloseIcon } from "../components/common/icons/CloseIcon";
import { Rating } from "react-simple-star-rating";
import { car_reviews, post_review } from "../api/reviews_apis";

export const RatingModal = ({ id }) => {
  const [review, setReview] = useState("");
  const { setDisplayReviewModal, showToast, user, setReviews } =
    useContext(AppContext);
  const [rating, setRating] = useState(0);
  const handleRating = (rate) => {
    setRating(rate);
  };
  const validate = () => {
    let result = true;
    if (!review) {
      result = false;
      showToast("Please Enter Review", false, true);
    }
    if (!rating) {
      result = false;
      showToast("Please Choose Rating", false, true);
    }
    return result;
  };

  const postReview = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }
    const reviewBody = {
      carId: id,
      customerId: user?.id,
      review: review,
      rating: rating,
    };
    const [response, error] = await post_review(reviewBody);
    if (response) {
      setDisplayReviewModal(false);
      showToast("Review Added Successfully");
      setReview("");
      setRating("");
      const [response, err] = await car_reviews(id);
      if (error || err) {
        return;
      }
      setReviews(response);
    }

    if (error) showToast(error, true);
  };
  return (
    <div>
      <div className="general__modal rating__modal">
        <form
          onSubmit={postReview}
          className="modal__content"
          autoComplete="off"
        >
          <span
            className="close__button"
            onClick={() => setDisplayReviewModal(false)}
          >
            <CloseIcon />
          </span>
          <h2 className="purple modal__title">Enter Review</h2>

          <div className="input__wrapper">
            <textarea
              name="review"
              className="modal__text--area"
              maxLength={200}
              id="review"
              placeholder="Review"
              value={review}
              onChange={(event) => setReview(event.target.value)}
            />
            <span className="text__area--info">Max Lenghth 200</span>
          </div>

          <div className="input__wrapper">
            Rating
            <Rating onClick={handleRating} />
          </div>

          <button
            type="submit"
            className="btn__general login__button modal__button"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};
