import { createLocalAction } from "@/libs";
import { createAction, createAsyncAction } from "typesafe-actions";

import { Account, AccountValidatePayload } from "./types";

export const validateAccount = createAsyncAction(
  "VALIDATE_ACCOUNT_REQUEST",
  "VALIDATE_ACCOUNT_SUCCESS",
  "VALIDATE_ACCOUNT_FAILURE"
)<Redirection<AccountValidatePayload>, Account, void>();

export const retrieveAccount = createAction("RETRIEVE_ACCOUNT_FROM_STORE")<void>();

export const [logoutAction, logout] = createLocalAction(
  { type: "LOGOUT_ACCOUNT_FROM_STORE_REQUEST" },
  { type: "LOGOUT_ACCOUNT_FROM_STORE_SUCCESS" }
);
