import { FavouriteIcon } from "../common/icons/FavouriteIcons";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { favourite_car } from "../../api/customer_apis.js";
import { AppContext } from "../../providers/AppProvider";
export const CarCard = ({ car, saved }) => {
  const { user, showToast } = useContext(AppContext);
  const [imageLoaded, setImageLoaded] = useState(false);
  const quantityText = () => {
    return car.stockQuantity === 1
      ? `${car.stockQuantity} car`
      : `${car.stockQuantity} cars`;
  };

  const saveCar = async () => {
    const [result, error] = await favourite_car({
      carId: car.id,
      customerId: user.id,
    });
    if (result) {
      showToast("Car added to favourite");
    }
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
      <div className={`car__price--wrapper ${saved && "car__saved"}`}>
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
        src={car?.image}
        alt="Car"
        onLoad={() => setImageLoaded(true)}
        style={{ display: `${imageLoaded ? "flex" : "none"}` }}
      />
    </div>
  );
};
