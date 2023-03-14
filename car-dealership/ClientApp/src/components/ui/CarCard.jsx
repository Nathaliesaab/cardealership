import { FavouriteIcon } from "../common/icons/FavouriteIcons";
import { Link } from "react-router-dom";
import { useState } from "react";
export const CarCard = ({ car }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const quantityText = () => {
    return car.stockQuantity === 1
      ? `${car.stockQuantity} car`
      : `${car.stockQuantity} cars`;
  };
  return imageLoaded ? (
    <Link
      className="car__card--container"
      to={{
        pathname: "/car-details",
        search: `id=${car.id}`,
      }}
    >
      <h5 className="car__stock">
        {car.stockQuantity === 0 ? (
          <span className="car__out--of-stock">Out of Stock</span>
        ) : (
          quantityText()
        )}
      </h5>
      <div>
        <h4 className="car__year">{car.year}</h4>
        <h3 className="car__model">
          {car.make} {car.model}
        </h3>
      </div>
      <img
        src={car.image}
        alt="Car"
        onLoad={() => setImageLoaded(true)}
        style={{ display: `${imageLoaded ? "flex" : "none"}` }}
      />
      <div className="car__price--wrapper">
        <h4>
          Starting at
          <span className="purple car__price">
            ${car.price.toLocaleString()}
          </span>
        </h4>
        <FavouriteIcon />
      </div>
    </Link>
  ) : (
    <div className="loading__card">
      <img
        src={car.image}
        alt="Car"
        onLoad={() => setImageLoaded(true)}
        style={{ display: `${imageLoaded ? "flex" : "none"}` }}
      />
    </div>
  );
};
