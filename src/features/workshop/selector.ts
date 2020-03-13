import RootState from "@/features/root-state";

export const sources = (s: RootState) => Object.values(s.workshop.sources);
