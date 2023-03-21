import { FavouriteIcon } from "../common/icons/FavouriteIcons";
export const CarCardLoading = (imageLoaded) => {
  return (
    <div className="car__card--container">
      <div
        className="loading__state"
        style={{ maxWidth: "40px", marginLeft: "auto" }}
      ></div>
      <div className="loading__state"></div>
      {!imageLoaded && (
        <div className="loading__card card__image--loading"></div>
      )}
      <div className={`car__price--wrapper`}>
        <h4>
          Starting at
          <div className="loading__state"></div>
        </h4>
        <FavouriteIcon />
      </div>
    </div>
  );
};
