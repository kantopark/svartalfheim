import AllActions from "@/features/root-action";
import produce from "immer";

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
  }
};

export default (state = defaultState, action: AllActions) =>
  produce(state, draft => {
    switch (action.type) {
    }
  });
