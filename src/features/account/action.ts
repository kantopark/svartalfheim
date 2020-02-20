import { createAsyncAction, createAction } from "typesafe-actions";
import { Account, AccountValidatePayload } from "./types";

export const validateAccount = createAsyncAction(
  "VALIDATE_ACCOUNT_REQUEST",
  "VALIDATE_ACCOUNT_SUCCESS",
  "VALIDATE_ACCOUNT_FAILURE"
)<AccountValidatePayload, Account, void>();

export const retrieveAccount = createAction("RETRIEVE_ACCOUNT_FROM_STORE")<void>();
