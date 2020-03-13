import { storage } from "@/infra/localstorage";
import { apiClient } from "@/infra/selector";
import { AxiosResponse } from "axios";
import { push } from "connected-react-router";
import { all, call, put, select, takeEvery, takeLatest } from "redux-saga/effects";
import * as A from "./action";
import { Account } from "./types";

export const ACCT_KEY = "NIDA_ACCOUNT_KEY";

export function* validateAccount({ payload }: ReturnType<typeof A.validateAccount.request>) {
  const api = yield select(apiClient);
  const { to, ...credentials } = payload;
  try {
    const { data }: AxiosResponse<Account> = yield call(api.post, "/validate/account", credentials);
    const user = { ...credentials, ...data };

    yield put(A.validateAccount.success(user));
    yield call(storage.setItem, ACCT_KEY, user);
    yield put(push(to));
  } catch (e) {
    yield put(A.validateAccount.failure());
  }
}

export function* retrieveAccount({ payload: path }: ReturnType<typeof A.retrieveAccount>) {
  const account: Account = yield call(storage.getItem, ACCT_KEY);
  if (account === null) return;

  const { username = "", password = "" } = account;
  if (username === "") return;
  yield put(A.validateAccount.request({ username, password, to: path }));
}

export function* logoutAccount() {
  yield call(storage.removeItem, ACCT_KEY);
  yield put(A.logoutAction());
}

export default function*() {
  yield all([
    takeLatest(A.retrieveAccount, retrieveAccount),
    takeLatest(A.validateAccount.request, validateAccount),
    takeEvery(A.logout, logoutAccount)
  ]);
}
