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

export const deleteSourceAsync = createAsyncAction(
  "DELETE_SOURCE_REQUEST",
  "DELETE_SOURCE_SUCCESS",
  "DELETE_SOURCE_FAILURE"
)<number, number, void>();

export const updateSourceAsync = createAsyncAction(
  "UPDATE_SOURCE_REQUEST",
  "UPDATE_SOURCE_SUCCESS",
  "UPDATE_SOURCE_FAILURE"
)<Redirection<Source>, Source, void>();
