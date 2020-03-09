import RootState from "@/features/root-state";
import { api, ApiClient, serverUrl } from "@/infra/api";

export const apiClient = (state: RootState) => {
  const account = state.account.currentUser;

  if (account && account.password === "") {
    const { username, password } = account;
    return new ApiClient(`${serverUrl}/api`, { auth: { username, password } });
  }

  return api;
};
