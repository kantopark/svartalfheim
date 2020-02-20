import RootState from "@/features/root-state";

export const isSignedIn = (state: RootState) => state.account.currentUser !== undefined;
