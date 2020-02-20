import { AccountReducer } from "@/features/account";
import { WorkshopReducer } from "@/features/workshop";
import { connectRouter } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";
import RootState from "./root-state";

export default (history: History) =>
  combineReducers<RootState>({
    account: AccountReducer,
    workshop: WorkshopReducer,
    router: connectRouter(history)
  });
