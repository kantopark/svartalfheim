import RootState from "@/features/root-state";
import { api, ApiClient, serverUrl } from "@/infra/api";

export const apiClient = (state: RootState) => {
  const account = state.account.currentUser;
  if (account !== undefined) {
    const { username, password = "" } = account;

    if (password !== "") {
      // basic auth
      return new ApiClient(`${serverUrl}/api`, { auth: { username, password } });
    }

    // todo ADD JWT auth
  }
  return api;
};
