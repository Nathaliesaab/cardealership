import { useContext, useEffect, useState } from "react";
import { CarCard } from "./ui/CarCard";
import { Search } from "./common/Search/Search";
import { getAllCars } from "../api/car_apis";
import { AppContext } from "../providers/AppProvider";
export const FindYourCar = () => {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isCarSaved, savedCars, user } = useContext(AppContext);
  const getCars = async () => {
    const [result, error] = await getAllCars();
    if (error) {
      return;
    }
    setCars(result);
    setIsLoading(false);
  };

  useEffect(() => {
    getCars();
  }, []);
  useEffect(() => {
    if (user) {
      savedCars();
    }
  }, [user]);
  return (
    <section id="find__your--car">
      <div className="find__your--car--search">
        <h2 className="find__your--car-title">Welcome to fastkar Buying</h2>
        <Search />
      </div>
      <div className="container">
        <div className="row">
          <div className="find__your--car--cars--wrapper">
            {cars?.map((car) => (
              <CarCard
                car={car}
                key={car.id}
                saved={isCarSaved(car?.id)}
                isLoading={isLoading}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
