import { useState, useCallback, useEffect } from "react";
import { debounce } from "lodash";

const SearchDropdown = ({ search }) => {
  const [searchUrl, setSearchUrl] = useState("");
  const [items, setItems] = useState([]);
  const searchAllCars = async (searchUrl) => {
    try {
      const response = await fetch(searchUrl)
        .then((result) => result.json())
        .then((res) => {
          return res.cars;
        });
      return [response, null];
    } catch (error) {
      return [null, error];
    }
  };

  const searchCars = async (searchUrl) => {
    const [result, error] = await searchAllCars(searchUrl);
    if (error) {
      return;
    }
    setItems(result);
  };

  const doSearch = useCallback(
    debounce(
      (keyword) =>
        keyword.length > 2 && setSearchUrl(`api/car/search/${keyword}`),
      500
    ),
    []
  );

  useEffect(() => {
    doSearch(search);
  }, [search]);

  useEffect(() => {
    searchCars(searchUrl);
  }, [searchUrl]);

  return (
    <div className="search__dropdown--wrapper">
      {search.length < 3 ? (
        <span className="search__alert">Please enter at least 3 characters</span>
      ) : (
        <ul className="search__dropdown--content">
          {items ? (
            <>
              {items.slice(0, 10).map((item) => (
                // <SearchDropdownItem key={item.sku} searchItem={item} />
                <li key={item.id}>{item.model}</li>
              ))}
              {!items && (
                <li className="rounded-none hover:z-50 z-50 py-2">
                  No results found.
                </li>
              )}
            </>
          ) : (
            <li className="rounded-none hover:z-50 z-50 py-2 text-primary pulsate">
              Loading...
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchDropdown;
