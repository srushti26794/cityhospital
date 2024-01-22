import { all } from "redux-saga/effects";
import rootSaga from "./auth.saga";

export function* allSaga() {
    yield all([
        rootSaga()
    ])
} 