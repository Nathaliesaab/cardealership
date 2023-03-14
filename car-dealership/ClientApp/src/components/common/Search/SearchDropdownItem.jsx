import { Link } from "react-router-dom";
export const SearchDropdownItem = ({ car }) => {
  return (
    <Link
      className="search__result--wrapper"
      to={{
        pathname: "/car-details",
        search: `id=${car.id}`,
      }}
    >
      <img src={car.image} alt="car" className="search__image" />
      <div className="search__result--details">
        <span className="search__title">
          {car.make}
          <span>{car.model}</span>
        </span>
        <span className="result__title">{car.year}</span>
      </div>
      <div
        className="color__circle"
        style={{
          backgroundColor: car.colorCode,
          border: car.color.toUpperCase() === "WHITE" && "1px solid black",
          position: "absolute",
          right: "32px",
        }}
      ></div>
    </Link>
  );
};
