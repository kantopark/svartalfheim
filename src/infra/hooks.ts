import RootState from "@/features/root-state";
import isEqual from "lodash/isEqual";
import { useSelector } from "react-redux";

export const useRouter = () => useSelector((state: RootState) => state.router);

export function useRootSelector<R = unknown>(
  selector: (state: RootState) => R,
  equalityFn?: (left: R, right: R) => boolean
) {
  if (equalityFn === undefined) equalityFn = isEqual;
  return useSelector(selector, equalityFn);
}
