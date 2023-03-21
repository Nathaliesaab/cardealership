import { VideoIcon } from "../common/icons/VideoIcon";
import { WheelIcon } from "../common/icons/WheelIcon";
import { CarIcon } from "../common/icons/CarIcon";
import { PassengerIcon } from "../common/icons/PassengerIcon";
import { SafetyIcon } from "../common/icons/SafetyIcon";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { get_car } from "../../api/car_apis";
import { AppContext } from "../../providers/AppProvider";
import { RatingModal } from "../../components/Rating";
import { car_reviews } from "../../api/reviews_apis";
import { Review } from "./Review";
import { Rating } from "react-simple-star-rating";
import { canPostReview } from "../../data/validate";
import { CarDetailsLoading } from "./CarDetailsLoading";

export const CarDetails = () => {
  const [carDetails, setCarDetails] = useState({});
  const [imageLoaded, setImageLoaded] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const id = urlParams.get("id");
  const {
    isCarSaved,
    removeCar,
    saveCar,
    setDisplayReviewModal,
    displayReviewModal,
    user,
    showToast,
    setReviews,
    reviews,
  } = useContext(AppContext);

  function getAverageRating() {
    if (!reviews.length) return 0;
    const total = reviews?.reduce((acc, review) => acc + review.rating, 0);
    const average = total / reviews.length;
    return average;
  }

  const getCar = async () => {
    const [result, error] = await get_car(id);
    const [response, err] = await car_reviews(id);
    if (error || err) {
      return;
    }

    setDataLoaded(true);
    setReviews(response);
    setCarDetails(result);
  };

  const handleReview = () => {
    if (!user) {
      showToast("Please sign in to post reviews", false, true);
      return;
    }
    if (!canPostReview(id, user?.id)) {
      showToast(
        "Please Purchase this car, to be able to review it",
        false,
        true
      );
      return;
    }
    setDisplayReviewModal(true);
  };
  useEffect(() => {
    getCar();
  }, [id]);

  return (
    <section id="car__details">
      {!dataLoaded ? (
        <CarDetailsLoading />
      ) : (
        <>
          <div className="car__details--header">
            <h3>100% Online Purchase</h3>
            <h1 className="car__details--title">
              {carDetails.make}
              <span>{carDetails.model}</span>
            </h1>
            <div className="car__details--header-links-wrapper">
              <a
                href="#"
                target="_blank"
                alt="WHY FASTKAR"
                className="car__details--header-link"
              >
                WHY FASTKAR?
              </a>
              <div className="car__links--separator"></div>
              <a
                href="#"
                target="_blank"
                alt="Car model vidoe"
                className="car__video--link"
              >
                <VideoIcon />
                Wacth Video
              </a>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="car__information">
                <div>
                  <img
                    src={carDetails.image}
                    alt={`${carDetails.make} ${carDetails.model}`}
                    className="car__details--image"
                    style={{ display: !imageLoaded ? "none" : "flex" }}
                    onLoad={() => setImageLoaded(true)}
                  />
                  {!imageLoaded && (
                    <div className="loading__car--image loading__card"></div>
                  )}
                  <div className="reviews__wrapper">
                    <div className="review__title review__content">
                      <h3>Reviews</h3>
                      <span>
                        <Rating
                          readonly={true}
                          initialValue={getAverageRating()}
                          size={20}
                        />
                      </span>
                      <span>{getAverageRating()} /5</span>
                    </div>
                    {reviews.length === 0 ? (
                      <h4>
                        No Reviews Yet, <br />
                        Be the first one to add a review
                      </h4>
                    ) : (
                      reviews?.map((review, index) => (
                        <Review review={review} key={index} />
                      ))
                    )}
                  </div>
                </div>

                <div className="car__details">
                  <div>
                    <h2>
                      {carDetails.year} {carDetails.model}
                    </h2>
                    <h4>{carDetails.description}</h4>
                  </div>
                  <h3>
                    Condition:
                    <span className="purple"> {carDetails.condition}</span>
                  </h3>
                  <div className="price__summary">
                    <h3 className="car__month--price purple">
                      ${Math.floor(carDetails?.price / 12).toLocaleString()}
                      <span>/month *</span>
                    </h3>
                    <h6 className="car__tax--rule">
                      incl. taxes & fees, on approved credit
                    </h6>

                    <h3 className="car__total--price">
                      ${carDetails?.price.toLocaleString()}
                    </h3>
                  </div>

                  <div className="car__color">
                    <div
                      className="color__circle"
                      style={{
                        backgroundColor: carDetails.colorCode,
                        border:
                          carDetails.color.toUpperCase() === "WHITE" &&
                          "1px solid black",
                      }}
                    ></div>
                    {carDetails.color}
                  </div>
                  <div className="car__specifications">
                    <div className="car__spec">
                      <WheelIcon />
                      {carDetails.driveType}
                    </div>
                    <div className="car__spec">
                      <CarIcon />
                      {carDetails.numberOfDoors} Doors
                    </div>
                    <div className="car__spec">
                      <SafetyIcon />
                      {carDetails.safety}
                    </div>
                    <div className="car__spec">
                      <PassengerIcon />
                      {carDetails.passengers}
                      <span>Passengers</span>
                    </div>
                  </div>
                  <div className="car__details--buttons-wrapper">
                    <button
                      className="btn__general continue__btn"
                      onClick={() => handleReview()}
                    >
                      REVIEW
                    </button>
                    {displayReviewModal && <RatingModal id={carDetails.id} />}

                    {!isCarSaved(carDetails.id) ? (
                      <button
                        className="btn__general save__btn"
                        onClick={() => saveCar(carDetails.id)}
                      >
                        SAVE
                      </button>
                    ) : (
                      <button
                        className="btn__general save__btn"
                        onClick={() => removeCar(carDetails.id)}
                      >
                        UNSAVE
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};
