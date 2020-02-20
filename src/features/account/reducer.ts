import AllActions from "@/features/root-action";
import produce from "immer";
import { getType } from "typesafe-actions";

import { Store } from "./types";
import * as A from "./action";

const defaultState: Store = {
  loading: {
    currentUser: "SUCCESS"
  }
};

export default (state = defaultState, action: AllActions) =>
  produce(state, draft => {
    switch (action.type) {
      case getType(A.validateAccount.request):
        draft.loading.currentUser = "REQUEST";
        break;
      case getType(A.validateAccount.failure):
        draft.loading.currentUser = "FAILURE";
        break;
      case getType(A.validateAccount.success):
        draft.loading.currentUser = "SUCCESS";
        draft.currentUser = action.payload;
        break;
    }
  });
