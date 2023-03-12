import Car from "../../assets/cardetails.png";
import { VideoIcon } from "../../common/icons/VideoIcon";
import { WheelIcon } from "../../common/icons/WheelIcon";
import { CarIcon } from "../../common/icons/CarIcon";
import { PassengerIcon } from "../../common/icons/PassengerIcon";
import { SafetyIcon } from "../../common/icons/SafetyIcon";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export const CarDetails = () => {
  const [carDetails, setCarDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const id = urlParams.get("id");
  const getCarData = async () => {
    try {
      const response = await fetch(`/api/car/${id}`).then((result) => {
        return result.json();
      });
      return [response, null];
    } catch (error) {
      return [null, error];
    }
  };

  const getCar = async () => {
    const [result, error] = await getCarData();
    if (error) {
      return;
    }
    setCarDetails(result);
    setLoading(false);
  };
  useEffect(() => {
    getCar();
  }, [id]);
  return (
    <section id="car__details">
      {loading ? (
        "LOADING..........."
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
                <img
                  src={Car}
                  alt="car Image"
                  className="car__details--image"
                />
                <div className="car__details">
                  <div>
                    <h2>
                      {carDetails.year} {carDetails.model}
                    </h2>
                    <h4>{carDetails.description}</h4>
                  </div>
                  <div className="price__summary">
                    <h3 className="car__month--price purple">
                      ${Math.floor(carDetails?.price / 12).toLocaleString()}
                      <span>/month *</span>
                    </h3>
                    <h6 className="car__tax--rule">
                      incl. taxes & fees, on approved credit
                    </h6>

                    <h6 className="car__total--price">
                      ${carDetails?.price.toLocaleString()}
                    </h6>
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
                      Passengers
                    </div>
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
