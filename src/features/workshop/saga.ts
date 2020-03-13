import { ApiClient } from "@/infra/api";
import { apiClient } from "@/infra/selector";
import { AxiosResponse } from "axios";
import { push } from "connected-react-router";
import keyBy from "lodash/keyBy";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import * as A from "./action";
import { Source } from "./types";

export function* fetchSources() {
  try {
    const api = yield select(apiClient);
    const { data }: AxiosResponse<Source[]> = yield call(api.get, "/source");
    yield put(A.fetchSourcesAsync.success(keyBy(data, e => e.id)));
  } catch (e) {
    yield put(A.fetchSourcesAsync.failure());
  }
}

export function* createSource({ payload }: ReturnType<typeof A.createSourceAsync.request>) {
  try {
    const api = yield select(apiClient);
    const { to, ...rest } = payload;
    const { data }: AxiosResponse<Source> = yield call(api.post, "/source", rest);
    yield put(A.createSourceAsync.success(data));
    yield put(push(to));
  } catch (e) {
    yield put(A.createSourceAsync.failure());
  }
}

export function* deleteSource({ payload }: ReturnType<typeof A.deleteSourceAsync.request>) {
  try {
    const api: ApiClient = yield select(apiClient);
    const { status }: AxiosResponse = yield call(api.delete, `/source/${payload}`);

    if (status === 200) yield put(A.deleteSourceAsync.success(payload));
    else yield put(A.deleteSourceAsync.failure());
  } catch (e) {
    yield put(A.deleteSourceAsync.failure());
  }
}

export default function*() {
  yield all([
    takeLatest(A.fetchSourcesAsync.request, fetchSources),
    takeLatest(A.createSourceAsync.request, createSource),
    takeLatest(A.deleteSourceAsync.request, deleteSource)
  ]);
}
