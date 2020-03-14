import AllActions from "@/features/root-action";
import produce from "immer";
import { getType } from "typesafe-actions";

import * as A from "./action";
import { Store } from "./types";

const defaultState: Store = {
  jobs: {},
  sources: {},
  jobInfo: {
    id: 0,
    sourceId: 0,
    initTime: "",
    startTime: "",
    endTime: "",
    state: "",
    trigger: "",
    logs: "",
    imageLogs: "",
    outputFiles: []
  },
  status: {
    jobInfo: "SUCCESS",
    jobs: "SUCCESS",
    sources: "SUCCESS"
  }
};

export default (state = defaultState, action: AllActions) =>
  produce(state, draft => {
    switch (action.type) {
      case getType(A.deleteSourceAsync.request):
      case getType(A.createSourceAsync.request):
      case getType(A.fetchSourcesAsync.request):
      case getType(A.updateSourceAsync.request):
        draft.status.sources = "REQUEST";
        break;

      case getType(A.deleteSourceAsync.failure):
      case getType(A.createSourceAsync.failure):
      case getType(A.fetchSourcesAsync.failure):
      case getType(A.updateSourceAsync.failure):
        draft.status.sources = "FAILURE";
        break;

      case getType(A.fetchSourcesAsync.success): {
        draft.status.sources = "SUCCESS";
        draft.sources = action.payload;
        break;
      }

      case getType(A.createSourceAsync.success):
      case getType(A.updateSourceAsync.success):
        draft.status.sources = "SUCCESS";
        draft.sources[action.payload.id] = action.payload;
        break;

      case getType(A.deleteSourceAsync.success):
        draft.status.sources = "SUCCESS";
        delete draft.sources[action.payload];
        break;
    }
  });
