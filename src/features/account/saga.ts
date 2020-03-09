import { apiClient } from "@/infra/selector";
import { AxiosResponse } from "axios";
import { all, call, put, select, takeEvery, takeLatest } from "redux-saga/effects";
import * as A from "./action";
import { storage } from "./localstorage";
import { Account } from "./types";

const ACCT_KEY = "NIDA_ACCOUNT_KEY";

export function* validateAccount({ payload }: ReturnType<typeof A.validateAccount.request>) {
  const api = yield select(apiClient);

  try {
    const { data }: AxiosResponse<Account> = yield call(api.post, "/validate/account", payload);
    yield put(A.validateAccount.success(data));
    storage.setItem(ACCT_KEY, data);
  } catch (e) {
    yield put(A.validateAccount.failure());
  }
}

function* retrieveAccount() {
  const account = storage.getItem<Account>(ACCT_KEY);

  if (account !== null) {
    const { username = "", password = "" } = account;
    if (!!username || !!password) return;
    yield put(A.validateAccount.request({ username, password }));
  } else {
    yield put(A.validateAccount.request({ username: "admin", password: "password" }));
  }
}

export function* logoutAccount() {
  storage.removeItem(ACCT_KEY);
  yield put(A.logout.success());
}

export default function*() {
  yield all([
    takeLatest(A.retrieveAccount, retrieveAccount),
    takeLatest(A.validateAccount.request, validateAccount),
    takeEvery(A.logout.request, logoutAccount)
  ]);
}
