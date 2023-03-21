import { useState, useEffect, useContext } from "react";
import { search_cars } from "../../../api/car_apis";
import useDebounce from "../../../reactHooks/useDebounce";
import { SearchDropdownItem } from "./SearchDropdownItem";
import { AppContext } from "../../../providers/AppProvider";
const SearchDropdown = ({ search }) => {
  const { showToast } = useContext(AppContext);
  // state to manage searcg results
  const [cars, setCars] = useState([]);

  // state to manage loading state
  const [loading, setLoading] = useState(true);

  //adding debounce to set search url, not to call api on each key stroke
  const searchUrl = useDebounce(`api/car/search/${search}`, 500);

  //asynchronous function to call search api
  const searchCars = async (searchUrl) => {
    const [result, error] = await search_cars(searchUrl);
    if (error) {
      showToast(error, true);
    }
    setCars(result);
    setLoading(false);
  };

  useEffect(() => {
    //not calling search api unless  3 characters are entered
    search.length > 2 && searchCars(searchUrl);
  }, [searchUrl]);
  return (
    <div className="search__dropdown--wrapper">
      {search.length < 3 ? (
        <span className="search__alert">
          Please enter at least 3 characters
        </span>
      ) : loading ? (
        <li className="search__loading">Loading...</li>
      ) : (
        <ul
          className="search__dropdown--content"
          style={{
            overflowY: `${cars?.length > 4 && "scroll"}`,
          }}
        >
          {cars ? (
            <>
              {cars.slice(0, 10).map((car) => (
                <li key={car.id}>
                  <SearchDropdownItem car={car} />
                </li>
              ))}
            </>
          ) : (
            <li className="no__results">No results found!</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchDropdown;
