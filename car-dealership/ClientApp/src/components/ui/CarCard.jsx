import { FavouriteIcon } from "../../common/icons/FavouriteIcons";
import Car from "../../assets/Car.png";
import { Link } from "react-router-dom";
export const CarCard = ({ car }) => {
  return (
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
          `${
            car.stockQuantity === 1
              ? `${car.stockQuantity} car`
              : `${car.stockQuantity} cars`
          } `
        )}
      </h5>
      <div>
        <h4 className="car__year">{car.year}</h4>
        <h3 className="car__model">
          {car.make} {car.model}
        </h3>
      </div>

      <img src={Car} alt="Car" />
      <div className="car__price--wrapper">
        <h4>
          Starting at{" "}
          <span className="purple car__price">
            ${car.price.toLocaleString()}
          </span>
        </h4>
        <FavouriteIcon />
      </div>
    </Link>
  );
};
