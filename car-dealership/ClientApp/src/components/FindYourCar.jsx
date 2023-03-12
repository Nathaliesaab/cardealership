import { useEffect, useState } from "react";
import { CarCard } from "./ui/CarCard";
import { Search } from "../common/Search/Search";
import { LoadingCard } from "./ui/LoadingCard";
export const FindYourCar = () => {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllCars = async () => {
    try {
      const response = await fetch("/api/car").then((result) => {
        return result.json();
      });
      return [response, null];
    } catch (error) {
      return [null, error];
    }
  };

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
  return (
    <section id="find__your--car">
      <div className="find__your--car--search">
        <h2 className="find__your--car-title">Welcome to fastkar Buying</h2>
        <div className="find__your--car--search-wrapper">
          <Search />
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="find__your--car--cars--wrapper">
            {isLoading // Check if isLoading is true
              ? Array(20)
                  .fill()
                  .map((item, index) => (
                    <div key={index}>
                      <LoadingCard />
                    </div>
                  ))
              : cars?.map((car, index) => (
                  <div key={index}>
                    <CarCard car={car} />
                  </div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
};
