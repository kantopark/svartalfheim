import AllActions from "@/features/root-action";
import produce from "immer";
import { getType } from "typesafe-actions";
import * as A from "./action";

import { Store } from "./types";

export const defaultState: Store = {
  status: {
    currentUser: "SUCCESS"
  }
};

export default (state = defaultState, action: AllActions) =>
  produce(state, draft => {
    switch (action.type) {
      case getType(A.validateAccount.request):
        draft.status.currentUser = "REQUEST";
        break;
      case getType(A.validateAccount.failure):
        draft.status.currentUser = "FAILURE";
        break;
      case getType(A.validateAccount.success):
        draft.status.currentUser = "SUCCESS";
        draft.currentUser = action.payload;
        break;

      case getType(A.logoutAction):
        draft.currentUser = undefined;
        break;
    }
  });
