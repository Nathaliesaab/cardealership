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

export const CarDetails = () => {
  const [carDetails, setCarDetails] = useState({});
  const [loading, setLoading] = useState(true);
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

  const getCar = async () => {
    const [result, error] = await get_car(id);
    const [response, err] = await car_reviews(id);
    if (error || err) {
      return;
    }
    setReviews(response);
    setCarDetails(result);
  };

  function getAverageRating() {
    if (reviews.length === 0) return 0;
    const total = reviews?.reduce((acc, review) => acc + review.rating, 0);
    const average = total / reviews.length;
    return average;
  }
  const handleReview = () => {
    if (user) setDisplayReviewModal(true);

    if (!user) showToast("Please Sign In To Post Review", true);
  };
  useEffect(() => {
    getCar();
  }, [id]);
  return (
    <section id="car__details">
      {loading ? (
        <>
          <div className="car__details--header">
            <h3>100% Online Purchase</h3>
            <h1 className="loading__state"></h1>
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
                <div className="loading__car--image loading__card"></div>
                <div style={{ maxWidth: "450px", width: "100%" }}>
                  <div>
                    <div className="loading__state"></div>
                  </div>
                  <div className="price__summary">
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        alignItems: "center",
                        marginTop: "8px",
                      }}
                    >
                      <h3 className="loading__state"></h3>
                      <div style={{ width: "100%" }}>/month *</div>
                    </div>

                    <h6 className="car__tax--rule">
                      incl. taxes & fees, on approved credit
                    </h6>

                    <h6 className="loading__state"></h6>
                  </div>
                  <img
                    src={carDetails.image}
                    alt={`${carDetails.make} ${carDetails.model}`}
                    className="car__details--image"
                    onLoad={() => setLoading(false)}
                  />
                  <div className="car__color">
                    <div className="color__circle loading__state"></div>
                  </div>
                  <div className="car__specifications">
                    <div className="car__spec">
                      <WheelIcon />
                      <div className="loading__state"></div>
                    </div>
                    <div className="car__spec">
                      <CarIcon />
                      <div className="loading__state"></div>
                    </div>
                    <div className="car__spec">
                      <SafetyIcon />
                      <div className="loading__state"></div>
                    </div>
                    <div className="car__spec">
                      <PassengerIcon />
                      <div className="loading__state"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
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
                  />
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
                      reviews?.map((rev, index) => (
                        <Review review={rev} key={index} />
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
