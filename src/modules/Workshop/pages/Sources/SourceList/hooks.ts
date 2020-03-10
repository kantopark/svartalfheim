import { WorkshopSelector } from "@/features/workshop";
import { Source } from "@/features/workshop/types";
import Fuse from "fuse.js";
import { createContext, useContext } from "react";
import { useSelector } from "react-redux";

export const QueryContext = createContext<{
  query: string;
  setQuery: (v: string) => void;
}>({
  query: "",
  setQuery: () => {}
});

export const useQueryContext = () => useContext(QueryContext);

const useFuse = (sources: Source[]) => {
  return new Fuse(sources, {
    shouldSort: true,
    tokenize: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ["name", "repoUrl"]
  });
};

export const useSources = (query: string): Source[] => {
  const sources = Object.values(useSelector(WorkshopSelector.sources));
  const fuse = useFuse(sources);
  query = query.trim();

  return query === "" ? sources : fuse.search(query);
};
