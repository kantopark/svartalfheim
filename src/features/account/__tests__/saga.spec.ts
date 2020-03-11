import { api } from "@/infra/api";
import { apiClient } from "@/infra/selector";
import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import { throwError } from "redux-saga-test-plan/providers";
import { select } from "redux-saga/effects";
import * as A from "../action";

import Reducer, { defaultState } from "../reducer";
import * as saga from "../saga";

describe("user validation", () => {
  const user = { username: "user", password: "password" };
  const payload: ReturnType<typeof A.validateAccount.request> = {
    type: "VALIDATE_ACCOUNT_REQUEST",
    payload: user
  };

  it("dispatches success result with valid user", () => {
    const mockResponse = { id: 1, isAdmin: false, ...payload.payload };

    return expectSaga(saga.validateAccount, payload)
      .provide([
        [select(apiClient), api],
        [matchers.call.fn(api.post), { data: mockResponse }]
      ])
      .put(A.validateAccount.success(mockResponse))
      .run();
  });

  it("dispatches failure action with invalid user", () =>
    expectSaga(saga.validateAccount, payload)
      .provide([
        [select(apiClient), api],
        [matchers.call.fn(api.post), throwError(new Error())]
      ])
      .put(A.validateAccount.failure())
      .run());

  it("logs user out", async () => {
    const { storeState } = await expectSaga(saga.logoutAccount)
      .withReducer(Reducer, { ...defaultState, currentUser: { id: 1, isAdmin: false, ...user } })
      .dispatch(A.logout())
      .run();

    expect(storeState.currentUser).toBeUndefined();
  });
});
