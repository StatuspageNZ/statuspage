import React from "react";

const Search = ({ location, setLocation }) => (
  <input
    className="search"
    type="text"
    placeholder="Search Auckland Regions"
    value={location}
    onChange={(e) => setLocation(e.target.value)}
  />
);

export default Search;
