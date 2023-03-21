import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../providers/AppProvider";
import { TrashIcon } from "../common/icons/TrashIcon";

export const SavedCar = ({ car }) => {
  const { removeCar } = useContext(AppContext);
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <div className="saved__car">
      <div className="remove__car--icon" onClick={() => removeCar(car.id)}>
        <TrashIcon />
      </div>
      <Link
        to={{
          pathname: "/car-details",
          search: `id=${car.id}`,
        }}
      >
        <img
          src={car.image}
          alt={`${car.make} ${car.model}`}
          onLoad={() => setImageLoaded(true)}
          style={{ display: imageLoaded ? "flex" : "none" }}
        />
        {!imageLoaded && <div className="loading__search"></div>}
        <div className="saved__car--title">
          <span>{car.make}</span>
          <span>{car.model}</span>
        </div>
      </Link>
    </div>
  );
};
