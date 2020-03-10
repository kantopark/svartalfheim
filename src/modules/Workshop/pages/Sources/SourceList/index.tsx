import { List } from "antd";
import React, { useState } from "react";
import { QueryContext } from "./hooks";
import SearchBar from "./SearchBar";

export default () => {
  const [query, setQuery] = useState("");
  return (
    <QueryContext.Provider value={{ query, setQuery }}>
      <SearchBar />
      <List itemLayout="vertical" size="large" pagination={{ pageSize: 5 }} />
    </QueryContext.Provider>
  );
};
