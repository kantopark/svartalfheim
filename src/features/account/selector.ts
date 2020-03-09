import RootState from "@/features/root-state";
import { Account } from "./types";

export const isSignedIn = (state: RootState) => state.account.currentUser !== undefined;

// Returns the current user account. This force casts the Account object and should only
// be used after checks are done to ensure the user is signed in
export const user = (state: RootState) => state.account.currentUser as Account;
