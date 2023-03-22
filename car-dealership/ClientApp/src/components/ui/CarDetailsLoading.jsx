import { SafetyIcon } from "../common/icons/SafetyIcon";
import { VideoIcon } from "../common/icons/VideoIcon";
import { WheelIcon } from "../common/icons/WheelIcon";
import { CarIcon } from "../common/icons/CarIcon";
import { PassengerIcon } from "../common/icons/PassengerIcon";
export const CarDetailsLoading = () => {
  return (
    <>
      <div className="car__details--header">
        <h3>100% Online Purchase</h3>
        <div className="loading__state"></div>
        <div className="car__details--header-links-wrapper">
          <a
            href="google.com"
            target="_blank"
            alt="WHY FASTKAR"
            className="car__details--header-link"
          >
            WHY FASTKAR?
          </a>
          <div className="car__links--separator"></div>
          <a
            href="google.com"
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
                  <div className="loading__state"></div>
                  <div style={{ width: "100%" }}>/month *</div>
                </div>

                <h6 className="car__tax--rule">
                  incl. taxes & fees, on approved credit
                </h6>

                <div className="loading__state"></div>
              </div>
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
  );
};
