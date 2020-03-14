import RootState from "@/features/root-state";

export const sources = (s: RootState) => Object.values(s.workshop.sources);

export const source = (id: number) => (s: RootState) =>
  s.workshop.sources.hasOwnProperty(id) ? s.workshop.sources[id] : undefined;
