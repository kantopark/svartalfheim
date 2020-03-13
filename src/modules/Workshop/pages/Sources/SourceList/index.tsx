import React, { useState } from "react";
import { QueryContext } from "./hooks";
import SearchBar from "./SearchBar";
import SourceList from "./SourceList";

export default () => {
  const [query, setQuery] = useState("");
  return (
    <QueryContext.Provider value={{ query, setQuery }}>
      <SearchBar />
      <SourceList />
    </QueryContext.Provider>
  );
};
