import { SearchIcon } from "../icons/SearchIcon";
import { useState, useRef } from "react";
// import { clientRoutes } from "@/http/routes";
// import SearchDropdown from "./SearchDropdown";
// import { useRouter } from "next/dist/client/router";
export const Search = () => {
  const [displayDropdown, setDisplayDropdown] = useState(false);
  const [search, setSearch] = useState("");
  // const router = useRouter();
  // const clickAwayRef = useRef(null);

  // useClickAway(clickAwayRef, () => setDisplayDropdown(false));

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
    // setDisplayDropdown(true);
  }
  return (
    <div className="search__wrapper">
      <input
        className="header__search--input"
        type="search"
        placeholder="Search by Model, Make or Keyword"
        onChange={({ target: { value } }) => inputChangeHandler(value)}
        // onFocus={() => setDisplayDropdown(true)}
      />
      <button
        className="btn__general header__search--button"
        onClick={onSubmit}
        disabled={!search}
      >
        <SearchIcon />
      </button>
      {/* {displayDropdown && (
        <SearchDropdown
          search={search}
          className={"absolute top-12 w-[87%] max-h-[400px] overflow-y-auto"}
        />
      )} */}
    </div>
  );
};
