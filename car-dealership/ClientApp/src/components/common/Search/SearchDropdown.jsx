import { useState, useEffect } from "react";
import { search_cars } from "../../../api/car_apis";
import useDebounce from "../../../reactHooks/useDebounce";

import { SearchDropdownItem } from "./SearchDropdownItem";
const SearchDropdown = ({ search }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchUrl = useDebounce(`api/car/search/${search}`, 500);
  const searchCars = async (searchUrl) => {
    const [result, error] = await search_cars(searchUrl);
    if (error) {
      return;
    }
    setItems(result);
    setLoading(false);
  };

  useEffect(() => {
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
            overflowY: `${items?.length > 4 && "scroll"}`,
          }}
        >
          {items ? (
            <>
              {items.slice(0, 10).map((item) => (
                <li key={item.id}>
                  <SearchDropdownItem car={item} />
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
