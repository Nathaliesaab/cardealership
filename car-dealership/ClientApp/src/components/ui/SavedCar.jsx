import { useContext } from "react";
import { Link } from "react-router-dom";
import { unfavourite_car } from "../../api/customer_apis";
import { UserContext } from "../../providers/UserProvider";
import { TrashIcon } from "../common/icons/TrashIcon";

export const SavedCar = ({ car }) => {
  const { user, showToast } = useContext(UserContext);
  const removeCar = async () => {
    const [result, error] = await unfavourite_car({
      customerId: user?.id,
      carId: car?.id,
    });
    if (result) {
      showToast("Car Unsaved");
    }
    showToast(error, true);
  };
  return (
    <div className="saved__car">
      <div className="remove__car--icon" onClick={() => removeCar()}>
        <TrashIcon />
      </div>
      <Link
        to={{
          pathname: "/car-details",
          search: `id=${car.id}`,
        }}
      >
        <img src={car.image} alt={`${car.make} ${car.model}`} />
        <div className="saved__car--title">
          <span>{car.make}</span>
          <span>{car.model}</span>
        </div>
      </Link>
    </div>
  );
};
