import { apiClient } from "@/infra/selector";
import { AxiosResponse } from "axios";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import * as A from "./action";
import { Source } from "./types";

export function* fetchSources() {
  try {
    const api = yield select(apiClient);
    const { data }: AxiosResponse<Source[]> = yield call(api.get, "/source");
    yield put(A.fetchSourcesAsync.success(data.reduce((a, x) => ({ ...a, [x.id]: x }), {})));
  } catch (e) {
    yield put(A.fetchSourcesAsync.failure());
  }
}

export function* createSource({ payload }: ReturnType<typeof A.createSourceAsync.request>) {
  try {
    const api = yield select(apiClient);
    const { data }: AxiosResponse<Source> = yield call(api.post, "/source", payload);
    yield put(A.createSourceAsync.success(data));
  } catch (e) {
    yield put(A.createSourceAsync.failure());
  }
}

export default function*() {
  yield all([
    takeLatest(A.fetchSourcesAsync.request, fetchSources),
    takeLatest(A.createSourceAsync.request, createSource)
  ]);
}