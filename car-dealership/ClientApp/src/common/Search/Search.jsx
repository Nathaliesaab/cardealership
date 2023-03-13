import { SearchIcon } from "../icons/SearchIcon";
import { useState, useCallback, useEffect } from "react";
import SearchDropdown from "./SearchDropdown";

export const Search = () => {
  const [displayDropdown, setDisplayDropdown] = useState(false);
  const [search, setSearch] = useState("");

  const onSubmit = () => {
    setSearch("");
    // return router.push(
    //   clientRoutes.search({
    //     keyword: `${encodeURIComponent(search)}`,
    //     page: "1",
    //   })
    // );
  };

  function inputChangeHandler(value) {
    setSearch(value);
    setDisplayDropdown(true);
  }

  return (
    <div className="search__wrapper">
      <div className="search__wrapper--container">
        <input
          className="search--input"
          type="search"
          placeholder="Search by Model, Make or Keyword"
          onChange={({ target: { value } }) => inputChangeHandler(value)}
          onFocus={() => setDisplayDropdown(true)}
        />
        <button
          className="btn__general search--button"
          onClick={onSubmit}
          disabled={!search}
        >
          <SearchIcon />
        </button>
      </div>

      {displayDropdown && <SearchDropdown search={search} />}
    </div>
  );
};
