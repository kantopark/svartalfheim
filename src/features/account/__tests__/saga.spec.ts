import { publicApi } from "@/infra/api";
import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import { throwError } from "redux-saga-test-plan/providers";

import * as A from "../action";
import * as saga from "../saga";

describe("user validation", () => {
  const payload: ReturnType<typeof A.validateAccount.request> = {
    type: "VALIDATE_ACCOUNT_REQUEST",
    payload: { username: "user", password: "password" }
  };

  it("dispatches success result with valid user", () => {
    const mockResponse = { id: 1, isAdmin: false, ...payload.payload };

    return expectSaga(saga.validateAccount, payload)
      .provide([[matchers.call.fn(publicApi.post), { data: mockResponse }]])
      .put(A.validateAccount.success(mockResponse))
      .run();
  });

  it("dispatches failure action with invalid user", () => {
    return expectSaga(saga.validateAccount, payload)
      .provide([[matchers.call.fn(publicApi.post), throwError(new Error())]])
      .put(A.validateAccount.failure())
      .run();
  });
});
