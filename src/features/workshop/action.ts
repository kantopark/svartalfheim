import { createAsyncAction } from "typesafe-actions";
import { Source } from "./types";

export const fetchSourcesAsync = createAsyncAction(
  "FETCH_SOURCES_REQUEST",
  "FETCH_SOURCES_SUCCESS",
  "FETCH_SOURCES_FAILURE"
)<void, Record<number, Source>, void>();
