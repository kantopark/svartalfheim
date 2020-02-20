import { publicApi } from "@/infra/api";
import { AxiosResponse } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import * as A from "./action";
import { Account } from "./types";
import { storage } from "./localstorage";

const ACCT_KEY = "NIDA_ACCOUNT_KEY";

export function* validateAccount({ payload }: ReturnType<typeof A.validateAccount.request>) {
  try {
    const { data }: AxiosResponse<Account> = yield call(publicApi.post, "/account", payload);
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

export default function*() {
  yield all([
    takeLatest(A.retrieveAccount, retrieveAccount),
    takeLatest(A.validateAccount.request, validateAccount)
  ]);
}
