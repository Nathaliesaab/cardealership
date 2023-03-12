// import { useCallback, useEffect, useState } from "react";
// import { apiRoutes } from "@/http/routes";
// import { PaginatedResponse } from "@/declarations/http";
// import useSWR from "swr";
// import SearchDropdownItem from "./SearchDropdownItem";
// import { debounce } from "lodash";

// const SearchDropdow = ({ search, className }) => {
//   const [searchUrl, setSearchUrl] = useState("");
//   const { data: items } = useSWR(searchUrl);

//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   const doSearch = useCallback(
//     debounce(
//       (keyword) =>
//         keyword.length > 2 &&
//         setSearchUrl(apiRoutes.search({ keyword, page: "1" })),
//       500
//     ),
//     []
//   );

//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   useEffect(() => {
//     doSearch(search);
//   }, [search]);

//   return (
//     <div className={className}>
//       {search.length < 3 ? (
//         <span className="p-4 block bg-base-100">
//           Please enter at least 3 characters
//         </span>
//       ) : (
//         <ul className="dropdown-content menu p-2 shadow bg-base-100 w-full rounded-none">
//           {items ? (
//             <>
//               {items.data.slice(0, 10).map((item) => (
//                 <SearchDropdownItem key={item.sku} searchItem={item} />
//               ))}
//               {items.pager.totalItems === "0" && (
//                 <li className="rounded-none hover:z-50 z-50 py-2">
//                   No results found.
//                 </li>
//               )}
//             </>
//           ) : (
//             <li className="rounded-none hover:z-50 z-50 py-2 text-primary pulsate">
//               Loading...
//             </li>
//           )}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default SearchDropdown;
