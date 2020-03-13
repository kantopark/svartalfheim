import { api } from "@/infra/api";
import { storage } from "@/infra/localstorage";
import { apiClient } from "@/infra/selector";
import { push } from "connected-react-router";
import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import { throwError } from "redux-saga-test-plan/providers";
import { select } from "redux-saga/effects";
import * as A from "../action";

import Reducer, { defaultState } from "../reducer";
import * as saga from "../saga";

describe("user validation", () => {
  const user = { username: "user", password: "password" };
  const to = "/";
  const payload: ReturnType<typeof A.validateAccount.request> = {
    type: "VALIDATE_ACCOUNT_REQUEST",
    payload: { ...user, to }
  };

  it("dispatches success result with valid user", () => {
    const mockResponse = { id: 1, isAdmin: false, ...user };

    expectSaga(saga.validateAccount, payload)
      .provide([
        [select(apiClient), api],
        [matchers.call.fn(api.post), { data: mockResponse }],
        [matchers.call.fn(storage.setItem), undefined]
      ])
      .call(api.post, "/validate/account", user)
      .put(A.validateAccount.success(mockResponse))
      .call(storage.setItem, saga.ACCT_KEY, mockResponse)
      .put(push(to))
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

  it("retrieves account details and dispatches validation request", () => {
    const payload: ReturnType<typeof A.retrieveAccount> = {
      type: "RETRIEVE_ACCOUNT_FROM_STORE",
      payload: "/any-path"
    };

    expectSaga(saga.retrieveAccount, payload)
      .provide([[matchers.call.fn(storage.setItem), user]])
      .call(storage.getItem, saga.ACCT_KEY)
      .dispatch(A.validateAccount.request({ ...user, to: payload.payload }))
      .run();
  });

  it("logs user out", async () => {
    const { storeState } = await expectSaga(saga.logoutAccount)
      .provide([[matchers.call.fn(storage.removeItem), undefined]])
      .withReducer(Reducer, { ...defaultState, currentUser: { id: 1, isAdmin: false, ...user } })
      .dispatch(A.logout())
      .run();

    expect(storeState.currentUser).toBeUndefined();
  });
});
