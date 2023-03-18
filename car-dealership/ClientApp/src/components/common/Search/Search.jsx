import { useState } from "react";
import SearchDropdown from "./SearchDropdown";
import { CloseIcon } from "../icons/CloseIcon";

export const Search = () => {
  const [displayDropdown, setDisplayDropdown] = useState(false);
  const [search, setSearch] = useState("");
  function inputChangeHandler(value) {
    setSearch(value);
    setDisplayDropdown(true);
  }
  return (
    <div className="search__wrapper">
      <div className="search__wrapper--container">
        <input
          className="search--input"
          type="text"
          value={search}
          placeholder="Search by Model, Make or Keyword"
          onChange={({ target: { value } }) => inputChangeHandler(value)}
          onFocus={() => setDisplayDropdown(true)}
        />
        {search.length > 2 && (
          <div className="clear__search" onClick={() => setSearch("")}>
            <CloseIcon />
          </div>
        )}
      </div>
      {displayDropdown && <SearchDropdown search={search} />}
    </div>
  );
};
