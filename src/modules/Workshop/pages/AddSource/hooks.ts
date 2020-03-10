import { createContext, useContext } from "react";

export type NextRun = {
  time: string;
  delta: number;
};

export const SourceContext = createContext<{
  nextRuns: NextRun[];
  setNextRuns: (v: NextRun[]) => void;
}>({
  nextRuns: [],
  setNextRuns: () => {}
});

export const useSourceContext = () => useContext(SourceContext);
