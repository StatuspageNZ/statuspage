import React, {useState} from "react";

const Search = ({ locality, filterQuery, setFilterQuery }) => (
  <input
    className="search"
    type="text"
    placeholder={`Search ${locality}`}
    value={filterQuery}
    onChange={(e) => setFilterQuery(e.target.value)}
  />
);

export default Search;
