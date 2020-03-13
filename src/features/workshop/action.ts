import { createAsyncAction } from "typesafe-actions";
import { Source } from "./types";

export const fetchSourcesAsync = createAsyncAction(
  "FETCH_SOURCES_REQUEST",
  "FETCH_SOURCES_SUCCESS",
  "FETCH_SOURCES_FAILURE"
)<void, Record<number, Source>, void>();

export const createSourceAsync = createAsyncAction(
  "CREATE_SOURCE_REQUEST",
  "CREATE_SOURCE_SUCCESS",
  "CREATE_SOURCE_FAILURE"
)<Redirection<Pick<Source, "name" | "repoUrl" | "cronExpr">>, Source, void>();
