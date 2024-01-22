import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./reducer";
import { thunk } from "redux-thunk";
import createSagaMiddleware from 'redux-saga'
import { signupAPI } from "../common/api/auth.api";
import rootSaga from "./saga/auth.saga";
import { allSaga } from "./saga";

const saga = createSagaMiddleware()

const allMiddleware = [thunk, saga]

export const store = createStore(rootReducer, applyMiddleware(...allMiddleware));

saga.run(allSaga)