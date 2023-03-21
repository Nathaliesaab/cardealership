import { FavouriteIcon } from "../common/icons/FavouriteIcons";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CarCardLoading } from "./CarCardLoading";
import { AppContext } from "../../providers/AppProvider";

export const CarCard = ({ car, saved, isLoading }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const quantityText = () => {
    return car.stockQuantity === 1
      ? `${car.stockQuantity} car`
      : `${car.stockQuantity} cars`;
  };
  const { saveCar, removeCar } = useContext(AppContext);
  return isLoading ? (
    <CarCardLoading imageLoaded={imageLoaded} />
  ) : (
    <div className="car__card--container">
      <Link
        className="car__card--link"
        to={{
          pathname: "/car-details",
          search: `id=${car.id}`,
        }}
      >
        <h5 className="car__stock">
          {car?.stockQuantity === 0 ? (
            <span className="car__out--of-stock">Out of Stock</span>
          ) : (
            quantityText()
          )}
        </h5>
        <div>
          <h4 className="car__year">{car.year}</h4>
          <h3 className="car__model">
            {car?.make} {car?.model}
          </h3>
        </div>
        <img
          src={car?.image}
          alt="Car"
          onLoad={() => setImageLoaded(true)}
          style={{ display: `${imageLoaded ? "flex" : "none"}` }}
        />
        {!imageLoaded && (
          <div className="loading__card card__image--loading"></div>
        )}
      </Link>
      <div className={`car__price--wrapper ${saved && "car__saved"}`}>
        <h4>
          Starting at
          <span className="purple car__price">
            ${car.price.toLocaleString()}
          </span>
        </h4>

        <div
          onClick={() => (saved ? removeCar(car.id) : saveCar(car.id))}
          style={{ cursor: "pointer" }}
        >
          <FavouriteIcon />
        </div>
      </div>
    </div>
  );
};
