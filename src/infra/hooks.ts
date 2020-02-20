import { isEqual } from "lodash";
import { useSelector } from "react-redux";
import RootState from "@/features/root-state";

export const useRouter = () => useSelector((state: RootState) => state.router);

export function useRootSelector<R = unknown>(
  selector: (state: RootState) => R,
  equalityFn?: (left: R, right: R) => boolean
) {
  if (equalityFn === undefined) equalityFn = isEqual;
  return useSelector(selector, isEqual);
}
